/**
 * Manage people
 */
class CitizenManager {
    initialization(gameManager) {
        this.gameManager = gameManager;
        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.pageManager = this.gameManager.pageManager;
    }

    /**
     * Just add new citizen
     * @param quantity - how many
     */
    addCitizen(quantity) {
        this.configManager.changeCurResourceQuantity("curPop", quantity);
        this.configManager.changeCurResourceQuantity("curLazy", quantity);
        this.configManager.changeCurResourceQuantity("foodTotalProduction", -quantity);
    }

    tryToCreateCitizen(quantity) {
        if (this.configManager.resourceMap.get("food").quantity >= this.configManager.citizenCost * quantity && (this.configManager.resourceMap.get("curPop").quantity +
            quantity) <= this.configManager.resourceMap.get("maxPop").quantity) {
            this.configManager.changeCurResourceQuantity("food", -this.configManager.citizenCost * quantity);

            this.addCitizen(quantity);

            // TODO to separate method
            if (this.configManager.resourceMap.get("curPop").quantity <= this.configManager.resourceMap.get("dj").quantity * this.configManager.spaceForPeopleInClub) {
                this.pageManager.curHappyPeopleElement.text(this.configManager.resourceMap.get("curPop").quantity);
            }
            if (this.configManager.resourceMap.get("curPop").quantity <= this.configManager.resourceMap.get("instructor").quantity * this.configManager.spaceForPeopleInClub) {
                this.pageManager.curHealthyPeopleElement.text(this.pageManager.curPopulationElement.text());
            }
        } else {
            this.eventManager.addEvent("food or houses");
        }
    }

