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
        if (!this.configManager.showPeopleTableFlag && this.configManager.food.quantity > 5) {
            this.pageManager.toggleElement(this.pageManager.peopleProductivityTable, []);
            this.configManager.showPeopleTableFlag = true;
        }
        if (!this.configManager.showWorkTableFlag && this.configManager.currentPopulation.quantity > 0) {
            this.pageManager.toggleElement(this.pageManager.workTable, [this.pageManager.clickResourceWoodRow, this.pageManager.clickResourceStoneRow]);
            this.configManager.showWorkTableFlag = true;
        }
        if (!this.configManager.showBuildingTableFlag && this.configManager.currentPopulation.quantity === this.configManager.populationStorage.quantity) {
            this.pageManager.toggleElement(this.pageManager.buildingTable, []);
            this.configManager.showBuildingTableFlag = true;
        }
        if (!this.configManager.showTechnologyTableFlag && this.configManager.wood.quantity > 14) {
            this.pageManager.toggleElement(this.pageManager.technologyTable, []);
            this.configManager.showTechnologyTableFlag = true;
        }
    }

    runInterval() {
        this.oneStep();
        this.checkWinCondition();
        this.funeralProcess();
        this.events();
    }

    oneStep() {
        setInterval(() => {
            // get resources
            this.configManager.food.changeQuantity(this.configManager.foodTotalProduction.quantity);
            this.configManager.wood.changeQuantity(this.configManager.woodTotalProduction.quantity);
            this.configManager.stone.changeQuantity(this.configManager.stoneTotalProduction.quantity);
            this.configManager.knowledge.changeQuantity(this.configManager.knowledgeTotalProduction.quantity);

            this.checkHiddenTables();

            //starvation process
            if (this.configManager.food.quantity < 0 && this.configManager.currentPopulation.quantity > 0) {
                this.eventManager.addEvent("starvation");
                if (!this.configManager.starvationAchievementFlag) {
                    this.eventManager.addAchievement("Starvation");
                    this.configManager.starvationAchievementFlag = true;
                }
                this.pageManager.showElement([this.pageManager.starvationWarning]);

                this.citizenManager.findPersonToKill();

                // Decrease quantity of happy
                if (this.configManager.currentHappyPeople.quantity > this.configManager.currentPopulation) {
                    this.configManager.currentHappyPeople(-1);
                }
                // and healthy people
                if (this.configManager.currentHealthyPeople.quantity > this.configManager.currentPopulation) {
                    this.configManager.currentHealthyPeople(-1);
                }
            } else {
                this.pageManager.hideElement([this.pageManager.starvationWarning]);
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
        }, this.oneStepTime);
    }

    checkWinCondition() {
        setInterval(() => {
            if (this.configManager.knowledge.quantity >= this.configManager.WINNER_REQUIREMENTS) {
                if (confirm(`Congratulations! ${this.configManager.userName} are amazing! You collected a lot of knowledge!! \nAlso you've killed: ${this.configManager.corpse.quantity
                + this.configManager.inGraveQuantity.quantity} people. Great job\n`)) {
                    this.gameManager.reloadSite();
                } else {
                    this.configManager.knowledge.changeQuantity(-this.configManager.WINNER_REQUIREMENTS);
                    this.pageManager.show(this.pageManager.startAgainButton);
                }
            }
        }, this.oneStepTime * 10);
    }

    funeralProcess() {
        setInterval(() => {
            let maxFuneral = Math.min.apply(null, [this.configManager.corpseStorage.quantity - this.configManager.inGraveQuantity.quantity,
                this.configManager.corpse.quantity, this.configManager.funeral.quantity / 2]);
            if (maxFuneral) {
                for (let i = 0; i < maxFuneral; i++) {
                    this.configManager.corpse.changeQuantity(-1);
                    this.configManager.inGraveQuantity.changeQuantity(1);
                }
                $(this.pageManager.funeralProcessImg).show("slow");
            } else {
                $(this.pageManager.funeralProcessImg).hide("slow");
            }
        }, this.oneStepTime * 5);
    }

    events() {
        setInterval(() => this.eventManager.eventHappen(), this.oneStepTime * 30);
    }
}

export default IntervalManager;