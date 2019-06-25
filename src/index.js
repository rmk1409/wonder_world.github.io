import GameManager from './gameManager';

$(function () {
    "use strict";
    let config = {
        // VARIABLES
        // 1.Win
        WINNER_REQUIREMENTS: 1e6,
        // 2.Spaces
        availableScientistSpaces: 0,
        knowledgeStoreInOneScroll: 5,
        currentDjSpaces: 0,
        currentInstructorSpaces: 0,
        spaceInOneClub: 25,
        spaceInOneCampfire: 2,
        spaceInOneDolmen: 5,
        // spaceInOneParthenon : 12;
        // 3.Productivity flags
        djProductivityFlag: false,
        healthProductivityFlag: false,
        productivityAchievementFlag: false,
        // abundance : false,
        // 4. User name
        /*JSON.stringify({a: "hello"});
        JSON.parse()*/

        // GameManager variables
        citizenCost: 1,
        booster: 10,
        productivity: 1.0,
        foodIncreaseStep: 0.15,
        // Tech flags
        buildFuneralFlag: false,
        scientistPresentFlag: false,
        djPresentFlag: false,
        instructorPresentFlag: false,
        barrackPresentFlag: false,
        palacePresentFlag: false,
        leaderPresentFlag: false,
        corpsePresentFlag: false
    };

    config = {
        ...config,
        foodProduction: 1.2 * config.booster,
        woodProduction: 0.5 * config.booster,
        stoneProduction: 0.2 * config.booster,
        knowledgeProduction: 0.1 * config.booster,
    };

    let {
        WINNER_REQUIREMENTS,
        knowledgeStoreInOneScroll,
        currentDjSpaces,
        currentInstructorSpaces,
        spaceInOneClub,
        productivityAchievementFlag,

        booster,
        productivity,
        foodIncreaseStep,
        djPresentFlag,
        instructorPresentFlag,
        leaderPresentFlag,
        foodProduction,
        woodProduction,
        stoneProduction,
        knowledgeProduction,
    } = config;

    let gameManager = new GameManager();
    gameManager.initialization();
    let userName = gameManager.configManager.userName;

    // CLICK EVENTS
    // 1. CLICK TO THE RESOURCES
    $("#food-click-button").on("click", () => gameManager.clickResource("food", 1 * booster));
    $("#wood-click-button").click(() => gameManager.clickResource("wood", 1 * booster));
    $("#stone-click-button").click(() => gameManager.clickResource("stone", 1 * booster));
    // 2. START AGAIN
    $("#start-again-button").click(() => gameManager.reloadSite());
    $("#create-worker-button").click(() => gameManager.createWorker(1));
    // 4. BUILD
    $("#build-grave-button").click(() => gameManager.build("grave"));
    $("#build-scroll-button").click(() => gameManager.build("scroll"));
    $("#build-storage-granary-button").click(() => gameManager.build("granary"));
    $("#build-storage-pit-button").click(() => gameManager.build("pit"));
    $("#build-tent-button").click(() => gameManager.build("tent"));
    $("#build-hut-button").click(() => gameManager.build("hut"));
    $("#build-campfire-button").click(() => gameManager.build("campfire"));
    $("#build-dolmen-button").click(() => gameManager.build("dolmen"));
    // TODO in bronze age
    // $("#build-parthenon-button").click(() => gameManager.build("partheon));
    $("#build-music-club-button").click(() => gameManager.build("music-club"));
    $("#build-yoga-club-button").click(() => gameManager.build("yoga-club"));
    $("#build-palace-button").click(() => gameManager.build("palace"));
    $("#build-barrack-button").click(() => gameManager.build("barrack"));

    // 1. FARMER
    $("#remove-10-farmer-button").click(() => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("farmer", -1)
    });
    $("#remove-farmer-button").click(() => gameManager.setWorker("farmer", -1));
    $("#add-10-farmer-button").click(() => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("farmer", 1);
    });
    $("#add-farmer-button").click(() => gameManager.setWorker("farmer", 1));
    // 2. WOODCUTTER
    $("#remove-10-woodcutter-button").click(() => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("woodman", -1);
    });
    $("#remove-woodcutter-button").click(() => gameManager.setWorker("woodman", -1));
    $("#add-10-woodcutter-button").click(() => {
        for (let i = 0; i < 10; i++) gameManager.setWorker("woodman", 1);
    });
    $("#add-woodcutter-button").click(() => gameManager.setWorker("woodman", 1));
    // 3. MINER
    $("#remove-10-miner-button").click(function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("miner", -1);
    });
    $("#remove-miner-button").click(() => gameManager.setWorker("miner", -1));
    $("#add-10-miner-button").click(function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("miner", 1);
    });
    $("#add-miner-button").click(() => gameManager.setWorker("miner", 1));
    // 4. FUNERAL
    $("#remove-funeral-process-button").click(() => gameManager.setWorker("funeral", -2));
    $("#add-funeral-process-button").click(() => gameManager.setWorker("funeral", 2));
    // 4. SCIENTIST
    $("#remove-10-scientist-button").click(function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("scientist", -1);
    });
    $("#remove-scientist-button").click(() => gameManager.setWorker("scientist", -1));
    $("#add-10-scientist-button").click(function () {
        for (let i = 0; i < 10; i++) gameManager.setWorker("scientist", 1);
    });
    $("#add-scientist-button").click(() => gameManager.setWorker("scientist", 1));
    // 5. LEADER
    $("#add-leader-button").click(() => gameManager.setWorker("leader", 1));
    // 6. WARRIOR
    $("#add-warrior-button").click(() => gameManager.setWorker("warrior", 1));
    // 7. Dj
    $("#add-dj-button").click(() => gameManager.setWorker("dj", 1));
    // 8. Instructor
    $("#add-instructor-button").click(() => gameManager.setWorker("instructor", 1));

    // TECHNOLOGIES
    $("#tech-changes-button").click(()=> gameManager.research("changes"));

    function research(knowledgePrice, firstElementToShow, otherElementsAr) {
        if ($("#knowledge-quantity").text() >= knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -knowledgePrice);
            $(firstElementToShow).toggle("slow", function () {
                otherElementsAr.forEach(function (item) {
                    $(item).toggle("slow");
                });
            });
            return true;
        } else {
            gameManager.eventManager.addEvent("more knowledge");
            return false;
        }
    }

    $("#tech-agriculture-button").click(function researchAgriculture() {
        if (research(30, "#tech-agriculture-row", ["#agriculture-p"])) {
            $("#food-img").attr("src", "res/img/changes/grapes.png");
            increaseFoodProduction();
        }
    });
    $("#tech-architecture-button").click(function researchArchitecture() {
        research(30, "#tech-architecture-row", ["#build-population-tent-row", "#architecture-p"]);
    });
    $("#tech-funeral-button").click(function researchFuneralProcess() {
        research(30, "#tech-funeral-row", ["#build-scroll-row", "#build-grave-row", "#empty-row-before-population-building", "#tech-changes2-row", "#funeral-p"]);
    });
    $("#tech-changes2-button").click(function researchChanges2() {
        research(75, "#tech-changes2-row", ["#tech-agriculture-2-row", "#tech-architecture-2-row", "#tech-leadership-row", "#tech-stone-age-row", "#changes-2-p"]);
    });

    $("#tech-leadership-button").click(function researchLeadership() {
        research(100, "#tech-leadership-row", ["#job-leader-row", "#leadership-p"]);
    });
    $("#tech-agriculture-2-button").click(function researchAgriculture2() {
        if (research(100, "#tech-agriculture-2-row", ["#agriculture-2-p"])) {
            $("#food-img").attr("src", "res/img/changes2/field.png");
            increaseFoodProduction();
            unlockAchievement("More Food");
        }
    });
    $("#tech-architecture-2-button").click(function researchArchitecture2() {
        research(100, "#tech-architecture-2-row", ["#build-storage-pit-row", "#architecture-2-p"]);
    });
    $("#tech-stone-age-button").click(function researchStoneAge() {
        research(300, "#tech-stone-age-row", ["#build-storage-granary-row", "#tech-architecture-3-row", "#tech-music-row", "#tech-sport-row", "#tech-tools-row", "#stone-age-p"]);
    });

    $("#tech-architecture-3-button").click(function researchArchitecture3() {
        research(250, "#tech-architecture-3-row", ["#build-knowledge-dolmen-row", "#architecture-3-p"]);
    });
    $("#tech-music-button").click(function researchMusic() {
        research(250, "#tech-music-row", ["#empty-row-before-build-club", "#build-music-club-row", "#music-p"]);
    });
    $("#tech-sport-button").click(function researchSport() {
        research(250, "#tech-sport-row", ["#empty-row-before-build-club", "#build-yoga-club-row", "#architecture2-row", "#change3-row", "#sport-p"]);
    });
    $("#tech-tools-button").click(function researchTools() {
        research(250, "#tech-tools-row", ["#tech-axe-row", "#tech-pickaxe-row", "#tech-hoe-row", "#tech-weapon-row", "#tools-p"]);
    });
    $("#tech-weapon-row").click(function researchWeapon() {
        if (research(350, "#tech-weapon-row", ["#build-war-barrack-row", "#empty-row-before-build-war", "#tech-2-side-scroll-row", "#tech-architecture-4-row", "#weapon-p"])) {
            increaseAllProduction();
        }
    });
    $("#tech-hoe-button").click(function researchHoe() {
        if (research(300, "#tech-hoe-row", ["#hoe-p"])) {
            foodIncreaseStep = 0.1;
            increaseFoodProduction();
            productivity = Math.round(productivity * 100 + 0.0625 * 100) / 100;
            changeIntNumber("#productivity-quantity", 6.25);
        }
    });
    $("#tech-axe-button").click(function researchAxe() {
        if (research(300, "#tech-axe-row", ["#axe-p"])) {
            increaseWoodProduction();
            productivity = Math.round(productivity * 100 + 0.0625 * 100) / 100;
            changeIntNumber("#productivity-quantity", 6.25);
        }
    });
    $("#tech-pickaxe-button").click(function researchPickaxe() {
        if (research(300, "#tech-pickaxe-row", ["#pickaxe-p"])) {
            increaseStoneProduction();
            productivity = Math.round(productivity * 100 + 0.0625 * 100) / 100;
            changeIntNumber("#productivity-quantity", 6.25);
        }
    });
    $("#tech-2-side-scroll-button").click(function research2SideScroll() {
        if (research(10, "#tech-2-side-scroll-row", ["#two-side-scroll-p"])) {
            knowledgeStoreInOneScroll *= 2;
            $("#max-knowledge-quantity-span").text(+$("#scroll-quantity").text() * knowledgeStoreInOneScroll + 30);
            $("#build-scroll-definition").text("+10 space for knowledge");
            $("#build-scroll-button").text("2-side scroll");
        }
    });
    $("#tech-architecture-4-button").click(function researchArchitecture4() {
        research(900, "#tech-architecture-4-row", ["#build-palace-row", "#tech-bronze-age-row", "#architecture-4-p"]);
    });

    $("#already-known-p").click(function slideToggleSection() {
        $("#already-known-section").slideToggle("fast");
    });

    function changeIntNumber(elementName, quantity) {
        $(elementName).text(+$(elementName).text() + quantity);
    }

    function changeFloatNumber(elementName, quantity) {
        let $oldQuantity = parseFloat($(elementName).text());
        $oldQuantity = Math.round($oldQuantity * 100 + quantity * 100) / 100;
        $(elementName).text($oldQuantity.toFixed(1));
    }

    function findPersonToKill() {
        if (gameManager.configManager.currentPopulation > 0) {
            let withDecrease = true;
            if (gameManager.configManager.lazyboneQuantity) {
                gameManager.configManager.changeCurResourceQuantity("curLazy", -1);
            } else if (gameManager.configManager.woodmenQuantity) {
                withDecrease = false;
                killWoodcutter();
            } else if (gameManager.configManager.minerQuantity) {
                withDecrease = false;
                killMiner();
            } else if (gameManager.configManager.funeralQuantity) {
                gameManager.configManager.changeCurResourceQuantity("funeral", -2);
                gameManager.configManager.changeCurResourceQuantity("curLazy", 1);
            } else if (gameManager.configManager.curScientistQuantity) {
                withDecrease = false;
                killScientist();
            } else if (+$("#leader-quantity").text()) {
                changeIntNumber("#leader-quantity", -1);
                if (!+$("#leader-quantity").text()) {
                    $(".ten-work-td").hide("slow");
                    $("#work-table .empty-row td").attr("colspan", "4");
                    leaderPresentFlag = false;
                }
            } else if (+$("#warrior-quantity").text()) {
                changeIntNumber("#warrior-quantity", -1);
            } else if (+$("#dj-quantity").text()) {
                changeIntNumber("#dj-quantity", -1);
                currentDjSpaces++;
                changeIntNumber("#current-happy-people", ($("#current-population").text() <= spaceInOneClub ? $("#current-population").text() : -(spaceInOneClub - 1)));
                if (!+$("#dj-quantity").text()) {
                    decreaseAllProduction();
                    djPresentFlag = false;
                }
            } else if (+$("#instructor-quantity").text()) {
                changeIntNumber("#instructor-quantity", -1);
                changeIntNumber("#current-health-people", ($("#current-population").text() <= spaceInOneClub ? $("#current-population").text() : -(spaceInOneClub - 1)));
                currentInstructorSpaces++;
                if (!+$("#instructor-quantity").text()) {
                    decreaseAllProduction();
                    instructorPresentFlag = false;
                }
            } else if (+$("#farmer-quantity").text()) {
                withDecrease = false;
                killFarmer();
            }

            if (withDecrease) {
                decreasePopulation();
            }
        } else {
            alert(userName + " you killed: " + $("#corpse-quantity").text() + " people. I believe in you. Please, try again. 🧟🧟");
            $("#start-again-button").slideToggle("slow");
            throw new Error("Something went badly wrong!");
        }
    }

    function decreasePopulation() {
        gameManager.configManager.changeCurResourceQuantity("curPop", -1);
        gameManager.configManager.changeCurResourceQuantity("foodTotalProduction", 1);

        if (!gameManager.configManager.corpsePresentFlag) {
            gameManager.pageManager.showElement([gameManager.pageManager.corpseRow]);
            gameManager.configManager.corpsePresentFlag = true;
        }
        gameManager.configManager.changeCurResourceQuantity("corpse", 1);
    }

    function killWoodcutter() {
        decreasePopulation();
        gameManager.configManager.changeCurResourceQuantity("woodman", -1);
        gameManager.configManager.changeCurResourceQuantity("woodTotalProduction", -gameManager.configManager.woodmanProduction * gameManager.configManager.booster);
    }

    function killMiner() {
        decreasePopulation();
        gameManager.configManager.changeCurResourceQuantity("miner", -1);
        gameManager.configManager.changeCurResourceQuantity("stoneTotalProduction", -gameManager.configManager.minerProduction * gameManager.configManager.booster);
    }

    function killFarmer() {
        decreasePopulation()
        gameManager.configManager.changeCurResourceQuantity("farmer", -1);
        gameManager.configManager.changeCurResourceQuantity("foodTotalProduction", gameManager.configManager.farmerProduction * gameManager.configManager.booster - 1);
    }

    function killScientist() {
        decreasePopulation();
        gameManager.configManager.changeCurResourceQuantity("scientist", -1);
        gameManager.configManager.changeCurResourceQuantity("knowledgeTotalProduction", -gameManager.configManager.scientistProduction * gameManager.configManager.booster);
    }

    function decreaseFoodProduction() {
        foodProduction = Math.round(foodProduction * 100 - foodIncreaseStep * 100) / 100;
        let $farmers = +$("#farmer-quantity").text();
        let $currentPopulation = +$("#current-population").text();
        $("#food-production-quantity").text((Math.round($farmers * (foodProduction * 100) - $currentPopulation * 100) / 100).toFixed(1));
    }

    function decreaseWoodProduction() {
        woodProduction = Math.round(woodProduction * 1000 - 0.125 * 1000) / 1000;
        $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * woodProduction).toFixed(1));
    }

    function decreaseStoneProduction() {
        stoneProduction = Math.round(stoneProduction * 1000 - 0.05 * 1000) / 1000;
        $("#stone-production-quantity").text((+$("#miner-quantity").text() * stoneProduction).toFixed(1));
    }

    function decreaseKnowledgeProduction() {
        knowledgeProduction = Math.round(knowledgeProduction * 1000 - 0.025 * 1000) / 1000;
        $("#knowledge-production-quantity").text((+$("#scientist-quantity").text() * knowledgeProduction).toFixed(1));
    }

    function decreaseAllProduction() {
        productivity = Math.round(productivity * 100 - 0.25 * 100) / 100;
        changeIntNumber("#productivity-quantity", -25);

        decreaseFoodProduction();
        decreaseWoodProduction();
        decreaseStoneProduction();
        decreaseKnowledgeProduction();
    }

    function increaseFoodProduction() {
        foodProduction = Math.round(foodProduction * 100 + foodIncreaseStep * 100) / 100;
        let $farmers = +$("#farmer-quantity").text();
        let $currentPopulation = +$("#current-population").text();
        $("#food-production-quantity").text((Math.round($farmers * (foodProduction * 100) - $currentPopulation * 100) / 100).toFixed(1));
    }

    function increaseWoodProduction() {
        woodProduction = Math.round(woodProduction * 1000 + 0.125 * 1000) / 1000;
        $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * woodProduction).toFixed(1));
    }

    function increaseStoneProduction() {
        stoneProduction = Math.round(stoneProduction * 1000 + 0.05 * 1000) / 1000;
        $("#stone-production-quantity").text((+$("#miner-quantity").text() * stoneProduction).toFixed(1));
    }

    function increaseKnowledgeProduction() {
        knowledgeProduction = Math.round(knowledgeProduction * 1000 + 0.025 * 1000) / 1000;
        $("#knowledge-production-quantity").text((+$("#scientist-quantity").text() * knowledgeProduction).toFixed(1));
    }

    function increaseAllProduction() {
        productivity = Math.round(productivity * 100 + 0.25 * 100) / 100;
        changeIntNumber("#productivity-quantity", 25);

        increaseFoodProduction();
        increaseWoodProduction();
        increaseStoneProduction();
        increaseKnowledgeProduction();
    }

    //ONE STEP
    setInterval(function oneStep() {
        // get resources
        // changeFloatNumber("#food-quantity", parseFloat($("#food-production-quantity").text()));
        // changeFloatNumber("#wood-quantity", parseFloat($("#wood-production-quantity").text()));
        // changeFloatNumber("#stone-quantity", parseFloat($("#stone-production-quantity").text()));
        // changeFloatNumber("#knowledge-quantity", parseFloat($("#knowledge-production-quantity").text()));
        gameManager.configManager.changeCurResourceQuantity("food", gameManager.configManager.foodTotalProduction);
        gameManager.configManager.changeCurResourceQuantity("wood", gameManager.configManager.woodTotalProduction);
        gameManager.configManager.changeCurResourceQuantity("stone", gameManager.configManager.stoneTotalProduction);
        gameManager.configManager.changeCurResourceQuantity("knowledge", gameManager.configManager.knowledgeTotalProduction);

        //check max storage
        balanceToMaxStorage();

        //starvation process
        if (gameManager.configManager.foodQuantity < 0 && gameManager.configManager.currentPopulation > 0) {
            gameManager.eventManager.addEvent("starvation");
            unlockAchievement("Starvation");
            $("#starvation-warning").show("slow");

            findPersonToKill();

            // // Decrease quantity of happy
            // if (+$("#current-happy-people").text() > $("#current-population").text()) {
            //     changeIntNumber("#current-happy-people", -1);
            // }
            // // and health people
            // if (+$("#current-health-people").text() > $("#current-population").text()) {
            //     changeIntNumber("#current-health-people", -1);
            // }
        } else {
            $("#starvation-warning").hide("slow");
        }

        checkProduction();

        // TODO abundance of food

        if (!productivityAchievementFlag && $("#productivity-quantity").text() >= 190) {
            unlockAchievement("Productivity");
            productivityAchievementFlag = true;
        }

        // TODO add more bad events when it isn't focus
        // console.log(document.hasFocus());
    }, 1000);

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    setInterval(function event() {
        // to small population for events
        let eventDiversity = 1;
        if (+$("#current-population").text() > 20) {
            eventDiversity = 8;
        }

        switch (getRandomInt(eventDiversity)) {
            // switch (8) {
            default:
                nothingHappenEvent();
                break;
            case 1:
                nothingHappenEvent();
                break;
            case 2:
                ufoEvent();
                break;
            case 3:
                farmerEvent();
                break;
            case 4:
                weatherEvent();
                break;
            case 5:
                wildAmazonEvent();
                break;
            case 6:
                elfEvent();
                break;
            case 7:
                bloodMoonEvent();
                break;
            case 8:
                birthDeathCycleEvent();
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
    }, 20e3);

    function getMsgWithTime(msg) {
        return new Date().toLocaleTimeString() + ": " + msg;
    }

    function nothingHappenEvent() {
        gameManager.eventManager.addEvent("ok");
    }

    function elfEvent() {
        switch (getRandomInt(2)) {
            case 1:
                let woodElement = $("#wood-quantity");
                if (+woodElement.text()) {
                    $("#events-div span").after("<p>" + getMsgWithTime("🧝🧝 Elves can't cut trees, so sometimes they take it from the others. They said - thank you. And took: " + woodElement.text() + " of your wood.") + "</p>");
                    woodElement.text(0);
                } else {
                    $("#events-div span").after("<p>" + getMsgWithTime("🧝🧝 You don t have wood. Elves are disappointed of us.. :((") + "</p>");
                }
                break;
            case 2:
                let woodcutters = $("#woodcutter-quantity");
                if (+woodcutters.text()) {
                    $("#events-div span").after("<p>" + getMsgWithTime("🧝🧝 Elves don't like when you cut trees. They killed: " + woodcutters.text() + " of your woodcutters. They said - sorry.") + "</p>");
                    for (let i = 0, amount = +woodcutters.text(); i < amount; i++) {
                        killWoodcutter();
                    }
                } else {
                    $("#events-div span").after("<p>" + getMsgWithTime("🧝🧝 Main Elf said - we like you.") + "</p>");
                }
                break;
        }
    }

    function ufoEvent() {
        let farmerElement = $("#farmer-quantity");
        if (farmerElement.text() > 25) {
            switch (getRandomInt(3)) {
                case 1:
                    let killedFarmerAmount = Math.round(0.1 * +farmerElement.text());
                    $("#events-div span").after("<p>" + getMsgWithTime("🛸 Ufo Aliens tried to improve your human beings, but it wasn't successful. Unfortunately they killed: " + killedFarmerAmount + " of your farmers. Maybe in the next time.") + "</p>");
                    for (let i = 0, amount = killedFarmerAmount; i < amount; i++) {
                        killFarmer();
                    }
                    break;
                case 2:
                    $("#events-div span").after("<p>" + getMsgWithTime("👩‍🌾👩‍🌾 👾👾 Your farmers said that they saw strange nightmares. ") + "</p>");
                    break;
                case 3:
                    let newResources = Math.round(0.4 * +$("#stone-quantity").text());
                    $("#events-div span").after("<p>" + getMsgWithTime("🛸 Ufo gave to you a mighty artifact to improve your human beings, but your people didn't know how to apply this and they just exchanged it with more advanced civilization for: " + newResources + " stones.") + "</p>");
                    changeFloatNumber("#stone-quantity", newResources);
                    break;
            }
        } else {
            $("#events-div span").after("<p>" + getMsgWithTime("👩‍🌾👩‍🌾 Your farmers said that they saw something strange in the skies. You said - ha, rich imagination") + "</p>");
        }
    }

    function bloodMoonEvent() {
        let corpseElement = $("#corpse-quantity");
        if (+corpseElement.text()) {
            switch (getRandomInt(2)) {
                case 1:
                    $("#events-div span").after("<p>" + getMsgWithTime("🧑🧑🧑 Your people said that corpses overturned during the last full moon night. You said - ha, rich imagination") + "</p>");
                    break;
                case 2:
                    let wakeUpUndead = getRandomInt(+corpseElement.text());
                    switch (getRandomInt(2)) {
                        case 1:
                            if (wakeUpUndead && +$("#current-population").text()) {
                                $("#events-div span").after("<p>" + getMsgWithTime("🧛🧛 Some white walkers came from your corpse storage and killed a few of your people. Than they went back. You have more corpses.") + "</p>");
                                for (let i = 0, amount = wakeUpUndead; i < amount; i++) {
                                    findPersonToKill();
                                }
                            }
                            break;
                        case 2:
                            $("#events-div span").after("<p>" + getMsgWithTime("🧛🧛 Some white walkers came from your corpse storage and went to another village. Than they went back to sleep.") + "</p>");
                            break;
                    }
            }
        } else {
            $("#events-div span").after("<p>" + getMsgWithTime("🌘 Your people like fool moon this night.") + "</p>");

        }
    }

    function weatherEvent() {
        // TODO add illness
        let woodElement = $("#wood-quantity");
        let minerElement = $("#miner-quantity");
        switch (getRandomInt(2)) {
            // Storm
            case 1:
                if (+woodElement.text() > 9) {
                    $("#events-div span").after("<p>" + getMsgWithTime("⛈️There is a storm. It spoiled some of your wood: " + Math.round(+woodElement.text() * 0.3) + " is lost.") + "</p>");
                    woodElement.text(Math.round(+woodElement.text() * 0.7));
                } else {
                    $("#events-div span").after("<p>" + getMsgWithTime("🌈 There was a small rain.") + "</p>");
                }
                break;
            // Earthquake
            case 2:
                switch (getRandomInt(2)) {
                    case 1:
                        if (+minerElement.text() > 3) {
                            let killedMinerAmount = Math.round(0.3 * +minerElement.text());
                            $("#events-div span").after("<p>" + getMsgWithTime("🧶 ☹ There was a big earthquake. Unfortunately it killed: " + killedMinerAmount + " of your miners.") + "</p>");
                            for (let i = 0, amount = killedMinerAmount; i < amount; i++) {
                                killMiner();
                            }
                        } else {
                            let newResources = Math.round(0.27 * +woodElement.text());
                            $("#events-div span").after("<p>" + getMsgWithTime("🧶️ There was a middle earthquake. Some trees were down and it gave you : " + newResources + " woods.") + "</p>");
                            changeFloatNumber("#wood-quantity", newResources);
                        }
                        break;
                    case 2:
                        $("#events-div span").after("<p>" + getMsgWithTime("🧶 There was a light earthquake.") + "</p>");
                        break;
                }
                break;
        }
    }

    function wildAmazonEvent() {
        let $scientistQuantity = $("#scientist-quantity");
        if (+$scientistQuantity.text() >= 10) {
            switch (getRandomInt(3)) {
                case 1:
                    $("#events-div span").after("<p>" + getMsgWithTime("Your people communicated a bit with Amazons 👧👧👧👧") + "</p>");
                    break;
                case 2:
                    let killedScientistAmount = Math.round(0.5 * +$scientistQuantity.text());
                    $("#events-div span").after("<p>" + getMsgWithTime("👧👧👧👧 Wild Amazons kidnapped some of your people. Than they brought you back " + killedScientistAmount + " male corpses, you see smiles on corpse's faces.") + "</p>");
                    for (let i = 0, amount = killedScientistAmount; i < amount; i++) {
                        killScientist();
                    }
                    $("#knowledge-quantity").text(Math.round(+$("#knowledge-quantity").text() * 0.5));
                    break;
                case 3:
                    let newMaleAmount = Math.round(0.25 * +$scientistQuantity.text());
                    $("#events-div span").after("<p>" + getMsgWithTime("👧👧👧👧 Amazons brings a few males to your people . " + newMaleAmount + " new free people.") + "</p>");
                    gameManager.createCitizen(newMaleAmount);
                    break;
            }
        } else {
            $("#events-div span").after("<p>" + getMsgWithTime("Your people saw a lot of beautiful wild amazons 👧👧👧👧") + "</p>");
        }
    }

    function birthDeathCycleEvent() {
        let currentPopulation = +$("#current-population").text();
        let changeAmount = Math.round(currentPopulation * 0.25);
        switch (getRandomInt(2)) {
            case 1:
                $("#events-div span").after("<p>" + getMsgWithTime("👪👪 +" + changeAmount + " new people were born.") + "</p>");
                gameManager.createCitizen(changeAmount)
                break;
            case 2:
                $("#events-div span").after("<p>" + getMsgWithTime("👪👪 -" + changeAmount + " died because of age.") + "</p>");
                for (let i = 0; i < changeAmount; i++) {
                    findPersonToKill();
                }
                break;
        }
    }

    function farmerEvent() {
        let farmerQuantityEl = $("#farmer-quantity");
        $("#events-div span").after("<p>" + getMsgWithTime("🥔🥔🥔 🥝🥝 your people see a lot of some new kind of food.") + "</p>");

        let foodElement = $("#food-quantity");
        switch (getRandomInt(5)) {
            case 1:
                $("#events-div span").after("<p>" + getMsgWithTime("Farmers found " + Math.round(+foodElement.text() * 1.8) + " potatoes.") + "</p>");
                changeFloatNumber("#food-quantity", Math.round(foodElement.text() * 1.8));
                break;
            case 2:
                $("#events-div span").after("<p>" + getMsgWithTime("🐰🐰🐰 Farmers found wild rabbits on the field. Obviously it was bad decision to try to take rabbit's food. Assassin rabbits killed : " + Math.round(farmerQuantityEl.text() * 0.15) + " farmers.") + "</p>");
                for (let i = 0, amount = Math.round(farmerQuantityEl.text() * 0.15); i < amount; i++) {
                    killFarmer();
                }
                break;
            case 3:
                $("#events-div span").after("<p>" + getMsgWithTime("🐰🐰🐰 Farmers came to new kind of food, than they noticed strange rabbits near and farmers decided to go back. Maybe that was a right decision.") + "</p>");
                break;
            case 4:
                $("#events-div span").after("<p>" + getMsgWithTime("Farmers found " + Math.round(+foodElement.text() * 2.5) + " kiwi fruits.") + "</p>");
                changeFloatNumber("#food-quantity", Math.round(foodElement.text() * 2.5));
                break;
            case 5:
                $("#events-div span").after("<p>" + getMsgWithTime("🐀🐀🐀 Rats ate " + Math.round(+foodElement.text() * 0.9) + " of your food.") + "</p>");
                changeFloatNumber("#food-quantity", -Math.round(foodElement.text() * 0.9));
                break;
        }
    }

    function changeColor(checkEl, target, button) {
        if (+checkEl.text() > 0) {
            target.css({"background-color": "green", "color": "white"});
            if (!!button) {
                button.css({"background-color": "", "color": "black"});
            }
        } else if (+checkEl.text() == 0) {
            target.css({"background-color": "", "color": "black"});
        } else {
            target.css({"background-color": "red", "color": "white"});
            if (!!button) {
                button.css({"background-color": "green", "color": "white"});
            }
        }
    }

    function checkProduction() {
        changeColor($("#food-production-quantity"), $("#food-production-span"), $("#add-farmer-button"));
        changeColor($("#wood-production-quantity"), $("#wood-production-span"));
        changeColor($("#stone-production-quantity"), $("#stone-production-span"));
        changeColor($("#knowledge-production-quantity"), $("#knowledge-production-span"));
        changeColor($("#lazybone-quantity"), $("#lazybone-quantity"));
    }

    function balanceOverflow(currentEl, maxEl) {
        if (+maxEl.text() < currentEl.text()) {
            currentEl.text(maxEl.text());
        }
    }

    function balanceToMaxStorage() {
        balanceOverflow($("#food-quantity"), $("#max-food-quantity-span"));
        balanceOverflow($("#wood-quantity"), $("#max-wood-quantity-span"));
        balanceOverflow($("#stone-quantity"), $("#max-stone-quantity-span"));
        balanceOverflow($("#knowledge-quantity"), $("#max-knowledge-quantity-span"));
    }

    //FUNERAL PROCESS
    setInterval(function funeralProcess() {
        let funeralProcesses = +$("#funeral-process-quantity").text();
        let corpses = +$("#corpse-quantity").text();

        if (funeralProcesses && corpses && (+$("#in-graves-quantity").text() < +$("#max-in-graves-quantity").text())) {
            let multiply = funeralProcesses > corpses ? corpses : funeralProcesses;

            changeIntNumber("#corpse-quantity", -1 * multiply);
            changeIntNumber("#in-graves-quantity", 1 * multiply);
            $("#funeral-process-img").show("slow");
        } else {
            // $("#funeral-process-img").hide("slow");
        }
    }, 5000);

    setInterval(function checkFocus() {
        $("#events-div").css("{overflow-y: 0;}");
    }, 15000);

    //WINNER FUNCTION
    let winInterval = setInterval(function checkWinCondition() {
        if ($("#knowledge-quantity").text() >= WINNER_REQUIREMENTS) {
            if (confirm("Congratulations! You collected a lot of knowledge!! \nAlso you've killed: " + $("#corpse-quantity").text() + " people. No so bad..\n" + userName + ", do you try again?")) {
                document.location.reload(true);
            } else {
                changeFloatNumber("#knowledge-quantity", -WINNER_REQUIREMENTS);
                $("#start-again-button").slideToggle("slow");
            }
            clearInterval(winInterval);
        }
    }, 4000);

    function unlockAchievement(achievementName) {
        switch (achievementName) {
            case "UFO Alien":
                $("<img src=\"res/img/achievement/alien.png\" title=\"Player is an alien\"/>").appendTo("#achievement-section");
                break;
            case "Palace":
                $("<img src=\"res/img/achievement/blueprint.png\" title=\"Build a palace\"/>").appendTo("#achievement-section");
                break;
            case "First Research":
                $("<img src=\"res/img/achievement/knowledge.png\" title=\"First research\"/>").appendTo("#achievement-section");
                break;
            case "Starvation":
                $("<img src=\"res/img/common/death.png\" title=\"Die of hunger\"/>").appendTo("#achievement-section");
                break;
            case "Productivity":
                $("<img src=\"res/img/achievement/speedometer.png\" title=\"Achieve high productivity (more than 190%)\"/>").appendTo("#achievement-section");
                break;
            case "More Food":
                $("<img src=\"res/img/achievement/food.png\" title=\"Even more food, hurray!!! :)\"/>").appendTo("#achievement-section");
                break;
        }
    }

    setInterval(function () {
        $("#events-div").animate({scrollTop: 0}, "fast");
    }, 2e4);
});
