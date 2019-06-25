import EventManager from "./eventManager";
import ConfigManager from "./configManager";
import BuilderManager from "./builderManager";
import PageManager from "./pageManager";
import CitizenManager from "./citizenManager";
import ScienceManager from "./scienceManager";

class GameManager {
    constructor() {
        this.pageManager = new PageManager(this);
        this.eventManager = new EventManager();
        this.configManager = new ConfigManager(this);
        this.builderManager = new BuilderManager(this);
        this.citizenManager = new CitizenManager(this);
        this.scienceManager = new ScienceManager(this);
    }

    createCitizen(num) {
        this.citizenManager.birthCitizen(num);
    }

    createWorker(num) {
        this.citizenManager.createCitizen(num);
    }

    unlockAchievement(achievementName) {
        this.pageManager.unlockAchievement(achievementName);
    }

    build(name) {
        switch (name) {
            case "grave":
                if (this.builderManager.build(10, 10, ["grave", "maxInGraves"], [1, 1])) {
                    if (!this.configManager.buildFuneralFlag) {
                        this.pageManager.showElement([this.pageManager.jobFuneralRow, this.pageManager.emptyRowBeforeJobFuneral, this.pageManager.inGravesRow]);
                        this.configManager.buildFuneralFlag = true;
                    }
                    return true;
                }
                return false;
            case "scroll":
                return this.builderManager.build(0, 10, ["scroll", "maxKnowledge"], [1, this.configManager.knowledgeStoreInOneScroll]);
            case "granary":
                return this.builderManager.build(50, 50, ["granary", "maxFood"], [1, 50]);
            case "pit":
                return this.builderManager.build(50, 50, ["pit", "maxStone", "maxWood"], [1, 50, 50]);
            case "tent":
                return this.builderManager.build(20, 0, ["tent", "maxPop"], [1, 2])
            case "hut":
                return this.builderManager.build(50, 20, ["hut", "maxPop"], [1, 5]);
            case "campfire":
                if (this.builderManager.build(30, 10, ["campfire", "maxScientistQuantity"], [1, this.configManager.spaceInOneCampfire])) {
                    if (!this.configManager.scientistPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforeJobScientist, this.pageManager.jobScientistRow, this.pageManager.emptyRowBeforeKnowledge, this.pageManager.knowledgeRow]);
                        this.configManager.scientistPresentFlag = true;
                    }
                    this.configManager.availableScientistSpaces += this.configManager.spaceInOneCampfire;
                    return true;
                }
                return false;
            case "dolmen":
                if (this.builderManager.build(80, 80, ["dolmen", "maxScientistQuantity"], [1, this.configManager.spaceInOneDolmen])) {
                    this.configManager.availableScientistSpaces += this.configManager.spaceInOneDolmen;
                    return true;
                }
                return false;
            case "music-club":
                if (this.builderManager.build(225, 225, ["musicClub", "maxDjQuantity", "maxHappyPeople"], [1, 1, this.configManager.spaceInOneClub])) {
                    if (!this.configManager.djPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.happinessRowElement, this.pageManager.emptyRowBeforProductivityRowElement, this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobDjRowElement]);
                        this.configManager.djPresentFlag = true;
                    }
                    this.configManager.currentDjSpaces++;
                    return true;
                }
                return false;
            case "yoga-club":
                if (this.builderManager.build(225, 225, ["yogaClub", "maxInstructorQuantity", "maxHealthyPeople"], [1, 1, this.pageManager.spaceInOneClub])) {
                    if (!this.configManager.instructorPresentFlag) {
                        this.pageManager.showElement(this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.healthRowElement, this.pageManager.emptyRowBeforProductivityRowElement, this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobInstructorRowElement);
                        this.configManager.instructorPresentFlag = true;
                    }
                    this.configManager.currentInstructorSpaces++;
                }
                break;
            case "palace":
                if (this.builderManager.build(1000, 1000, ["palace", "dolmen", "musicClub", "yogaClub", "maxScientistQuantity", "maxHappyPeople", "maxHealthyPeople", "maxDjQuantity", "maxInstructorQuantity"], [1, 5, 10, 10, 5 * this.configManager.spaceInOneDolmen, 10 * this.configManager.spaceInOneClub, 10 * this.configManager.spaceInOneClub, 10, 10])) {
                    this.unlockAchievement("Palace");
                    if (!this.configManager.palacePresentFlag) {
                        // TODO Finished
                        if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've just killed: " + (this.pageManager.corpseQuantityElement.text() + this.pageManager.inGraveQuantityElement.text()) + " people. (￣▽￣)ノ Great job!! \n" + /*USER_NAME*/ +", do you wanna start again?")) {
                            PageManager.reloadSite();
                        } else {
                            this.pageManager.showElement([this.pageManager.startButton]);
                        }
                        $(this).prop("disabled", true);
                        this.configManager.palacePresentFlag = true;
                    }
                    this.configManager.availableScientistSpaces += this.configManager.spaceInOneDolmen * 5;
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

        let userName = this.configManager.userName;
        userName = localStorage.getItem(userKey);
        userName = confirm(`＼(￣▽￣)／, are you ${userName}, yes?`) && userName
            || prompt("＼(￣▽￣)／ Great person, say me, what is your name?")
            || "UFO Alien";

        localStorage.setItem(userKey, userName);
        $("#user-name").text(userName);

        if (userName === "UFO Alien") {
            this.unlockAchievement("UFO Alien");
        }
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
            default:
                this.scienceManager.research(name);
                break;
            case "changes":
                this.scienceManager.changes()
        }
    }
}

export default GameManager;