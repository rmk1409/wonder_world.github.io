// TODO move all logic of this class to game class
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

    checkHiddenTables() {
        // Show tables
        if (!this.configManager.showPeopleTableFlag && +this.configManager.food > 5) {
            this.pageManager.showElement([this.pageManager.peopleProductivityTable]);
            this.configManager.showPeopleTableFlag = true;
            $('#citizen-modal').modal();
        }
        if (!this.configManager.showWorkTableFlag && +this.configManager.currentPopulation > 0) {
            this.pageManager.showElement([this.pageManager.workTable, this.pageManager.clickResourceWoodRow, this.pageManager.clickResourceStoneRow]);
            this.configManager.showWorkTableFlag = true;
        }
        if (!this.configManager.showBuildingTableFlag && +this.configManager.currentPopulation === +this.configManager.populationStorage) {
            this.pageManager.showElement([this.pageManager.buildingTable]);
            this.configManager.showBuildingTableFlag = true;
            $('#building-modal').modal();
        }
        if (!this.configManager.showTechnologyTableFlag && +this.configManager.wood > 14) {
            this.pageManager.showElement([this.pageManager.technologyTable, this.pageManager.techChangesElement]);
            this.configManager.showTechnologyTableFlag = true;
            $('#technology-modal').modal();
        }
    }

    runInterval() {
        this.oneStep(this.oneStepTime);
        this.events(this.oneStepTime * 30);
        this.funeralProcess(this.oneStepTime * 5);
        this.checkWinCondition(this.oneStepTime * 10);
    }

    oneStep(timeout) {
        setInterval(() => {
            // get resources
            this.configManager.food.changeValue(+this.configManager.foodTotalProduction);
            this.configManager.wood.changeValue(+this.configManager.woodTotalProduction);
            this.configManager.stone.changeValue(+this.configManager.stoneTotalProduction);
            this.configManager.knowledge.changeValue(+this.configManager.knowledgeTotalProduction);

            this.checkHiddenTables();

            //starvation process
            if (+this.configManager.food < 0 && +this.configManager.currentPopulation > 0) {
                this.eventManager.addEvent("starvation");
                if (!this.configManager.starvationAchievementFlag) {
                    this.eventManager.addAchievement("Starvation");
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
                this.eventManager.addAchievement("Productivity");
                this.configManager.productivityAchievementFlag = true;
            }

            // TODO add more bad events when it isn't focus
            // console.log(document.hasFocus());
        }, timeout);
    }

    checkWinCondition(timeout) {
        setInterval(() => {
            if (+this.configManager.knowledge >= this.configManager.WINNER_REQUIREMENTS) {
                if (confirm(`${this.configManager.userName} are amazing! Congratulations! You collected a lot of knowledge!! \nAlso you've killed: ${+this.configManager.corpse
                + +this.configManager.inGraveQuantity} people. Great job\n`)) {
                    this.gameManager.reloadSite();
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
}

export default IntervalManager;