    setCitizenToWork(workType, quantity) {
        let availabilityFlag = false;
        // add worker conditions
        if (quantity > 0) {
            if (this.configManager.resourceMap.get("curLazy").quantity >= quantity) {
                availabilityFlag = true;
                switch (workType) {
                    case "scientist":
                        if (!(this.configManager.resourceMap.get("scientist").quantity < this.configManager.resourceMap.get("maxScientistQuantity").quantity)) {
                            this.eventManager.addEvent("more campfires");
                            return;
                        }
                        break;
                    case "dj":
                        if (!(this.configManager.resourceMap.get("dj").quantity < this.configManager.resourceMap.get("maxDjQuantity").quantity)) {
                            this.eventManager.addEvent("more music clubs");
                            return;
                        }
                        break;
                    case "instructor":
                        if (!(this.configManager.resourceMap.get("instructor").quantity < this.configManager.resourceMap.get("maxInstructorQuantity").quantity)) {
                            this.eventManager.addEvent("more yoga clubs");
                            return;
                        }
                        break;
                    case "warrior":
                        if (!(this.configManager.resourceMap.get("warrior").quantity < this.configManager.resourceMap.get("maxWarrior").quantity)) {
                            this.eventManager.addEvent("more barrack");
                            return;
                        }
                        break;
                }
            } else if (workType === 'funeral') {
                if (this.configManager.resourceMap.get("curLazy").quantity < quantity) {
                    this.eventManager.addEvent("1 funeral process needs 2 workers");
                    return false;
                }
            }
            // remove worker conditions
        } else if (quantity < 0) {
            let workerQuantity;
            switch (workType) {
                case "farmer":
                    workerQuantity = this.configManager.resourceMap.get("farmer").quantity;
                    break;
                case "woodman":
                    workerQuantity = this.configManager.resourceMap.get("woodman").quantity;
                    break;
                case "miner":
                    workerQuantity = this.configManager.resourceMap.get("miner").quantity;
                    break;
                case "funeral":
                    workerQuantity = this.configManager.resourceMap.get("funeral").quantity;
                    break;
                case "scientist":
                    workerQuantity = this.configManager.resourceMap.get("scientist").quantity;
                    break;
            }

            if (workerQuantity > 0 /*&& workerQuantity >= quantity*/) {
                availabilityFlag = true;
            }
        }

        // main logic
        if (availabilityFlag) {
            this.configManager.changeCurResourceQuantity("curLazy", -quantity);
            this.configManager.changeCurResourceQuantity(workType, quantity);

            let peopleAmount = this.configManager.resourceMap.get("curPop").quantity;
            let totalAvailableSpaceInClub;
            switch (workType) {
                case "farmer":
                    this.configManager.changeCurResourceQuantity("foodTotalProduction", this.configManager.farmerProduction * quantity);
                    break;
                case "woodman":
                    this.configManager.changeCurResourceQuantity("woodTotalProduction", this.configManager.woodmanProduction * quantity);
                    break;
                case "miner":
                    this.configManager.changeCurResourceQuantity("stoneTotalProduction", this.configManager.minerProduction * quantity);
                    break;
                case "scientist":
                    this.configManager.changeCurResourceQuantity("knowledgeTotalProduction", this.configManager.scientistProduction * quantity);
                    break;
                case "dj":
                    totalAvailableSpaceInClub = this.configManager.resourceMap.get("dj").quantity * this.configManager.spaceForPeopleInClub;
                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.pageManager.curHappyPeopleElement.text(peopleAmount);
                    } else {
                        this.pageManager.curHappyPeopleElement.text(totalAvailableSpaceInClub);
                    }

                    if (!this.configManager.djProductivityFlag) {
                        this.configManager.changeAllProduction(true);
                        this.configManager.djProductivityFlag = true;
                    }
                    break;
                case "instructor":
                    totalAvailableSpaceInClub = this.configManager.resourceMap.get("instructor").quantity * this.configManager.spaceForPeopleInClub;
                    if (peopleAmount <= totalAvailableSpaceInClub) {
                        this.pageManager.curHealthyPeopleElement.text(peopleAmount);
                    } else {
                        this.pageManager.curHealthyPeopleElement.text(totalAvailableSpaceInClub);
                    }

                    if (!this.configManager.instructorProductivityFlag) {
                        this.configManager.changeAllProduction(true);
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
        if (this.configManager.resourceMap.get("curPop").quantity > 0) {
            let withDecrease = true;
            if (this.configManager.resourceMap.get("curLazy").quantity) {
                this.configManager.changeCurResourceQuantity("curLazy", -1);
            } else if (this.configManager.resourceMap.get("woodman").quantity) {
                withDecrease = false;
                this.killWoodcutter();
            } else if (this.configManager.resourceMap.get("miner").quantity) {
                withDecrease = false;
                this.killMiner();
            } else if (this.configManager.resourceMap.get("funeral").quantity) {
                this.configManager.changeCurResourceQuantity("funeral", -2);
                this.configManager.changeCurResourceQuantity("curLazy", 1);
            } else if (this.configManager.resourceMap.get("scientist").quantity) {
                withDecrease = false;
                this.killScientist();
            } else if (this.configManager.resourceMap.get("dj").quantity) {
                this.configManager.changeCurResourceQuantity("dj", -1);
                this.configManager.changeCurResourceQuantity("curHappyPeople", -(this.configManager.resourceMap.get("curPop").quantity <= this.configManager.spaceForPeopleInClub ?
                    this.configManager.resourceMap.get("curPop").quantity : (this.configManager.spaceForPeopleInClub - 1)));
                if (!this.configManager.resourceMap.get("dj").quantity) {
                    this.configManager.changeAllProduction(false);
                    this.configManager.djProductivityFlag = false;
                }
            } else if (this.configManager.resourceMap.get("instructor").quantity) {
                this.configManager.changeCurResourceQuantity("instructor", -1);
                this.configManager.changeCurResourceQuantity("curHealthyPeople", -(this.configManager.resourceMap.get("curPop").quantity <= this.configManager.spaceForPeopleInClub ?
                    this.configManager.resourceMap.get("curPop").quantity : (this.configManager.spaceForPeopleInClub - 1)));
                if (!this.configManager.resourceMap.get("instructor").quantity) {
                    this.configManager.changeAllProduction(false);
                    this.configManager.instructorPresentFlag = false;
                }
            } else if (this.configManager.resourceMap.get("leader").quantity) {
                this.configManager.changeCurResourceQuantity("leader", -1);
                if (!this.configManager.resourceMap.get("leader").quantity) {
                    this.pageManager.hideElement([this.pageManager.tenWorkTd]);
                    this.pageManager.workTableEmptyTd.attr("colspan", "4");
                    this.configManager.leaderPresentFlag = false;
                }
            } else if (this.configManager.resourceMap.get("warrior").quantity) {
                this.configManager.changeCurResourceQuantity("warrior", -1);
            } else if (this.configManager.resourceMap.get("farmer").quantity) {
                withDecrease = false;
                this.killFarmer();
            }

            if (withDecrease) {
                this.decreasePopulation();
            }

            // TODO move to event logic
        } else {
            this.eventManager.addEvent("death because of zombies");
            alert(`🧟🧟 ${this.configManager.userName} are amazing, you killed: ${this.configManager.resourceMap.get("corpse").quantity + this.configManager.resourceMap.get("inGraveQuantity").quantity} 
            people. I believe in you. Please, try again.`);
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
        this.killWorker("woodman", "woodTotalProduction", this.configManager.woodmanProduction);
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
        this.configManager.changeCurResourceQuantity(workerType, -1);
        this.configManager.changeCurResourceQuantity(totalProduction, -curUnitProduction);
    }
}

export default CitizenManager;