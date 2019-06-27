class CitizenManager {
    initialization(gameManager) {
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

            // TODO Finished
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
                        break;
                    case "dj":
                        if (!(this.configManager.curDjQuantity < this.configManager.maxDjQuantity)) {
                            availabilityFlag = false;
                            this.eventManager.addEvent("more music clubs");
                        }
                        break;
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
            let peopleAmount = this.configManager.currentPopulation;
            let totalAvailableSpaceInClub;
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
                    totalAvailableSpaceInClub = this.configManager.curDjQuantity * this.configManager.spaceForPeopleInClub;
                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.configManager.changeCurResourceQuantity("curHappyPeople", peopleAmount);
                    } else {
                        this.configManager.changeCurResourceQuantity("curHappyPeople", this.configManager.spaceForPeopleInClub);
                    }

                    if (!this.configManager.djProductivityFlag) {
                        this.gameManager.increaseAllProduction();
                        this.configManager.djProductivityFlag = true;
                    }
                    break;
                case "instructor":
                    totalAvailableSpaceInClub = this.configManager.curInstructorQuantity * this.configManager.spaceForPeopleInClub;

                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.configManager.changeCurResourceQuantity("curHealthyPeople", peopleAmount);
                    } else {
                        this.configManager.changeCurResourceQuantity("curHealthyPeople", this.configManager.spaceForPeopleInClub);
                    }

                    if (!this.configManager.instructorProductivityFlag) {
                        this.gameManager.increaseAllProduction();
                        this.configManager.instructorProductivityFlag = true;
                    }
                    break;
            }

            return true;
        } else {
            this.eventManager.addEvent("lack of lazybones");
            return false;
        }
    }

    findPersonToKill() {
        if (this.configManager.currentPopulation > 0) {
            let withDecrease = true;
            if (this.configManager.lazyboneQuantity) {
                this.configManager.changeCurResourceQuantity("curLazy", -1);
            } else if (this.configManager.woodmenQuantity) {
                withDecrease = false;
                this.killWoodcutter();
            } else if (this.configManager.minerQuantity) {
                withDecrease = false;
                this.killMiner();
            } else if (this.configManager.funeralQuantity) {
                this.configManager.changeCurResourceQuantity("funeral", -2);
                this.configManager.changeCurResourceQuantity("curLazy", 1);
            } else if (this.configManager.curScientistQuantity) {
                withDecrease = false;
                this.killScientist();
            } else if (this.configManager.leaderQuantity) {
                this.configManager.changeCurResourceQuantity("leader", -1);
                if (!this.configManager.leaderQuantity) {
                    $(this.pageManager.tenWorkTd).hide("slow");
                    $("#work-table .empty-row td").attr("colspan", "4");
                    this.configManager.leaderPresentFlag = false;
                }
            } else if (+$("#warrior-quantity").text()) {
                this.configManager.changeCurResourceQuantity("warrior", -1);
            } else if (+$("#dj-quantity").text()) {
                this.configManager.changeCurResourceQuantity("dj", -1);
                currentDjSpaces++;
                this.configManager.changeCurResourceQuantity("#currentHappyPeople", (this.configManager.currentPopulation <= this.configManager.spaceForPeopleInClub ? this.configManager.currentPopulation : -(this.configManager.spaceForPeopleInClub - 1)));
                if (!+$("#dj-quantity").text()) {
                    this.decreaseAllProduction();
                    this.configManager.djProductivityFlag = false;
                }
            } else if (+$("#instructor-quantity").text()) {
                this.configManager.changeCurResourceQuantity("instructor", -1);
                this.configManager.changeCurResourceQuantity("currentHealthPeople", (this.configManager.currentPopulation <= this.configManager.spaceForPeopleInClub ? this.configManager.currentPopulation : -(this.configManager.spaceForPeopleInClub - 1)));
                currentInstructorSpaces++;
                if (!+$("#instructor-quantity").text()) {
                    this.decreaseAllProduction();
                    this.configManager.instructorPresentFlag = false;
                }
            } else if (+$("#farmer-quantity").text()) {
                withDecrease = false;
                this.killFarmer();
            }

            if (withDecrease) {
                this.decreasePopulation();
            }
        } else {
            alert(this.configManager.userName + " you killed: " + this.configManager.corpseQuantity + " people. I believe in you. Please, try again. 🧟🧟");
            this.pageManager.startAgainButton.slideToggle("slow");
            throw new Error("Something went badly wrong!");
        }
    }

    decreasePopulation() {
        this.configManager.changeCurResourceQuantity("curPop", -1);
        this.configManager.changeCurResourceQuantity("foodTotalProduction", 1);

        if (!this.configManager.corpsePresentFlag) {
            this.pageManager.showElement([this.pageManager.corpseRow]);
            this.configManager.corpsePresentFlag = true;
        }
        this.configManager.changeCurResourceQuantity("corpse", 1);
    }

    killWoodcutter() {
        this.decreasePopulation();
        this.configManager.changeCurResourceQuantity("woodman", -1);
        this.configManager.changeCurResourceQuantity("woodTotalProduction", -this.configManager.woodmanProduction * this.configManager.booster);
    }

    killMiner() {
        this.decreasePopulation();
        this.configManager.changeCurResourceQuantity("miner", -1);
        this.configManager.changeCurResourceQuantity("stoneTotalProduction", -this.configManager.minerProduction * this.configManager.booster);
    }

    killFarmer() {
        this.decreasePopulation()
        this.configManager.changeCurResourceQuantity("farmer", -1);
        this.configManager.changeCurResourceQuantity("foodTotalProduction", this.configManager.farmerProduction * this.configManager.booster - 1);
    }

    killScientist() {
        this.decreasePopulation();
        this.configManager.changeCurResourceQuantity("scientist", -1);
        this.configManager.changeCurResourceQuantity("knowledgeTotalProduction", -this.configManager.scientistProduction * this.configManager.booster);
    }

    decreaseFoodProduction() {
        this.configManager.foodTotalProduction = Math.round(this.configManager.foodTotalProduction * 1000 - this.configManager.foodIncreaseStep * 1000) / 1000;

        this.configManager.changeCurResourceQuantity("foodTotalProduction", -this.configManager.farmerQuantity * this.configManager.foodIncreaseStep);
    }

    decreaseWoodProduction() {
        this.configManager.woodTotalProduction = Math.round(woodProduction * 1000 - 0.125 * 1000) / 1000;
        $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * woodProduction).toFixed(1));
    }

    decreaseStoneProduction() {
        this.configManager.stoneTotalProduction = Math.round(stoneProduction * 1000 - 0.05 * 1000) / 1000;
        $("#stone-production-quantity").text((+$("#miner-quantity").text() * stoneProduction).toFixed(1));
    }

    decreaseKnowledgeProduction() {
        this.configManager.knowledgeTotalProduction = Math.round(knowledgeProduction * 1000 - 0.025 * 1000) / 1000;
        $("#knowledge-production-quantity").text((+$("#scientist-quantity").text() * knowledgeProduction).toFixed(1));
    }

    decreaseAllProduction() {
        this.configManager.productivity = Math.round(this.configManager.productivity * 100 - 0.25 * 100) / 100;
        this.configManager.changeCurResourceQuantity("#productivity-quantity", -25);

        this.decreaseFoodProduction();
        this.decreaseWoodProduction();
        this.decreaseStoneProduction();
        this.decreaseKnowledgeProduction();
    }
}

export default CitizenManager;