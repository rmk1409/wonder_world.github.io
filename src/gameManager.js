import EventManager from "./eventManager";
import ConfigManager from "./configManager";
import BuilderManager from "./builderManager";
import PageManager from "./pageManager";
import CitizenManager from "./citizenManager";
import ScienceManager from "./scienceManager";
import IntervalManager from "./intervalManager";

class GameManager {
    constructor() {
        this.pageManager = new PageManager();
        this.eventManager = new EventManager();
        this.configManager = new ConfigManager();
        this.builderManager = new BuilderManager();
        this.citizenManager = new CitizenManager();
        this.scienceManager = new ScienceManager();
        this.intervalManager = new IntervalManager();

        this.pageManager.initialization(this);
        this.eventManager.initialization(this);
        this.configManager.initialization(this);
        this.builderManager.initialization(this);
        this.citizenManager.initialization(this);
        this.scienceManager.initialization(this);
        this.intervalManager.initialization(this);
    }

    createWorker(num) {
        this.citizenManager.createCitizen(num);
    }

    unlockAchievement(achievementName) {
        this.eventManager.addEvent(achievementName);
    }

    build(name) {
        switch (name) {
            case "grave":
                if (this.builderManager.build(10, 10, ["grave", "maxInGraves"], [1, 1])) {
                    if (!this.configManager.buildFuneralFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforeJobFuneral, this.pageManager.jobFuneralRow, this.pageManager.inGravesRow]);
                        this.configManager.buildFuneralFlag = true;
                    }
                    return true;
                }
                return false;
            case "scroll":
                return this.builderManager.build(0, 10, ["scroll", "maxKnowledge"], [1, this.configManager.knowledgeInScroll]);
            case "granary":
                return this.builderManager.build(50, 50, ["granary", "maxFood"], [1, 50]);
            case "pit":
                return this.builderManager.build(50, 50, ["pit", "maxStone", "maxWood"], [1, 50, 50]);
            case "tent":
                return this.builderManager.build(20, 0, ["tent", "maxPop"], [1, 2])
            case "hut":
                return this.builderManager.build(50, 20, ["hut", "maxPop"], [1, 5]);
            case "campfire":
                if (this.builderManager.build(30, 10, ["campfire", "maxScientistQuantity"], [1, this.configManager.spaceInCamprire])) {
                    if (!this.configManager.scientistPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforeJobScientist, this.pageManager.jobScientistRow, this.pageManager.emptyRowBeforeKnowledge, this.pageManager.knowledgeRow]);
                        this.configManager.scientistPresentFlag = true;
                    }
                    this.configManager.availableScientistSpaces += this.configManager.spaceInCamprire;
                    return true;
                }
                return false;
            case "dolmen":
                if (this.builderManager.build(80, 80, ["dolmen", "maxScientistQuantity"], [1, this.configManager.spaceInDolmen])) {
                    this.configManager.availableScientistSpaces += this.configManager.spaceInDolmen;
                    return true;
                }
                return false;
            case "music-club":
                if (this.builderManager.build(225, 225, ["musicClub", "maxDjQuantity", "maxHappyPeople"], [1, this.configManager.spaceForWorkerInClub, this.configManager.spaceForPeopleInClub])) {
                    if (!this.configManager.djPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.happinessRowElement, this.pageManager.emptyRowBeforProductivityRowElement,
                            this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobDjRowElement]);
                        this.configManager.djPresentFlag = true;
                    }
                    this.configManager.changeCurResourceQuantity("maxDjQuantity", 1);
                    return true;
                }
                return false;
            case "yoga-club":
                if (this.builderManager.build(225, 225, ["yogaClub", "maxInstructorQuantity", "maxHealthyPeople"], [1, this.configManager.spaceForWorkerInClub, this.configManager.spaceForPeopleInClub])) {
                    if (!this.configManager.instructorPresentFlag) {
                        this.pageManager.showElement(this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.healthRowElement, this.pageManager.emptyRowBeforProductivityRowElement,
                            this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobInstructorRowElement);
                        this.configManager.instructorPresentFlag = true;
                    }
                    this.configManager.currentInstructorSpaces++;
                }
                break;
            case "palace":
                if (this.builderManager.build(1000, 1000, ["palace", "dolmen", "musicClub", "yogaClub", "maxScientistQuantity", "maxHappyPeople", "maxHealthyPeople",
                    "maxDjQuantity", "maxInstructorQuantity"], [1, 5, 10, 10, 5 * this.configManager.spaceInDolmen, 10 * this.configManager.spaceForPeopleInClub, 10 * this.configManager.spaceForPeopleInClub,
                    10, 10])) {
                    this.unlockAchievement("Palace");
                    if (!this.configManager.palacePresentFlag) {
                        // TODO Finished
                        if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've just killed: " + (this.pageManager.corpseQuantityElement.text() +
                            this.pageManager.inGraveQuantityElement.text()) + " people. (￣▽￣)ノ Great job!! \n" + /*USER_NAME*/ +", do you wanna start again?")) {
                            PageManager.reloadSite();
                        } else {
                            this.pageManager.showElement([this.pageManager.startAgainButton]);
                        }
                        $(this).prop("disabled", true);
                        this.configManager.palacePresentFlag = true;
                    }
                    this.configManager.availableScientistSpaces += this.configManager.spaceInDolmen * 5;
                    let clubInOnePalace = 10;
                    this.configManager.currentDjSpaces += clubInOnePalace;
                    this.configManager.currentInstructorSpaces += clubInOnePalace;
                }
                break;
            case "barrack":
                if (this.builderManager.build(200, 100, ["barrack", "maxWarriorQuantity"], [1, 10])) {
                    if (!this.configManager.barrackPresentFlag) {
                        this.pageManager.showElement([this.pageManager.jobWarriorRow]);
                        this.configManager.barrackPresentFlag = true;
                    }
                    return true;
                }
                return false;
        }
    }

    setWorker(name, num) {
        switch (name) {
            default:
                this.citizenManager.setWorker(name, num);
                break;
            case "leader":
                if (this.citizenManager.setWorker(name, num) && !this.configManager.leaderPresentFlag) {
                    this.pageManager.showElement([this.pageManager.tenWorkTd]);
                    $("#work-table .empty-row td").attr("colspan", "6");

                    this.configManager.leaderPresentFlag = true;
                }
                break;
        }
    }

    initialization() {
        const userKey = "USER_NAME";

        let userName;
        userName = localStorage.getItem(userKey);
        userName = confirm(userName && `＼(￣▽￣)／, are you ${userName}, yes?`) ? userName : prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        this.configManager.userName = userName;

        localStorage.setItem(userKey, userName);
        $("#user-name").text(userName);

        if (userName === "UFO Alien") {
            this.unlockAchievement("UFO Alien");
        }

        this.intervalManager.runInterval();
    }

    clickResource(name, number) {
        this.configManager.changeCurResourceQuantity(name, number);
    }

    reloadSite() {
        PageManager.reloadSite();
    }

    increaseAllProduction() {
        this.configManager.productivity = Math.round(this.configManager.productivity * 1000 + 0.25 * 1000) / 1000;
        this.configManager.changeCurResourceQuantity("productivity", 25);

        this.increaseFoodProduction();
        this.increaseWoodProduction();
        this.increaseStoneProduction();
        this.increaseKnowledgeProduction();
    }

    increaseFoodProduction() {
        this.configManager.farmerProduction = Math.round(this.configManager.farmerProduction * 1000 + this.configManager.foodIncreaseStep * 1000) / 1000;
        this.configManager.changeCurResourceQuantity("foodTotalProduction", this.configManager.farmerQuantity * this.configManager.foodIncreaseStep);
    }

    increaseWoodProduction() {
        this.configManager.woodmanProduction = Math.round(this.configManager.woodmanProduction * 1000 + this.configManager.woodIncreaseStep * 1000) / 1000;
        this.configManager.changeCurResourceQuantity("woodTotalProduction", this.configManager.woodmenQuantity * this.configManager.woodIncreaseStep);
    }

    increaseStoneProduction() {
        this.configManager.minerProduction = Math.round(this.configManager.minerProduction * 1000 + this.configManager.stoneIncreaseStep * 1000) / 1000;
        this.configManager.changeCurResourceQuantity("stoneTotalProduction", this.configManager.minerQuantity * this.configManager.stoneIncreaseStep);
    }

    increaseKnowledgeProduction() {
        this.configManager.scientistProduction = Math.round(this.configManager.scientistProduction * 1000 + this.configManager.knowledgeIncreaseStep * 1000) / 1000;
        this.configManager.changeCurResourceQuantity("knowledgeTotalProduction", this.configManager.curScientistQuantity * this.configManager.knowledgeIncreaseStep);
    }

    research(name) {
        switch (name) {
            case "changes":
                this.scienceManager.changes();
                break;
            case "agriculture":
                if (this.scienceManager.research(30, this.pageManager.techAgricultureElement, [this.pageManager.agricultureP])) {
                    $("#food-img").attr("src", "res/img/changes/grapes.png");
                    this.increaseFoodProduction();
                }
                break;
            case "architecture":
                this.scienceManager.research(30, this.pageManager.techArchitectureElement, [this.pageManager.buildHutRow, this.pageManager.architectureP]);
                break;
            case "funeral":
                this.scienceManager.research(30, this.pageManager.techFuneralElement, [this.pageManager.buildScrollRow, this.pageManager.buildGraveRow,
                    this.pageManager.emptyRowBeforePopulationBuilding, this.pageManager.techChanges2Element, this.pageManager.funeralP]);
                break;
            case "changes2":
                this.scienceManager.research(75, this.pageManager.techChanges2Element, [this.pageManager.techAgriculture2Element, this.pageManager.techArchitecture2Element,
                    this.pageManager.techLeadershipElement, this.pageManager.techStoneAgeElement, this.pageManager.changes2P]);
                break;
            case "leadership":
                this.scienceManager.research(100, this.pageManager.techLeadershipElement, [this.pageManager.leaderRow, this.pageManager.leadershipP]);
                break;
            case "agriculture2":
                if (this.scienceManager.research(100, this.pageManager.techAgriculture2Element, [this.pageManager.agriculture2P])) {
                    $("#food-img").attr("src", "res/img/changes2/field.png");
                    this.increaseFoodProduction();
                    this.unlockAchievement("More Food");
                }
                break;
            case "architecture2":
                this.scienceManager.research(100, this.pageManager.techArchitecture2Element, [this.pageManager.buildPitRow, this.pageManager.architecture2P]);
                break;
            case "stone age":
                this.scienceManager.research(300, this.pageManager.techStoneAgeElement, [this.pageManager.buildGranaryRow, this.pageManager.techArchitecture3Element,
                    this.pageManager.techMusicElement, this.pageManager.techSportElement, this.pageManager.techToolElement, this.pageManager.stoneAgeP]);
                break;
            case "architecture3":
                this.scienceManager.research(250, this.pageManager.techArchitecture3Element, [this.pageManager.buildDolmenRow, this.pageManager.architecture3P]);
                break;
            case "music":
                this.scienceManager.research(250, this.pageManager.techMusicElement, [this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.buildMusicClubRow,
                    this.pageManager.musicP]);
                break;
            case "sport":
                this.scienceManager.research(250, this.pageManager.techSportElement [this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.buildYogaClubRow,
                    this.pageManager.techArchitecture4Element, this.pageManager.sportP]);
                break;
            case "tool":
                this.scienceManager.research(250, this.pageManager.techToolElement [this.pageManager.techAxeElement, this.pageManager.techPickaxeElement, this.pageManager.techHoeElement,
                    this.pageManager.techAncientWeaponElement, this.pageManager.toolP]);
                break;
            case "weapon":
                if (this.scienceManager.research(350, this.pageManager.techAncientWeaponElement, [this.pageManager.emptyRowbeforeBuildWar, this.pageManager.buildBarrackRow,
                    , this.pageManager.tech2sideScrollElement, this.pageManager.techArchitecture4Element, this.pageManager.weaponP])) {
                    this.increaseAllProduction();
                }
                break;
            case "hoe":
                if (this.scienceManager.research(300, this.pageManager.techHoeElement, [this.pageManager.hoeP])) {
                    this.configManager.foodIncreaseStep = 0.1;
                    this.increaseFoodProduction();
                    this.configManager.productivity = Math.round(this.configManager.productivity * 100 + 0.0625 * 100) / 100;
                    this.configManager.changeCurResourceQuantity("#productivity-quantity", 6.25);
                }
                break;
            case "axe":
                if (this.scienceManager.research(300, this.pageManager.techAxeElement, [this.pageManager.axeP])) {
                    this.increaseWoodProduction();
                    this.configManager.productivity = Math.round(this.configManager.productivity * 100 + 0.0625 * 100) / 100;
                    this.configManager.changeCurResourceQuantity("#productivity-quantity", 6.25);
                }
                break;
            case "pickaxe":
                if (this.scienceManager.research(300, this.pageManager.techPickaxeElement, [this.pageManager.pickAxeP])) {
                    this.increaseStoneProduction();
                    this.configManager.productivity = Math.round(this.configManager.productivity * 100 + 0.0625 * 100) / 100;
                    this.configManager.changeCurResourceQuantity("#productivity-quantity", 6.25);
                }
                break;
            case "2-side scroll":
                if (this.scienceManager.research(10, this.pageManager.tech2sideScrollElement, [this.pageManager.twoSideScrollP])) {
                    this.configManager.knowledgeInScroll *= 2;
                    this.configManager.changeCurResourceQuantity("maxKnowledge", this.configManager.scrollQuantity);
                    $("#build-scroll-definition").text("+10 space for knowledge");
                    $(this.configManager.buildScrollButton).text("2-side scroll");
                }
                break;
            case "architecture4":
                this.scienceManager.research(900, this.pageManager.techArchitecture4Element[this.pageManager.buildPalaceRow, this.pageManager.techBronzeAgeElement, this.pageManager.architecture4P]);
                break;
        }
    }

    getFullResources() {
        this.configManager.changeCurResourceQuantity("food", this.configManager.foodMaxQuantity);
        this.configManager.changeCurResourceQuantity("wood", this.configManager.woodMaxQuantity);
        this.configManager.changeCurResourceQuantity("stone", this.configManager.stoneMaxQuantity);
        this.configManager.changeCurResourceQuantity("knowledge", this.configManager.knowledgeMaxQuantity);
    }
}

export default GameManager;