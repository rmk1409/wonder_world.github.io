class CitizenManager {
    initialization(gameManager) {
        this.gameManager = gameManager;
        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.pageManager = this.gameManager.pageManager;
    }

    addCitizen(num) {
        this.configManager.changeCurResourceQuantity("curPop", num);
        this.configManager.changeCurResourceQuantity("curLazy", num);
        this.configManager.changeCurResourceQuantity("foodTotalProduction", -num);
    }

    createCitizen(num) {
        if (this.configManager.foodQuantity >= this.configManager.citizenCost * num && (this.configManager.currentPopulation + num) <= this.configManager.maxPopulation) {
            this.configManager.changeCurResourceQuantity("food", -this.configManager.citizenCost * num);

            this.addCitizen(num);

            // TODO to separate method
            if (this.configManager.currentPopulation <= this.configManager.curDjQuantity * this.configManager.spaceForPeopleInClub) {
                this.pageManager.curHappyPeopleElement.text(this.configManager.currentPopulation);
            }
            if (this.configManager.currentPopulation <= this.configManager.curInstructorQuantity * this.configManager.spaceForPeopleInClub) {
                this.pageManager.curHealthyPeopleElement.text(this.pageManager.curPopulationElement.text());
            }
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
                            this.eventManager.addEvent("more campfires");
                            return;
                        }
                        break;
                    case "warrior":
                        if (!(this.configManager.curWarriorQuantity < this.configManager.maxWarriorQuantity)) {
                            this.eventManager.addEvent("more barrack");
                            return;
                        }
                        break;
                    case "dj":
                        if (!(this.configManager.curDjQuantity < this.configManager.maxDjQuantity)) {
                            this.eventManager.addEvent("more music clubs");
                            return;
                        }
                        break;
                    case "instructor":
                        if (!(this.configManager.curInstructorQuantity < this.configManager.maxInstructorQuantity)) {
                            this.eventManager.addEvent("more yoga clubs");
                            return;
                        }
                        break;
                }
            } else if (name === 'funeral') {
                if (this.configManager.lazyboneQuantity < num) {
                    this.eventManager.addEvent("1 funeral process needs 2 workers");
                    return false;
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

            if (workerQuantity > 0 /*&& workerQuantity >= num*/) {
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
                    this.configManager.changeCurResourceQuantity("foodTotalProduction", this.configManager.farmerProduction * num);
                    break;
                case "woodman":
                    this.configManager.changeCurResourceQuantity("woodTotalProduction", this.configManager.woodmanProduction * num);
                    break;
                case "miner":
                    this.configManager.changeCurResourceQuantity("stoneTotalProduction", this.configManager.minerProduction * num);
                    break;
                case "scientist":
                    this.configManager.changeCurResourceQuantity("knowledgeTotalProduction", this.configManager.scientistProduction * num);
                    break;
                case "dj":
                    totalAvailableSpaceInClub = this.configManager.curDjQuantity * this.configManager.spaceForPeopleInClub;
                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.pageManager.curHappyPeopleElement.text(peopleAmount);
                    } else {
                        this.pageManager.curHappyPeopleElement.text(totalAvailableSpaceInClub);
                    }

                    if (!this.configManager.djProductivityFlag) {
                        this.gameManager.changeAllProduction(true);
                        this.configManager.djProductivityFlag = true;
                    }
                    break;
                case "instructor":
                    totalAvailableSpaceInClub = this.configManager.curInstructorQuantity * this.configManager.spaceForPeopleInClub;
                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.pageManager.curHealthyPeopleElement.text(peopleAmount);
                    } else {
                        this.pageManager.curHealthyPeopleElement.text(totalAvailableSpaceInClub);
                    }

                    if (!this.configManager.instructorProductivityFlag) {
                        this.gameManager.changeAllProduction(true);
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
            } else if (this.configManager.curDjQuantity) {
                this.configManager.changeCurResourceQuantity("dj", -1);
                this.configManager.changeCurResourceQuantity("curHappyPeople", -(this.configManager.currentPopulation <= this.configManager.spaceForPeopleInClub ? this.configManager.currentPopulation : (this.configManager.spaceForPeopleInClub - 1)));
                if (!this.configManager.curDjQuantity) {
                    this.gameManager.changeAllProduction(false);
                    this.configManager.djProductivityFlag = false;
                }
            } else if (this.configManager.curInstructorQuantity) {
                this.configManager.changeCurResourceQuantity("instructor", -1);
                this.configManager.changeCurResourceQuantity("curHealthyPeople", -(this.configManager.currentPopulation <= this.configManager.spaceForPeopleInClub ? this.configManager.currentPopulation : (this.configManager.spaceForPeopleInClub - 1)));
                if (!this.configManager.curInstructorQuantity) {
                    this.gameManager.changeAllProduction(false);
                    this.configManager.instructorPresentFlag = false;
                }
            } else if (this.configManager.leaderQuantity) {
                this.configManager.changeCurResourceQuantity("leader", -1);
                if (!this.configManager.leaderQuantity) {
                    this.pageManager.hideElement([this.pageManager.tenWorkTd]);
                    this.pageManager.workTableEmptyTd.attr("colspan", "4");
                    this.configManager.leaderPresentFlag = false;
                }
            } else if (this.configManager.curWarriorQuantity) {
                this.configManager.changeCurResourceQuantity("warrior", -1);
            } else if (this.configManager.farmerQuantity) {
                withDecrease = false;
                this.killFarmer();
            }

            if (withDecrease) {
                this.decreasePopulation();
            }

            // TODO move to event logic
        } else {
            this.eventManager.addEvent("death because of zombies");
            alert(`🧟🧟 ${this.configManager.userName} are amazing, you killed: ${this.configManager.corpseQuantity + this.configManager.inGravesQuantity} people. I believe in you. Please, try again.`);
            this.pageManager.showElement([this.pageManager.startAgainButton]);
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
        this.killWorker("woodman", "woodTotalProduction", this.configManager.woodTotalProduction);
    }

    killMiner() {
        this.killWorker("miner", "stoneTotalProduction", this.configManager.minerProduction);
    }

    killFarmer() {
        this.killWorker("farmer", "foodTotalProduction", this.configManager.farmerProduction);
    }

    killScientist() {
        this.killWorker("scientist", "knowledgeTotalProduction", this.configManager.scientistProduction);
    }

    killWorker(workerType, totalProduction, curUnitProduction) {
        this.decreasePopulation();
        this.configManager.changeCurResourceQuantity(workerType,-1);
        this.configManager.changeCurResourceQuantity(totalProduction, -curUnitProduction);
    }
}

export default CitizenManager;