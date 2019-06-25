class ConfigManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;

        this.spaceInOneClub = 5;
        this.knowledgeStoreInOneScroll = 5;
        this.spaceInOneCampfire = 2;
        this.spaceInOneDolmen = 5;
        this.availableScientistSpaces = 0;
        this.buildFuneralFlag = false;

        this.scientistPresentFlag = false;
        this.djPresentFlag = false;
        this.instructorPresentFlag = false;
        this.palacePresentFlag = false;
        this.currentDjSpaces = 0;

        this.currentInstructorSpaces = 0;

        // userName
        this.userName = "";
        // Resources
        this.foodQuantity = 0;
        this.foodMaxQuantity = 100;
        this.farmerProduction = 1.2;
        this.foodTotalProduction = 0;
        this.woodQuantity = 0;
        this.woodMaxQuantity = 100;
        this.woodProduction = 0;
        this.stoneQuantity = 0;
        this.stoneMaxQuantity = 100;
        this.stoneProduction = 0;
        this.knowledgeQuantity = 0;
        this.knowledgeMaxQuantity = 30;
        this.knowledgeProduction = 0;
        // People
        this.citizenCost = 10;
        this.currentPopulation = 0;
        this.maxPopulation = 5;
        this.corpseQuantity = 0;
        this.inGravesQuantity = 0;
        this.inGravesMaxQuantity = 0;
        this.currentHappyPeople = 0;
        this.maxHappyPeople = 0;
        this.currentHealthPeople = 0;
        this.maxHealthPeople = 0;
        this.currentProductivity = 1;
        // Work
        this.lazyboneQuantity = 0;
        this.farmerQuantity = 0;
        this.woodmenQuantity = 0;
        this.minerQuantity = 0;
        this.funeralQuantity = 0;
        this.curScientistQuantity = 0;
        this.maxScientistQuantity = 0;
        this.leaderQuantity = 0;
        this.curWarriorQuantity = 0;
        this.maxWarriorQuantity = 0;
        this.curDjQuantity = 0;
        this.maxDjQuantity = 0;
        this.curInstructorQuantity = 0;
        this.maxInstructorQuantity = 0;
        // Buildings
        this.graveQuantity = 0;
        this.scrollQuantity = 0;
        this.granaryQuantity = 0;
        this.pitQuantity = 0;
        this.tentQuantity = 0;
        this.hutQuantity = 0;
        this.campfireQuantity = 0;
        this.dolmenQuantity = 0;
        this.musicClubQuantity = 0;
        this.yogaClubQuantity = 0;
        this.palaceQuantity = 0;
        this.barrackQuantity = 0;
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

    changeCurResourceQuantity(resName, num) {
        let resource;
        let resourceElement;
        let storageResource;

        switch (resName) {
            case "food":
                resource = this.foodQuantity;
                resourceElement = this.pageManager.foodQuantityElement;
                storageResource = this.foodMaxQuantity;
                break;
            case "foodTotalProduction":
                resource = this.foodTotalProduction;
                resourceElement = this.pageManager.foodProductionElement;
                break;
            case "wood":
                resource = this.woodQuantity;
                resourceElement = this.pageManager.woodQuantityElement;
                storageResource = this.woodMaxQuantity;
                break;
            case "stone":
                resource = this.stoneQuantity;
                resourceElement = this.pageManager.stoneQuantityElement;
                storageResource = this.stoneMaxQuantity;
                break;
            case "curPop":
                resource = this.currentPopulation;
                resourceElement = this.pageManager.curPopulationElement;
                break;
            case "curLazy":
                resource = this.lazyboneQuantity;
                resourceElement = this.pageManager.curLazybonesElement;
                break;
            case "farmer":
                resource = this.farmerQuantity;
                resourceElement = this.pageManager.farmerQuantityElement;
                break;

        }

        resource = (resource * 1e3 + num * 1e3) / 1000;
        if (!storageResource && resource > storageResource) {
            resource = storageResource;
        }

        resourceElement.text(resource);
        switch (resName) {
            case "food":
                this.foodQuantity = resource;
                break;
            case "foodTotalProduction":
                this.foodTotalProduction = resource;
                break;
            case "wood":
                this.woodQuantity = resource;
                break;
            case "stone":
                this.stoneQuantity = resource;
                break;
            case "curPop":
                this.currentPopulation = resource;
                break;
            case "curLazy":
                this.lazyboneQuantity = resource;
                break;
            case "farmer":
                this.farmerQuantity = resource;
                break;
        }
    }
}

export default ConfigManager;