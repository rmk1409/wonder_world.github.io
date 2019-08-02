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
            this.configManager.food.changeValue(-this.configManager.citizenCost * quantity);
            this.addCitizen(quantity);

            this.setHappyPeople();
            this.setHealthyPeople();
        }
    }

    checkCitizenCost(quantity) {
        let result = true;
        if (+this.configManager.food < this.configManager.citizenCost * quantity) {
            result = false;
            this.eventManager.addEvent("not enough food");
        }
        return result;
    }

    checkFreeHouses(quantity) {
        let result = true;
        if ((+this.configManager.currentPopulation + quantity) > +this.configManager.populationStorage) {
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
        this.configManager.currentPopulation.storage.changeValue(quantity);
        this.configManager.currentPopulation.changeValue(quantity);
        this.configManager.currentPopulation.storage.changeValue(-quantity);

        this.configManager.lazybones.changeValue(quantity);
        this.configManager.foodTotalProduction.changeValue(-quantity);
    }

    setHappyPeople() {
        if (+this.configManager.currentPopulation <= +this.configManager.dj * this.configManager.spaceForPeopleInClub) {
            this.pageManager.curHappyPeopleElement.text(+this.configManager.currentPopulation );
        }
    }

    setHealthyPeople() {
        if (+this.configManager.currentPopulation <= +this.configManager.instructor * this.configManager.spaceForPeopleInClub) {
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
                if (+this.configManager.lazybones >= quantity) {
                    // check enough buildings
                    if (workType === this.configManager.scientist && +this.configManager.scientist === +this.configManager.scientist.storage) {
                        this.eventManager.addEvent("more campfires");
                        return result;
                    } else if (workType === this.configManager.dj && +this.configManager.dj === +this.configManager.dj.storage) {
                        this.eventManager.addEvent("more music clubs");
                        return result;
                    } else if (workType === this.configManager.instructor && +this.configManager.instructor === +this.configManager.instructor.storage) {
                        this.eventManager.addEvent("more yoga clubs");
                        return result;
                    } else if (workType === this.configManager.warrior && +this.configManager.warrior === +this.configManager.warriorStorage) {
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
        } else if (+workType) {
            result = true;
        }

        return result;
    }

    checkLazybonesPresence() {
        let result = true;
        if (!+this.configManager.lazybones) {
            this.eventManager.addEvent("lack of lazybones");
            result = false;
        }

        return result;
    }

    setWorker(workType, quantity) {
        this.configManager.lazybones.changeValue(-quantity);
        workType.changeValue(quantity);

        if (workType === this.configManager.farmer) {
            this.configManager.foodTotalProduction.changeValue(this.configManager.farmerProduction * quantity);
        } else if (workType === this.configManager.woodman) {
            this.configManager.woodTotalProduction.changeValue(this.configManager.woodmanProduction * quantity);
        } else if (workType === this.configManager.miner) {
            this.configManager.stoneTotalProduction.changeValue(this.configManager.minerProduction * quantity);
        } else if (workType === this.configManager.scientist) {
            this.configManager.knowledgeTotalProduction.changeValue(this.configManager.scientistProduction * quantity);
        } else if (workType === this.configManager.dj) {
            let peopleAmount = +this.configManager.currentPopulation;
            let totalAvailableSpaceInClub = +this.configManager.dj * this.configManager.spaceForPeopleInClub;
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
            let peopleAmount = +this.configManager.currentPopulation;
            let totalAvailableSpaceInClub = +this.configManager.instructor * this.configManager.spaceForPeopleInClub;
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
        if (+this.configManager.currentPopulation> 0) {
            let withDecrease = true;
            if (+this.configManager.lazybones) {
                this.configManager.lazybones.changeValue(-1);
            } else if (+this.configManager.woodman) {
                withDecrease = false;
                this.killWoodcutter();
            } else if (+this.configManager.miner) {
                withDecrease = false;
                this.killMiner();
            } else if (+this.configManager.funeral) {
                this.configManager.funeral.changeValue(-2);
                this.configManager.lazybones.changeValue(1);
            } else if (+this.configManager.scientist) {
                withDecrease = false;
                this.killScientist();
            } else if (+this.configManager.dj) {
                this.configManager.dj.changeValue(-1);
                this.configManager.currentHappyPeople.changeValue(-(+this.configManager.currentPopulation<= this.configManager.spaceForPeopleInClub ? +this.configManager.currentPopulation
                    : (this.configManager.spaceForPeopleInClub - 1)));
                if (!+this.configManager.dj) {
                    this.configManager.changeAllProduction(false);
                    this.configManager.djProductivityFlag = false;
                }
            } else if (+this.configManager.instructor) {
                this.configManager.instructor.changeValue(-1);
                this.configManager.currentHealthyPeople.changeValue(-(+this.configManager.currentPopulation<= this.configManager.spaceForPeopleInClub ? +this.configManager.currentPopulation
                    : (this.configManager.spaceForPeopleInClub - 1)));
                if (!+this.configManager.instructor) {
                    this.configManager.changeAllProduction(false);
                    this.configManager.instructorPresentFlag = false;
                }
            } else if (+this.configManager.leader) {
                this.configManager.leader.changeValue(-1);
                if (!+this.configManager.leader) {
                    this.pageManager.hideElement([this.pageManager.tenWorkTd]);
                    this.pageManager.workTableEmptyTd.attr("colspan", "5");
                    this.configManager.leaderPresentFlag = false;
                }
            } else if (+this.configManager.warrior) {
                this.configManager.warrior.changeValue(-1);
            } else if (+this.configManager.farmer) {
                withDecrease = false;
                this.killFarmer();
            }

            if (withDecrease) {
                this.decreasePopulation();
            }

            // TODO move to event logic
        } else {
            this.eventManager.addEvent("death because of zombies");
            alert(`🧟🧟 ${this.configManager.userName} are amazing, you killed: ${+this.configManager.corpse
            + +this.configManager.inGraveQuantity} people. I believe in you. Please, try again.`);
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
        workerType.changeValue(-1);
        totalProduction.changeValue(-curUnitProduction);
    }

    decreasePopulation() {
        this.configManager.currentPopulation.changeValue(-1);
        this.configManager.foodTotalProduction.changeValue(1);

        if (!this.configManager.corpsePresenceFlag) {
            this.pageManager.showElement([this.pageManager.corpseRow]);
            this.configManager.corpsePresenceFlag = true;
        }
        this.configManager.corpse.changeValue(1);
    }
}

export default CitizenManager;