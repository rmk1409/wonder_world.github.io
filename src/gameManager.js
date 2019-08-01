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
            this.eventManager.addAchievement("UFO Alien");
        }

        this.intervalManager.runInterval();
        this.runTooltips();
    }

    // TODO add save/load buttons
    loadGame() {

    }

    saveGame() {

    }

    getUserName() {
        let userName = localStorage.getItem(this.userKey);
        if (userName) {
            userName = confirm(`＼(￣▽￣)／, are you ${userName}, yes?`) ? userName : prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        } else {
            userName = prompt("＼(￣▽￣)／ Great person, say me, what is your name?") || "UFO Alien";
        }
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        this.configManager.userName = userName;

        localStorage.setItem(this.userKey, userName);
        this.pageManager.userNameElement.text(userName);
        return userName;
    }

    clickResourceButton(resourceType, quantity) {
        resourceType.changeQuantity(quantity);

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
        let result = this.citizenManager.setCitizenToWork(workType, quantity);
        this.checkLeaderPresence(result, workType);
        return result;
    }

    checkLeaderPresence(result, workType) {
        if (result && workType === this.configManager.leader && !this.configManager.leaderPresentFlag) {
            this.pageManager.workTableEmptyTd.attr("colspan", "7");
            this.pageManager.showElement([this.pageManager.tenWorkTd]);

            this.configManager.leaderPresentFlag = true;
        }
    }

    build(buildingType) {
        return this.builderManager.buildNewBuilding(buildingType);
    }

    research(name) {
        return this.scienceManager.research(name);
    }

    reloadSite() {
        PageManager.reloadSite();
    }

    pause() {
        $("body").css({"opacity": "0.1"});
        setTimeout(()=>{
            alert("...pause. ");
        }, 100);
        setTimeout(()=>{
            $("body").css({"opacity": "1"});
        }, 300);
    }

    getFullResources() {
        this.configManager.food.changeQuantity(this.configManager.foodStorage.quantity);
        this.configManager.wood.changeQuantity(this.configManager.woodStorage.quantity);
        this.configManager.stone.changeQuantity(this.configManager.stoneStorage.quantity);
        this.configManager.knowledge.changeQuantity(this.configManager.knowledgeStorage.quantity);
    }

    runTooltips() {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

export default GameManager;