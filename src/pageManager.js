class PageManager {
    constructor() {
        this.userNameElement = $("#user-name");
        this.pauseButton = $("#pause-button");
        this.saveButton = $("#save-button");
        this.loadButton = $("#in-game-load-button");
        this.startAgainButton = $("#start-again-button");
        this.getFullButton = $("#getFullButton");
        this.starvationWarning = $("#starvation-warning");
        this.notAchievement = $("#not-achievement");

        this.foodClickButton = $("#food-click-button");
        this.foodQuantityElement = $("#food-quantity");
        this.maxFoodQuantityElement = $("#max-food-quantity-span");
        this.foodProductionElement = $("#food-production-quantity");

        this.clickResourceWoodRow = $("#click-resource-wood-row");
        this.woodClickButton = $("#wood-click-button");
        this.woodQuantityElement = $("#wood-quantity");
        this.maxWoodQuantityElement = $("#max-wood-quantity-span");
        this.woodProductionElement = $("#wood-production-quantity");
        this.stoneClickButton = $("#stone-click-button");

        this.clickResourceStoneRow = $("#click-resource-stone-row");
        this.stoneQuantityElement = $("#stone-quantity");
        this.maxStoneQuantityElement = $("#max-stone-quantity-span");
        this.stoneProductionElement = $("#stone-production-quantity");

        this.emptyRowBeforeKnowledge = $("#empty-row-before-knowledge");
        this.knowledgeRow = $("#knowledge-row");
        this.knowledgeQuantityElement = $("#knowledge-quantity");
        this.maxKnowledgeQuantityElement = $("#max-knowledge-quantity-span");
        this.knowledgeProductionElement = $("#knowledge-production-quantity");

        this.peopleProductivityTable = $("#people-productivity-table");
        this.createCitizenButton = $("#create-worker-button");
        this.curPopulationElement = $("#current-population");
        this.maxPopulationElement = $("#max-population");

        this.corpseRow = $("#corpse-row");
        this.corpseQuantityElement = $("#corpse-quantity");

        this.inGravesRow = $("#in-graves-row");
        this.inGraveQuantityElement = $("#in-graves-quantity");
        this.maxInGravesQuantityElement = $("#max-in-graves-quantity");

        this.emptyRowBeforHappinessRowElement = $("#empty-row-before-happiness");
        this.happinessRowElement = $("#happiness-row");
        this.healthRowElement = $("#health-row");
        this.curHappyPeopleElement = $("#current-happy-people");
        this.maxHappyPeopleElement = $("#max-happy-people");
        this.curHealthyPeopleElement = $("#current-healthy-people");
        this.maxHealthyPeopleElement = $("#max-healthy-people");

        this.emptyRowBeforProductivityRowElement = $("#empty-row-before-productivity");
        this.productivityRowElement = $("#productivity-row");
        this.productivityQuantityElement = $("#productivity-quantity");

        this.workTable = $("#work-table");
        this.tenWorkTd = $(".ten-work-td");
        this.workTableEmptyTd = $("#work-table .empty-row td");
        this.curLazybonesElement = $("#lazybone-quantity");

        this.add10FarmerButton = $("#add-10-farmer-button");

        this.addFarmerButton = $("#add-farmer-button");
        this.removeFarmerButton = $("#remove-farmer-button");
        this.remove10FarmerButton = $("#remove-10-farmer-button");
        this.farmerQuantityElement = $("#farmer-quantity");
        this.add10WoodmanButton = $("#add-10-woodcutter-button");

        this.addWoodmanButton = $("#add-woodcutter-button");
        this.removeWoodmanButton = $("#remove-woodcutter-button");
        this.remove10WoodmanButton = $("#remove-10-woodcutter-button");
        this.woodmenQuantityElement = $("#woodcutter-quantity");
        this.add10MinerButton = $("#add-10-miner-button");

        this.addMinerButton = $("#add-miner-button");
        this.removeMinerButton = $("#remove-miner-button");
        this.remove10MinerButton = $("#remove-10-miner-button");
        this.minerQuantityElement = $("#miner-quantity");
        this.add10ScientistButton = $("#add-10-scientist-button");

        this.addScientistButton = $("#add-scientist-button");
        this.removeScientistButton = $("#remove-scientist-button");
        this.remove10ScientistButton = $("#remove-10-scientist-button");
        this.emptyRowBeforeJobScientist = $("#empty-row-before-job-scientist");
        this.jobScientistRow = $("#job-scientist-row");
        this.curScientistQuantityElement = $("#scientist-quantity");
        this.maxScientistQuantityElement = $("#max-scientist-quantity");
        this.emptyRowBeforeJobFuneral = $("#empty-row-before-job-funeral");

        this.addFuneralButton = $("#add-funeral-button");
        this.removeFuneralButton = $("#remove-funeral-button");
        this.jobFuneralRow = $("#job-funeral-process-row");
        this.funeralQuantityElement = $("#funeral-process-quantity");
        this.funeralProcessImg = $("#funeral-process-img");
        this.emptyRowBeforeJobInClubElement = $("#empty-row-before-job-in-club");

        this.jobDjRowElement = $("#job-dj-row");
        this.djQuantityElement = $("#dj-quantity");
        this.maxDjQuantityElement = $("#max-dj-quantity");
        this.addDjButton = $("#add-dj-button");
        this.jobInstructorRowElement = $("#job-instructor-row");
        this.maxInstructorQuantityElement = $("#max-instructor-quantity");
        this.instructorQuantityElement = $("#instructor-quantity");
        this.addInstructorButton = $("#add-instructor-button");
        this.emptyRowBeforeJobLeader = $("#empty-row-before-job-leader");

        this.leaderRow = $("#job-leader-row");
        this.leaderQuantityElement = $("#leader-quantity");
        this.addLeaderButton = $("#add-leader-button");
        this.jobWarriorRow = $("#job-warrior-row");

        this.addWarriorButton = $("#add-warrior-button");
        this.warriorQuantityElement = $("#warrior-quantity");
        this.maxWarriorQuantityElement = $("#max-warrior-quantity");
        this.buildGraveButton = $("#build-grave-button");

        this.buildingTable = $("#building-table");
        this.buildGraveRow = $("#build-grave-row");
        this.graveQuantityElement = $("#grave-quantity");
        this.buildScrollRow = $("#build-scroll-row");
        this.buildScrollButton = $("#build-scroll-button");
        this.buildScrollDefinition = $("#build-scroll-definition");
        this.scrollQuantityElement = $("#scroll-quantity");
        this.buildGranaryButton = $("#build-storage-granary-button");
        this.buildGranaryRow = $("#build-storage-granary-row");
        this.granaryQuantityElement = $("#granary-quantity");
        this.buildPitButton = $("#build-storage-pit-button");
        this.buildPitRow = $("#build-storage-pit-row");
        this.pitQuantityElement = $("#pit-quantity");

        this.emptyRowBeforePopulationBuilding = $("#empty-row-before-population-building");
        this.buildTentButton = $("#build-tent-button");
        this.tentQuantityElement = $("#tent-quantity");
        this.buildHutButton = $("#build-hut-button");
        this.buildHutRow = $("#build-population-hut-row");
        this.hutQuantityElement = $("#hut-quantity");

        this.emptyRowBeforeBuildKnowlegde = $("#empty-row-before-knowledge-building");
        this.buildCampfireButton = $("#build-campfire-button");
        this.buildCampfireRow = $("#build-knowledge-campfire-row");
        this.campfireQuantityElement = $("#campfire-quantity");
        this.buildDolmenButton = $("#build-dolmen-button");
        this.buildDolmenRow = $("#build-knowledge-dolmen-row");
        this.dolmenQuantityElement = $("#dolmen-quantity");

        this.emptyRowBeforeBuildEfficiency = $("#empty-row-before-build-club");
        this.buildMusicClubButton = $("#build-music-club-button");
        this.buildMusicClubRow = $("#build-music-club-row");
        this.musicClubQuantityElement = $("#music-club-quantity");
        this.buildYogaClubButton = $("#build-yoga-club-button");
        this.buildYogaClubRow = $("#build-yoga-club-row");
        this.yogaClubQuantityElement = $("#yoga-club-quantity");
        this.buildPalaceButton = $("#build-palace-button");
        this.buildPalaceRow = $("#build-palace-row");
        this.palaceQuantityElement = $("#palace-quantity");

        this.emptyRowbeforeBuildWar = $("#empty-row-before-build-war");
        this.buildBarrackButton = $("#build-barrack-button");
        this.buildBarrackRow = $("#build-war-barrack-row");
        this.barrackQuantityElement = $("#barrack-quantity");

        this.eventDiv = $("#events-section span");

        this.achievementSection = $("#achievement-section");
        this.gotAchievementQuantitySpan = $("#got-achievement-quantity-span");
        this.ufoAchievement = $("<img alt='alien img' src='res/img/achievement/alien.png' title='Player is an alien'/>");
        this.palaceAchievement = $("<img alt='palace ach img' src='res/img/stone%20age/palace.png' title='Build a palace'/>");
        this.firstResearchAchievement = $("<img alt='first research img' src='res/img/achievement/knowledge.png' title='First research'/>");
        this.hungerAchievement = $("<img alt='starving img' src='res/img/common/death.png' title='Death from hunger'/>");
        this.productivityAchievement = $("<img alt='productivity img' src='res/img/achievement/speedometer.png' title='Achieve high productivity (more than 190%)'/>");
        this.moreFoodAchievement = $("<img alt='farmer production img' src='res/img/achievement/food.png' title='Even more food, hurray!!! :)'/>");

        this.technologyTable = $("#technology-table");
        this.researchChangesButton = $("#tech-changes-button");
        this.techChangesElement = $("#tech-changes-row");

        this.researchAgricultureButton = $("#tech-agriculture-button");
        this.techAgricultureElement = $("#tech-agriculture-row");

        this.researchArchitectureButton = $("#tech-architecture-button");
        this.techArchitectureElement = $("#tech-architecture-row");

        this.researchFuneralButton = $("#tech-funeral-button");
        this.techFuneralElement = $("#tech-funeral-row");

        this.researchChanges2Button = $("#tech-changes2-button");
        this.techChanges2Element = $("#tech-changes2-row");

        this.researchLeadershipButton = $("#tech-leadership-button");
        this.techLeadershipElement = $("#tech-leadership-row");

        this.researchAgriculture2Button = $("#tech-agriculture-2-button");
        this.techAgriculture2Element = $("#tech-agriculture-2-row");

        this.researchArchitecture2Button = $("#tech-architecture-2-button");
        this.techArchitecture2Element = $("#tech-architecture-2-row");

        this.researchStoneAgeButton = $("#tech-stone-age-button");
        this.techStoneAgeElement = $("#tech-stone-age-row");

        this.researchArchitecture3Button = $("#tech-architecture-3-button");
        this.techArchitecture3Element = $("#tech-architecture-3-row");

        this.researchMusicButton = $("#tech-music-button");
        this.techMusicElement = $("#tech-music-row");

        this.researchSportButton = $("#tech-sport-button");
        this.techSportElement = $("#tech-sport-row");

        this.researchToolButton = $("#tech-tools-button");
        this.techToolElement = $("#tech-tools-row");

        this.researchWeaponButton = $("#tech-ancient-weapon-button");
        this.techAncientWeaponElement = $("#tech-weapon-row");

        this.researchHoeButton = $("#tech-hoe-button");
        this.techHoeElement = $("#tech-hoe-row");

        this.researchAxeButton = $("#tech-axe-button");
        this.techAxeElement = $("#tech-axe-row");

        this.researchPickaxeButton = $("#tech-pickaxe-button");
        this.techPickaxeElement = $("#tech-pickaxe-row");

        this.research2sideScrollButton = $("#tech-2-side-scroll-button");
        this.tech2sideScrollElement = $("#tech-2-side-scroll-row");

        this.researchArchitecture4Button = $("#tech-architecture-4-button");
        this.techArchitecture4Element = $("#tech-architecture-4-row");

        this.techBronzeAgeElement = $("#tech-bronze-age-row");
        this.researchBronzeAgeButton = $("#tech-bronze-age-button");
    }

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.eventManager = this.gameManager.eventManager;
        this.configManager = this.gameManager.configManager;

        // for saving/loading
        this.showElementArray = [];
        this.hideElementArray = [
            // "start-again-button",
            // "in-game-load-button",
            // "save-button",
            "create-10-worker-button",
            // "funeral-process-img",
            // "starvation-warning",

            "click-resource-wood-row",
            "click-resource-stone-row",
            "empty-row-before-knowledge",
            "knowledge-row",

            "people-productivity-table",
            "corpse-row",
            "in-graves-row",
            "empty-row-before-happiness",
            "happiness-row",
            "health-row",
            "empty-row-before-productivity",
            "productivity-row",

            "work-table",
            // ".ten-work-td",
            "empty-row-before-job-funeral",
            "job-funeral-process-row",
            "empty-row-before-job-scientist",
            "job-scientist-row",
            "empty-row-before-job-leader",
            "job-leader-row",
            "job-warrior-row",
            "empty-row-before-job-in-club",
            "job-dj-row",
            "job-instructor-row",

            "building-table",
            "build-grave-row",
            "build-population-tent-row",
            "build-scroll-row",
            "build-storage-granary-row",
            "build-storage-pit-row",
            "empty-row-before-population-building",
            "build-population-hut-row",
            "build-knowledge-campfire-row",
            "build-knowledge-dolmen-row",
            "empty-row-before-knowledge-building",
            "build-knowledge-parthenon-row",
            "empty-row-before-build-club",
            "build-music-club-row",
            "build-yoga-club-row",
            "build-palace-row",
            "empty-row-before-build-war",
            "build-war-barrack-row",

            "technology-table",
            "tech-changes-row",
            "tech-agriculture-row",
            "tech-architecture-row",
            "tech-funeral-row",
            "tech-changes2-row",
            "tech-leadership-row",
            "tech-agriculture-2-row",
            "tech-architecture-2-row",
            "tech-stone-age-row",
            "tech-architecture-3-row",
            "tech-music-row",
            "tech-sport-row",
            "tech-tools-row",
            "tech-hoe-row",
            "tech-axe-row",
            "tech-pickaxe-row",
            "tech-weapon-row",
            "tech-2-side-scroll-row",
            "tech-architecture-4-row",
            "tech-bronze-age-row",
        ];
    }

    hideElement(ar) {
        ar.forEach((item) => {
            item.hide("slow");
            let index = this.showElementArray.indexOf(item.attr("id"));
            if (index !== -1) {
                this.showElementArray.splice(index, 1);
                this.hideElementArray.push(item.attr("id"));
            }
        });
    }

    showElement(ar) {
        ar.forEach((item) => {
            item.show("slow");
            let index = this.hideElementArray.indexOf(item.attr("id"));
            if (index !== -1) {
                this.hideElementArray.splice(index, 1);
                this.showElementArray.push(item.attr("id"));
            }
        });
    }

    hideFirstShowSecond(firstElementToHide, newElementArToShow) {
        firstElementToHide.hide("slow", () => this.showElement(newElementArToShow));

        let index = this.showElementArray.indexOf(firstElementToHide.attr("id"));
        if (index !== -1) {
            this.showElementArray.splice(index, 1);
            this.hideElementArray.push(firstElementToHide.attr("id"));
        }
    }

    static reloadSite() {
        document.location.reload(true);
    }

    // TODO Involve this when resource is changed
    checkProduction() {
        this.changeColor(+this.configManager.foodTotalProduction, this.foodProductionElement, this.addFarmerButton);
        this.changeColor(+this.configManager.woodTotalProduction, this.woodProductionElement);
        this.changeColor(+this.configManager.stoneTotalProduction, this.stoneProductionElement);
        this.changeColor(+this.configManager.knowledgeTotalProduction, this.knowledgeProductionElement);
        this.changeColor(+this.configManager.lazybones, this.curLazybonesElement);
    }

    checkOverpopulated() {
        this.changeColor(+this.configManager.populationStorage - +this.configManager.currentPopulation - 1, this.maxPopulationElement);
    }

    changeColor(checkQuantity, target, button) {
        if (checkQuantity > 0) {
            target.css({"background-color": "#28a745", "border-color": "#28a745", "color": "white"});
            if (!!button) {
                button.css({"background-color": "#28a745", "border-color": "#28a745", "color": "white"});
            }
        } else if (checkQuantity === 0) {
            target.css({"background-color": "", "color": "white"});
        } else {
            target.css({"background-color": "red", "color": "white"});
            if (!!button) {
                button.css({"background-color": "green", "border-color": "red"});
            }
        }
    }
}

export default PageManager;