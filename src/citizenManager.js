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

    tryToCreateCitizen(quantity) {
        if (this.checkCitizenCost(quantity) && this.checkFreeHouses(quantity)) {
            this.configManager.food.changeQuantity(-this.configManager.citizenCost * quantity);
            this.addCitizen(quantity);

            this.setHappyPeople();
            this.setHealthyPeople();
        }
    }

    checkCitizenCost(quantity) {
        let result = true;
        if (this.configManager.food.quantity <= this.configManager.citizenCost * quantity) {
            result = false;
            this.eventManager.addEvent("not enough food");
        }
        return result;
    }

    checkFreeHouses(quantity) {
        let result = true;
        if ((this.configManager.currentPopulation.quantity + quantity) > this.configManager.populationStorage.quantity) {
            result = false;
            this.eventManager.addEvent("not enough houses");
        }
        return result;
    }

    /**
     * Just add new citizen
     * @param quantity - how many
     */
    addCitizen(quantity) {
        this.configManager.currentPopulation.storage.changeQuantity(quantity);
        this.configManager.currentPopulation.changeQuantity(quantity);
        this.configManager.currentPopulation.storage.changeQuantity(-quantity);

        this.configManager.lazybones.changeQuantity(quantity);
        this.configManager.foodTotalProduction.changeQuantity(-quantity);
    }

    setHappyPeople() {
        if (this.configManager.currentPopulation.quantity <= this.configManager.dj.quantity * this.configManager.spaceForPeopleInClub) {
            this.pageManager.curHappyPeopleElement.text(this.configManager.currentPopulation.quantity);
        }
    }

    setHealthyPeople() {
        if (this.configManager.currentPopulation.quantity <= this.configManager.instructor.quantity * this.configManager.spaceForPeopleInClub) {
            this.pageManager.curHealthyPeopleElement.text(this.pageManager.curPopulationElement.text());
        }
    }

    setCitizenToWork(workType, quantity) {
        let result = false;
        if (this.checkOpportunityToSetCitizen(workType, quantity)) {
            this.setWorker(workType, quantity);
            result = true;
        }
        return result;
    }

    checkOpportunityToSetCitizen(workType, quantity) {
        let result = false;

        if (quantity > 0) {
            if (this.checkLazybonesPresence()) {
                if (this.configManager.lazybones.quantity >= quantity) {
                    // check enough buildings
                    if (workType === this.configManager.scientist && this.configManager.scientist.quantity === this.configManager.scientist.storage.quantity) {
                        this.eventManager.addEvent("more campfires");
                        return result;
                    } else if (workType === this.configManager.dj && this.configManager.dj.quantity === this.configManager.dj.storage.quantity) {
                        this.eventManager.addEvent("more music clubs");
                        return result;
                    } else if (workType === this.configManager.instructor && this.configManager.instructor.quantity === this.configManager.instructor.storage.quantity) {
                        this.eventManager.addEvent("more yoga clubs");
                        return result;
                    } else if (workType === this.configManager.warrior && this.configManager.warrior.quantity === this.configManager.warriorStorage.quantity) {
                        this.eventManager.addEvent("more barrack");
                        return result;
                    }
                    // for funeral
                } else {
                    this.eventManager.addEvent("1 funeral process needs 2 workers");
                    return result;
                }

                result = true;
            }
            // set worker
        } else if (workType.quantity) {
            result = true;
        }

        return result;
    }

    checkLazybonesPresence() {
        let result = true;
        if (!this.configManager.lazybones.quantity) {
            this.eventManager.addEvent("lack of lazybones");
            result = false;
        }

        return result;
    }

    setWorker(workType, quantity) {
        this.configManager.lazybones.changeQuantity(-quantity);
        workType.changeQuantity(quantity);

        if (workType === this.configManager.farmer) {
            this.configManager.foodTotalProduction.changeQuantity(this.configManager.farmerProduction * quantity);
        } else if (workType === this.configManager.woodman) {
            this.configManager.woodTotalProduction.changeQuantity(this.configManager.woodmanProduction * quantity);
        } else if (workType === this.configManager.miner) {
            this.configManager.stoneTotalProduction.changeQuantity(this.configManager.minerProduction * quantity);
        } else if (workType === this.configManager.scientist) {
            this.configManager.knowledgeTotalProduction.changeQuantity(this.configManager.scientistProduction * quantity);
        } else if (workType === this.configManager.dj) {
            let peopleAmount = this.configManager.currentPopulation.quantity;
            let totalAvailableSpaceInClub = this.configManager.dj.quantity * this.configManager.spaceForPeopleInClub;
            if (peopleAmount <= totalAvailableSpaceInClub) {
                this.pageManager.curHappyPeopleElement.text(peopleAmount);
            } else {
                this.pageManager.curHappyPeopleElement.text(totalAvailableSpaceInClub);
            }

            if (!this.configManager.djProductivityFlag) {
                this.configManager.changeAllProduction(true);
                this.configManager.djProductivityFlag = true;
            }
        } else if (workType === this.configManager.instructor) {
            let peopleAmount = this.configManager.currentPopulation.quantity;
            let totalAvailableSpaceInClub = this.configManager.instructor.quantity * this.configManager.spaceForPeopleInClub;
            if (peopleAmount <= totalAvailableSpaceInClub) {
                this.pageManager.curHealthyPeopleElement.text(peopleAmount);
            } else {
                this.pageManager.curHealthyPeopleElement.text(totalAvailableSpaceInClub);
            }

            if (!this.configManager.instructorProductivityFlag) {
                this.configManager.changeAllProduction(true);
                this.configManager.instructorProductivityFlag = true;
            }
        }
    }

    // TODO Try to refactor this part in the next time
    findPersonToKill() {
        if (this.configManager.currentPopulation.quantity > 0) {
            let withDecrease = true;
            if (this.configManager.lazybones.quantity) {
                this.configManager.lazybones.changeQuantity(-1);
            } else if (this.configManager.woodman.quantity) {
                withDecrease = false;
                this.killWoodcutter();
            } else if (this.configManager.miner.quantity) {
                withDecrease = false;
                this.killMiner();
            } else if (this.configManager.funeral.quantity) {
                this.configManager.funeral.changeQuantity(-2);
                this.configManager.lazybones.changeQuantity(1);
            } else if (this.configManager.scientist.quantity) {
                withDecrease = false;
                this.killScientist();
            } else if (this.configManager.dj.quantity) {
                this.configManager.dj.changeQuantity(-1);
                this.configManager.currentHappyPeople.changeQuantity(-(this.configManager.currentPopulation.quantity <= this.configManager.spaceForPeopleInClub ? this.configManager.currentPopulation.quantity
                    : (this.configManager.spaceForPeopleInClub - 1)));
                if (!this.configManager.dj.quantity) {
                    this.configManager.changeAllProduction(false);
                    this.configManager.djProductivityFlag = false;
                }
            } else if (this.configManager.instructor.quantity) {
                this.configManager.instructor.changeQuantity(-1);
                this.configManager.currentHealthyPeople.changeQuantity(-(this.configManager.currentPopulation.quantity <= this.configManager.spaceForPeopleInClub ? this.configManager.currentPopulation.quantity
                    : (this.configManager.spaceForPeopleInClub - 1)));
                if (!this.configManager.instructor.quantity) {
                    this.configManager.changeAllProduction(false);
                    this.configManager.instructorPresentFlag = false;
                }
            } else if (this.configManager.leader.quantity) {
                this.configManager.leader.changeQuantity(-1);
                if (!this.configManager.leader.quantity) {
                    this.pageManager.hideElement([this.pageManager.tenWorkTd]);
                    this.pageManager.workTableEmptyTd.attr("colspan", "4");
                    this.configManager.leaderPresentFlag = false;
                }
            } else if (this.configManager.warrior.quantity) {
                this.configManager.warrior.changeQuantity(-1);
            } else if (this.configManager.farmer.quantity) {
                withDecrease = false;
                this.killFarmer();
            }

            if (withDecrease) {
                this.decreasePopulation();
            }

            // TODO move to event logic
        } else {
            this.eventManager.addEvent("death because of zombies");
            alert(`🧟🧟 ${this.configManager.userName} are amazing, you killed: ${this.configManager.corpse.quantity
            + this.configManager.inGraveQuantity.quantity} people. I believe in you. Please, try again.`);
            this.pageManager.showElement([this.pageManager.startAgainButton]);
        }
    }

    killWoodcutter() {
        this.killWorker(this.configManager.woodman, this.configManager.woodTotalProduction, this.configManager.woodmanProduction);
    }

    killMiner() {
        this.killWorker(this.configManager.miner, this.configManager.stoneTotalProduction, this.configManager.minerProduction);
    }

    killFarmer() {
        this.killWorker(this.configManager.farmer, this.configManager.foodTotalProduction, this.configManager.farmerProduction);
    }

    killScientist() {
        this.killWorker(this.configManager.scientist, this.configManager.knowledgeTotalProduction, this.configManager.scientistProduction);
    }

    killWorker(workerType, totalProduction, curUnitProduction) {
        this.decreasePopulation();
        workerType.changeQuantity(-1);
        totalProduction.changeQuantity(-curUnitProduction);
    }

    decreasePopulation() {
        this.configManager.currentPopulation.changeQuantity(-1);
        this.configManager.foodTotalProduction.changeQuantity(1);

        if (!this.configManager.corpsePresenceFlag) {
            this.pageManager.showElement([this.pageManager.corpseRow]);
            this.configManager.corpsePresenceFlag = true;
        }
        this.configManager.corpse.changeQuantity(1);
    }
}

export default CitizenManager;