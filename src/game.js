import Event from "./event";
import Config from "./config";
import Builder from "./builder";
import Page from "./page";

class Game {
    constructor(page) {
        this.page = page;
        this.event = new Event();
        this.config = new Config();
        this.builder = new Builder(this.page, this.event);
    }

    createCitizen(num) {
        this.page.changeCurPopulation(num);
        this.page.changeCurLazybone(num);
        this.page.changeFoodProduction(-num);
    }

    createWorker(num) {
        if (this.page.foodQuantity.text() >= this.config.citizenCost * num && (+this.page.curPopulationElement.text() + num) <= this.page.maxPopulationElement.text()) {
            Page.changeFloatNumber(this.page.foodQuantity, -this.config.citizenCost * num);
            this.createCitizen(num);
            console.log(this.config.citizenCost)

            console.log(this.page.curPopulationElement.text());
            console.log(this.page.djQuantityElement.text() * this.config.spaceInOneClub);

            if (+this.page.curPopulationElement.text() <= +this.page.djQuantityElement.text() * this.config.spaceInOneClub) {
                this.page.curHappyPeople.text(this.page.curPopulationElement.text());
            }
            if (+this.page.curPopulationElement.text() <= +this.page.instructorQuantityElement.text() * this.config.spaceInOneClub) {
                this.page.curHealthPeople.text(this.page.curPopulationElement.text());
            }
        } else {
            this.event.addEvent("food or houses");
        }
    }

    unlockAchievement(achievementName) {
        this.page.unlockAchievement(achievementName);
    }

    build(name) {
        switch (name) {
            case "pit":
                return this.builder.build(50, 50, [this.page.pitQuantityElement, this.page.maxWoodQuantity, this.page.maxStoneQuantity], [1, 50, 50]);
            case "grave":
                if (this.builder.build(10, 10, [this.page.graveQuantityElement, this.page.maxInGravesQuantityElement], [1, 1])) {
                    if (!this.config.buildFuneralFlag) {
                        this.page.showElement([this.page.jobFuneralRow, this.page.emptyRowBeforeJobFuneral, this.page.inGravesRow]);
                        this.config.buildFuneralFlag = true;
                    }
                    return true;
                }
                return false;
            case "scroll":
                return this.builder.build(0, 10, [this.page.scrollQuantityElement, this.page.maxKnowledgeQuantity], [1, this.config.knowledgeStoreInOneScroll]);
            case "granary":
                return this.builder.build(50, 50, [this.page.granaryQuantityElement, this.page.maxFoodQuantity], [1, 50]);
            case "tent":
                return this.builder.build(20, 0, [this.page.tentQuantityElement, this.page.maxPopulationElement], [1, 2])
            case "hut":
                return this.builder.build(50, 20, [this.page.hutQuantityElement, this.page.maxPopulationElement], [1, 5]);
            case "campfire":
                if (this.builder.build(30, 10, [this.page.campfireQuantityElement, this.page.maxScientistQuantityElement], [1, this.config.spaceInOneCampfire])) {
                    if (!this.config.scientistPresentFlag) {
                        this.page.showElement([this.page.emptyRowBeforeJobScientist, this.page.jobScientistRow, this.page.emptyRowBeforeKnowledge, this.page.knowledgeRow]);
                        this.config.scientistPresentFlag = true;
                    }
                    this.config.availableScientistSpaces += this.config.spaceInOneCampfire;
                    return true;
                }
                return false;
            case "dolmen":
                if (this.builder.build(80, 80, [this.page.dolmenQuantityElement, this.page.maxScientistQuantityElement], [1, this.page.spaceInOneDolmen])) {
                    this.config.availableScientistSpaces += this.config.spaceInOneDolmen;
                    return true;
                }
                return false;
            case "music-club":
                if (this.builder.build(75, 75, [this.page.musicClubQuantityElement, this.page.maxDjQuantity, this.page.maxHappyPeople], [1, 1, this.config.spaceInOneClub])) {
                    if (!this.config.djPresentFlag) {
                        this.page.showElement([this.page.emptyRowBeforHappinessRowElement, this.page.happinessRowElement, this.page.emptyRowBeforProductivityRowElement, this.page.productivityRowElement, this.page.emptyRowBeforeJobInClubElement, this.page.jobDjRowElement]);
                        this.config.djPresentFlag = true;
                    }
                    this.config.currentDjSpaces++;
                    return true;
                }
                return false;
            case "yoga-club":
                if (this.builder.build(75, 75, [this.page.yogaClubQuantityElement, this.page.maxInstructorQuantityElement, this.page.maxHealthPeopleElement], [1, 1, this.page.spaceInOneClub])) {
                    if (!this.config.instructorPresentFlag) {
                        this.page.showElement(this.page.emptyRowBeforHappinessRowElement, this.page.healthRowElement, this.page.emptyRowBeforProductivityRowElement, this.page.productivityRowElement, this.page.emptyRowBeforeJobInClubElement, this.page.jobInstructorRowElement);
                        this.config.instructorPresentFlag = true;
                    }
                    this.config.currentInstructorSpaces++;
                }
                break;
            case "palace":
                if (this.builder.build(1000, 1000, [this.page.palaceQuantityElement, this.page.dolmenQuantityElement, this.page.musicClubQuantityElement, this.page.yogaClubQuantityElement, this.page.maxScientistQuantityElement, this.page.maxHappyPeople, this.page.maxHealthPeopleElement, this.page.maxDjQuantity, this.page.maxInstructorQuantityElement], [1, 5, 10, 10, 5 * this.config.spaceInOneDolmen, 10 * this.config.spaceInOneClub, 10 * this.config.spaceInOneClub, 10, 10])) {
                    this.unlockAchievement("Palace");
                    if (!this.config.palacePresentFlag) {
                        // TODO Finished
                        if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've just killed: " + (this.page.corpQuantityElement.text() + this.page.inGraveQuantityElement.text()) + " people. (￣▽￣)ノ Great job!! \n" + /*USER_NAME*/ + ", do you wanna start again?")) {
                            Page.reloadSite();
                        } else {
                            this.page.showElement([this.page.startButton]);
                        }
                        $(this).prop("disabled", true);
                        this.config.palacePresentFlag = true;
                    }
                    this.config.availableScientistSpaces += this.config.spaceInOneDolmen * 5;
                    let clubInOnePalace = 10;
                    this.config.currentDjSpaces += clubInOnePalace;
                    this.config.currentInstructorSpaces += clubInOnePalace;
                }
                break;
            case "barrack":
                if (this.builder.build(200, 100, [this.page.barrackQuantityElement, this.page.maxWarriorQuantityElement], [1, 10])) {
                    if (!this.config.barrackPresentFlag) {
                        this.page.showElement([this.page.jobWarriorRow]);
                        this.config.barrackPresentFlag = true;
                    }
                    return true;
                }
                return false;
        }
    }
}

export default Game;