class PageManager {
    initialization(gameManager) {
        this.gameManager = gameManager;
        this.eventManager = this.gameManager.eventManager;
        this.configManager = this.gameManager.configManager;

        // HTML Elements
        this.userNameElement = $("#user-name");
        this.startAgainButton = $("#start-again-button");
        this.getFullButton = $("#getFullButton");
        this.starvationWarning = $("#starvation-warning");
        this.notAchievement = $("#not-achievement");

        this.foodImage = $("#food-img");
        this.foodClickButton = $("#food-click-button");
        this.foodQuantityElement = $("#food-quantity");
        this.maxFoodQuantity = $("#max-food-quantity-span");
        this.foodProductionElement = $("#food-production-quantity");

        this.woodClickButton = $("#wood-click-button");
        this.woodQuantityElement = $("#wood-quantity");
        this.maxWoodQuantityElement = $("#max-wood-quantity-span");
        this.woodProductionElement = $("#wood-production-quantity");

        this.stoneClickButton = $("#stone-click-button");
        this.stoneQuantityElement = $("#stone-quantity");
        this.maxStoneQuantityElement = $("#max-stone-quantity-span");
        this.stoneProductionElement = $("#stone-production-quantity");

        this.emptyRowBeforeKnowledge = $("#empty-row-before-knowledge");
        this.knowledgeRow = $("#knowledge-row");
        this.knowledgeQuantityElement = $("#knowledge-quantity");
        this.maxKnowledgeQuantity = $("#max-knowledge-quantity-span");
        this.knowledgeProductionElement = $("#knowledge-production-quantity");

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

        this.eventDiv = $("#events-div span");

        this.achievementSection = $("#achievement-section");
        this.ufoAchievement = $("<img alt='alien img' src='res/img/achievement/alien.png' title='Player is an alien'/>");
        this.palaceAchievement = $("<img alt='palace ach img' src='res/img/achievement/blueprint.png' title='Build a palace'/>");
        this.firstResearchAchievement = $("<img alt='first research img' src='res/img/achievement/knowledge.png' title='First research'/>");
        this.hungerAchievement = $("<img alt='starving img' src='res/img/common/death.png' title='Die of hunger'/>");
        this.productivityAchievement = $("<img alt='productivity img' src='res/img/achievement/speedometer.png' title='Achieve high productivity (more than 190%)'/>");
        this.moreFoodAchievement = $("<img alt='farmer production img' src='res/img/achievement/food.png' title='Even more food, hurray!!! :)'/>");

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

        this.researchBronzeAgeButton = $("#tech-bronze-age-button");
        this.techBronzeAgeElement = $("#tech-bronze-age-row");

        this.alreadyKnownP = $("#already-known-p");
        this.alreadyKnownSection = $("#already-known-section");
        this.changesP = $("#changes-p");
        this.agricultureP = $("#agriculture-p");
        this.architectureP = $("#architecture-p");
        this.funeralP = $("#funeral-p");
        this.changes2P = $("#changes-2-p");
        this.agriculture2P = $("#agriculture-2-p");
        this.architecture2P = $("#architecture-2-p");
        this.leadershipP = $("#leadership-p");
        this.stoneAgeP = $("#stone-age-p");
        this.architecture3P = $("#architecture-3-p");
        this.musicP = $("#music-p");
        this.sportP = $("#sport-p");
        this.toolP = $("#tools-p");
        this.weaponP = $("#weapon-p");
        this.hoeP = $("#hoe-p");
        this.axeP = $("#axe-p");
        this.pickAxeP = $("#pickaxe-p");
        this.twoSideScrollP = $("#two-side-scroll-p");
        this.architecture4P = $("#architecture-4-p");
        this.bronzeAgeP = $("#bronze-age-p");
    }

    static reloadSite() {
        document.location.reload(true);
    }

    showElement(ar) {
        ar.forEach((item) => item.show("slow"));
    }

    hideElement(ar) {
        ar.forEach((item) => item.hide("slow"));
    }

    toggleElement(firstElementToShow, otherElementArToShowNew) {
        firstElementToShow.toggle("slow", () => {
            otherElementArToShowNew.forEach((item) => item.toggle("slow"))
        });
    }

    checkProduction() {
        this.changeColor(this.configManager.foodTotalProduction, this.foodProductionElement, this.addFarmerButton);
        this.changeColor(this.configManager.woodTotalProduction, this.woodProductionElement);
        this.changeColor(this.configManager.stoneTotalProduction, this.stoneProductionElement);
        this.changeColor(this.configManager.knowledgeTotalProduction, this.knowledgeProductionElement);
        this.changeColor(this.configManager.lazyboneQuantity, this.curLazybonesElement);
    }

    changeColor(checkEl, target, button) {
        if (checkEl > 0) {
            target.css({"background-color": "#28a745", "border-color": "#28a745", "color": "white"});
            if (!!button) {
                button.css({"background-color": "#28a745", "border-color": "#28a745", "color": "white"});
            }
        } else if (checkEl === 0) {
            target.css({"background-color": "", "color": "black"});
        } else {
            target.css({"background-color": "red", "color": "white"});
            if (!!button) {
                button.css({"background-color": "green", "border-color": "red", "color": "red"});
            }
        }
    }
}

export default PageManager;