import PageManager from "./pageManager";

class CitizenManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;

        this.pageManager = this.gameManager.pageManager;
    }

    birthCitizen(num) {
        this.configManager.changeCurResourceQuantity("curPop", num);
        this.configManager.changeCurResourceQuantity("curLazy", num);
        this.configManager.changeCurResourceQuantity("foodTotalProduction", -num);
    }

    createCitizen(num) {
        if (this.configManager.foodQuantity >= this.configManager.citizenCost * num && (this.configManager.currentPopulation + num) <= this.configManager.maxPopulation) {
            this.configManager.changeCurResourceQuantity("food", -this.configManager.citizenCost * num);

            this.birthCitizen(num);

            // if (+this.pageManager.curPopulationElement.text() <= +this.pageManager.djQuantityElement.text() * this.configManager.spaceInOneClub) {
            //     this.pageManager.curHappyPeople.text(this.pageManager.curPopulationElement.text());
            // }
            // if (+this.pageManager.curPopulationElement.text() <= +this.pageManager.instructorQuantityElement.text() * this.configManager.spaceInOneClub) {
            //     this.pageManager.curHealthPeople.text(this.pageManager.curPopulationElement.text());
            // }
        } else {
            this.eventManager.addEvent("food or houses");
        }
    }

    setWorker(name, num) {
        let checkSomeone;

        if (num > 0) {
            checkSomeone = this.gameManager.configManager.lazyboneQuantity;
        } else {
            checkSomeone = this.gameManager.configManager.farmerQuantity;
        }
    }
}

export default CitizenManager;