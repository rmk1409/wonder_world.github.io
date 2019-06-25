import EventManager from "./eventManager";
import ConfigManager from "./configManager";
import BuilderManager from "./builderManager";
import PageManager from "./pageManager";
import CitizenManager from "./citizenManager";

class GameManager {
    constructor() {
        this.pageManager = new PageManager(this);
        this.eventManager = new EventManager();
        this.configManager = new ConfigManager(this);
        this.builderManager = new BuilderManager(this);
        this.citizenManager = new CitizenManager(this);
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
                if (this.builderManager.build(10, 10, [this.pageManager.graveQuantityElement, this.pageManager.maxInGravesQuantityElement], [1, 1])) {
                    if (!this.configManager.buildFuneralFlag) {
                        this.pageManager.showElement([this.pageManager.jobFuneralRow, this.pageManager.emptyRowBeforeJobFuneral, this.pageManager.inGravesRow]);
                        this.configManager.buildFuneralFlag = true;
                    }
                    return true;
                }
                return false;
            case "scroll":
                return this.builderManager.build(0, 10, [this.pageManager.scrollQuantityElement, this.pageManager.maxKnowledgeQuantity], [1, this.configManager.knowledgeStoreInOneScroll]);
            case "granary":
                return this.builderManager.build(50, 50, [this.pageManager.granaryQuantityElement, this.pageManager.maxFoodQuantity], [1, 50]);
            case "pit":
                return this.builderManager.build(50, 50, [this.pageManager.pitQuantityElement, this.pageManager.maxWoodQuantity, this.pageManager.maxStoneQuantity], [1, 50, 50]);
            case "tent":
                return this.builderManager.build(20, 0, [this.pageManager.tentQuantityElement, this.pageManager.maxPopulationElement], [1, 2])
            case "hut":
                return this.builderManager.build(50, 20, [this.pageManager.hutQuantityElement, this.pageManager.maxPopulationElement], [1, 5]);
            case "campfire":
                if (this.builderManager.build(30, 10, [this.pageManager.campfireQuantityElement, this.pageManager.maxScientistQuantityElement], [1, this.configManager.spaceInOneCampfire])) {
                    if (!this.configManager.scientistPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforeJobScientist, this.pageManager.jobScientistRow, this.pageManager.emptyRowBeforeKnowledge, this.pageManager.knowledgeRow]);
                        this.configManager.scientistPresentFlag = true;
                    }
                    this.configManager.availableScientistSpaces += this.configManager.spaceInOneCampfire;
                    return true;
                }
                return false;
            case "dolmen":
                if (this.builderManager.build(80, 80, [this.pageManager.dolmenQuantityElement, this.pageManager.maxScientistQuantityElement], [1, this.pageManager.spaceInOneDolmen])) {
                    this.configManager.availableScientistSpaces += this.configManager.spaceInOneDolmen;
                    return true;
                }
                return false;
            case "music-club":
                if (this.builderManager.build(225, 225, [this.pageManager.musicClubQuantityElement, this.pageManager.maxDjQuantity, this.pageManager.maxHappyPeople], [1, 1, this.configManager.spaceInOneClub])) {
                    if (!this.configManager.djPresentFlag) {
                        this.pageManager.showElement([this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.happinessRowElement, this.pageManager.emptyRowBeforProductivityRowElement, this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobDjRowElement]);
                        this.configManager.djPresentFlag = true;
                    }
                    this.configManager.currentDjSpaces++;
                    return true;
                }
                return false;
            case "yoga-club":
                if (this.builderManager.build(225, 225, [this.pageManager.yogaClubQuantityElement, this.pageManager.maxInstructorQuantityElement, this.pageManager.maxHealthPeopleElement], [1, 1, this.pageManager.spaceInOneClub])) {
                    if (!this.configManager.instructorPresentFlag) {
                        this.pageManager.showElement(this.pageManager.emptyRowBeforHappinessRowElement, this.pageManager.healthRowElement, this.pageManager.emptyRowBeforProductivityRowElement, this.pageManager.productivityRowElement, this.pageManager.emptyRowBeforeJobInClubElement, this.pageManager.jobInstructorRowElement);
                        this.configManager.instructorPresentFlag = true;
                    }
                    this.configManager.currentInstructorSpaces++;
                }
                break;
            case "palace":
                if (this.builderManager.build(1000, 1000, [this.pageManager.palaceQuantityElement, this.pageManager.dolmenQuantityElement, this.pageManager.musicClubQuantityElement, this.pageManager.yogaClubQuantityElement, this.pageManager.maxScientistQuantityElement, this.pageManager.maxHappyPeople, this.pageManager.maxHealthPeopleElement, this.pageManager.maxDjQuantity, this.pageManager.maxInstructorQuantityElement], [1, 5, 10, 10, 5 * this.configManager.spaceInOneDolmen, 10 * this.configManager.spaceInOneClub, 10 * this.configManager.spaceInOneClub, 10, 10])) {
                    this.unlockAchievement("Palace");
                    if (!this.configManager.palacePresentFlag) {
                        // TODO Finished
                        if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've just killed: " + (this.pageManager.corpQuantityElement.text() + this.pageManager.inGraveQuantityElement.text()) + " people. (￣▽￣)ノ Great job!! \n" + /*USER_NAME*/ +", do you wanna start again?")) {
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
                if (this.builderManager.build(200, 100, [this.pageManager.barrackQuantityElement, this.pageManager.maxWarriorQuantityElement], [1, 10])) {
                    if (!this.configManager.barrackPresentFlag) {
                        this.pageManager.showElement([this.pageManager.jobWarriorRow]);
                        this.configManager.barrackPresentFlag = true;
                    }
                    return true;
                }
                return false;
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

    reloadSite(){
        Page.reloadSite();
    }
}

export default GameManager;