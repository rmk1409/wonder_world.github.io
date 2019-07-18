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

        this.userKey = "USER_NAME";
    }

    initialization() {
        let userName = localStorage.getItem(this.userKey);
        if (userName) {
            userName = confirm(`＼(￣▽￣)／, are you ${userName}, yes?`) ? userName : prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        } else {
            userName = prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        }
        this.configManager.userName = userName;

        localStorage.setItem(this.userKey, userName);
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

    build(buildingType) {
        return this.builderManager.buildNewBuilding(buildingType);
    }

    setWorker(workType, amount) {
        let result = false;

        switch (workType) {
            default:
                result = this.citizenManager.setWorker(workType, amount);
                break;
            case "leader":
                result = this.citizenManager.setWorker(workType, amount);
                if (result && !this.configManager.leaderPresentFlag) {
                    this.pageManager.workTableEmptyTd.attr("colspan", "6");
                    this.pageManager.showElement([this.pageManager.tenWorkTd]);

                    this.configManager.leaderPresentFlag = true;
                }
                break;
        }

        return result;
    }

    reloadSite() {
        PageManager.reloadSite();
    }

    pause() {
        alert("...pause. ");
    }

    changeProduction(what, increase) {
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
        this.changeProduction("food", increase);
        this.changeProduction("wood", increase);
        this.changeProduction("stone", increase);
        this.changeProduction("knowledge", increase);
    }

    // TODO map and researchChanges/researchArchitecture and so on, return result
    research(name) {
        switch (name) {
            case "changes":
                this.scienceManager.researchChanges();
                break;
            case "agriculture":
                if (this.scienceManager.research(this.configManager.agricultureCost, this.pageManager.techAgricultureElement, [this.pageManager.agricultureP])) {
                    this.pageManager.foodImage.attr("src", "res/img/changes/grapes.png");
                    this.changeProduction("food", true);
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
                this.scienceManager.research(this.configManager.changes2Cost, this.pageManager.techChanges2Element, [this.pageManager.pauseButton, this.pageManager.techAgriculture2Element,
                    this.pageManager.techArchitecture2Element, this.pageManager.techLeadershipElement, this.pageManager.techStoneAgeElement, this.pageManager.changes2P]);
                break;
            case "leadership":
                this.scienceManager.research(this.configManager.leadershipCost, this.pageManager.techLeadershipElement, [this.pageManager.emptyRowBeforeJobLeader, this.pageManager.leaderRow,
                    this.pageManager.leadershipP]);
                break;
            case "agriculture2":
                if (this.scienceManager.research(this.configManager.agriculture2Cost, this.pageManager.techAgriculture2Element, [this.pageManager.agriculture2P])) {
                    this.pageManager.foodImage.attr("src", "res/img/changes2/field.png");
                    this.changeProduction("food", true);
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
                this.scienceManager.research(this.configManager.musicCost, this.pageManager.techMusicElement, [this.pageManager.emptyRowBeforeBuildEfficiency, this.pageManager.buildMusicClubRow,
                    this.pageManager.musicP]);
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
                    this.changeProduction("food", true);
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "axe":
                if (this.scienceManager.research(this.configManager.axeCost, this.pageManager.techAxeElement, [this.pageManager.axeP])) {
                    this.changeProduction("wood", true);
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "pickaxe":
                if (this.scienceManager.research(this.configManager.pickaxeCost, this.pageManager.techPickaxeElement, [this.pageManager.pickAxeP])) {
                    this.changeProduction("stone", true);
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