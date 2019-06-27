class EventManager {
    constructor() {
        this.okStatus = "Everything is ok. Let s relax. ☕";
        this.lackLazyboneLog = "👷‍♂️👷‍♂ Find more free lazybones.";
        this.starvation = "🍽️🍽️HELP!!! We don t have enough food. :(";
        this.foodOrHouses = "🤨 Not enough food or houses.";
        this.moreResources = "🤨 Collect more resources.";
        this.moreKnowledge = "🤨 Collect more knowledge.";
        this.moreScienceBuilding = "🤨 Build more campfires or other science buildings.";
        this.moreMusicClubs = "🤨 Build more music clubs or other entertainment buildings.";
        this.moreBarrack = "🤨 Build more barracks.";
        this.elvesCantCutTrees = "🧝🧝 Elves can't cut trees, so sometimes they take it from the others. They said - thank you. And took: ${this.configManager.woodQuantity} of your wood.";
        this.elvesAreDisappointed = "🧝🧝 You don t have wood. Elves are disappointed of us.. :((";
        // this.elvesDontLike = "🧝🧝 Elves don't like when you cut trees. They killed: " + woodcutters.text() + " of your woodcutters. They said - sorry.";
        this.elvesLike = "🧝🧝 Main Elf said - we like you.";
        this.nightmare = "👩‍🌾👩‍🌾 👾👾 Your farmers said that they saw strange nightmares.";
        this.strangeInTheSkies = "👩‍🌾👩‍🌾 Your farmers said that they saw something strange in the skies. You said - ha, rich imagination";
        this.overturnedCorpses = "🧑🧑🧑 Your people said that corpses overturned during the last full moon night. You said - ha, rich imagination";
        this.whiteWalkersInAnotherVillage = "🧛🧛 Some white walkers came from your corpse storage and went to another village. Than they went back to sleep.";
        this.foolMoon = "🌘 Your people like fool moon this night.";
        this.newAchievement = "🙈🙈🙈 Get a new achievement.";
    }

    initialization(gameManager) {
        this.gameManager = gameManager;
        this.pageManager = this.gameManager.pageManager;
        this.configManager = this.gameManager.configManager;
        this.citizenManager = this.gameManager.citizenManager;
    }

    addEvent(what) {
        let newElement;
        switch (what) {
            case "ok":
                newElement = $("<p>" + this.getMsgWithTime(this.okStatus) + "</p>");
                break;
            case "lack of lazybones":
                newElement = $("<p>" + this.getMsgWithTime(this.lackLazyboneLog) + "</p>");
                break;
            case "starvation":
                newElement = $("<p>" + this.getMsgWithTime(this.starvation) + "</p>");
                break;
            case "food or houses":
                newElement = $("<p>" + this.getMsgWithTime(this.foodOrHouses) + "</p>");
                break;
            case "more resources":
                newElement = $("<p>" + this.getMsgWithTime(this.moreResources) + "</p>");
                break;
            case "more knowledge":
                newElement = $("<p>" + this.getMsgWithTime(this.moreKnowledge) + "</p>");
                break;
            case "more campfires":
                newElement = $("<p>" + this.getMsgWithTime(this.moreScienceBuilding) + "</p>");
                break;
            case "more music clubs":
                newElement = $("<p>" + this.getMsgWithTime(this.moreMusicClubs) + "</p>");
                break;
            case "more barrack":
                newElement = $("<p>" + this.getMsgWithTime(this.moreBarrack) + "</p>");
                break;
            case "elves can't cut trees":
                newElement = $("<p>" + this.getMsgWithTime(this.elvesCantCutTrees) + "</p>");
                this.configManager.changeCurResourceQuantity("wood", this.configManager.woodQuantity);
                break;
            case "elves are disappointed":
                newElement = $("<p>" + this.getMsgWithTime(this.elvesAreDisappointed) + "</p>");
                break;
            case "elves like":
                newElement = $("<p>" + this.getMsgWithTime(this.elvesLike) + "</p>");
                break;
            case "nightmare":
                newElement = $("<p>" + this.getMsgWithTime(this.nightmare) + "</p>");
                break;
            case "strange in the skies":
                newElement = $("<p>" + this.getMsgWithTime(this.strangeInTheSkies) + "</p>");
                break;
            case "overturned corpses":
                newElement = $("<p>" + this.getMsgWithTime(this.overturnedCorpses) + "</p>");
                break;
            case "white walkers in another village":
                newElement = $("<p>" + this.getMsgWithTime(this.whiteWalkersInAnotherVillage) + "</p>");
                break;
            case "fool moon":
                newElement = $("<p>" + this.getMsgWithTime(this.foolMoon) + "</p>");
                break;
            // case "elves don't like":
            //     newElement =
            //     break;
        }
        if (newElement) {
            this.pageManager.eventDiv.after(newElement);
            newElement.show("slow");
        }

        let newElementAchievement;
        switch (what) {
            case "UFO Alien":
                newElementAchievement = this.pageManager.ufoAchievement;
                break;
            case "Palace":
                newElementAchievement = this.pageManager.palaceAchievement;
                break;
            case "First Research":
                newElementAchievement = this.pageManager.firstResearchAchievement;
                break;
            case "starvation":
                newElementAchievement = this.pageManager.hungerAchievement;
                break;
            case "Productivity":
                newElementAchievement = this.pageManager.productivityAchievement;
                break;
            case "More Food":
                newElementAchievement = this.pageManager.moreFoodAchievement;
                break;
        }
        if (newElementAchievement) {
            newElement = $("<p>" + this.getMsgWithTime(this.newAchievement) + "</p>");
            this.pageManager.eventDiv.after(newElement);
            newElement.show("slow");

            this.pageManager.achievementSection.append(newElementAchievement);
            newElementAchievement.show("slow");
        }
    }

    addAchievement (what) {
        let newElementAchievement;
        switch (what) {
            case "UFO Alien":
                newElementAchievement = this.pageManager.ufoAchievement;
                break;
            case "Palace":
                newElementAchievement = this.pageManager.palaceAchievement;
                break;
            case "First Research":
                newElementAchievement = this.pageManager.firstResearchAchievement;
                break;
            case "starvation":
                newElementAchievement = this.pageManager.hungerAchievement;
                break;
            case "Productivity":
                newElementAchievement = this.pageManager.productivityAchievement;
                break;
            case "More Food":
                newElementAchievement = this.pageManager.moreFoodAchievement;
                break;
        }
        if (newElementAchievement) {
            let newElement = $("<p>" + this.getMsgWithTime(this.newAchievement) + "</p>");
            this.pageManager.eventDiv.after(newElement);
            this.pageManager.achievementSection.append(newElementAchievement);

            this.pageManager.showElement([newElement, newElementAchievement]);
        }
    }

    getMsgWithTime(msg) {
        return new Date().toLocaleTimeString() + ": " + msg;
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    eventHappen() {
        // to small population for events
        let eventDiversity = 1;
        if (self.configManager.currentPopulation > 20) {
            eventDiversity = 8;
        }

        switch (this.getRandomInt(eventDiversity)) {
            // switch (8) {
            default:
                this.nothingHappenEvent();
                break;
            case 1:
                this.nothingHappenEvent();
                break;
            case 2:
                this.ufoEvent();
                break;
            case 3:
                this.farmerEvent();
                break;
            case 4:
                this.weatherEvent();
                break;
            case 5:
                this.wildAmazonEvent();
                break;
            case 6:
                this.elfEvent();
                break;
            case 7:
                this.bloodMoonEvent();
                break;
            case 8:
                this.birthDeathCycleEvent();
                break;
            //    TODO add to storm and rename to weather
            // // Drought (-foodProduction)
            // case 8:
            //     break;

            // // Animals (-citizen quantity)
            // case 7:
            //     animalsEvent();
            //     break;
            // // Pets (+food consuming)
            // case 7:
            //     break;

            // // Im/Emigration (+current population, - knowledge)
            // case 10:
            //     break;

            // // Laziness (-productivity)
            // case 11:
            //     break;
            // // Motivation (+production)
            // case 12:
            //     break;
        }
    }

    nothingHappenEvent() {
        this.addEvent("ok");
    }

    elfEvent() {
        switch (this.getRandomInt(2)) {
            case 1:
                let wood = this.configManager.woodQuantity;
                if (wood) {
                    this.addEvent("elves can't cut trees");
                } else {
                    this.addEvent("elves are disappointed");
                }
                break;
            case 2:
                if (this.configManager.woodmenQuantity) {
                    this.addEvent("Elves don't like");
                    $("#events-div span").after("<p>" + this.getMsgWithTime("🧝🧝 Elves don't like when you cut trees. They killed: " + woodcutters.text() + " of your woodcutters. They said - sorry.") + "</p>");
                    for (let i = 0; i < woodmen; i++) {
                        this.citizenManager.killWoodcutter();
                    }
                } else {
                    this.addEvent("elves like");
                }
                break;
        }
    }

    ufoEvent() {
        let farmerElement = this.configManager.foodQuantity;
        if (farmerElement.text() > 25) {
            switch (this.getRandomInt(3)) {
                case 1:
                    let killedFarmerAmount = Math.round(0.1 * +farmerElement.text());
                    $("#events-div span").after("<p>" + this.getMsgWithTime("🛸 Ufo Aliens tried to improve your human beings, but it wasn't successful. Unfortunately they killed: " + killedFarmerAmount + " of your farmers. Maybe in the next time.") + "</p>");
                    for (let i = 0, amount = killedFarmerAmount; i < amount; i++) {
                        this.citizenManager.killFarmer();
                    }
                    break;
                case 2:
                    this.addEvent("nightmare");
                    break;
                case 3:
                    let newResources = Math.round(0.6 * +$("#stone-quantity").text());
                    $("#events-div span").after("<p>" + this.getMsgWithTime("🛸 Ufo gave to you a mighty artifact to improve your human beings, but your people didn't know how to apply this and they just exchanged it with more advanced civilization for: " + newResources + " stones.") + "</p>");
                    this.configManager.changeCurResourceQuantity("stone", newResources);
                    break;
            }
        } else {
            this.addEvent("strange in the skies");
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
                    let wakeUpUndead = this.getRandomInt(corpses);
                    switch (this.getRandomInt(2)) {
                        case 1:
                            if (wakeUpUndead && this.configManager.currentPopulation) {
                                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🧛🧛 Some white walkers came from your corpse storage and killed a few of your people. Than they went back. You have more corpses.") + "</p>");
                                for (let i = 0, amount = wakeUpUndead; i < amount; i++) {
                                    this.citizenManager.findPersonToKill();
                                }
                            }
                            break;
                        case 2:
                            this.addEvent("white walkers in another village");
                            break;
                    }
            }
        } else {
            this.addEvent("fool moon");
        }
    }

    weatherEvent() {
        // TODO add illness
        let woodElement = $("#wood-quantity");
        let minerElement = $("#miner-quantity");
        switch (this.getRandomInt(2)) {
            // Storm
            case 1:
                if (+woodElement.text() > 9) {
                    this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("⛈️There is a storm. It spoiled some of your wood: " + Math.round(+woodElement.text() * 0.3) + " is lost.") + "</p>");
                    woodElement.text(Math.round(+woodElement.text() * 0.7));
                } else {
                    this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🌈 There was a small rain.") + "</p>");
                }
                break;
            // Earthquake
            case 2:
                switch (this.getRandomInt(2)) {
                    case 1:
                        if (+minerElement.text() > 3) {
                            let killedMinerAmount = Math.round(0.3 * +minerElement.text());
                            this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🧶 ☹ There was a big earthquake. Unfortunately it killed: " + killedMinerAmount + " of your miners.") + "</p>");
                            for (let i = 0, amount = killedMinerAmount; i < amount; i++) {
                                this.citizenManager.killMiner();
                            }
                        } else {
                            let newResources = Math.round(0.63 * +woodElement.text());
                            this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🧶️ There was a middle earthquake. Some trees were down and it gave you : " + newResources + " woods.") + "</p>");
                            this.configManager.changeCurResourceQuantity("wood", newResources);
                        }
                        break;
                    case 2:
                        this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🧶 There was a light earthquake.") + "</p>");
                        break;
                }
                break;
        }
    }

    wildAmazonEvent() {
        let $scientistQuantity = $("#scientist-quantity");
        if (+$scientistQuantity.text() >= 10) {
            switch (this.getRandomInt(3)) {
                case 1:
                    this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("Your people communicated a bit with Amazons 👧👧👧👧") + "</p>");
                    break;
                case 2:
                    let killedScientistAmount = Math.round(0.5 * +$scientistQuantity.text());
                    this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("👧👧👧👧 Wild Amazons kidnapped some of your people. Than they brought you back " + killedScientistAmount + " male corpses, you see smiles on corpse's faces.") + "</p>");
                    for (let i = 0, amount = killedScientistAmount; i < amount; i++) {
                        killScientist();
                    }
                    $("#knowledge-quantity").text(Math.round(+$("#knowledge-quantity").text() * 0.5));
                    break;
                case 3:
                    let newMaleAmount = Math.round(0.25 * +$scientistQuantity.text());
                    this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("👧👧👧👧 Amazons brings a few males to your people . " + newMaleAmount + " new free people.") + "</p>");
                    this.citizenManager.createCitizen(newMaleAmount);
                    break;
            }
        } else {
            this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("Your people saw a lot of beautiful wild amazons 👧👧👧👧") + "</p>");
        }
    }

    birthDeathCycleEvent() {
        let currentPopulation = +$("#current-population").text();
        let changeAmount = Math.round(currentPopulation * 0.25);
        switch (this.getRandomInt(2)) {
            case 1:
                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("👪👪 +" + changeAmount + " new people were born.") + "</p>");
                this.citizenManager.createCitizen(changeAmount)
                break;
            case 2:
                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("👪👪 -" + changeAmount + " died because of age.") + "</p>");
                for (let i = 0; i < changeAmount; i++) {
                    this.citizenManager.findPersonToKill();
                }
                break;
        }
    }

    farmerEvent() {
        let farmerQuantityEl = $("#farmer-quantity");
        this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🥔🥔🥔 🥝🥝 your people see a lot of some new kind of food.") + "</p>");

        let foodElement = $("#food-quantity");
        switch (this.getRandomInt(5)) {
            case 1:
                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("Farmers found " + Math.round(+foodElement.text() * 1.8) + " potatoes.") + "</p>");
                this.configManager.changeCurResourceQuantity("food", Math.round(foodElement.text() * 1.8));
                break;
            case 2:
                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🐰🐰🐰 Farmers found wild rabbits on the field. Obviously it was bad decision to try to take rabbit's food. Assassin rabbits killed : " + Math.round(farmerQuantityEl.text() * 0.15) + " farmers.") + "</p>");
                for (let i = 0, amount = Math.round(farmerQuantityEl.text() * 0.15); i < amount; i++) {
                    this.citizenManager.killFarmer();
                }
                break;
            case 3:
                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🐰🐰🐰 Farmers came to new kind of food, than they noticed strange rabbits near and farmers decided to go back. Maybe that was a right decision.") + "</p>");
                break;
            case 4:
                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("Farmers found " + Math.round(+foodElement.text() * 2.5) + " kiwi fruits.") + "</p>");
                this.configManager.changeCurResourceQuantity("food", Math.round(foodElement.text() * 2.5));
                break;
            case 5:
                this.configManager.eventDiv.after("<p>" + this.getMsgWithTime("🐀🐀🐀 Rats ate " + Math.round(+foodElement.text() * 0.9) + " of your food.") + "</p>");
                this.configManager.changeCurResourceQuantity("food", -Math.round(foodElement.text() * 0.9));
                break;
        }
    }
}

export default EventManager;