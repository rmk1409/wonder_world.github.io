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

    initialization() {
        const userKey = "USER_NAME";

        let userName;
        userName = localStorage.getItem(userKey);
        if (userName) {
            userName = confirm(`＼(￣▽￣)／, are you ${userName}, yes?`) ? userName : prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        } else {
            userName = prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        }
        this.configManager.userName = userName;

        localStorage.setItem(userKey, userName);
        this.pageManager.userNameElement.text(userName);

        if (userName === "UFO Alien") {
            this.unlockAchievement("UFO Alien");
        }

        this.intervalManager.runInterval();
    }

    clickResource(name, number) {
        this.configManager.changeCurResourceQuantity(name, number);
        let buttonToBlur = this.pageManager.foodClickButton;
        switch (name) {
            case "wood":
                buttonToBlur = this.pageManager.woodClickButton;
                break;
            case "stone":
                buttonToBlur = this.pageManager.stoneClickButton;
                break;
        }
        buttonToBlur.blur();
    }

    createWorker(num) {
        this.citizenManager.createCitizen(num);
    }

    unlockAchievement(achievementName) {
        this.eventManager.addAchievement(achievementName);
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
                return this.builderManager.build(50, 50, ["granary", "maxFood"], [1, this.configManager.foodInGranary]);
            case "pit":
                return this.builderManager.build(50, 50, ["pit", "maxStone", "maxWood"], [1, this.configManager.resInPit, this.configManager.resInPit]);
            case "tent":
                return this.builderManager.build(20, 0, ["tent", "maxPop"], [1, this.configManager.spaceInTent]);
            case "hut":
                return this.builderManager.build(50, 20, ["hut", "maxPop"], [1, this.configManager.spaceInHut]);
            case "campfire":
                if (this.builderManager.build(30, 10, ["campfire", "maxScientistQuantity"], [1, this.configManager.spaceInCamprire])) {
                    if (!this.configManager.scientistPresentFlag) {
                        this.configManager.scientistPresentFlag = true;
                    }
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
                if (this.builderManager.build(225, 225, ["musicClub", "maxDjQuantity", "maxHappyPeople"], [1, this.configManager.spaceForWorkerInClub,
                    this.configManager.spaceForPeopleInClub])) {
                    if (!this.configManager.djPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.happinessRowElement, this.pageManager.emptyRowBeforProductivityRowElement,
                            this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobDjRowElement]);
                        this.configManager.djPresentFlag = true;
                    }
                    return true;
                }
                return false;
            case "yoga-club":
                if (this.builderManager.build(225, 225, ["yogaClub", "maxInstructorQuantity", "maxHealthyPeople"], [1, this.configManager.spaceForWorkerInClub,
                    this.configManager.spaceForPeopleInClub])) {
                    if (!this.configManager.instructorPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.healthRowElement, this.pageManager.emptyRowBeforProductivityRowElement,
                            this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobInstructorRowElement]);
                        this.configManager.instructorPresentFlag = true;
                    }
                }
                break;
            case "palace":
                if (this.builderManager.build(1000, 1000, ["palace", "dolmen", "musicClub", "yogaClub", "maxScientistQuantity", "maxHappyPeople", "maxHealthyPeople",
                    "maxDjQuantity", "maxInstructorQuantity"], [1, 5, 5, 5, 5 * this.configManager.spaceInDolmen, 5 * this.configManager.spaceForPeopleInClub, 5 * this.configManager.spaceForPeopleInClub,
                    5, 5])) {
                    this.unlockAchievement("Palace");
                    if (!this.configManager.palacePresentFlag) {
                        this.eventManager.addAchievement("Palace");
                        alert(`Congratulations! You built a palace for yourself!! You are amazing!!! \nAlso you've just killed: ${this.configManager.corpseQuantity + this.configManager.inGravesQuantity} people. (￣▽￣)ノ 
                        ${this.configManager.userName}, Great job!!`);
                        this.pageManager.showElement([this.pageManager.startAgainButton]);
                        this.pageManager.buildPalaceButton.prop("disabled", true);
                        this.configManager.palacePresentFlag = true;
                    }
                }
                break;
            case "barrack":
                if (this.builderManager.build(200, 100, ["barrack", "maxWarrior"], [1, this.configManager.spaceInBarrack])) {
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
                    this.pageManager.workTableEmptyTd.attr("colspan", "6");

                    this.configManager.leaderPresentFlag = true;
                }
                break;
        }
    }

    reloadSite() {
        PageManager.reloadSite();
    }

    changeProduction(increase, what) {
        let multiply = increase ? 1 : -1;
        switch (what) {
            case "food":
                this.configManager.farmerProduction = Math.round(this.configManager.farmerProduction * 1000 + multiply * this.configManager.foodIncreaseStep * 1000) / 1000;
                this.configManager.changeCurResourceQuantity("foodTotalProduction", multiply * this.configManager.farmerQuantity * this.configManager.foodIncreaseStep);
                break;
            case "wood":
                this.configManager.woodmanProduction = Math.round(this.configManager.woodmanProduction * 1000 + multiply * this.configManager.woodIncreaseStep * 1000) / 1000;
                this.configManager.changeCurResourceQuantity("woodTotalProduction", multiply * this.configManager.woodmenQuantity * this.configManager.woodIncreaseStep);
                break;
            case "stone":
                this.configManager.minerProduction = Math.round(this.configManager.minerProduction * 1000 + multiply * this.configManager.stoneIncreaseStep * 1000) / 1000;
                this.configManager.changeCurResourceQuantity("stoneTotalProduction", multiply * this.configManager.minerQuantity * this.configManager.stoneIncreaseStep);
                break;
            case "knowledge":
                this.configManager.scientistProduction = Math.round(this.configManager.scientistProduction * 1000 + this.configManager.knowledgeIncreaseStep * 1000) / 1000;
                this.configManager.changeCurResourceQuantity("knowledgeTotalProduction", this.configManager.curScientistQuantity * this.configManager.knowledgeIncreaseStep);
                break;
        }
    }

    changeAllProduction(increase) {
        let sign = increase ? 1 : -1;
        this.configManager.changeCurResourceQuantity("productivity", sign * 25);
        this.changeProduction(increase, "food");
        this.changeProduction(increase, "wood");
        this.changeProduction(increase, "stone");
        this.changeProduction(increase, "knowledge");
    }

    research(name) {
        switch (name) {
            case "changes":
                this.scienceManager.changes();
                break;
            case "agriculture":
                if (this.scienceManager.research(this.configManager.agricultureCost, this.pageManager.techAgricultureElement, [this.pageManager.agricultureP])) {
                    this.pageManager.foodImage.attr("src", "res/img/changes/grapes.png");
                    this.changeProduction(true, "food");
                }
                break;
            case "architecture":
                this.scienceManager.research(this.configManager.architectureCost, this.pageManager.techArchitectureElement, [this.pageManager.buildHutRow, this.pageManager.architectureP]);
                break;
            case "funeral":
                this.scienceManager.research(this.configManager.funeralCost, this.pageManager.techFuneralElement, [this.pageManager.buildScrollRow, this.pageManager.buildGraveRow,
                    this.pageManager.emptyRowBeforePopulationBuilding, this.pageManager.techChanges2Element, this.pageManager.funeralP]);
                break;
            case "changes2":
                this.scienceManager.research(this.configManager.changes2Cost, this.pageManager.techChanges2Element, [this.pageManager.techAgriculture2Element, this.pageManager.techArchitecture2Element,
                    this.pageManager.techLeadershipElement, this.pageManager.techStoneAgeElement, this.pageManager.changes2P]);
                break;
            case "leadership":
                this.scienceManager.research(this.configManager.leadershipCost, this.pageManager.techLeadershipElement, [this.pageManager.emptyRowBeforeJobLeader, this.pageManager.leaderRow,
                    this.pageManager.leadershipP]);
                break;
            case "agriculture2":
                if (this.scienceManager.research(this.configManager.agriculture2Cost, this.pageManager.techAgriculture2Element, [this.pageManager.agriculture2P])) {
                    this.pageManager.foodImage.attr("src", "res/img/changes2/field.png");
                    this.changeProduction(true, "food");
                    this.unlockAchievement("More Food");
                }
                break;
            case "architecture2":
                this.scienceManager.research(this.configManager.architecture2Cost, this.pageManager.techArchitecture2Element, [this.pageManager.buildPitRow, this.pageManager.architecture2P]);
                break;
            case "stone age":
                this.scienceManager.research(this.configManager.stoneAgeCost, this.pageManager.techStoneAgeElement, [this.pageManager.buildGranaryRow, this.pageManager.techArchitecture3Element,
                    this.pageManager.techMusicElement, this.pageManager.techSportElement, this.pageManager.techToolElement, this.pageManager.stoneAgeP]);
                break;
            case "architecture3":
                this.scienceManager.research(this.configManager.architecture3Cost, this.pageManager.techArchitecture3Element, [this.pageManager.buildDolmenRow, this.pageManager.architecture3P]);
                break;
            case "music":
                this.scienceManager.research(this.configManager.musicCost, this.pageManager.techMusicElement, [this.pageManager.emptyRowBeforeJobInClubElement,
                    this.pageManager.emptyRowBeforeBuildEfficiency, this.pageManager.buildMusicClubRow, this.pageManager.musicP]);
                break;
            case "sport":
                this.scienceManager.research(this.configManager.sportCost, this.pageManager.techSportElement, [this.pageManager.emptyRowBeforeJobInClubElement,
                    this.pageManager.emptyRowBeforeBuildEfficiency, this.pageManager.buildYogaClubRow, this.pageManager.sportP]);
                break;
            case "tool":
                this.scienceManager.research(this.configManager.toolCost, this.pageManager.techToolElement, [this.pageManager.techAxeElement, this.pageManager.techPickaxeElement,
                    this.pageManager.techHoeElement, this.pageManager.techAncientWeaponElement, this.pageManager.techArchitecture4Element, this.pageManager.toolP]);
                break;
            case "weapon":
                if (this.scienceManager.research(this.configManager.ancientWeaponCost, this.pageManager.techAncientWeaponElement, [this.pageManager.emptyRowbeforeBuildWar,
                    this.pageManager.buildBarrackRow, this.pageManager.tech2sideScrollElement, this.pageManager.weaponP])) {
                    this.changeAllProduction(true);
                }
                break;
            case "hoe":
                if (this.scienceManager.research(this.configManager.hoeCost, this.pageManager.techHoeElement, [this.pageManager.hoeP])) {
                    this.configManager.foodIncreaseStep = 0.1;
                    this.changeProduction(true, "food");
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "axe":
                if (this.scienceManager.research(this.configManager.axeCost, this.pageManager.techAxeElement, [this.pageManager.axeP])) {
                    this.changeProduction(true, "wood");
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "pickaxe":
                if (this.scienceManager.research(this.configManager.pickaxeCost, this.pageManager.techPickaxeElement, [this.pageManager.pickAxeP])) {
                    this.changeProduction(true, "stone");
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "2 side scroll":
                if (this.scienceManager.research(this.configManager.bothSideScrollCost, this.pageManager.tech2sideScrollElement, [this.pageManager.twoSideScrollP])) {
                    this.configManager.changeCurResourceQuantity("maxKnowledge", this.configManager.scrollQuantity * this.configManager.knowledgeInScroll);
                    this.configManager.knowledgeInScroll *= 2;
                    this.pageManager.buildScrollDefinition.text("+10 space for knowledge");
                    this.pageManager.buildScrollButton.text("2-side scroll");
                }
                break;
            case "architecture4":
                this.scienceManager.research(this.configManager.architecture4Cost, this.pageManager.techArchitecture4Element, [this.pageManager.buildPalaceRow, this.pageManager.techBronzeAgeElement,
                    this.pageManager.architecture4P]);
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