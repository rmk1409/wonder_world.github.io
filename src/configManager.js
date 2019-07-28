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
    }

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;

        // Resources
        this.foodStorage = new Resource(100, this.pageManager.maxFoodQuantityElement, 0);
        this.food = new Resource(0, this.pageManager.foodQuantityElement, 0, this.foodStorage);
        this.farmerProduction = 1.2;
        this.foodTotalProduction = new Resource(0, this.pageManager.foodProductionElement, 1);

        this.woodStorage = new Resource(100, this.pageManager.maxWoodQuantityElement, 0);
        this.wood = new Resource(0, this.pageManager.woodQuantityElement, 0, this.woodStorage);
        this.woodmanProduction = 0.5;
        this.woodTotalProduction = new Resource(0, this.pageManager.woodProductionElement, 1);

        this.stoneStorage = new Resource(100, this.pageManager.maxStoneQuantityElement, 0);
        this.stone = new Resource(0, this.pageManager.stoneQuantityElement, 0, this.stoneStorage);
        this.minerProduction = 0.2;
        this.stoneTotalProduction = new Resource(0, this.pageManager.stoneProductionElement, 1);

        this.knowledgeStorage = new Resource(30, this.pageManager.maxKnowledgeQuantityElement, 0);
        this.knowledge = new Resource(0, this.pageManager.knowledgeQuantityElement, 0, this.knowledgeStorage);
        this.scientistProduction = 0.1;
        this.knowledgeTotalProduction = new Resource(0, this.pageManager.knowledgeProductionElement, 1);

        // People
        this.citizenCost = 10;
        this.populationStorage = new Resource(5, this.pageManager.maxPopulationElement, 0);
        this.currentPopulation = new Resource(0, this.pageManager.curPopulationElement, 0, this.populationStorage);
        this.corpse = new Resource(0, this.pageManager.corpseQuantityElement, 0);
        this.corpseStorage = new Resource(0, this.pageManager.maxInGravesQuantityElement, 0);
        this.inGraveQuantity = new Resource(0, this.pageManager.inGraveQuantityElement, 0, this.corpseStorage);
        this.happyPeopleStorage = new Resource(0, this.pageManager.maxHappyPeopleElement, 0);
        this.currentHappyPeople = new Resource(0, this.pageManager.curHappyPeopleElement, 0, this.happyPeopleStorage);
        this.healthyPeopleStorage = new Resource(0, this.pageManager.maxHealthyPeopleElement, 0);
        this.currentHealthyPeople = new Resource(0, this.pageManager.curHealthyPeopleElement, 0, this.healthyPeopleStorage);
        this.productivity = new Resource(100, this.pageManager.productivityQuantityElement, 2);

        // Work
        this.lazybones = new Resource(0, this.pageManager.curLazybonesElement, 0);
        this.farmer = new Resource(0, this.pageManager.farmerQuantityElement, 0);
        this.woodman = new Resource(0, this.pageManager.woodmenQuantityElement, 0);
        this.miner = new Resource(0, this.pageManager.minerQuantityElement, 0);
        this.funeral = new Resource(0, this.pageManager.funeralQuantityElement, 0);
        this.scientistStorage = new Resource(0, this.pageManager.maxScientistQuantityElement, 0);
        this.scientist = new Resource(0, this.pageManager.curScientistQuantityElement, 0, this.scientistStorage);
        this.djStorage = new Resource(0, this.pageManager.maxDjQuantityElement, 0);
        this.dj = new Resource(0, this.pageManager.djQuantityElement, 0, this.djStorage);
        this.instructorStorage = new Resource(0, this.pageManager.maxInstructorQuantityElement, 0);
        this.instructor = new Resource(0, this.pageManager.instructorQuantityElement, 0, this.instructorStorage);
        this.leader = new Resource(0, this.pageManager.leaderQuantityElement, 0);
        this.warriorStorage = new Resource(0, this.pageManager.maxWarriorQuantityElement, 0);
        this.warrior = new Resource(0, this.pageManager.warriorQuantityElement, 0, this.warriorStorage);

        // Buildings
        this.grave = new Resource(0, this.pageManager.graveQuantityElement, 0);
        this.scroll = new Resource(0, this.pageManager.scrollQuantityElement, 0);
        this.granary = new Resource(0, this.pageManager.granaryQuantityElement, 0);
        this.pit = new Resource(0, this.pageManager.pitQuantityElement, 0);
        this.tent = new Resource(0, this.pageManager.tentQuantityElement, 0);
        this.hut = new Resource(0, this.pageManager.hutQuantityElement, 0);
        this.campfire = new Resource(0, this.pageManager.campfireQuantityElement, 0);
        this.dolmen = new Resource(0, this.pageManager.dolmenQuantityElement, 0);
        this.musicClub = new Resource(0, this.pageManager.musicClubQuantityElement, 0);
        this.yogaClub = new Resource(0, this.pageManager.yogaClubQuantityElement, 0);
        this.palace = new Resource(0, this.pageManager.palaceQuantityElement, 0);
        this.barrack = new Resource(0, this.pageManager.barrackQuantityElement, 0);

        // Building benefit
        this.knowledgeInScroll = new Resource(5, this.pageManager.buildScrollDefinition, 0);
    }

    changeAllProduction(increase) {
        let mathSign = increase ? 1 : -1;
        this.productivity.changeQuantity(mathSign * 25);
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
                this.farmerProduction = Math.round(this.farmerProduction * 1000 + multiply * this.foodIncreaseStep * 1000) / 1000;
                this.foodTotalProduction.changeQuantity(multiply * this.farmer.quantity * this.foodIncreaseStep);
                break;
            case "wood":
                this.woodmanProduction = Math.round(this.woodmanProduction * 1000 + multiply * this.woodIncreaseStep * 1000) / 1000;
                this.woodTotalProduction.changeQuantity(multiply * this.woodman.quantity * this.woodIncreaseStep);
                break;
            case "stone":
                this.minerProduction = Math.round(this.minerProduction * 1000 + multiply * this.stoneIncreaseStep * 1000) / 1000;
                this.stoneTotalProduction.changeQuantity(multiply * this.miner.quantity * this.stoneIncreaseStep);
                break;
            case "knowledge":
                this.scientistProduction = Math.round(this.scientistProduction * 1000 + this.knowledgeIncreaseStep * 1000) / 1000;
                this.knowledgeTotalProduction.changeQuantity(this.scientist.quantity * this.knowledgeIncreaseStep);
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

        if (this.storage) {
            if (this.quantity > this.storage.quantity) {
                this.quantity = this.storage.quantity;
            } else if (this.quantity < -1) {
                this.quantity = -1;
            }
        }

        if (this.toFixed) {
            this.element.text(this.quantity.toFixed(this.toFixed));
        } else {
            this.element.text(Math.floor(this.quantity));
        }
    }
}

export default ConfigManager;