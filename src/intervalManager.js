class IntervalManager {
    constructor() {
        this.gameManager = null;
        this.pageManager = null;
        this.configManager = null;
        this.eventManager = null;
        this.citizenManager = null;
    }


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
            self.configManager.changeCurResourceQuantity("food", self.configManager.foodTotalProduction);
            self.configManager.changeCurResourceQuantity("wood", self.configManager.woodTotalProduction);
            self.configManager.changeCurResourceQuantity("stone", self.configManager.stoneTotalProduction);
            self.configManager.changeCurResourceQuantity("knowledge", self.configManager.knowledgeTotalProduction);

            //starvation process
            if (self.configManager.foodQuantity < 0 && self.configManager.currentPopulation > 0) {
                self.eventManager.addEvent("starvation");
                self.pageManager.showElement(self.pageManager.starvationWarning);

                self.citizenManager.findPersonToKill();

                // Decrease quantity of happy
                if (self.configManager.currentHappyPeople > self.configManager.currentPopulation) {
                    self.configManager.changeCurResourceQuantity("curHappyPeople", -1);
                }
                // and health people
                if (self.configManager.currentHealthPeople > self.configManager.currentPopulation) {
                    self.configManager.changeCurResourceQuantity("curHealthyPeople", -1);
                }
            } else {
                self.pageManager.hideElement([self.pageManager.starvationWarning]);
            }

            self.pageManager.checkProduction();

            // TODO abundance of food

            if (!self.configManager.productivityAchievementFlag && this.configManager.productivity >= 190) {
                self.eventManager.addAchievement("Productivity");
                self.configManager.productivityAchievementFlag = true;
            }

            // TODO add more bad events when it isn't focus
            // console.log(document.hasFocus());
        }, 1000);
        // CHECK WIN CONDITION
        setInterval(function checkWinCondition() {
            if (self.configManager.knowledgeQuantity >= self.configManager.WINNER_REQUIREMENTS) {
                if (confirm("Congratulations! You collected a lot of knowledge!! \nAlso you've killed: " + (self.configManager.corpseQuantity + self.configManager.inGravesQuantity) + " people. Great job\n" +
                    self.configManager.userName + ", do you wanna try again?")) {
                    document.location.reload(true);
                } else {
                    self.configManager.changeCurResourceQuantity("knowledge", -self.configManager.WINNER_REQUIREMENTS);
                    self.pageManager.show(self.pageManager.startAgainButton);
                }
            }
        }, 10e3);
        // RUN FUNERAL PROCESS
        setInterval(function funeralProcess() {
            let maxFuneral = Math.min.apply(null, [self.configManager.inGravesMaxQuantity - self.configManager.inGravesQuantity, self.configManager.corpseQuantity, self.configManager.funeralQuantity]);
            // if (funeralProcesses && corpses && (self.configManager.inGravesQuantity < self.configManager.inGravesMaxQuantity)) {
            if (maxFuneral) {
                for (let i = 0; i < maxFuneral; i++) {
                    self.configManager.changeCurResourceQuantity("corpse", -1);
                    self.configManager.changeCurResourceQuantity("inGraveQuantity", 1);
                }
                $(self.pageManager.funeralProcessImg).show("slow");
            } else {
                $(self.pageManager.funeralProcessImg).hide("slow");
            }
        }, 5e3);
        // Events
        setInterval(this.eventManager.eventHappen, 2e4);
        // SCROLL to the 1st EVENT
        setInterval(self.pageManager.eventDiv.animate({scrollTop: 0}, "fast"), 2e4);

    }
}

export default IntervalManager;