$(function () {
    "use strict";
    // VARIABLES
    // 1.Win
    let WINNER_REQUIREMENTS = 1e6;
    // 2.Spaces
    var currentSpaceInSchool = 0,
        currentDjSpaces = 0,
        currentInstructorSpaces = 0,
        spaceInOneClub = 25,
        spaceInOneSchool = 5;
    // 3.Productivity flags
    var djProductivity = false,
        healthProductivity = false,
        abundance = false;
    // 4. User name
    var userName = prompt("Великий человек, как тебя зовут?") || "UFO Alien";
    $("#user-name").text(userName);
    if (userName == "UFO Alien") {
        unlockAchievement("UFO Alien");
    }
    // Game variables
    var citizenCost = 10,
        booster = 1,
        wood_production = 0.5 * booster,
        stone_production = 0.2 * booster,
        knowledge_production = 0.1 * booster,
        foodProduction = 1.2 * booster,
        productivity = 1.0;

    //CLICK EVENTS
    // 1. CLICK TO THE RESOURCES
    $("#food-click-button").click(function clickFoodButton() {
        changeFloatNumber("#food-quantity", 1 * booster);
    });
    $("#wood-click-button").click(function clickWoodButton() {
        changeFloatNumber("#wood-quantity", 1 * booster);
    });
    $("#stone-click-button").click(function clickStoneButton() {
        changeFloatNumber("#stone-quantity", 1 * booster);
    });
    // 2. START AGAIN
    $("#start-again-button").click(function reloadSite() {
        document.location.reload(true);
    });
    // 3. CREATE WORKER
    $("#create-worker-button").click(function createWorker() {
        if ($("#food-quantity").text() >= citizenCost && +$("#current-population").text() < $("#max-population").text()) {
            changeFloatNumber("#food-quantity", -citizenCost);
            changeIntNumber("#current-population", 1);
            changeIntNumber("#free-people-quantity", 1);
            changeFloatNumber("#food-production-quantity", -1);

            if (+$("#current-population").text() <= +$("#dj-quantity").text() * spaceInOneClub) {
                $("#current-happy-people").text($("#current-population").text());
            }
            if (+$("#current-population").text() <= +$("#instructor-quantity").text() * spaceInOneClub) {
                $("#current-health-people").text($("#current-population").text());
            }
        }

    });
    // 4. BUILD
    $("#build-grave-button").click(function buildGrave() {
        let $woodPrice = 5;
        let $stonePrice = 5;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            //TODO how to invoke next 2 lines just once?
            $("#funeral-process-job-row").css("display", "table-row");
            $("#in-graves-row").css("display", "table-row");

            changeIntNumber("#grave-quantity", 1);
            changeIntNumber("#max-in-graves-quantity", 1);
        }
    });
    $("#build-tent-button").click(function buildTent() {
        let $woodPrice = 20;
        if ($("#wood-quantity").text() >= $woodPrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);

            changeIntNumber("#tent-quantity", 1);
            changeIntNumber("#max-population", 2);
        }
    });
    $("#build-hut-button").click(function buildHut() {
        let $woodPrice = 20;
        let $stonePrice = 20;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#hut-quantity", 1);
            changeIntNumber("#max-population", 5);
        }
    });
    $("#build-school-button").click(function buildSchool() {
        let $woodPrice = 20;
        let $stonePrice = 20;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            //TODO how to invoke next 2 lines just once?
            $("#in-school-row").css("display", "table-row");
            $("#knowledge-row").css("display", "table-row");

            changeIntNumber("#school-quantity", 1);
            currentSpaceInSchool += spaceInOneSchool;
            changeIntNumber("#max-scholar-quantity", spaceInOneSchool);
        }
    });
    $("#build-music-club-button").click(function buildMusicClub() {
        let $woodPrice = 75;
        let $stonePrice = 75;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            //TODO how to invoke next 3 lines just once?
            $("#in-dj-row").css("display", "table-row");
            $("#happiness-row").css("display", "table-row");
            $("#productivity-row").css("display", "table-row");

            changeIntNumber("#music-club-quantity", 1);
            currentDjSpaces++;
            changeIntNumber("#max-dj-quantity", 1);
            changeIntNumber("#max-happy-people", spaceInOneClub);
        }
    });
    $("#build-yoga-club-button").click(function buildSportClub() {
        let $woodPrice = 75;
        let $stonePrice = 75;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            //TODO how to invoke next 3 lines just once?
            $("#in-instructor-row").css("display", "table-row");
            $("#health-row").css("display", "table-row");
            $("#productivity-row").css("display", "table-row");

            changeIntNumber("#yoga-club-quantity", 1);
            currentInstructorSpaces++;
            changeIntNumber("#max-instructor-quantity", 1);
            changeIntNumber("#max-health-people", spaceInOneClub);
        }
    });
    $("#build-palace-button").click(function buildPalace() {
        let $woodPrice = 1000;
        let $stonePrice = 1000;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            unlockAchievement("Palace");

            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#palace-quantity", 1);
            let schoolInOnePalace = 5;
            let musicClubInOnePalace = 10;
            let sportClubInOnePalace = 10;
            changeIntNumber("#school-quantity", schoolInOnePalace);
            changeIntNumber("#music-club-quantity", musicClubInOnePalace);
            changeIntNumber("#yoga-club-quantity", sportClubInOnePalace);

            changeIntNumber("#max-scholar-quantity", spaceInOneSchool * schoolInOnePalace);
            changeIntNumber("#max-happy-people", spaceInOneClub * musicClubInOnePalace);
            changeIntNumber("#max-health-people", spaceInOneClub * sportClubInOnePalace);
            currentSpaceInSchool += spaceInOneSchool * schoolInOnePalace;
            changeIntNumber("#max-dj-quantity", musicClubInOnePalace);
            currentDjSpaces += musicClubInOnePalace;
            changeIntNumber("#max-instructor-quantity", sportClubInOnePalace);
            currentInstructorSpaces += sportClubInOnePalace;

            //TODO How to invoke this just once?
            if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've killed: " + $("#corpse-quantity").text() + " people. No so bad..\n" + +userName + ", do you wanna play again?")) {
                document.location.reload(true);
            } else {
                $("#start-again-button").css("display", "block");
            }
        }
    });

    //WORK SETTING
    // 1. FARMER
    $("#remove-farmer-button").click(function removeFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", true)) {
            changeIntNumber("#farmer-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            changeFloatNumber("#food-production-quantity", -foodProduction);
        }
    });
    $("#add-farmer-button").click(function addFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", false)) {
            changeIntNumber("#farmer-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            changeFloatNumber("#food-production-quantity", foodProduction);
        }
    });
    // 2. WOODCUTTER
    $("#remove-woodcutter-button").click(function removeWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", true)) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            changeFloatNumber("#wood-production-quantity", -wood_production);
        }
    });
    $("#add-woodcutter-button").click(function addWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", false)) {
            changeIntNumber("#woodcutter-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            changeFloatNumber("#wood-production-quantity", wood_production);
        }
    });
    // 3. MINER
    $("#remove-miner-button").click(function removeMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", true)) {
            changeIntNumber("#miner-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            changeFloatNumber("#stone-production-quantity", -stone_production);

        }
    });
    $("#add-miner-button").click(function addMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", false)) {
            changeIntNumber("#miner-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            changeFloatNumber("#stone-production-quantity", stone_production);
        }
    });
    // 4. FUNERAL
    $("#remove-funeral-process-button").click(function removeFuneralProcess() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#funeral-process-quantity", true)) {
            changeIntNumber("#funeral-process-quantity", -1);
            changeIntNumber("#free-people-quantity", 2);
        }
    });
    $("#add-funeral-process-button").click(function addFuneralProcess() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#funeral-process-quantity", false, 2)) {
            changeIntNumber("#funeral-process-quantity", 1);
            changeIntNumber("#free-people-quantity", -2);
        }
    });// 4. SCHOLAR
    $("#remove-scholar-button").click(function removeScholar() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scholar-quantity", true)) {
            changeIntNumber("#scholar-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            changeFloatNumber("#knowledge-production-quantity", -knowledge_production);
            currentSpaceInSchool++;
        }
    });
    $("#add-scholar-button").click(function addScholar() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scholar-quantity", false) && currentSpaceInSchool) {
            changeIntNumber("#scholar-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            changeFloatNumber("#knowledge-production-quantity", knowledge_production);
            currentSpaceInSchool--;
        }
    });
    // 5. Dj
    $("#add-dj-button").click(function addDj() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#dj-quantity", false) && currentDjSpaces) {
            changeIntNumber("#dj-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            currentDjSpaces--;

            let $peopleAmount = +$("#current-population").text();
            let $totalAvailableSpaceInClub = +$("#dj-quantity").text() * spaceInOneClub;

            if ($peopleAmount <= $totalAvailableSpaceInClub) {
                $("#current-happy-people").text($peopleAmount);
            } else {
                changeIntNumber("#current-happy-people", spaceInOneClub);
            }

            if (!djProductivity) {
                increaseAllProduction();
                djProductivity = !djProductivity;
            }
        }
    });
    // 6. Instructor
    $("#add-instructor-button").click(function addInstructor() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#instructor-quantity", false) && currentInstructorSpaces) {
            changeIntNumber("#instructor-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            currentInstructorSpaces--;

            let $peopleAmount = +$("#current-population").text();
            let $totalAvailableSpaceInClub = +$("#instructor-quantity").text() * spaceInOneClub;

            if ($peopleAmount <= $totalAvailableSpaceInClub) {
                $("#current-health-people").text($peopleAmount);
            } else {
                changeIntNumber("#current-health-people", spaceInOneClub);
            }

            if (!healthProductivity) {
                increaseAllProduction();
                healthProductivity = !healthProductivity;
            }
        }
    });

    // TECHNOLOGIES
    $("#changes-button").click(function researchChanges() {
        let $woodPrice = 10;
        let $stonePrice = 10;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            unlockAchievement("First Research");

            $("#architecture-row").css("display", "table-row");
            $("#agriculture-row").css("display", "table-row");
            $("#funeral-tech-row").css("display", "table-row");
            $("#school-row").css("display", "table-row");
            $("#changes-row").css("display", "none");

            $("#already-known-p").css("display", "block");
            $("#changes-p").css("display", "block");
        }
    });
    $("#agriculture-button").click(function researchAgriculture() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#food-img").attr("src", "res/img/grapes.png");
            recalculateFoodProduction();
            //TODO add achievement "More food, hurray!!! :)"

            $("#agriculture-row").css("display", "none");
            $("#changes2-row").css("display", "table-row");

            $("#agriculture-p").css("display", "block");
        }
    });
    $("#funeral-tech-button").click(function researchFuneralProcess() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#grave-build-row").css("display", "table-row");
            $("#funeral-tech-row").css("display", "none");

            $("#funeral-p").css("display", "block");
        }
    });
    $("#architecture-button").click(function researchArchitecture() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#hut-row").css("display", "table-row");
            $("#architecture-row").css("display", "none");
            $("#changes2-row").css("display", "table-row");

            $("#architecture-p").css("display", "block");
        }
    });
    $("#changes2-button").click(function researchChanges2() {
        let $knowledgePrice = 75.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#changes2-row").css("display", "none");
            $("#agriculture2-row").css("display", "table-row");
            $("#music-row").css("display", "table-row");
            $("#sport-row").css("display", "table-row");

            $("#changes2-p").css("display", "block");
        }
    });
    $("#agriculture2-button").click(function researchAgriculture2() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#food-img").attr("src", "res/img/field.png");
            recalculateFoodProduction();
            unlockAchievement("More Food")
            $("#agriculture2-row").css("display", "none");

            $("#agriculture2-p").css("display", "block");
        }
    });
    $("#music-button").click(function researchMusic() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#music-row").css("display", "none");
            $("#music-club-row").css("display", "table-row");

            $("#music-p").css("display", "block");
        }
    });
    $("#sport-button").click(function researchSport() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#sport-row").css("display", "none");
            $("#yoga-club-row").css("display", "table-row");
            $("#architecture2-row").css("display", "table-row");
            $("#change3-row").css("display", "table-row");

            $("#sport-p").css("display", "block");
        }
    });
    $("#architecture2-button").click(function researchArchitecture2() {
        let $knowledgePrice = 500.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#architecture2-row").css("display", "none");
            $("#palace-row").css("display", "table-row");
            $("#changes3-row").css("display", "table-row");

            $("#architecture2-p").css("display", "block");
        }
    });

    function checkIsThereFreeCitizen(free, work, checkWorker, number) {
        if (number) {
            return checkWorker ? $(work).text() > 0 : $(free).text() >= number;
        } else {
            return checkWorker ? $(work).text() > 0 : $(free).text() > 0;
        }

    }

    function changeIntNumber(elementName, quantity) {
        let $oldQuantity = +$(elementName).text();
        $oldQuantity += +quantity;
        $(elementName).text($oldQuantity);
    }

    function changeFloatNumber(elementName, quantity) {
        let $oldQuantity = parseFloat($(elementName).text());
        $oldQuantity = Math.round($oldQuantity * 100 + quantity * 100) / 100;
        $(elementName).text($oldQuantity.toFixed(1));
    }

    function findPersonToKill() {
        $("#corpse-row").css("display", "table-row");
        changeIntNumber("#corpse-quantity", 1);

        if (+$("#free-people-quantity").text()) {
            changeIntNumber("#free-people-quantity", -1);
        } else if (+$("#woodcutter-quantity").text()) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeFloatNumber("#wood-production-quantity", -wood_production);
        } else if (+$("#miner-quantity").text()) {
            changeIntNumber("#miner-quantity", -1);
            changeFloatNumber("#stone-production-quantity", -stone_production);
        } else if (+$("#scholar-quantity").text()) {
            changeIntNumber("#scholar-quantity", -1);
            changeFloatNumber("#knowledge-production-quantity", -knowledge_production);
        } else if (+$("#dj-quantity").text()) {
            changeIntNumber("#dj-quantity", -1);
            changeIntNumber("#current-happy-people", ($("#current-population").text() <= spaceInOneClub ? $("#current-population").text() : -(spaceInOneClub - 1)));
        } else if (+$("#instructor-quantity").text()) {
            changeIntNumber("#instructor-quantity", -1);
            changeIntNumber("#current-health-people", ($("#current-population").text() <= spaceInOneClub ? $("#current-population").text() : -(spaceInOneClub - 1)));
        } else if (+$("#funeral-process-quantity").text()) {
            changeIntNumber("#funeral-process-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);
        } else if (+$("#farmer-quantity").text()) {
            changeIntNumber("#farmer-quantity", -1);
            changeFloatNumber("#food-production-quantity", -foodProduction);
        }
    }

    function recalculateFoodProduction() {
        foodProduction = Math.round(foodProduction * 100 + 0.15 * 100) / 100;
        let $farmers = +$("#farmer-quantity").text();
        let $currentPopulation = +$("#current-population").text();
        $("#food-production-quantity").text((Math.round($farmers * (foodProduction * 100) - $currentPopulation * 100) / 100).toFixed(1));
    }

    function increaseAllProduction() {
        productivity = Math.round(productivity * 100 + 0.25 * 100) / 100;
        changeIntNumber("#productivity-quantity", 25);

        recalculateFoodProduction();

        foodProduction *= 1.1;
        let $workerAmount = parseInt($("#farmer-quantity").text());
        let $currentPopulation = parseInt($("#current-population").text());
        $("#food-production-quantity").text(($workerAmount * foodProduction - $currentPopulation).toFixed(1));

        wood_production = Math.round(wood_production * 100 + 0.125 * 100) / 100;
        $workerAmount = parseInt($("#woodcutter-quantity").text());
        $("#wood-production-quantity").text(($workerAmount * wood_production).toFixed(1));

        stone_production = Math.round(stone_production * 100 + 0.05 * 100) / 100;
        $workerAmount = parseInt($("#miner-quantity").text());
        $("#stone-production-quantity").text(($workerAmount * stone_production).toFixed(1));

        knowledge_production = Math.round(knowledge_production * 100 + 0.025 * 100) / 100;
        //TODO why it doesn't work?
//        knowledge_production = knowledge_production.toFixed(2);
        $workerAmount = parseInt($("#scholar-quantity").text());
        $("#knowledge-production-quantity").text(($workerAmount * knowledge_production).toFixed(1));
    }


    //ONE STEP
    setInterval(function oneStep() {
        // get resources
        changeFloatNumber("#food-quantity", parseFloat($("#food-production-quantity").text()));
        changeFloatNumber("#wood-quantity", parseFloat($("#wood-production-quantity").text()));
        changeFloatNumber("#stone-quantity", parseFloat($("#stone-production-quantity").text()));
        changeFloatNumber("#knowledge-quantity", parseFloat($("#knowledge-production-quantity").text()));

        //starvation process
        if ($("#food-quantity").text() < 0 && $("#current-population").text() > 0) {
            changeIntNumber("#current-population", -1);
            changeFloatNumber("#food-production-quantity", 1);
            findPersonToKill();
            $("#starvation-warning").css("display", "block");
            unlockAchievement("Starvation");

            // Decrease quantity of happy
            if (+$("#current-happy-people").text() > $("#current-population").text()) {
                changeIntNumber("#current-happy-people", -1);
            }
            // and health people
            if (+$("#current-health-people").text() > $("#current-population").text()) {
                changeIntNumber("#current-health-people", -1);
            }
        } else {
            $("#starvation-warning").css("display", "none");
        }

        //check food production
        if ($("#food-production-quantity").text() < 0) {
            $("#food-production-span").css("background-color", "red");
            $("#food-production-span").css("color", "white");
        } else {
            $("#food-production-span").css("background-color", "");
            $("#food-production-span").css("color", "black");
        }

        //TODO abundance of food
        //

        if ($("#productivity-quantity").text() == 175) {
            unlockAchievement("Productivity");
        }

        if (+$("#free-people-quantity").text()) {
            $("#free-people-quantity").css("background-color", "red");
            $("#free-people-quantity").css("color", "white");
        } else {
            $("#free-people-quantity").css("background-color", "");
            $("#free-people-quantity").css("color", "black");

        }
    }, 1000);

    //FUNERAL PROCESS
    setInterval(function funeralProcess() {
        let $funeralProcesses = +$("#funeral-process-quantity").text();
        let $corpses = +$("#corpse-quantity").text();
        let $graves = +$("#max-in-graves-quantity").text();
        let $inGraves = +$("#in-graves-quantity").text();

        if ($funeralProcesses && $corpses && ($inGraves < $graves)) {
            changeIntNumber("#corpse-quantity", -1);
            changeIntNumber("#in-graves-quantity", 1);
            $("#funeral-process-img").css("display","inline-block");
        } else {
            $("#funeral-process-img").css("display","none");
        }
    }, 5000);

    //WINNER FUNCTION
    let winInterval = setInterval(function checkWinCondition() {
        if ($("#knowledge-quantity").text() >= WINNER_REQUIREMENTS) {
            if (confirm("Congratulations! You collected a lot of knowledge!! \nAlso you've killed: " + $("#corpse-quantity").text() + " people. No so bad..\n" + userName + ", do you wanna play again?")) {
                document.location.reload(true);
                changeFloatNumber("#knowledge-quantity", WINNER_REQUIREMENTS);
            } else {
                $("#start-again-button").css("display", "block");
            }
            clearInterval(winInterval);
        }
    }, 4000);

    function unlockAchievement(achievementName) {
        switch (achievementName) {
            case "UFO Alien":
                $("<img id=\"ufo-achievement\" src=\"res/img/alien.png\" title=\"Player is alien\"/>").appendTo("#achievement-section");
                break;
            case "Palace":
                $("<img id=\"build-palace-achievement\" src=\"res/img/blueprint.png\" title=\"Build a palace\"/>").appendTo("#achievement-section");
                break;
            case "First Research":
                $("<img id=\"first-research-achievement\" src=\"res/img/knowledge.png\" title=\"First research\"/>").appendTo("#achievement-section");
                break;
            case "Starvation":
                $("<img id=\"die-of-hunger-achievement\" src=\"res/img/reaper.png\" title=\"Die of hunger\"/>").appendTo("#achievement-section");
                break;
            case "Productivity":
                $("<img id=\"max-productivity-achievement\" src=\"res/img/speedometer.png\" title=\"Achieve max productivity (175%)\"/>").appendTo("#achievement-section");
                break;
            case "More Food":
                $("<img id=\"more-food-achievement\" src=\"res/img/food.png\" title=\"Even more food, hurray!!! :)\"/>").appendTo("#achievement-section");
                break;
        }
    }
});
