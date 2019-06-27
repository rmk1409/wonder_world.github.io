import GameManager from './gameManager';

$(function () {
    "use strict";
    let gameManager = new GameManager();
    let pageManager = gameManager.pageManager;
    gameManager.initialization();
    // CLICK EVENTS
    // 1. CLICK TO THE RESOURCES
    $(pageManager.foodClickButton).on("click", () => gameManager.clickResource("food", gameManager.configManager.booster));
    $(pageManager.woodClickButton).on("click", () => gameManager.clickResource("wood", gameManager.configManager.booster));
    $(pageManager.stoneClickButton).on("click", () => gameManager.clickResource("stone", gameManager.configManager.booster));
    // 2. START AGAIN
    $(pageManager.startAgainButton).on("click", () => gameManager.reloadSite());
    $(pageManager.getFullButton).on("click", () => gameManager.getFullResources());
    // 3. CREATE WORKER
    $(pageManager.createCitizenButton).on("click", () => gameManager.createWorker(1));
    // 4. BUILD
    $(pageManager.buildGraveButton).on("click", () => gameManager.build("grave"));
    $(pageManager.buildScrollButton).on("click", () => gameManager.build("scroll"));
    $(pageManager.buildGranaryButton).on("click", () => gameManager.build("granary"));
    $(pageManager.buildPitButton).on("click", () => gameManager.build("pit"));
    $(pageManager.buildTentButton).on("click", () => gameManager.build("tent"));
    $(pageManager.buildHutButton).on("click", () => gameManager.build("hut"));
    $(pageManager.buildCampfireButton).on("click", () => gameManager.build("campfire"));
    $(pageManager.buildDolmenButton).on("click", () => gameManager.build("dolmen"));
    // TODO in bronze age
    // $("#build-parthenon-button").on("click",() => gameManager.build("partheon));
    $(pageManager.buildMusicClubButton).on("click", () => gameManager.build("music-club"));
    $(pageManager.buildYogaClubButton).on("click", () => gameManager.build("yoga-club"));
    $(pageManager.buildPalaceButton).on("click", () => gameManager.build("palace"));
    $(pageManager.buildBarrackButton).on("click", () => gameManager.build("barrack"));

    // WORK SETTINGS
    // 1. FARMER
    $(pageManager.remove10FarmerButton).on("click", () => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("farmer", -1)
    });
    $(pageManager.removeFarmerButton).on("click", () => gameManager.setWorker("farmer", -1));
    $(pageManager.add10FarmerButton).on("click", () => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("farmer", 1);
    });
    $(pageManager.addFarmerButton).on("click", () => gameManager.setWorker("farmer", 1));
    // 2. WOODCUTTER
    $(pageManager.remove10WoodmanButton).on("click", () => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("woodman", -1);
    });
    $(pageManager.removeWoodmanButton).on("click", () => gameManager.setWorker("woodman", -1));
    $(pageManager.add10WoodmanButton).on("click", () => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("woodman", 1);
    });
    $(pageManager.addWoodmanButton).on("click", () => gameManager.setWorker("woodman", 1));
    // 3. MINER
    $(pageManager.remove10MinerButton).on("click", function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("miner", -1);
    });
    $(pageManager.removeMinerButton).on("click", () => gameManager.setWorker("miner", -1));
    $(pageManager.add10MinerButton).on("click", function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("miner", 1);
    });
    $(pageManager.addMinerButton).on("click", () => gameManager.setWorker("miner", 1));
    // 4. SCIENTIST
    $(pageManager.remove10ScientistButton).on("click", function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("scientist", -1);
    });
    $(pageManager.removeScientistButton).on("click", () => gameManager.setWorker("scientist", -1));
    $(pageManager.add10ScientistButton).on("click", function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("scientist", 1);
    });
    $(pageManager.addScientistButton).on("click", () => gameManager.setWorker("scientist", 1));
    // 5. FUNERAL
    $(pageManager.removeFuneralButton).on("click", () => gameManager.setWorker("funeral", -2));
    $(pageManager.addFuneralButton).on("click", () => gameManager.setWorker("funeral", 2));
    // 6. Dj
    $(pageManager.addDjButton).on("click", () => gameManager.setWorker("dj", 1));
    // 7. Instructor
    $(pageManager.addInstructorButton).on("click", () => gameManager.setWorker("instructor", 1));

    // 8. LEADER
    $(pageManager.addLeaderButton).on("click", () => gameManager.setWorker("leader", 1));
    // 9. WARRIOR
    $(pageManager.addWarriorButton).on("click", () => gameManager.setWorker("warrior", 1));

    // TECHNOLOGIES
    // 1. BEGINNING
    $(pageManager.researchChangesButton).on("click", () => gameManager.research("changes"));
    // 2. CHANGES 1
    $(pageManager.researchAgricultureButton).on("click", () => gameManager.research("agriculture"));
    $(pageManager.researchArchitectureButton).on("click", () => gameManager.research("architecture"));
    $(pageManager.researchFuneralButton).on("click", () => gameManager.research("funeral"));
    $(pageManager.researchChanges2Button).on("click", () => gameManager.research("changes2"));
    // 3. CHANGES 2
    $(pageManager.researchLeadershipButton).on("click", () => gameManager.research("leadership"));
    $(pageManager.researchAgriculture2Button).on("click", () => gameManager.research("agriculture2"));
    $(pageManager.researchArchitecture2Button).on("click", () => gameManager.research("architecture2"));
    $(pageManager.researchStoneAgeButton).on("click", () => gameManager.research("stone age"));
    // 4. STONE AGE
    $(pageManager.researchArchitecture3Button).on("click", () => gameManager.research("architecture3"));
    $(pageManager.researchMusicButton).on("click", () => gameManager.research("music"));
    $(pageManager.researchSportButton).on("click", () => gameManager.research("sport"));
    $(pageManager.researchToolButton).on("click", () => gameManager.research("tool"));
    $(pageManager.researchWeaponButton).on("click", () => gameManager.research("weapon"));
    $(pageManager.researchHoeButton).on("click", () => gameManager.research("hoe"));
    $(pageManager.researchAxeButton).on("click", () => gameManager.research("axe"));
    $(pageManager.researchPickaxeButton).on("click", () => gameManager.research("pickaxe"));
    $(pageManager.research2sideScrollButton).on("click", () => gameManager.research("2 side scroll"));
    $(pageManager.researchArchitecture4Button).on("click", () => gameManager.research("architecture4"));
    // Already known technologies
    $(pageManager.alreadyKnownP).on("click", function slideToggleSection() {
        pageManager.alreadyKnownSection.slideToggle("fast");
    });
});