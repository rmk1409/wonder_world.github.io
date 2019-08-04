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
            $("#user-name-input").attr("value", userName);
        }
        if (!localStorage.getItem("INITIAL_VALUE_MAP")){
            $("#main-menu-load-button").prop("disabled", true);
            $("#in-game-load-button").prop("disabled", true);
        }
        this.runMainMenuModal();
    }

    runMainMenuModal() {
        $('#main-menu-modal').on('shown.bs.modal', ()=> {
            $('#user-name-input').trigger('focus')
        });
        $('#main-menu-modal').modal();

        $("#user-name-input").on('keyup', (e)=>{
            if (e.key === "Enter") {
                this.getUserNameFromModal();
                $('#main-menu-modal').modal('toggle');
                $('#get-food-modal').modal();
            }
        });

        $("#main-menu-new-game-button").on("click", ()=>{
            this.getUserNameFromModal();
            $('#main-menu-modal').modal('toggle');
            $('#get-food-modal').modal();
        });
    }

    getUserNameFromModal() {
        let userName = $("#user-name-input").val().trim();
        userName = userName || "No named";
        if (userName === "UFO Alien") {
            this.eventManager.addAchievement("UFO Alien");
        }
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        this.configManager.userName = userName;

        localStorage.setItem(this.userKey, userName);
        this.pageManager.userNameElement.text(userName);

        this.intervalManager.runInterval();
        this.runTooltips();
    }

    clickResourceButton(resourceType, quantity) {
        resourceType.changeValue(quantity);

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
        setTimeout(() => {
            alert("...pause. ");
        }, 100);
        setTimeout(() => {
            $("body").css({"opacity": "1"});
        }, 300);
    }

    getFullResources() {
        this.configManager.food.changeValue(+this.configManager.foodStorage);
        this.configManager.wood.changeValue(+this.configManager.woodStorage);
        this.configManager.stone.changeValue(+this.configManager.stoneStorage);
        this.configManager.knowledge.changeValue(+this.configManager.knowledgeStorage);
    }

    runTooltips() {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

export default GameManager;