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
        let availabilityFlag = false;
        // add worker conditions
        if (num > 0) {
            if (this.configManager.lazyboneQuantity >= num) {
                availabilityFlag = true;
                switch (name) {
                    case "scientist":
                        if (!(this.configManager.curScientistQuantity < this.configManager.maxScientistQuantity)) {
                            availabilityFlag = false;
                            this.eventManager.addEvent("more campfires");
                        }
                        break;
                    case "warrior":
                        if (!(this.configManager.curWarriorQuantity < this.configManager.maxWarriorQuantity)) {
                            availabilityFlag = false;
                            this.eventManager.addEvent("more barrack");
                        }
                }
            }
            // remove worker conditions
        } else if (num < 0) {
            let workerQuantity;
            switch (name) {
                case "farmer":
                    workerQuantity = this.configManager.farmerQuantity;
                    break;
                case "woodman":
                    workerQuantity = this.configManager.woodmenQuantity;
                    break;
                case "miner":
                    workerQuantity = this.configManager.minerQuantity;
                    break;
                case "funeral":
                    workerQuantity = this.configManager.funeralQuantity;
                    break;
                case "scientist":
                    workerQuantity = this.configManager.curScientistQuantity;
                    break;
            }

            if (workerQuantity > 0 && workerQuantity >= num) {
                availabilityFlag = true;
            }
        }

        // main logic
        if (availabilityFlag) {
            this.configManager.changeCurResourceQuantity("curLazy", -num);
            this.configManager.changeCurResourceQuantity(name, num);

            switch (name) {
                case "farmer":
                    this.configManager.changeCurResourceQuantity("foodTotalProduction", this.configManager.farmerProduction * num * this.configManager.booster);
                    break;
                case "woodman":
                    this.configManager.changeCurResourceQuantity("woodTotalProduction", this.configManager.woodmanProduction * num * this.configManager.booster);
                    break;
                case "miner":
                    this.configManager.changeCurResourceQuantity("stoneTotalProduction", this.configManager.minerProduction * num * this.configManager.booster);
                    break;
                case "scientist":
                    this.configManager.changeCurResourceQuantity("knowledgeTotalProduction", this.configManager.scientistProduction * num * this.configManager.booster);
                    break;
                case "dj":
                    let peopleAmount = this.configManager.currentPopulation;
                    let totalAvailableSpaceInClub = this.configManager.curDjQuantity * this.configManager.spaceInOneClub;

                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.pageManager.changeCurResourceQuantity("curHappyPeople", peopleAmount);
                    } else {
                        this.pageManager.changeCurResourceQuantity("curHappyPeople", this.configManager.spaceInOneClub);
                    }

                    if (!this.configManager.djProductivityFlag) {
                        this.gameManager.increaseAllProduction();
                        this.configManager.djProductivityFlag = true;
                    }
                    break;
                case "instructor":
                    peopleAmount = this.configManager.currentPopulation;
                    totalAvailableSpaceInClub = this.configManager.curInstructorQuantity * this.configManager.spaceInOneClub;

                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.pageManager.changeCurResourceQuantity("curHealthyPeople", peopleAmount);
                    } else {
                        this.pageManager.changeCurResourceQuantity("curHealthyPeople", this.configManager.spaceInOneClub);
                    }

                    if (!this.configManager.instructorProductivityFlag) {
                        this.gameManager.increaseAllProduction();
                        this.configManager.instructorProductivityFlag = true;
                    }
                    break;
            }

            return true;
        } else {
            return false;
        }
    }
}

export default CitizenManager;