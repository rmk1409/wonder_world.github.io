class ConfigManager {
    constructor() {
        this.userName = "";
        this.foodIncreaseStep = 0.15;
        this.woodIncreaseStep = 0.125;
        this.stoneIncreaseStep = 0.05;
        this.knowledgeIncreaseStep = 0.025;
        this.clickEfficiency = 1;
        this.WINNER_REQUIREMENTS = 1e6;
        // Flags
        this.showPeopleTableFlag = false;
        this.corpsePresentFlag = false;
        this.buildFuneralFlag = false;
        this.showWorkTableFlag = false;
        this.leaderPresentFlag = false;
        this.djPresentFlag = false;
        this.djProductivityFlag = false;
        this.instructorPresentFlag = false;
        this.instructorProductivityFlag = false;
        this.productivityAchievementFlag = false;
        this.showBuildingTableFlag = false;
        this.showTechnologyTableFlag = false;
        this.barrackPresentFlag = false;
        this.palacePresentFlag = false;
        this.starvationAchievementFlag = false;
        // Resources
        // this.foodQuantity = 0;
        // this.foodMaxQuantity = 100;
        this.farmerProduction = 1.2;
        // this.foodTotalProduction = 0;

        // this.woodQuantity = 0;
        // this.woodMaxQuantity = 100;
        this.woodmanProduction = 0.5;
        // this.woodTotalProduction = 0;

        // this.stoneQuantity = 0;
        // this.stoneMaxQuantity = 100;
        this.minerProduction = 0.2;
        // this.stoneTotalProduction = 0;

        // this.knowledgeQuantity = 0;
        // this.knowledgeMaxQuantity = 30;
        this.scientistProduction = 0.1;
        // this.knowledgeTotalProduction = 0;
        // People
        this.citizenCost = 10;
        // this.currentPopulation = 0;
        // this.maxPopulation = 5;
        // this.corpseQuantity = 0;
        // this.inGravesQuantity = 0;
        // this.inGravesMaxQuantity = 0;
        // this.currentHappyPeople = 0;
        // this.maxHappyPeople = 0;
        // this.currentHealthyPeople = 0;
        // this.maxHealthyPeople = 0;
        // this.productivity = 100;
        // Work
        // this.lazyboneQuantity = 0;
        // this.farmerQuantity = 0;
        // this.woodmenQuantity = 0;
        // this.minerQuantity = 0;
        // this.funeralQuantity = 0;
        // this.curScientistQuantity = 0;
        // this.maxScientistQuantity = 0;
        // this.curDjQuantity = 0;
        // this.maxDjQuantity = 0;
        // this.curInstructorQuantity = 0;
        // this.maxInstructorQuantity = 0;
        // this.leaderQuantity = 0;
        // this.curWarriorQuantity = 0;
        // this.maxWarriorQuantity = 0;
        // Buildings
        // this.graveQuantity = 0;
        // this.scrollQuantity = 0;
        // this.granaryQuantity = 0;
        // this.pitQuantity = 0;
        // this.tentQuantity = 0;
        // this.hutQuantity = 0;
        // this.campfireQuantity = 0;
        // this.dolmenQuantity = 0;
        // this.musicClubQuantity = 0;
        // this.yogaClubQuantity = 0;
        // this.palaceQuantity = 0;
        // this.barrackQuantity = 0;
        // Building benefit
        this.knowledgeInScroll = 5;
        this.foodInGranary = 50;
        this.resInPit = 50;
        this.spaceInTent = 2;
        this.spaceInHut = 5;
        this.spaceInCamprire = 2;
        this.spaceInDolmen = 5;
        this.spaceForWorkerInClub = 1;
        this.spaceForPeopleInClub = 25;
        this.spaceInPalace = 5;
        this.spaceInBarrack = 10;
        // Technology Cost
        this.agricultureCost = 30;
        this.architectureCost = 30;
        this.funeralCost = 30;
        this.changes2Cost = 75;
        this.leadershipCost = 100;
        this.agriculture2Cost = 100;
        this.architecture2Cost = 100;
        this.stoneAgeCost = 300;
        this.architecture3Cost = 250;
        this.musicCost = 250;
        this.sportCost = 250;
        this.toolCost = 250;
        this.ancientWeaponCost = 350;
        this.hoeCost = 300;
        this.axeCost = 300;
        this.pickaxeCost = 300;
        this.bothSideScrollCost = 10;
        this.architecture4Cost = 900;
        this.bronzeAgeCost = 3e3;
    }

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;

        this.storageResourceMap = new Map([
            ["maxFood", new Resource(100, this.pageManager.maxFoodQuantityElement, 0)],
            ["maxWood", new Resource(100, this.pageManager.maxWoodQuantityElement, 0)],
            ["maxStone", new Resource(100, this.pageManager.maxStoneQuantityElement, 0)],
            ["maxKnowledge", new Resource(30, this.pageManager.maxKnowledgeQuantityElement, 0)],

            ["maxPop", new Resource(5, this.pageManager.maxPopulationElement, 0)],
            ["maxInGraves", new Resource(0, this.pageManager.maxInGravesQuantityElement, 0)],
            ["maxHappyPeople", new Resource(0, this.pageManager.maxHappyPeopleElement, 0)],
            ["maxHealthyPeople", new Resource(0, this.pageManager.maxHealthyPeopleElement, 0)],
            ["maxScientistQuantity", new Resource(0, this.pageManager.maxScientistQuantityElement, 0)],
            ["maxDjQuantity", new Resource(0, this.pageManager.maxDjQuantityElement, 0)],
            ["maxInstructorQuantity", new Resource(0, this.pageManager.maxInstructorQuantityElement, 0)],
            ["maxWarrior", new Resource(0, this.pageManager.maxWarriorQuantityElement, 0)],
        ]);

        this.resourceMap = new Map([
            ...this.storageResourceMap,
            ["food", new Resource(0, this.pageManager.foodQuantityElement, 0, this.storageResourceMap.get("maxFood"))],
            ["foodTotalProduction", new Resource(0, this.pageManager.foodProductionElement, 1)],
            ["wood", new Resource(0, this.pageManager.woodQuantityElement, 0, this.storageResourceMap.get("maxWood"))],
            ["woodTotalProduction", new Resource(0, this.pageManager.woodProductionElement, 1)],
            ["stone", new Resource(0, this.pageManager.stoneQuantityElement, 0, this.storageResourceMap.get("maxStone"))],
            ["stoneTotalProduction", new Resource(0, this.pageManager.stoneProductionElement, 1)],
            ["knowledge", new Resource(0, this.pageManager.knowledgeQuantityElement, 0, this.storageResourceMap.get("maxKnowledge"))],
            ["knowledgeTotalProduction", new Resource(0, this.pageManager.knowledgeProductionElement, 1)],

            ["curPop", new Resource(0, this.pageManager.curPopulationElement, 0, this.storageResourceMap.get("maxPop"))],
            ["corpse", new Resource(0, this.pageManager.corpseQuantityElement, 0)],
            ["inGraveQuantity", new Resource(0, this.pageManager.inGraveQuantityElement, 0, this.storageResourceMap.get("maxInGraves"))],
            ["curHappyPeople", new Resource(0, this.pageManager.curHappyPeopleElement, 0, this.storageResourceMap.get("maxHappyPeople"))],
            ["curHealthyPeople", new Resource(0, this.pageManager.curHealthyPeopleElement, 0, this.storageResourceMap.get("maxHealthyPeople"))],
            ["productivity", new Resource(100, this.pageManager.productivityQuantityElement, 2)],

            ["curLazy", new Resource(0, this.pageManager.curLazybonesElement, 0)],
            ["farmer", new Resource(0, this.pageManager.farmerQuantityElement, 0)],
            ["woodman", new Resource(0, this.pageManager.woodmenQuantityElement, 0)],
            ["miner", new Resource(0, this.pageManager.minerQuantityElement, 0)],
            ["funeral", new Resource(0, this.pageManager.funeralQuantityElement, 0)],
            ["scientist", new Resource(0, this.pageManager.curScientistQuantityElement, 0, this.storageResourceMap.get("maxScientistQuantity"))],
            ["dj", new Resource(0, this.pageManager.djQuantityElement, 0, this.storageResourceMap.get("maxDjQuantity"))],
            ["instructor", new Resource(0, this.pageManager.instructorQuantityElement, 0, this.storageResourceMap.get("maxInstructorQuantity"))],
            ["leader", new Resource(0, this.pageManager.leaderQuantityElement, 0)],
            ["warrior", new Resource(0, this.pageManager.warriorQuantityElement, 0, this.storageResourceMap.get("maxWarrior"))],

            ["grave", new Resource(0, this.pageManager.graveQuantityElement, 0)],
            ["scroll", new Resource(0, this.pageManager.scrollQuantityElement, 0)],
            ["granary", new Resource(0, this.pageManager.granaryQuantityElement, 0)],
            ["pit", new Resource(0, this.pageManager.pitQuantityElement, 0)],
            ["tent", new Resource(0, this.pageManager.tentQuantityElement, 0)],
            ["hut", new Resource(0, this.pageManager.hutQuantityElement, 0)],
            ["campfire", new Resource(0, this.pageManager.campfireQuantityElement, 0)],
            ["dolmen", new Resource(0, this.pageManager.dolmenQuantityElement, 0)],
            ["musicClub", new Resource(0, this.pageManager.musicClubQuantityElement, 0)],
            ["yogaClub", new Resource(0, this.pageManager.yogaClubQuantityElement, 0)],
            ["palace", new Resource(0, this.pageManager.palaceQuantityElement, 0)],
            ["barrack", new Resource(0, this.pageManager.barrackQuantityElement, 0)],
        ]);
    }

    changeCurResourceQuantity(resourceType, quantity) {
        this.resourceMap.get(resourceType).changeQuantity(quantity);

        // TODO move this from here
        // Show tables
        switch (resourceType) {
            case "food":
                if (!this.showPeopleTableFlag && this.resourceMap.get("food").quantity > 10) {
                    this.pageManager.toggleElement(this.pageManager.peopleProductivityTable, [this.pageManager.clickResourceWoodRow, this.pageManager.clickResourceStoneRow]);
                    this.showPeopleTableFlag = true;
                }
                break;
            case "curPop":
                if (!this.showWorkTableFlag) {
                    this.pageManager.toggleElement(this.pageManager.workTable, []);
                    this.showWorkTableFlag = true;
                }
                if (!this.showBuildingTableFlag && this.resourceMap.get("curPop").quantity === this.resourceMap.get("maxPop").quantity) {
                    this.pageManager.toggleElement(this.pageManager.buildingTable, []);
                    this.showBuildingTableFlag = true;
                }
                break;
            case "wood":
            case "stone":
                if (!this.showTechnologyTableFlag && this.resourceMap.get("wood").quantity > 10 && this.resourceMap.get("stone").quantity > 10) {
                    this.pageManager.toggleElement(this.pageManager.technologyTable, []);
                    this.showTechnologyTableFlag = true;
                }
                break;
        }
    }

    changeAllProduction(increase) {
        let sign = increase ? 1 : -1;
        this.changeCurResourceQuantity("productivity", sign * 25);
        this.changeProduction("food", increase);
        this.changeProduction("wood", increase);
        this.changeProduction("stone", increase);
        this.changeProduction("knowledge", increase);
    }

    changeProduction(what, increase) {
        let multiply = increase ? 1 : -1;
        switch (what) {
            case "food":
                this.farmerProduction = Math.round(this.farmerProduction * 1000 + multiply * this.foodIncreaseStep * 1000) / 1000;
                this.changeCurResourceQuantity("foodTotalProduction", multiply * this.resourceMap.get("farmer").quantity * this.foodIncreaseStep);
                break;
            case "wood":
                this.woodmanProduction = Math.round(this.woodmanProduction * 1000 + multiply * this.woodIncreaseStep * 1000) / 1000;
                this.changeCurResourceQuantity("woodTotalProduction", multiply * this.resourceMap.get("woodman").quantity * this.woodIncreaseStep);
                break;
            case "stone":
                this.minerProduction = Math.round(this.minerProduction * 1000 + multiply * this.stoneIncreaseStep * 1000) / 1000;
                this.changeCurResourceQuantity("stoneTotalProduction", multiply * this.resourceMap.get("miner").quantity * this.stoneIncreaseStep);
                break;
            case "knowledge":
                this.scientistProduction = Math.round(this.scientistProduction * 1000 + this.knowledgeIncreaseStep * 1000) / 1000;
                this.changeCurResourceQuantity("knowledgeTotalProduction", this.resourceMap.get("scientist").quantity * this.knowledgeIncreaseStep);
                break;
        }
    }
}

class Resource {
    constructor(quantity, element, toFixed, storage) {
        this.quantity = quantity;
        this.element = element;
        this.toFixed = toFixed;
        this.storage = storage;
    }

    changeQuantity(quantity) {
        this.quantity = (this.quantity * 1e3 + quantity * 1e3) / 1e3;

        if (this.storage && this.quantity > this.storage.quantity) {
            this.quantity = this.storage.quantity;
        }

        if (this.toFixed) {
            this.element.text(this.quantity.toFixed(this.toFixed));
        } else {
            this.element.text(Math.floor(this.quantity));
        }
    }
}

export default ConfigManager;