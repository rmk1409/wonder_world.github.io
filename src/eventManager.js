// TODO refactoring this class
class EventManager {
    constructor() {
        // Msg's
        this.okMsg = "Everything is ok. Let s relax. ☕";
        this.lackLazyboneMsg = "&#9888; Find more lazybones. 👷‍♂";
        this.starvationMsg = "🍽️ HELP!!! We don't have enough food. :(";
        this.moreResourceMsg = "&#9888; Collect more resources.";
        this.moreKnowledgeMsg = "&#9888; Collect more knowledge.";
        this.moreScienceBuildingMsg = "&#9888; Build more science buildings.";
        this.moreMusicClubsMsg = "&#9888; Build more entertainment buildings.";
        this.moreYogaClubsMsg = "&#9888; Build more health buildings.";
        this.moreBarrackMsg = "&#9888; Build more barracks.";
        this.funeralProccessMoreWorkersMsg = "👥👥 One funeral requires 2 workers.";
        this.elvesCantCutTreeMsgPart1 = "🧝🧝 Elves can't cut trees, so sometimes they take it from the others. They said - THANK YOU. And took: ";
        this.elvesCantCutTreePart2 = " of your wood.";
        this.elvesAreDisappointed = "🧝🧝 You don t have wood. Elves are disappointed of us.. :((";
        this.elvesLike = "🧝🧝 Main Elf said - we like you.";
        this.nightmareMsg = "👩‍🌾👩‍🌾  Your farmers said that they saw strange nightmares. 👾👾";
        this.strangeInTheSkiesMsg = "👩‍🌾👩‍🌾 Your farmers said that they saw something strange in the skies. You said - ha, rich imagination";
        this.ufoKilledMsgPart1 = "🛸 Ufo Aliens tried to improve your human beings, but it wasn't successful. Unfortunately they killed: ";
        this.ufoKilledMsgPart2 = " of your farmers. Maybe in the next time.";
        this.ufoArtifactMsgPart1 = "🛸 Ufo gave to you a mighty artifact, but your people don't know how to apply this and they just exchanged it with more advanced civilization for: ";
        this.ufoArtifactMsgPart2 = " stones.";
        this.overturnedCorpsesMsg = "🧑🧑 Your people said that corpses overturned during the last full moon night. You said - ha, rich imagination";
        this.foolMoonMsg = "Your people like fool moon this night 🌘";
        this.deathBecauseOfZombie = "🌘🧛 You people died because of too many zombies.";
        this.newAchievement = "🙊🙈🙉 Get a new achievement.";

        // Statuses
        this.successStatus = "success";
        this.primaryStatus = "primary";
        this.warningStatus = "dark";
        this.dangerStatus = "danger";
    }

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;
        this.configManager = this.gameManager.configManager;
        this.citizenManager = this.gameManager.citizenManager;

