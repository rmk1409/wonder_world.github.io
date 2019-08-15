class ConfigManager {
    constructor() {
        this.userKey = "USER_NAME";
        this.userName = "";

        this.foodIncreaseStep = 0.15;
        this.woodIncreaseStep = 0.125;
        this.stoneIncreaseStep = 0.05;
        this.knowledgeIncreaseStep = 0.025;
        this.clickEfficiency = 1;
        this.WINNER_REQUIREMENTS = 1e6;

        // Flags
        this.showPeopleTableFlag = false;
        this.corpsePresenceFlag = false;
        this.buildFuneralFlag = false;

        this.showWorkTableFlag = false;
        this.leaderPresentFlag = false;
        this.djPresentFlag = false;
        this.djProductivityFlag = false;
        this.instructorPresentFlag = false;
        this.instructorProductivityFlag = false;

        this.showBuildingTableFlag = false;
        this.barrackPresentFlag = false;
        this.palacePresentFlag = false;
        this.showTechnologyTableFlag = false;
        this.productivityAchievementFlag = false;
        this.starvationAchievementFlag = false;

        // Building benefit
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

        // TODO change to JSON
        // for saving/loading
        this.initialValueMap = new Map([
            ["foodStorage", 100],
            ["food", 0],
            ["foodTotalProduction", 0],

            ["woodStorage", 100],
            ["wood", 0],
            ["woodTotalProduction", 0],

            ["stoneStorage", 100],
            ["stone", 0],
            ["stoneTotalProduction", 0],

            ["knowledgeStorage", 30],
            ["knowledge", 0],
            ["knowledgeTotalProduction", 0],

            ["populationStorage", 5],
            ["currentPopulation", 0],
            ["corpse", 0],
            ["corpseStorage", 0],
            ["inGraveQuantity", 0],
            ["happyPeopleStorage", 0],
            ["currentHappyPeople", 0],
            ["healthyPeopleStorage", 0],
            ["currentHealthyPeople", 0],
            ["productivity", 100],

            ["lazybones", 0],
            ["farmer", 0],
            ["woodman", 0],
            ["miner", 0],
            ["funeral", 0],
            ["scientistStorage", 0],
            ["scientist", 0],
            ["djStorage", 0],
            ["dj", 0],
            ["instructorStorage", 0],
            ["instructor", 0],
            ["leader", 0],
            ["scout", 30],
            ["warriorStorage", 0],
            ["warrior", 0],

            ["grave", 0],
            ["scroll", 0],
            ["granary", 0],
            ["pit", 0],
            ["tent", 0],
            ["hut", 0],
            ["campfire", 0],
            ["dolmen", 0],
            ["musicClub", 0],
            ["yogaClub", 0],
            ["palace", 0],
            ["barrack", 0],

            ["knowledgeInScroll", 5]
        ]);
    }

    initialization(gameManager) {
        let pageManager = gameManager.pageManager;

        // Resources
        this.foodStorage = new Resource(this.initialValueMap.get("foodStorage"), pageManager.maxFoodQuantityElement, 0);
        this.food = new Resource(this.initialValueMap.get("food"), pageManager.foodQuantityElement, 0, this.foodStorage);
        this.farmerProduction = 1.2;
        this.foodTotalProduction = new Resource(this.initialValueMap.get("foodTotalProduction"), pageManager.foodProductionElement, 1);

        this.woodStorage = new Resource(this.initialValueMap.get("woodStorage"), pageManager.maxWoodQuantityElement, 0);
        this.wood = new Resource(this.initialValueMap.get("wood"), pageManager.woodQuantityElement, 0, this.woodStorage);
        this.woodmanProduction = 0.5;
        this.woodTotalProduction = new Resource(this.initialValueMap.get("woodTotalProduction"), pageManager.woodProductionElement, 1);

        this.stoneStorage = new Resource(this.initialValueMap.get("stoneStorage"), pageManager.maxStoneQuantityElement, 0);
        this.stone = new Resource(this.initialValueMap.get("stone"), pageManager.stoneQuantityElement, 0, this.stoneStorage);
        this.minerProduction = 0.2;
        this.stoneTotalProduction = new Resource(this.initialValueMap.get("stoneTotalProduction"), pageManager.stoneProductionElement, 1);

        this.knowledgeStorage = new Resource(this.initialValueMap.get("knowledgeStorage"), pageManager.maxKnowledgeQuantityElement, 0);
        this.knowledge = new Resource(this.initialValueMap.get("knowledge"), pageManager.knowledgeQuantityElement, 0, this.knowledgeStorage);
        this.scientistProduction = 0.1;
        this.knowledgeTotalProduction = new Resource(this.initialValueMap.get("knowledgeTotalProduction"), pageManager.knowledgeProductionElement, 1);

        // People
        this.citizenCost = 10;
        this.populationStorage = new Resource(this.initialValueMap.get("populationStorage"), pageManager.maxPopulationElement, 0);
        this.currentPopulation = new Resource(this.initialValueMap.get("currentPopulation"), pageManager.curPopulationElement, 0, this.populationStorage);
        this.corpse = new Resource(this.initialValueMap.get("corpse"), pageManager.corpseQuantityElement, 0);
        this.corpseStorage = new Resource(this.initialValueMap.get("corpseStorage"), pageManager.maxInGravesQuantityElement, 0);
        this.inGraveQuantity = new Resource(this.initialValueMap.get("inGraveQuantity"), pageManager.inGraveQuantityElement, 0, this.corpseStorage);
        this.happyPeopleStorage = new Resource(this.initialValueMap.get("happyPeopleStorage"), pageManager.maxHappyPeopleElement, 0);
        this.currentHappyPeople = new Resource(this.initialValueMap.get("currentHappyPeople"), pageManager.curHappyPeopleElement, 0, this.happyPeopleStorage);
        this.healthyPeopleStorage = new Resource(this.initialValueMap.get("healthyPeopleStorage"), pageManager.maxHealthyPeopleElement, 0);
        this.currentHealthyPeople = new Resource(this.initialValueMap.get("currentHealthyPeople"), pageManager.curHealthyPeopleElement, 0, this.healthyPeopleStorage);
        this.productivity = new Resource(this.initialValueMap.get("productivity"), pageManager.productivityQuantityElement, 2);

        // Work
        this.lazybones = new Resource(this.initialValueMap.get("lazybones"), pageManager.curLazybonesElement, 0);
        this.farmer = new Resource(this.initialValueMap.get("farmer"), pageManager.farmerQuantityElement, 0);
        this.woodman = new Resource(this.initialValueMap.get("woodman"), pageManager.woodmenQuantityElement, 0);
        this.miner = new Resource(this.initialValueMap.get("miner"), pageManager.minerQuantityElement, 0);
        this.funeral = new Resource(this.initialValueMap.get("funeral"), pageManager.funeralQuantityElement, 0);
        this.scientistStorage = new Resource(this.initialValueMap.get("scientistStorage"), pageManager.maxScientistQuantityElement, 0);
        this.scientist = new Resource(this.initialValueMap.get("scientist"), pageManager.curScientistQuantityElement, 0, this.scientistStorage);
        this.djStorage = new Resource(this.initialValueMap.get("djStorage"), pageManager.maxDjQuantityElement, 0);
        this.dj = new Resource(this.initialValueMap.get("dj"), pageManager.djQuantityElement, 0, this.djStorage);
        this.instructorStorage = new Resource(this.initialValueMap.get("instructorStorage"), pageManager.maxInstructorQuantityElement, 0);
        this.instructor = new Resource(this.initialValueMap.get("instructor"), pageManager.instructorQuantityElement, 0, this.instructorStorage);
        this.leader = new Resource(this.initialValueMap.get("leader"), pageManager.leaderQuantityElement, 0);
        this.scout = new Resource(this.initialValueMap.get("scout"), pageManager.scoutQuantityElement, 0);
        this.warriorStorage = new Resource(this.initialValueMap.get("warriorStorage"), pageManager.maxWarriorQuantityElement, 0);
        this.warrior = new Resource(this.initialValueMap.get("warrior"), pageManager.warriorQuantityElement, 0, this.warriorStorage);

        // Buildings
        this.grave = new Resource(this.initialValueMap.get("grave"), pageManager.graveQuantityElement, 0);
        this.scroll = new Resource(this.initialValueMap.get("scroll"), pageManager.scrollQuantityElement, 0);
        this.granary = new Resource(this.initialValueMap.get("granary"), pageManager.granaryQuantityElement, 0);
        this.pit = new Resource(this.initialValueMap.get("pit"), pageManager.pitQuantityElement, 0);
        this.tent = new Resource(this.initialValueMap.get("tent"), pageManager.tentQuantityElement, 0);
        this.hut = new Resource(this.initialValueMap.get("hut"), pageManager.hutQuantityElement, 0);
        this.campfire = new Resource(this.initialValueMap.get("campfire"), pageManager.campfireQuantityElement, 0);
        this.dolmen = new Resource(this.initialValueMap.get("dolmen"), pageManager.dolmenQuantityElement, 0);
        this.musicClub = new Resource(this.initialValueMap.get("musicClub"), pageManager.musicClubQuantityElement, 0);
        this.yogaClub = new Resource(this.initialValueMap.get("yogaClub"), pageManager.yogaClubQuantityElement, 0);
        this.palace = new Resource(this.initialValueMap.get("palace"), pageManager.palaceQuantityElement, 0);
        this.barrack = new Resource(this.initialValueMap.get("barrack"), pageManager.barrackQuantityElement, 0);

        // Building benefit
        this.knowledgeInScroll = new Resource(this.initialValueMap.get("knowledgeInScroll"), pageManager.buildScrollDefinition, 0);
    }

    changeAllProduction(increase) {
        let mathSign = increase ? 1 : -1;
        this.productivity.changeValue(mathSign * 25);
        this.changeProduction("food", increase);
        this.changeProduction("wood", increase);
        this.changeProduction("stone", increase);
        this.changeProduction("knowledge", increase);
    }

    // TODO Replace to resources
    changeProduction(what, increase) {
        let multiply = increase ? 1 : -1;
        switch (what) {
            case "food":
                this.farmerProduction = Math.round(this.farmerProduction * 1e3 + multiply * this.foodIncreaseStep * 1e3) / 1e3;
                this.foodTotalProduction.changeValue(multiply * +this.farmer * this.foodIncreaseStep);
                break;
            case "wood":
                this.woodmanProduction = Math.round(this.woodmanProduction * 1e3 + multiply * this.woodIncreaseStep * 1e3) / 1e3;
                this.woodTotalProduction.changeValue(multiply * +this.woodman * this.woodIncreaseStep);
                break;
            case "stone":
                this.minerProduction = Math.round(this.minerProduction * 1e3 + multiply * this.stoneIncreaseStep * 1e3) / 1e3;
                this.stoneTotalProduction.changeValue(multiply * +this.miner * this.stoneIncreaseStep);
                break;
            case "knowledge":
                this.scientistProduction = Math.round(this.scientistProduction * 1e3 + this.knowledgeIncreaseStep * 1e3) / 1e3;
                this.knowledgeTotalProduction.changeValue(+this.scientist * this.knowledgeIncreaseStep);
                break;
        }
    }

    getFullResources() {
        this.food.changeValue(+this.foodStorage);
        this.wood.changeValue(+this.woodStorage);
        this.stone.changeValue(+this.stoneStorage);
        this.knowledge.changeValue(+this.knowledgeStorage);
    }
}

class Resource {
    constructor(value, element, toFixed, storage) {
        this.value = value;
        this.element = element;
        this.toFixed = toFixed;
        this.storage = storage;
    }

    changeValue(quantity) {
        this.value = (this.value * 1e3 + quantity * 1e3) / 1e3;

        this.fixValue();
    }

    setValue(value) {
        this.value = value;

        this.fixValue();
    }

    fixValue() {
        this.fixToStorage();
        this.fixNegativeValue();
        this.fixPrecision();
    }

    fixToStorage() {
        if (this.storage && this.checkMax()) {
            this.value = this.storage.value;
        }
    }

    checkMax() {
        return this.value >= this.storage.value;
    }

    fixPrecision() {
        if (this.toFixed) {
            this.element.text(this.value.toFixed(this.toFixed));
        } else {
            this.element.text(Math.floor(this.value));
        }
    }

    fixNegativeValue() {
        if (!isNaN(this.value) && this.value < -0.1) {
            this.value = -0.1;
        }
    }

    valueOf() {
        return this.value;
    }
}

export default ConfigManager;