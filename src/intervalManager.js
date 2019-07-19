class IntervalManager {
    constructor() {
        this.gameManager = null;
        this.pageManager = null;
        this.configManager = null;
        this.eventManager = null;
        this.citizenManager = null;

        this.oneStepTime = 1e3;
    }

    // TODO move all logic of this class to game class
    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;
        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.citizenManager = this.gameManager.citizenManager;
    }

    runInterval() {
        //ONE STEP
        let self = this;
        setInterval(function oneStep() {
            // get resources
            self.configManager.changeCurResourceQuantity("food", self.configManager.resourceMap.get("foodTotalProduction").quantity);
            self.configManager.changeCurResourceQuantity("wood", self.configManager.resourceMap.get("woodTotalProduction").quantity);
            self.configManager.changeCurResourceQuantity("stone", self.configManager.resourceMap.get("stoneTotalProduction").quantity);
            self.configManager.changeCurResourceQuantity("knowledge", self.configManager.resourceMap.get("knowledgeTotalProduction").quantity);

            //starvation process
            if (self.configManager.resourceMap.get("food").quantity < 0 && self.configManager.resourceMap.get("curPop") > 0) {
                self.eventManager.addEvent("starvation");
                if (!self.configManager.starvationAchievementFlag) {
                    self.eventManager.addAchievement("Starvation");
                    self.configManager.starvationAchievementFlag = true;
                }
                self.pageManager.showElement([self.pageManager.starvationWarning]);

                self.citizenManager.findPersonToKill();

                // Decrease quantity of happy
                if (self.configManager.resourceMap.get("curHappyPeople").quantity > self.configManager.resourceMap.get("curPop")) {
                    self.configManager.changeCurResourceQuantity("curHappyPeople", -1);
                }
                // and healthy people
                if (self.configManager.resourceMap.get("curHealthyPeople").quantity > self.configManager.resourceMap.get("curPop")) {
                    self.configManager.changeCurResourceQuantity("curHealthyPeople", -1);
                }
            } else {
                self.pageManager.hideElement([self.pageManager.starvationWarning]);
            }

            self.pageManager.checkProduction();

            // TODO abundance of food
            if (!self.configManager.productivityAchievementFlag && self.configManager.resourceMap.get("productivity") >= 190) {
                self.eventManager.addAchievement("Productivity");
                self.configManager.productivityAchievementFlag = true;
            }

            // TODO add more bad events when it isn't focus
            // console.log(document.hasFocus());
        }, this.oneStepTime);
        // CHECK WIN CONDITION
        setInterval(function checkWinCondition() {
            if (self.configManager.resourceMap.get("knowledge").quantity >= self.configManager.WINNER_REQUIREMENTS) {
                if (confirm(`Congratulations! ${self.configManager.userName} are amazing! You collected a lot of knowledge!! \nAlso you've killed: ${self.configManager.resourceMap.get("corpse").quantity 
                + self.configManager.resourceMap.get("inGraveQuantity").quantity} people. Great job\n`)) {
                    self.gameManager.reloadSite();
                } else {
                    self.configManager.changeCurResourceQuantity("knowledge", -self.configManager.WINNER_REQUIREMENTS);
                    self.pageManager.show(self.pageManager.startAgainButton);
                }
            }
        }, this.oneStepTime * 10);
        // RUN FUNERAL PROCESS
        setInterval(function funeralProcess() {
            let maxFuneral = Math.min.apply(null, [self.configManager.resourceMap.get("maxInGraves").quantity - self.configManager.resourceMap.get("inGraveQuantity").quantity,
                self.configManager.resourceMap.get("corpse").quantity, self.configManager.resourceMap.get("funeral").quantity / 2]);
            if (maxFuneral) {
                for (let i = 0; i < maxFuneral; i++) {
                    self.configManager.changeCurResourceQuantity("corpse", -1);
                    self.configManager.changeCurResourceQuantity("inGraveQuantity", 1);
                }
                $(self.pageManager.funeralProcessImg).show("slow");
            } else {
                $(self.pageManager.funeralProcessImg).hide("slow");
            }
        }, this.oneStepTime * 5);

        // Events
        setInterval(() => self.eventManager.eventHappen(), this.oneStepTime * 30);
    }
}

export default IntervalManager;