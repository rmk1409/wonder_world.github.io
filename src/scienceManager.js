class ScienceManager {
    initialization(gameManager) {
        this.gameManager = gameManager;

        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.pageManager = this.gameManager.pageManager;
    }

    changes() {
        let woodPrice = 10;
        let stonePrice = 10;
        if (this.configManager.woodQuantity >= woodPrice && this.configManager.stoneQuantity >= stonePrice) {
            this.configManager.changeCurResourceQuantity("wood", -woodPrice);
            this.configManager.changeCurResourceQuantity("stone", -stonePrice);

            this.eventManager.addAchievement("First Research");

            this.pageManager.toggleElement(this.pageManager.techChangesElement, [this.pageManager.maxFoodQuantity, this.pageManager.maxWoodQuantityElement,
                this.pageManager.maxStoneQuantityElement, this.pageManager.emptyRowBeforeKnowledge, this.pageManager.knowledgeRow, this.pageManager.emptyRowBeforeJobScientist, this.pageManager.jobScientistRow,
                this.pageManager.emptyRowBeforeBuildKnowlegde, this.pageManager.buildCampfireRow, this.pageManager.techAgricultureElement, this.pageManager.techFuneralElement, this.pageManager.techArchitectureElement,
                this.pageManager.alreadyKnownP, this.pageManager.changesP]);
        } else {
            this.eventManager.addEvent("more resources");
        }
    }

    research(knowledgePrice, firstElementToShow, otherElementsAr) {
        if (this.configManager.knowledgeQuantity >= knowledgePrice) {
            this.configManager.changeCurResourceQuantity("knowledge", -knowledgePrice);
            if (firstElementToShow && otherElementsAr) {
                this.pageManager.toggleElement(firstElementToShow, otherElementsAr);
            }
            return true;
        } else {
            this.eventManager.addEvent("more knowledge");
            return false;
        }
    }
}

export default ScienceManager;