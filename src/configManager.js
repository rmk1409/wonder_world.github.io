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
        this.foodQuantity = 0;
        this.foodMaxQuantity = 100;
        this.farmerProduction = 1.2;
        this.foodTotalProduction = 0;

        this.woodQuantity = 0;
        this.woodMaxQuantity = 100;
        this.woodmanProduction = 0.5;
        this.woodTotalProduction = 0;

        this.stoneQuantity = 0;
        this.stoneMaxQuantity = 100;
        this.minerProduction = 0.2;
        this.stoneTotalProduction = 0;

        this.knowledgeQuantity = 0;
        this.knowledgeMaxQuantity = 30;
        this.scientistProduction = 0.1;
        this.knowledgeTotalProduction = 0;
        // People
        this.citizenCost = 10;
        this.currentPopulation = 0;
        this.maxPopulation = 5;
        this.corpseQuantity = 0;
        this.inGravesQuantity = 0;
        this.inGravesMaxQuantity = 0;
        this.currentHappyPeople = 0;
        this.maxHappyPeople = 0;
        this.currentHealthyPeople = 0;
        this.maxHealthyPeople = 0;
        this.productivity = 100;
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

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;
    }

    changeCurResourceQuantity(resName, num) {
        let resource;
        let resourceElement;
        let storageResource;
        let toFixed = 0;

        switch (resName) {
            // Resources
            case "food":
                resource = this.foodQuantity;
                resourceElement = this.pageManager.foodQuantityElement;
                storageResource = this.foodMaxQuantity;
                break;
            case "maxFood":
                resource = this.foodMaxQuantity;
                resourceElement = this.pageManager.maxFoodQuantity;
                break;
            case "foodTotalProduction":
                resource = this.foodTotalProduction;
                resourceElement = this.pageManager.foodProductionElement;
                toFixed = 1;
                break;

            case "wood":
                resource = this.woodQuantity;
                resourceElement = this.pageManager.woodQuantityElement;
                storageResource = this.woodMaxQuantity;
                break;
            case "maxWood":
                resource = this.woodMaxQuantity;
                resourceElement = this.pageManager.maxWoodQuantityElement;
                break;
            case "woodTotalProduction":
                resource = this.woodTotalProduction;
                resourceElement = this.pageManager.woodProductionElement;
                toFixed = 1;
                break;

            case "stone":
                resource = this.stoneQuantity;
                resourceElement = this.pageManager.stoneQuantityElement;
                storageResource = this.stoneMaxQuantity;
                break;
            case "maxStone":
                resource = this.stoneMaxQuantity;
                resourceElement = this.pageManager.maxStoneQuantityElement;
                break;
            case "stoneTotalProduction":
                resource = this.stoneTotalProduction;
                resourceElement = this.pageManager.stoneProductionElement;
                toFixed = 1;
                break;

            case "knowledge":
                resource = this.knowledgeQuantity;
                resourceElement = this.pageManager.knowledgeQuantityElement;
                storageResource = this.knowledgeMaxQuantity;
                break;
            case "maxKnowledge":
                resource = this.knowledgeMaxQuantity;
                resourceElement = this.pageManager.maxKnowledgeQuantity;
                break;
            case "knowledgeTotalProduction":
                resource = this.knowledgeTotalProduction;
                resourceElement = this.pageManager.knowledgeProductionElement;
                toFixed = 1;
                break;

            // People
            case "curPop":
                resource = this.currentPopulation;
                resourceElement = this.pageManager.curPopulationElement;
                break;
            case "maxPop":
                resource = this.maxPopulation;
                resourceElement = this.pageManager.maxPopulationElement;
                break;

            case "corpse":
                resource = this.corpseQuantity;
                resourceElement = this.pageManager.corpseQuantityElement;
                break;
            case "inGraveQuantity":
                resource = this.inGravesQuantity;
                resourceElement = this.pageManager.inGraveQuantityElement;
                break;
            case "maxInGraves":
                resource = this.inGravesMaxQuantity;
                resourceElement = this.pageManager.maxInGravesQuantityElement;
                break;
            case "curHappyPeople":
                resource = this.currentHappyPeople;
                resourceElement = this.pageManager.curHappyPeopleElement;
                storageResource = this.maxHappyPeople;
                break;
            case "maxHappyPeople":
                resource = this.maxHappyPeople;
                resourceElement = this.pageManager.maxHappyPeopleElement;
                break;
            case "curHealthyPeople":
                resource = this.currentHealthyPeople;
                resourceElement = this.pageManager.curHealthyPeopleElement;
                storageResource = this.maxHealthyPeople;
                break;
            case "maxHealthyPeople":
                resource = this.maxHealthyPeople;
                resourceElement = this.pageManager.maxHealthyPeopleElement;
                break;
            case "productivity":
                resource = this.productivity;
                resourceElement = this.pageManager.productivityQuantityElement;
                toFixed = 2;
                break;

            // Job
            case "curLazy":
                resource = this.lazyboneQuantity;
                resourceElement = this.pageManager.curLazybonesElement;
                break;
            case "farmer":
                resource = this.farmerQuantity;
                resourceElement = this.pageManager.farmerQuantityElement;
                break;
            case "woodman":
                resource = this.woodmenQuantity;
                resourceElement = this.pageManager.woodmenQuantityElement;
                break;
            case "miner":
                resource = this.minerQuantity;
                resourceElement = this.pageManager.minerQuantityElement;
                break;
            case "funeral":
                resource = this.funeralQuantity;
                resourceElement = this.pageManager.funeralQuantityElement;
                break;
            case "scientist":
                resource = this.curScientistQuantity;
                resourceElement = this.pageManager.curScientistQuantityElement;
                storageResource = this.maxScientistQuantity;
                break;
            case "maxScientistQuantity":
                resource = this.maxScientistQuantity;
                resourceElement = this.pageManager.maxScientistQuantityElement;
                break;
            case "dj":
                resource = this.curDjQuantity;
                resourceElement = this.pageManager.djQuantityElement;
                storageResource = this.maxDjQuantity;
                break;
            case "maxDjQuantity":
                resource = this.maxDjQuantity;
                resourceElement = this.pageManager.maxDjQuantityElement;
                break;
            case "instructor":
                resource = this.curInstructorQuantity;
                resourceElement = this.pageManager.instructorQuantityElement;
                storageResource = this.maxInstructorQuantity;
                break;
            case "maxInstructorQuantity":
                resource = this.maxInstructorQuantity;
                resourceElement = this.pageManager.maxInstructorQuantityElement;
                break;
            case "leader":
                resource = this.leaderQuantity;
                resourceElement = this.pageManager.leaderQuantityElement;
                break;
            case "warrior":
                resource = this.curWarriorQuantity;
                resourceElement = this.pageManager.warriorQuantityElement;
                storageResource = this.maxWarriorQuantity;
                break;
            case "maxWarrior":
                resource = this.maxWarriorQuantity;
                resourceElement = this.pageManager.maxWarriorQuantityElement;
                break;

            // Building
            case "grave":
                resource = this.graveQuantity;
                resourceElement = this.pageManager.graveQuantityElement;
                break;
            case "scroll":
                resource = this.scrollQuantity;
                resourceElement = this.pageManager.scrollQuantityElement;
                break;
            case "granary":
                resource = this.granaryQuantity;
                resourceElement = this.pageManager.granaryQuantityElement;
                break;
            case "pit":
                resource = this.pitQuantity;
                resourceElement = this.pageManager.pitQuantityElement;
                break;

            case "tent":
                resource = this.tentQuantity;
                resourceElement = this.pageManager.tentQuantityElement;
                break;
            case "hut":
                resource = this.hutQuantity;
                resourceElement = this.pageManager.hutQuantityElement;
                break;

            case "campfire":
                resource = this.campfireQuantity;
                resourceElement = this.pageManager.campfireQuantityElement;
                break;
            case "dolmen":
                resource = this.dolmenQuantity;
                resourceElement = this.pageManager.dolmenQuantityElement;
                break;

            case "musicClub":
                resource = this.musicClubQuantity;
                resourceElement = this.pageManager.musicClubQuantityElement;
                break;
            case "yogaClub":
                resource = this.yogaClubQuantity;
                resourceElement = this.pageManager.yogaClubQuantityElement;
                break;
            case "palace":
                resource = this.palaceQuantity;
                resourceElement = this.pageManager.palaceQuantityElement;
                break;

            case "barrack":
                resource = this.barrackQuantity;
                resourceElement = this.pageManager.barrackQuantityElement;
                break;
        }

        resource = (resource * 1e3 + num * 1e3) / 1e3;
        if (storageResource && resource > storageResource) {
            resource = storageResource;
        }

        if (toFixed) {
            resourceElement.text(resource.toFixed(toFixed));
        } else {
            resourceElement.text(Math.floor(resource));
        }
        switch (resName) {
            // Resources
            case "food":
                this.foodQuantity = resource;
                break;
            case "maxFood":
                this.foodMaxQuantity = resource;
                break;
            case "foodTotalProduction":
                this.foodTotalProduction = resource;
                break;

            case "wood":
                this.woodQuantity = resource;
                break;
            case "maxWood":
                this.woodMaxQuantity = resource;
                break;
            case "woodTotalProduction":
                this.woodTotalProduction = resource;
                break;

            case "stone":
                this.stoneQuantity = resource;
                break;
            case "maxStone":
                this.stoneMaxQuantity = resource;
                break;
            case "stoneTotalProduction":
                this.stoneTotalProduction = resource;
                break;

            case "knowledge":
                this.knowledgeQuantity = resource;
                break;
            case "maxKnowledge":
                this.knowledgeMaxQuantity = resource;
                break;
            case "knowledgeTotalProduction":
                this.knowledgeTotalProduction = resource;
                break;

            // People
            case "corpse" :
                this.corpseQuantity = resource;
                break;
            case "curPop":
                this.currentPopulation = resource;
                break;
            case "maxPop":
                this.maxPopulation = resource;
                break;
            case "inGraveQuantity":
                this.inGravesQuantity = resource;
                break;
            case "maxInGraves":
                this.inGravesMaxQuantity = resource;
                break;
            case "curHappyPeople":
                this.currentHappyPeople = resource;
                break;
            case "maxHappyPeople":
                this.maxHappyPeople = resource;
                break;
            case "curHealthyPeople":
                this.currentHealthyPeople = resource;
                break;
            case "maxHealthyPeople":
                this.maxHealthyPeople = resource;
                break;
            case "productivity":
                this.productivity = resource;
                break;

            // Job
            case "curLazy":
                this.lazyboneQuantity = resource;
                break;

            case "farmer":
                this.farmerQuantity = resource;
                break;
            case "woodman":
                this.woodmenQuantity = resource;
                break;
            case "miner":
                this.minerQuantity = resource;
                break;
            case "funeral":
                this.funeralQuantity = resource;
                break;
            case "scientist":
                this.curScientistQuantity = resource;
                break;
            case "maxScientistQuantity":
                this.maxScientistQuantity = resource;
                break;
            case "dj":
                this.curDjQuantity = resource;
                break;
            case "maxDjQuantity":
                this.maxDjQuantity = resource;
                break;
            case "instructor":
                this.curInstructorQuantity = resource;
                break;
            case "maxInstructorQuantity":
                this.maxInstructorQuantity = resource;
                break;
            case "leader":
                this.leaderQuantity = resource;
                break;
            case "warrior":
                this.curWarriorQuantity = resource;
                break;
            case "maxWarrior":
                this.maxWarriorQuantity = resource;
                break;

            // Building
            case "grave":
                this.graveQuantity = resource;
                break;
            case "scroll":
                this.scrollQuantity = resource;
                break;
            case "granary":
                this.granaryQuantity = resource;
                break;
            case "pit":
                this.pitQuantity = resource;
                break;

            case "tent":
                this.tentQuantity = resource;
                break;
            case "hut":
                this.hutQuantity = resource;
                break;

            case "campfire":
                this.campfireQuantity = resource;
                break;
            case "dolmen":
                this.dolmenQuantity = resource;
                break;

            case "musicClub":
                this.musicClubQuantity = resource;
                break;
            case "yogaClub":
                this.yogaClubQuantity = resource;
                break;
            case "palace":
                this.palaceQuantity = resource;
                break;

            case "barrack":
                this.barrackQuantity = resource;
                break;
        }

        // Show tables
        switch (resName) {
            case "food":
                if (!this.showPeopleTableFlag && this.foodQuantity > 10) {
                    this.pageManager.toggleElement(this.pageManager.peopleProductivityTable, [this.pageManager.clickResourceWoodRow, this.pageManager.clickResourceStoneRow]);
                    this.showPeopleTableFlag = true;
                }
                break;
            case "curPop":
                if (!this.showWorkTableFlag) {
                    this.pageManager.toggleElement(this.pageManager.workTable, []);
                    this.showWorkTableFlag = true;
                }
                if (!this.showBuildingTableFlag && this.currentPopulation === this.maxPopulation) {
                    this.pageManager.toggleElement(this.pageManager.buildingTable,[]);
                    this.showBuildingTableFlag = true;
                }
                break;
            case "wood":
            case "stone":
                if (!this.showTechnologyTableFlag && this.woodQuantity > 10 && this.stoneQuantity > 10) {
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
                this.changeCurResourceQuantity("foodTotalProduction", multiply * this.farmerQuantity * this.foodIncreaseStep);
                break;
            case "wood":
                this.woodmanProduction = Math.round(this.woodmanProduction * 1000 + multiply * this.woodIncreaseStep * 1000) / 1000;
                this.changeCurResourceQuantity("woodTotalProduction", multiply * this.woodmenQuantity * this.woodIncreaseStep);
                break;
            case "stone":
                this.minerProduction = Math.round(this.minerProduction * 1000 + multiply * this.stoneIncreaseStep * 1000) / 1000;
                this.changeCurResourceQuantity("stoneTotalProduction", multiply * this.minerQuantity * this.stoneIncreaseStep);
                break;
            case "knowledge":
                this.scientistProduction = Math.round(this.scientistProduction * 1000 + this.knowledgeIncreaseStep * 1000) / 1000;
                this.changeCurResourceQuantity("knowledgeTotalProduction", this.curScientistQuantity * this.knowledgeIncreaseStep);
                break;
        }
    }
}

export default ConfigManager;