// TODO refactoring this class
class EventManager {
    constructor() {
        this.okMsg = "Everything is ok. Let s relax. ☕";
        this.lackLazyboneMsg = "👷‍♂️👷‍♂ Find more lazybones.";
        this.starvationMsg = "🍽️🍽️ HELP!!! We don't have enough food. :(";
        this.foodOrHouseMsg = "☑ You need more food or houses.";
        this.moreResourceMsg = "☑ Collect more resources.";
        this.moreKnowledgeMsg = "☑ Collect more knowledge.";
        this.moreScienceBuildingMsg = "☑ Build more campfires or other science buildings.";
        this.moreMusicClubsMsg = "☑ Build more entertainment buildings.";
        this.moreYogaClubsMsg = "☑ Build more health buildings.";
        this.moreBarrackMsg = "☑ Build more barracks.";
        this.funeralProccessMoreWorkersMsg = "👥👥 One funeral requires 2 workers.";
        this.elvesCantCutTreeMsgPart1 = "🧝🧝 Elves can't cut trees, so sometimes they take it from the others. They said - thank you. And took: ";
        this.elvesCantCutTreePart2 = " of your wood.";
        this.elvesAreDisappointed = "🧝🧝 You don t have wood. Elves are disappointed of us.. :((";
        this.elvesLike = "🧝🧝 Main Elf said - we like you.";
        this.nightmareMsg = "👩‍🌾👩‍🌾 👾👾 Your farmers said that they saw strange nightmares.";
        this.strangeInTheSkiesMsg = "👩‍🌾👩‍🌾 Your farmers said that they saw something strange in the skies. You said - ha, rich imagination";
        this.ufoKilledMsgPart1 = "🛸 Ufo Aliens tried to improve your human beings, but it wasn't successful. Unfortunately they killed: ";
        this.ufoKilledMsgPart2 = " of your farmers. Maybe in the next time.";
        this.ufoArtifactMsgPart1 = "🛸 Ufo gave to you a mighty artifact to improve your human beings, but your people didn't know how to apply this and they just exchanged it with more advanced civilization for: ";
        this.ufoArtifactMsgPart2 = " stones.";
        this.overturnedCorpsesMsg = "🧑🧑🧑 Your people said that corpses overturned during the last full moon night. You said - ha, rich imagination";
        this.whiteWalkersInAnotherVillage = "🧛🧛 Some white walkers came from your corpse storage and went to another village. Than they went back to sleep.";
        this.foolMoonMsg = "Your people liked fool moon this night 🌘";
        this.deathBecauseOfZombie = "🌘🧛 You people died because of too many zombies.";
        this.newAchievement = "🙊🙈🙉 Get a new achievement.";

        this.successStatus = "success";
        this.primaryStatus = "primary";
        this.warningStatus = "warning";
        this.dangerStatus = "danger";
    }

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;
        this.configManager = this.gameManager.configManager;
        this.citizenManager = this.gameManager.citizenManager;
    }

    addEvent(what, changes) {
        let msgMap = new Map([
            ["ok", [this.okMsg, this.successStatus]],
            ["starvation", [this.starvationMsg, this.dangerStatus]],
            // lack of resource
            ["food or houses", [this.foodOrHouseMsg, this.warningStatus]],
            ["more resources", [this.moreResourceMsg, this.warningStatus]],
            ["more knowledge", [this.moreKnowledgeMsg, this.warningStatus]],
            // lack of building
            ["more campfires", [this.moreScienceBuildingMsg, this.warningStatus]],
            ["more music clubs", [this.moreMusicClubsMsg, this.warningStatus]],
            ["more yoga clubs", [this.moreYogaClubsMsg, this.warningStatus]],
            ["more barrack", [this.moreBarrackMsg, this.warningStatus]],
            // lack of free workers
            ["lack of lazybones", [this.lackLazyboneMsg, this.warningStatus]],
            ["1 funeral process needs 2 workers", [this.funeralProccessMoreWorkersMsg, this.warningStatus]],
            // event
            // ufo
            ["ufo gave an artifact", [`${this.ufoArtifactMsgPart1} ${changes} ${this.ufoArtifactMsgPart2}`, this.successStatus]],
            ["strange in the skies", [this.strangeInTheSkiesMsg, this.primaryStatus]],
            ["nightmare", [this.nightmareMsg, this.primaryStatus]],
            ["ufo killed", [`${this.ufoKilledMsgPart1} ${changes} ${this.ufoKilledMsgPart2}`, this.dangerStatus]],
            // zombie
            ["fool moon", [this.foolMoonMsg, this.primaryStatus]],
            ["overturned corpses", [this.overturnedCorpsesMsg, this.warningStatus]],
            ["white walkers in another village", [`🧛🧛 ${changes} white walkers came from your corpse storage and went to another village. Than they went back to sleep.`, this.warningStatus]],
            ["white walker killed", ["🧛🧛 Some white walkers came from your corpse storage and killed a few of your people. Than they went back. You have more corpses.", this.dangerStatus]],
            ["death because of zombies", [this.deathBecauseOfZombie, this.dangerStatus]],
            // farmer
            ["potatoes", [`👩‍🌾👩‍🌾 Farmers found ${changes} potatoes.🥔🥔🥔🥔`, this.successStatus]],
            ["kiwi", [`👩‍🌾👩‍🌾 Farmers found ${changes} kiwi fruits.🥝🥝🥝🥝`, this.successStatus]],
            ["wild rabbits", ["🐰🐰🐰 Farmers saw the wild rabbits.", this.primaryStatus]],
            ["rats", [`🐀🐀🐀 Rats ate ${changes} of your food.`, this.dangerStatus]],
            ["assassin rabbits", [`🐰🐰🐰 Farmers found wild rabbits on the field. Obviously it was bad decision to take rabbit's food. Assassin rabbits killed : ${changes} farmers.`, this.dangerStatus]],
            // weather
            ["middle earthquake", [`🧶️ There was a middle earthquake. Some trees were down and it gave you : ${changes} woods.`, this.successStatus]],
            ["small rain", ["🌈 There was a small rain.", this.primaryStatus]],
            ["light earthquake", ["🧶 There was a light earthquake.", this.primaryStatus]],
            ["storm", [`⛈️There is a storm. It spoiled some of your wood: ${changes} is lost.`, this.dangerStatus]],
            ["big earthquake", [`🧶 ☹ There was a big earthquake. Unfortunately it killed: ${changes} of your miners.`, this.dangerStatus]],
            // amazon
            ["amazons brought", [`👧👧👧👧 Amazons brought a few males to your people . ${changes} new free people.`, this.successStatus]],
            ["amazons are there", ["Your people saw a lot of beautiful wild amazons 👧👧👧", this.primaryStatus]],
            ["amazons speaking", ["👧👧👧 Your people communicated a bit with Amazons.", this.primaryStatus]],
            ["amazons kidnapped", [`👧👧👧👧 Wild Amazons kidnapped some of your people. Than they brought you back ${changes} male corpses, you see smiles on corpse's faces.`, this.dangerStatus]],
            // elf
            ["elves like", [this.elvesLike, this.primaryStatus]],
            ["elves are disappointed", [this.elvesAreDisappointed, this.primaryStatus]],
            ["elves can't cut trees", [`${this.elvesCantCutTreeMsgPart1} ${changes} ${this.elvesCantCutTreePart2}`, this.dangerStatus]],
            ["elves don't like", [`🧝🧝 Elves don't like when you cut trees. They killed: ${changes} of your woodcutters. They said - sorry.`, this.dangerStatus]],
            // lifecycle
            ["new people were born", [`👪👪 ${changes} new people were born.`, this.successStatus]],
            ["died because of age", [`👪👪 ${changes} died because of age.`, this.dangerStatus]]
        ]);
        let msgElem = msgMap.get(what);
        let msg = msgElem[0];
        let status = msgElem[1];

        if (msg) {
            let event = $(`<div class="alert alert-${status}" role="alert"><span>${this.getMsgWithTime(msg)}</span></div>`);
            this.pageManager.eventDiv.after(event);
            this.pageManager.showElement([event]);

            $("#events-div").animate({scrollTop: 0}, "fast")
        }
    }

    addAchievement(what) {
        this.pageManager.hideElement([this.pageManager.notAchievement]);
        let imgAchievMap = new Map([
            ["UFO Alien", this.pageManager.ufoAchievement],
            ["Palace", this.pageManager.palaceAchievement],
            ["First Research", this.pageManager.firstResearchAchievement],
            ["Starvation", this.pageManager.hungerAchievement],
            ["Productivity", this.pageManager.productivityAchievement],
            ["More Food", this.pageManager.moreFoodAchievement]
        ]);
        let imgAchiev = imgAchievMap.get(what);

        if (imgAchiev) {
            this.pageManager.achievementSection.append(imgAchiev);
            let event = $(`<div class="alert alert-${this.successStatus}" role="alert"><span>${this.getMsgWithTime(this.newAchievement)}</span></div>`);
            this.pageManager.eventDiv.after(event);
            this.pageManager.showElement([event, imgAchiev]);

            $("#events-div").animate({scrollTop: 0}, "fast")
        }
    }

    getMsgWithTime(msg) {
        return `${new Date().toLocaleTimeString()} : ${msg}`;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    eventHappen() {
        let eventMap = new Map([
            [1, () => this.nothingHappenEvent()],
            [2, () => this.ufoEvent()],
            [3, () => this.farmerEvent()],
            [4, () => this.weatherEvent()],
            [5, () => this.wildAmazonEvent()],
            [6, () => this.elfEvent()],
            [7, () => this.bloodMoonEvent()],
            [8, () => this.birthDeathCycleEvent()]

            //    TODO add to storm and rename to weather
            // // Drought (-foodProduction)
            // // Animals (-citizen quantity)
            // // Pets (+food consuming)
            // // Im/Emigration (+current population, - knowledge)
            // // Laziness/Motivation (-/+productivity)
        ]);

        let eventDiversity = this.configManager.currentPopulation > 20 ? eventMap.size : 1;
        eventMap.get(this.getRandomInt(eventDiversity))();
    }

    nothingHappenEvent() {
        this.addEvent("ok");
    }

    ufoEvent() {
        let farmers = this.configManager.farmerQuantity;
        if (farmers > 25) {
            switch (this.getRandomInt(3)) {
                case 1:
                    let killedFarmerAmount = Math.round(0.1 * farmers);
                    this.addEvent("ufo killed", killedFarmerAmount);
                    for (let i = 0; i < killedFarmerAmount; i++) {
                        this.citizenManager.killFarmer();
                    }
                    break;
                case 2:
                    this.addEvent("nightmare");
                    break;
                case 3:
                    let newResources = Math.round(0.6 * this.configManager.stoneQuantity);
                    this.addEvent("ufo gave an artifact", newResources);
                    this.configManager.changeCurResourceQuantity("stone", newResources);
                    break;
            }
        } else {
            this.addEvent("strange in the skies");
        }
    }

    farmerEvent() {
        let farmers = this.configManager.farmerQuantity;
        // this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🥔🥔 🥝🥝 your people see a lot of new kind of food.") + "</p>");

        let food = this.configManager.foodQuantity;
        switch (this.getRandomInt(5)) {
            case 1:
                this.addEvent("potatoes", Math.round(food * 1.8));
                this.configManager.changeCurResourceQuantity("food", Math.round(food * 1.8));
                break;
            case 2:
                this.addEvent("assassin rabbits", Math.round(farmers * 0.15));
                for (let i = 0, amount = Math.round(farmers * 0.15); i < amount; i++) {
                    this.citizenManager.killFarmer();
                }
                break;
            case 3:
                this.addEvent("wild rabbits");
                break;
            case 4:
                this.addEvent("kiwi", Math.round(food * 2.5));
                this.configManager.changeCurResourceQuantity("food", Math.round(food * 2.5));
                break;
            case 5:
                this.addEvent("rats", Math.round(food * 0.9));
                this.configManager.changeCurResourceQuantity("food", -Math.round(food * 0.9));
                break;
        }
    }

    weatherEvent() {
        // TODO add illness
        let wood = this.configManager.woodQuantity;
        let miners = this.configManager.minerQuantity;
        switch (this.getRandomInt(2)) {
            // Storm
            case 1:
                if (wood > 20) {
                    this.addEvent("storm", Math.round(wood * 0.3));
                    this.configManager.changeCurResourceQuantity("wood", -Math.round(wood * 0.3));
                } else {
                    this.addEvent("small rain");
                }
                break;
            // Earthquake
            case 2:
                switch (this.getRandomInt(2)) {
                    case 1:
                        if (miners > 7) {
                            let killedMinerAmount = Math.round(0.3 * miners);
                            this.addEvent("big earthquake", killedMinerAmount);
                            for (let i = 0, amount = killedMinerAmount; i < amount; i++) {
                                this.citizenManager.killMiner();
                            }
                        } else {

                            let newResources = Math.round(0.33 * this.configManager.woodMaxQuantity);
                            this.addEvent("middle earthquake", newResources);
                            this.configManager.changeCurResourceQuantity("wood", newResources);
                        }
                        break;
                    case 2:
                        this.addEvent("light earthquake");
                        break;
                }
                break;
        }
    }

    wildAmazonEvent() {
        let scientists = this.configManager.curScientistQuantity;
        if (scientists > 10) {
            switch (this.getRandomInt(3)) {
                case 1:
                    this.addEvent("amazons speaking");
                    break;
                case 2:
                    let killedScientistAmount = Math.round(0.5 * scientists);
                    this.addEvent("amazons kidnapped", killedScientistAmount);
                    for (let i = 0, amount = killedScientistAmount; i < amount; i++) {
                        this.citizenManager.killScientist();
                    }
                    this.configManager.changeCurResourceQuantity("knowledge", -this.configManager.knowledgeQuantity * 0.5);
                    break;
                case 3:
                    let newMaleAmount = Math.round(0.25 * scientists);
                    this.addEvent("amazons brought", newMaleAmount);
                    this.citizenManager.addCitizen(newMaleAmount);
                    break;
            }
        } else {
            this.addEvent("amazons are there");
        }
    }

    elfEvent() {
        switch (this.getRandomInt(2)) {
            case 1:
                let wood = Math.floor(this.configManager.woodQuantity);
                if (wood > 20) {
                    this.addEvent("elves can't cut trees", wood);
                    this.configManager.changeCurResourceQuantity("wood", -wood);
                } else {
                    this.addEvent("elves are disappointed");
                }
                break;
            case 2:
                if (this.configManager.woodmenQuantity > 7) {
                    let changes = this.configManager.woodmenQuantity;
                    this.addEvent("elves don't like", changes);
                    for (let i = 0; i < changes; i++) {
                        this.citizenManager.killWoodcutter();
                    }
                } else {
                    this.addEvent("elves like");
                }
                break;
        }
    }

    bloodMoonEvent() {
        let corpses = this.configManager.corpseQuantity;
        if (corpses) {
            switch (this.getRandomInt(2)) {
                case 1:
                    this.addEvent("overturned corpses");
                    break;
                case 2:
                    let wakeUpUndead = Math.round(this.getRandomInt(corpses) / 2);
                    switch (this.getRandomInt(2)) {
                        case 1:
                            if (wakeUpUndead && this.configManager.currentPopulation) {
                                this.addEvent("white walker killed");
                                for (let i = 0; i < wakeUpUndead; i++) {
                                    this.citizenManager.findPersonToKill();
                                }
                            }
                            break;
                        case 2:
                            this.addEvent("white walkers in another village", wakeUpUndead);
                            break;
                    }
            }
        } else {
            this.addEvent("fool moon");
        }
    }

    birthDeathCycleEvent() {
        let curPop = this.configManager.currentPopulation;
        let changeAmount = Math.round(this.getRandomInt(curPop) * 0.25);
        if (changeAmount) {
            switch (this.getRandomInt(2)) {
                case 1:
                    this.addEvent("new people were born", changeAmount);
                    this.citizenManager.addCitizen(changeAmount);
                    break;
                case 2:
                    this.addEvent("died because of age", changeAmount);
                    for (let i = 0; i < changeAmount; i++) {
                        this.citizenManager.findPersonToKill();
                    }
                    break;
            }
        }
    }
}

export default EventManager;