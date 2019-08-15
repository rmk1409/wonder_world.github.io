// TODO move all logic of this class to game class or to somewhere else
import PageManager from "./pageManager";

class IntervalManager {
    constructor() {
        this.gameManager = null;
        this.pageManager = null;
        this.configManager = null;
        this.eventManager = null;
        this.citizenManager = null;

        this.oneStepTime = 1e3;
    }

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;
        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.citizenManager = this.gameManager.citizenManager;
    }

    runInterval() {
        this.oneStep(this.oneStepTime);
        this.events(this.oneStepTime * 30);
        this.funeralProcess(this.oneStepTime * 5);
        this.checkWinCondition(this.oneStepTime * 10);

        // TODO move from here, add flag
        this.scouting(this.oneStepTime / 8);
    }


    oneStep(timeout) {
        setInterval(() => {
            // get resources
            this.configManager.food.changeValue(+this.configManager.foodTotalProduction);
            this.configManager.wood.changeValue(+this.configManager.woodTotalProduction);
            this.configManager.stone.changeValue(+this.configManager.stoneTotalProduction);
            this.configManager.knowledge.changeValue(+this.configManager.knowledgeTotalProduction);

            this.pageManager.checkHiddenTables();

            //starvation process
            if (+this.configManager.food < 0 && +this.configManager.currentPopulation > 0) {
                this.eventManager.showEventMsgToUser("starvation");
                if (!this.configManager.starvationAchievementFlag) {
                    this.eventManager.showAchievementToUser("Starvation");
                    this.configManager.starvationAchievementFlag = true;
                }
                this.pageManager.starvationWarning.show("slow");

                this.citizenManager.findPersonToKill();

                // Decrease quantity of happy
                if (+this.configManager.currentHappyPeople > this.configManager.currentPopulation) {
                    this.configManager.currentHappyPeople(-1);
                }
                // and healthy people
                if (+this.configManager.currentHealthyPeople > this.configManager.currentPopulation) {
                    this.configManager.currentHealthyPeople(-1);
                }
            } else {
                this.pageManager.starvationWarning.hide("slow");
            }

            this.pageManager.checkProduction();
            this.pageManager.checkOverpopulated();

            // TODO abundance of food
            if (!this.configManager.productivityAchievementFlag && this.configManager.productivity >= 190) {
                this.eventManager.showAchievementToUser("Productivity");
                this.configManager.productivityAchievementFlag = true;
            }

            // TODO add more bad events when it isn't focus
            // console.log(document.hasFocus());

            $("#total-power-span").text(+this.configManager.warrior);
        }, timeout);
    }

    checkWinCondition(timeout) {
        setInterval(() => {
            if (+this.configManager.knowledge >= this.configManager.WINNER_REQUIREMENTS) {
                if (confirm(`${this.configManager.userName} are amazing! Congratulations! You collected a lot of knowledge!! \nAlso you've killed: ${+this.configManager.corpse
                + +this.configManager.inGraveQuantity} people. Great job\n`)) {
                    PageManager.reloadSite();
                } else {
                    this.configManager.knowledge.changeValue(-this.configManager.WINNER_REQUIREMENTS);
                }
            }
        }, timeout);
    }

    funeralProcess(timeout) {
        setInterval(() => {
            let maxFuneral = Math.min.apply(null, [+this.configManager.corpseStorage - +this.configManager.inGraveQuantity,
                +this.configManager.corpse, +this.configManager.funeral / 2]);
            if (maxFuneral) {
                for (let i = 0; i < maxFuneral; i++) {
                    this.configManager.corpse.changeValue(-1);
                    this.configManager.inGraveQuantity.changeValue(1);
                }
                $(this.pageManager.funeralProcessImg).show("slow");
            } else {
                $(this.pageManager.funeralProcessImg).hide("slow");
            }
        }, timeout);
    }

    events(timeout) {
        setInterval(() => this.eventManager.eventHappen(), timeout);
    }

    // TODO move this from here
    scouting(timeout) {
        setInterval(() => {
            let progress = +$("#scout-progress").attr('aria-valuenow');
            progress += +this.configManager.scout / 8;
            // progress += +this.configManager.scout / 32;
            if (progress > 100) {
                progress = 0;
                this.eventManager.scoutEvent();
            }

            $("#scout-progress").attr('aria-valuenow', progress);
            $("#scout-progress").css("width", progress + "%");
        }, timeout);
    }
}

export default IntervalManager;