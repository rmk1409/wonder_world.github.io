/**
 * Create buildings
 */
class BuilderManager {
    initialization(gameManager) {
        this.gameManager = gameManager;
        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.pageManager = this.gameManager.pageManager;

        this.buildingMap = new Map([
            ["grave", new BuildingWithShowElement(
                new Building(10, 10, [["grave", "maxInGraves"], [1, 1]], this.configManager, this.eventManager),
                this.pageManager, this.configManager.buildFuneralFlag, [this.pageManager.emptyRowBeforeJobFuneral, this.pageManager.jobFuneralRow, this.pageManager.inGravesRow])],
            ["scroll", new Building(0, 10, [["scroll", "maxKnowledge"], [1, this.configManager.knowledgeInScroll]], this.configManager, this.eventManager)],
            ["granary", new Building(50, 50, [["granary", "maxFood"], [1, this.configManager.foodInGranary]], this.configManager, this.eventManager)],
            ["pit", new Building(50, 50, [["pit", "maxStone", "maxWood"], [1, this.configManager.resInPit, this.configManager.resInPit]], this.configManager, this.eventManager)],
            ["tent", new Building(20, 0, [["tent", "maxPop"], [1, this.configManager.spaceInTent]], this.configManager, this.eventManager)],
            ["hut", new Building(50, 20, [["hut", "maxPop"], [1, this.configManager.spaceInHut]], this.configManager, this.eventManager)],
            ["campfire", new Building(30, 10, [["campfire", "maxScientistQuantity"], [1, this.configManager.spaceInCamprire]], this.configManager, this.eventManager)],
            ["dolmen", new Building(80, 80, [["dolmen", "maxScientistQuantity"], [1, this.configManager.spaceInDolmen]], this.configManager, this.eventManager)],
            ["music-club", new BuildingWithShowElement(
                new Building(225, 225, [["musicClub", "maxDjQuantity", "maxHappyPeople"], [1, this.configManager.spaceForWorkerInClub,
                    this.configManager.spaceForPeopleInClub]], this.configManager, this.eventManager),
                this.pageManager, this.configManager.djPresentFlag, [this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.happinessRowElement,
                    this.pageManager.emptyRowBeforProductivityRowElement, this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobDjRowElement])],
            ["yoga-club", new BuildingWithShowElement(
                new Building(225, 225, [["yogaClub", "maxInstructorQuantity", "maxHealthyPeople"], [1, this.configManager.spaceForWorkerInClub,
                    this.configManager.spaceForPeopleInClub]], this.configManager, this.eventManager),
                this.pageManager, this.configManager.instructorPresentFlag, [this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.healthRowElement, this.pageManager.emptyRowBeforProductivityRowElement,
                    this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobInstructorRowElement])],
            ["palace", new BuildingWithShowElement(new Building(1000, 1000, [["palace", "dolmen", "musicClub", "yogaClub", "maxScientistQuantity", "maxHappyPeople", "maxHealthyPeople",
                    "maxDjQuantity", "maxInstructorQuantity"], [1, 5, 5, 5, 5 * this.configManager.spaceInDolmen, 5 * this.configManager.spaceForPeopleInClub, 5 * this.configManager.spaceForPeopleInClub,
                    5, 5]], this.configManager, this.eventManager),
                this.pageManager, this.configManager.palacePresentFlag, [this.pageManager.startAgainButton])],
            ["barrack", new BuildingWithShowElement(
                new Building(200, 100, [["barrack", "maxWarrior"], [1, this.configManager.spaceInBarrack]], this.configManager, this.eventManager),
                this.pageManager, this.configManager.barrackPresentFlag, [this.pageManager.jobWarriorRow])]
        ]);
    }

    /**
     * Trying to build new building
     * @param buildingType building type
     * @returns true/false depends on whether building is built.
     */
    buildNewBuilding(buildingType) {
        return this.buildingMap.get(buildingType).buildBuilding();
        // this.eventManager.addAchievement("Palace");
        // alert(`Congratulations! You built a palace for yourself!! You are amazing!!! \nAlso you've just killed: ${this.configManager.corpseQuantity + this.configManager.inGravesQuantity} people. (￣▽￣)ノ
        //                 ${this.configManager.userName}, Great job!!`);
        // this.pageManager.buildPalaceButton.prop("disabled", true);
    }
}

/**
 * Base class for building
 */
class Building {
    constructor(woodPrice, stonePrice, resourceToChangeAr, configManager, eventManager) {
        this.woodPrice = woodPrice;
        this.stonePrice = stonePrice;

        this.resourceToChangeAr = resourceToChangeAr;
        this.configManager = configManager;
        this.eventManager = eventManager;
    }

    buildBuilding() {
        return this.tryToBuild();
    }

    tryToBuild() {
        let result = true;
        if (this.checkEnoughResource()) {
            this.configManager.changeCurResourceQuantity("wood", -this.woodPrice);
            this.configManager.changeCurResourceQuantity("stone", -this.stonePrice);
            for (let i = 0; i < this.resourceToChangeAr[0].length; i++) {
                this.configManager.changeCurResourceQuantity(this.resourceToChangeAr[0][i], this.resourceToChangeAr[1][i]);
            }
        } else {
            this.eventManager.addEvent("more resources");
            result = false;
        }
        return result;
    }

    checkEnoughResource(){
        return this.configManager.woodQuantity >= this.woodPrice && this.configManager.stoneQuantity >= this.stonePrice;
    }
}

/**
 * Class decorator for Building
 * Add showing new elements on the page.
 */
class BuildingWithShowElement {
    constructor(building, pageManager, flag, showElementAr) {
        this.building = building;
        this.pageManager = pageManager;
        this.flag = flag;
        this.showElementAr = showElementAr;
    }

    buildBuilding() {
        let result = this.building.tryToBuild();
        if (result && !this.flag) {
            this.pageManager.showElement(this.showElementAr);
            this.flag = true;
        }
        return result;
    }
}

export default BuilderManager;