        this.hiddenButtons = [this.pageManager.startAgainButton, this.pageManager.loadButton, this.pageManager.saveButton, this.pageManager.pauseButton];
    }

    addEvent(what, changes) {
        // TODO think about this map...
        let msgMap = new Map([
            ["ok", [this.okMsg, this.successStatus]],
            ["starvation", [this.starvationMsg, this.dangerStatus]],
            // lack of resource
            ["not enough food", ["&#9888; You need more food.", this.warningStatus]],
            ["not enough houses", ["&#9888; You need more houses.", this.warningStatus]],
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
            ["ufo gave an useful artifact", [`🛸🛸 gives a mighty artifact and your people made a new button from it.&#128526&#128526`, this.successStatus]],
            ["ufo gave an artifact", [`${this.ufoArtifactMsgPart1} ${changes} ${this.ufoArtifactMsgPart2}`, this.successStatus]],
            ["strange in the skies", [this.strangeInTheSkiesMsg, this.primaryStatus]],
            ["nightmare", [this.nightmareMsg, this.primaryStatus]],
            ["ufo killed", [`${this.ufoKilledMsgPart1} ${changes} ${this.ufoKilledMsgPart2}`, this.dangerStatus]],
            // zombie
            ["fool moon", [this.foolMoonMsg, this.primaryStatus]],
            ["overturned corpses", [this.overturnedCorpsesMsg, this.warningStatus]],
            ["white walkers in another village", [`🧛🧛 ${changes} corpses woke up and went to another village. Than they went back to you to sleep.`, this.warningStatus]],
            ["white walker killed", ["🧛🧛 Some zombies woke up and killed a few of your people. Than they went back. You have more corpses.", this.dangerStatus]],
            ["death because of zombies", [this.deathBecauseOfZombie, this.dangerStatus]],
            // farmer
            ["potatoes", [`👩‍🌾👩‍🌾 Farmers found ${changes} potatoes.🥔🥔🥔🥔`, this.successStatus]],
            ["kiwi", [`👩‍🌾👩‍🌾 Farmers found ${changes} kiwi fruits.🥝🥝🥝🥝`, this.successStatus]],
            ["wild rabbits", ["🐰🐰🐰 Farmers saw the wild rabbits.", this.primaryStatus]],
            ["rats", [`🐀🐀🐀 Rats ate ${changes} of your food.`, this.dangerStatus]],
            ["assassin rabbits", [`🐰🐰🐰 Obviously it was bad decision to take rabbit's food. Assassin rabbits killed : ${changes} farmers.`, this.dangerStatus]],
            // weather
            ["middle earthquake", [`🧶️ There was a middle earthquake. Some trees were down and it gave you : ${changes} woods.`, this.successStatus]],
            ["small rain", ["🌈 There was a small rain.", this.primaryStatus]],
            ["light earthquake", ["🧶 There was a light earthquake.", this.primaryStatus]],
            ["storm", [`⛈️There is a storm. It spoiled some of your wood: ${changes} is lost.`, this.dangerStatus]],
            ["big earthquake", [`🧶 ☹ There was a big earthquake. Unfortunately it killed: ${changes} of your miners.`, this.dangerStatus]],
            // amazon
            ["amazons brought", [`👧👧👧👧 Amazons brought a few males to your people . ${changes} new free people.`, this.successStatus]],
            ["amazons are there", ["People saw a lot of beautiful wild amazons 👧👧👧", this.primaryStatus]],
            ["amazons speaking", ["👧👧👧 Your people communicated a bit with Amazons.", this.primaryStatus]],
            ["amazons kidnapped", [`👧👧👧👧 Wild Amazons kidnapped some of your people. Than they brought ${changes} male corpses back, you see smiles on corpse's faces.`, this.dangerStatus]],
            // elf
            ["elves like", [this.elvesLike, this.primaryStatus]],
            ["elves are disappointed", [this.elvesAreDisappointed, this.primaryStatus]],
            ["elves can't cut trees", [`${this.elvesCantCutTreeMsgPart1} ${changes} ${this.elvesCantCutTreePart2}`, this.dangerStatus]],
            ["elves don't like", [`🧝🧝 Elves don't like when you cut trees. They killed: ${changes} of your woodcutters. They said - sorry.`, this.dangerStatus]],
            // lifecycle
            ["new people were born", [`👪👪 ${changes} new people were born.`, this.successStatus]],
            ["died because of age", [`👪👪 ${changes} died because of old age.`, this.dangerStatus]]
        ]);
        let msgElem = msgMap.get(what);
        let msg = msgElem[0];
        let status = msgElem[1];

        if (msg) {
            let event = $(`<div class="alert alert-${status}" role="alert">${this.getMsgWithTime(msg)}</div>`);
            this.pageManager.eventDiv.after(event);
            event.show("slow");

            $("#events-section").animate({scrollTop: 0}, "fast")
        }
    }

    addAchievement(what) {
        // TODO add flag
        this.pageManager.hideElement([this.pageManager.notAchievement]);

        // TODO move map from here
        let achievementImgMap = new Map([
            ["UFO Alien", this.pageManager.ufoAchievement],
            ["Palace", this.pageManager.palaceAchievement],
            ["First Research", this.pageManager.firstResearchAchievement],
            ["Starvation", this.pageManager.hungerAchievement],
            ["Productivity", this.pageManager.productivityAchievement],
            ["More Food", this.pageManager.moreFoodAchievement]
        ]);
        let achievementImg = achievementImgMap.get(what);

        if (achievementImg) {
            this.pageManager.gotAchievementQuantitySpan.text(+this.pageManager.gotAchievementQuantitySpan.text() + 1);

            this.pageManager.achievementSection.append(achievementImg);
            let event = $(`<div class="alert alert-${this.successStatus}" role="alert"><span>${this.getMsgWithTime(this.newAchievement)}</span></div>`);
            this.pageManager.eventDiv.after(event);
            event.show("slow", () => achievementImg.show("slow"));

            $("#events-section").animate({scrollTop: 0}, "fast")
        }
    }

    getMsgWithTime(msg) {
        return `${new Date().toLocaleTimeString()} : ${msg}`;
    }

    eventHappen() {
        // TODO move this map upper
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

        let eventDiversity = +this.configManager.currentPopulation > 20 ? eventMap.size : 1;
        // for test
        // let eventDiversity = 2;
        eventMap.get(this.getRandomInt(eventDiversity))();
    }

    nothingHappenEvent() {
        this.addEvent("ok");
    }

    ufoEvent() {
        let farmerQuantity = +this.configManager.farmer;
        if (this.hiddenButtons.length) {
            this.addEvent("ufo gave an useful artifact");
            this.hiddenButtons.pop().show('slow');

        } else if (farmerQuantity > 25) {
            switch (this.getRandomInt(3)) {
                case 1:
                    let killedFarmerQuantity = Math.round(0.1 * farmerQuantity);
                    this.addEvent("ufo killed", killedFarmerQuantity);
                    for (let i = 0; i < killedFarmerQuantity; i++) {
                        this.citizenManager.killFarmer();
                    }
                    break;
                case 2:
                    this.addEvent("nightmare");
                    break;
                case 3:
                    let newResources = Math.round(0.6 * +this.configManager.stone);
                    this.addEvent("ufo gave an artifact", newResources);
                    this.configManager.stone.changeValue(newResources);
                    break;
            }
        } else {
            this.addEvent("strange in the skies");
        }
    }

    farmerEvent() {
        let farmerQuantity = +this.configManager.farmer;

        let foodQuantity = +this.configManager.food;
        switch (this.getRandomInt(5)) {
            case 1:
                this.addEvent("potatoes", Math.round(foodQuantity * 1.8));
                this.configManager.food.changeValue(Math.round(foodQuantity * 1.8));
                break;
            case 2:
                this.addEvent("assassin rabbits", Math.round(this.getRandomInt(farmerQuantity) * 0.15));
                for (let i = 0, amount = Math.round(farmerQuantity * 0.15); i < amount; i++) {
                    this.citizenManager.killFarmer();
                }
                break;
            case 3:
                this.addEvent("wild rabbits");
                break;
            case 4:
                this.addEvent("kiwi", Math.round(foodQuantity * 2.5));
                this.configManager.food.changeValue(Math.round(foodQuantity * 2.5));
                break;
            case 5:
                this.addEvent("rats", Math.round(foodQuantity * 0.9));
                this.configManager.food.changeValue(-Math.round(foodQuantity * 0.9));
                break;
        }
    }

    weatherEvent() {
        // TODO add illness
        let woodQuantity = +this.configManager.wood;
        let minerQuantity = +this.configManager.miner;
        switch (this.getRandomInt(2)) {
            // Storm
            case 1:
                if (woodQuantity > 20) {
                    let lostWoodQuantity = Math.round(woodQuantity * 0.3);
                    this.addEvent("storm", lostWoodQuantity);
                    this.configManager.wood.changeValue(-lostWoodQuantity);
                } else {
                    this.addEvent("small rain");
                }
                break;
            // Earthquake
            case 2:
                switch (this.getRandomInt(2)) {
                    case 1:
                        if (minerQuantity > 7) {
                            let killedMinerQuantity = Math.round(0.3 * minerQuantity);
                            this.addEvent("big earthquake", killedMinerQuantity);
                            for (let i = 0, amount = killedMinerQuantity; i < amount; i++) {
                                this.citizenManager.killMiner();
                            }
                        } else {
                            let newResourceQuantity = Math.round(0.33 * +this.configManager.woodStorage);
                            this.addEvent("middle earthquake", newResourceQuantity);
                            this.configManager.wood.changeValue(newResourceQuantity);
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
        let scientistQuantity = +this.configManager.scientist;
        if (scientistQuantity > 10) {
            switch (this.getRandomInt(3)) {
                case 1:
                    this.addEvent("amazons speaking");
                    break;
                case 2:
                    let killedScientistQuantity = Math.round(0.5 * scientistQuantity);
                    this.addEvent("amazons kidnapped", killedScientistQuantity);
                    for (let i = 0, amount = killedScientistQuantity; i < amount; i++) {
                        this.citizenManager.killScientist();
                    }
                    this.configManager.knowledge.changeValue(-+this.configManager.knowledge * 0.5);
                    break;
                case 3:
                    let newMaleQuantity = Math.round(0.25 * scientistQuantity);
                    this.addEvent("amazons brought", newMaleQuantity);
                    this.citizenManager.addCitizen(newMaleQuantity);
                    break;
            }
        } else {
            this.addEvent("amazons are there");
        }
    }

    elfEvent() {
        switch (this.getRandomInt(2)) {
            case 1:
                let woodQuantity = Math.floor(+this.configManager.wood);
                if (woodQuantity > 20) {
                    this.addEvent("elves can't cut trees", woodQuantity);
                    this.configManager.wood.changeValue(-woodQuantity);
                } else {
                    this.addEvent("elves are disappointed");
                }
                break;
            case 2:
                if (+this.configManager.woodman > 7) {
                    let killedWoodmanQuantity = Math.floor(+this.configManager.woodman * 0.9);
                    this.addEvent("elves don't like", killedWoodmanQuantity);
                    for (let i = 0; i < killedWoodmanQuantity; i++) {
                        this.citizenManager.killWoodcutter();
                    }
                } else {
                    this.addEvent("elves like");
                }
                break;
        }
    }

    bloodMoonEvent() {
        let corpseQuantity = +this.configManager.corpse;
        if (corpseQuantity) {
            switch (this.getRandomInt(2)) {
                case 1:
                    this.addEvent("overturned corpses");
                    break;
                case 2:
                    let zombieQuantity = Math.round(this.getRandomInt(corpseQuantity) / 2);
                    switch (this.getRandomInt(2)) {
                        case 1:
                            if (zombieQuantity && +this.configManager.currentPopulation) {
                                this.addEvent("white walker killed");
                                let killedCitizenQuantity = +this.configManager.currentPopulation > zombieQuantity ? zombieQuantity : zombieQuantity + 1;
                                for (let i = 0; i < killedCitizenQuantity; i++) {
                                    this.citizenManager.findPersonToKill();
                                }
                            }
                            break;
                        case 2:
                            this.addEvent("white walkers in another village", zombieQuantity);
                            break;
                    }
            }
        } else {
            this.addEvent("fool moon");
        }
    }

    birthDeathCycleEvent() {
        let currentPopulationQuantity = +this.configManager.currentPopulation;
        let changeQuantity = Math.floor(this.getRandomInt(currentPopulationQuantity) * 0.2);
        if (changeQuantity) {
            switch (this.getRandomInt(2)) {
                case 1:
                    this.addEvent("new people were born", changeQuantity);
                    this.citizenManager.addCitizen(changeQuantity);
                    break;
                case 2:
                    this.addEvent("died because of age", changeQuantity);
                    for (let i = 0; i < changeQuantity; i++) {
                        this.citizenManager.findPersonToKill();
                    }
                    break;
            }
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }
}

export default EventManager;