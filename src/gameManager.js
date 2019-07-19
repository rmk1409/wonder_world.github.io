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
        this.config = "GAME_CONFIG";
    }

    initialization() {
        let userName = this.getUserName();
        if (userName === "UFO Alien") {
            this.unlockAchievement("UFO Alien");
        }

        this.intervalManager.runInterval();
    }

    getUserName(){
        let userName = localStorage.getItem(this.userKey);
        if (userName) {
            userName = confirm(`＼(￣▽￣)／, are you ${userName}, yes?`) ? userName : prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        } else {
            userName = prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        }
        this.configManager.userName = userName;

        localStorage.setItem(this.userKey, userName);
        this.pageManager.userNameElement.text(userName);
        return userName;
    }

    clickResourceButton(resourceType, quantity) {
        this.configManager.changeCurResourceQuantity(resourceType, quantity);

        let buttonToBlur = this.pageManager.foodClickButton;
        switch (resourceType) {
            case "wood":
                buttonToBlur = this.pageManager.woodClickButton;
                break;
            case "stone":
                buttonToBlur = this.pageManager.stoneClickButton;
                break;
        }
        buttonToBlur.blur();
    }

    createWorker(quantity) {
        this.citizenManager.tryToCreateCitizen(quantity);
    }

    setWorker(workType, quantity) {
        let result = false;

        switch (workType) {
            default:
                result = this.citizenManager.setCitizenToWork(workType, quantity);
                break;
            case "leader":
                result = this.citizenManager.setCitizenToWork(workType, quantity);
                if (result && !this.configManager.leaderPresentFlag) {
                    this.pageManager.workTableEmptyTd.attr("colspan", "6");
                    this.pageManager.showElement([this.pageManager.tenWorkTd]);

                    this.configManager.leaderPresentFlag = true;
                }
                break;
        }

        return result;
    }

    build(buildingType) {
        return this.builderManager.buildNewBuilding(buildingType);
    }

    research(name) {
        return this.scienceManager.researchFromGame(name);
    }

    unlockAchievement(achievementType) {
        this.eventManager.addAchievement(achievementType);
    }

    reloadSite() {
        PageManager.reloadSite();
    }

    pause() {
        alert("...pause. ");
    }

    getFullResources() {
        this.configManager.changeCurResourceQuantity("food", this.configManager.resourceMap.get("maxFood").quantity);
        this.configManager.changeCurResourceQuantity("wood", this.configManager.resourceMap.get("maxWood").quantity);
        this.configManager.changeCurResourceQuantity("stone", this.configManager.resourceMap.get("maxStone").quantity);
        this.configManager.changeCurResourceQuantity("knowledge", this.configManager.resourceMap.get("maxKnowledge").quantity);
    }
}

export default GameManager;