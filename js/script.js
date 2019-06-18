$(function () {
    "use strict";
    let WINNER_REQUIREMENTS = 100000;
    var currentSpaceInSchools = 0,
        currentDjSpaces = 0,
        currentInstructorSpaces = 0;
    var djProductivity = false,
        healthProductivity = false,
        abundance = false;
    var userName = prompt("Великий человек, как тебя зовут?") || "UFO Alien";
    $("#user-name").text(userName);
    if (userName == "UFO Alien") {
        $("#ufo-achievement").css("display", "inline-block");
        $("#achievement-section").css("display", "block");
    }

    var citizenCost = 10,
        booster = 1,
        wood_production = 0.5 * booster,
        stone_production = 0.2 * booster,
        knowledge_production = 0.1 * booster,
        foodProduction = 1.2 * booster,
        productivity = 1.0;

    //CLICK EVENTS
    // 1. CLICK TO THE RESOURCES
    $("#food-click-button").click(function () {
        changeFloatNumber("#food-quantity", 1 * booster);
    });
    $("#wood-click-button").click(function () {
        changeFloatNumber("#wood-quantity", 1 * booster);
    });
    $("#stone-click-button").click(function () {
        changeFloatNumber("#stone-quantity", 1 * booster);
    });
    // 2. START AGAIN
    $("#start-again-button").click(function reloadSite() {
        document.location.reload(true);
    });
    // 3. CREATE WORKER
    $("#create-worker-button").click(function createWorker() {
        let $foodQuantity = parseFloat($("#food-quantity").text());
        let $currentPopulationQuantity = parseInt($("#current-population").text());
        let $maxPopulationQuantity = parseInt($("#max-population").text());

        if ($foodQuantity >= citizenCost && $currentPopulationQuantity < $maxPopulationQuantity) {
            changeFloatNumber("#food-quantity", -citizenCost);
            changeIntNumber("#current-population", 1);
            changeFloatNumber("#food-production-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            if (parseInt($("#current-happy-people").text()) < parseInt($("#max-happy-people").text()) && $("#dj-quantity").text()) {
                changeIntNumber("#current-happy-people", 1);
            }
            if (parseInt($("#current-health-people").text()) < parseInt($("#max-health-people").text()) && $("#instructor-quantity").text()) {
                changeIntNumber("#current-health-people", 1);
            }
        }

    });
    // 4. BUILD
    $("#build-tent-button").click(function buildTent() {
        let $currentWoodQuantity = $("#wood-quantity").text();

        let $woodPrice = 20;
        if ($currentWoodQuantity >= $woodPrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeIntNumber("#tent-quantity", 1);
            changeIntNumber("#max-population", 2);
        }
    });
    $("#build-hut-button").click(function buildHut() {
        let $currentWoodQuantity = $("#wood-quantity").text();
        let $currentStoneQuantity = $("#stone-quantity").text();

        let $woodPrice = 40;
        let $stonePrice = 20;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeIntNumber("#hut-quantity", 1);
            changeIntNumber("#max-population", 5);
        }
    });
    $("#build-school-button").click(function buildSchool() {
        let $currentWoodQuantity = $("#wood-quantity").text();
        let $currentStoneQuantity = $("#stone-quantity").text();

        let $woodPrice = 20;
        let $stonePrice = 20;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeIntNumber("#school-quantity", 1);
            currentSpaceInSchools += 5;
            $("#in-schools-row").css("display", "table-row");
            $("#knowledge-row").css("display", "table-row");

            changeIntNumber("#max-scholar-quantity", 5);
        }
    });
    $("#build-music-club-button").click(function buildMusicClub() {
        let $currentWoodQuantity = $("#wood-quantity").text();
        let $currentStoneQuantity = $("#stone-quantity").text();

        let $woodPrice = 75;
        let $stonePrice = 75;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeIntNumber("#music-club-quantity", 1);
            currentDjSpaces++;
            $("#in-dj-row").css("display", "table-row");

            $("#happiness-row").css("display", "table-row");
            $("#productivity-row").css("display", "table-row");
            changeIntNumber("#max-happy-people", 25);
            changeIntNumber("#max-dj-quantity", 1);
        }
    });
    $("#build-yoga-club-button").click(function buildSportClub() {
        let $currentWoodQuantity = $("#wood-quantity").text();
        let $currentStoneQuantity = $("#stone-quantity").text();

        let $woodPrice = 75;
        let $stonePrice = 75;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeIntNumber("#yoga-club-quantity", 1);
            currentInstructorSpaces++;
            $("#in-instructor-row").css("display", "table-row");

            $("#health-row").css("display", "table-row");
            $("#productivity-row").css("display", "table-row");
            changeIntNumber("#max-health-people", 25);
            changeIntNumber("#max-instructor-quantity", 1);
        }
    });
    $("#build-palace-button").click(function buildPalace() {
        let $currentWoodQuantity = $("#wood-quantity").text();
        let $currentStoneQuantity = $("#stone-quantity").text();

        let $woodPrice = 1000;
        let $stonePrice = 1000;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            $("#build-palace-achievement").css("display", "inline-block");

            changeFloatNumber("#wood-quantity", -$woodPrice);

            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeIntNumber("#palace-quantity", 1);
            changeIntNumber("#music-club-quantity", 10);
            changeIntNumber("#yoga-club-quantity", 10);

            changeIntNumber("#school-quantity", 5);
            changeIntNumber("#max-happy-people", 250);

            changeIntNumber("#max-health-people", 250);
            changeIntNumber("#max-scholar-quantity", 30);
            currentSpaceInSchools += 25;
            changeIntNumber("#max-dj-quantity", 10);
            currentDjSpaces += 10;
            changeIntNumber("#max-instructor-quantity", 10);

            currentInstructorSpaces += 10;
            if (confirm("Congratulations!!! You built a palace for yourself!!! \n\n" + userName + ", do you wanna play again?")) {
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
    // 4. SCHOLAR
    $("#remove-scholar-button").click(function removeScholar() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scholar-quantity", true)) {
            changeIntNumber("#scholar-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            changeFloatNumber("#knowledge-production-quantity", -knowledge_production);
            currentSpaceInSchools++;
        }
    });
    $("#add-scholar-button").click(function addScholar() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scholar-quantity", false) && currentSpaceInSchools) {
            changeIntNumber("#scholar-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            changeFloatNumber("#knowledge-production-quantity", knowledge_production);
            currentSpaceInSchools--;
        }
    });
    $("#add-dj-button").click(function addDj() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#dj-quantity", false) && currentDjSpaces) {
            changeIntNumber("#dj-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            currentDjSpaces--;

            let $peopleAmount = parseInt($("#current-population").text());
            let $djAmount = parseInt($("#dj-quantity").text());
            if (($peopleAmount - $djAmount * 25) <= 0) {
                $("#current-happy-people").text($peopleAmount);
            } else {
                changeIntNumber("#current-happy-people", 25);
            }

            if (!djProductivity) {
                increaseAllProduction();

                djProductivity = !djProductivity;
            }
        }
    });
    $("#add-instructor-button").click(function addInstructor() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#instructor-quantity", false) && currentInstructorSpaces) {
            changeIntNumber("#instructor-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            currentInstructorSpaces--;

            let $peopleAmount = parseInt($("#current-population").text());
            let $instructorAmount = parseInt($("#instructor-quantity").text());
            if (($peopleAmount - $instructorAmount * 25) <= 0) {
                $("#current-health-people").text($peopleAmount);
            } else {
                changeIntNumber("#current-health-people", 25);
            }

            if (!healthProductivity) {
                increaseAllProduction();

                healthProductivity = !healthProductivity;
            }
        }
    });

    // TECHNOLOGIES
    $("#changes-button").click(function researchChanges() {
        let $currentWoodQuantity = parseFloat($("#wood-quantity").text());
        let $currentStoneQuantity = parseFloat($("#stone-quantity").text());

        let $woodPrice = 10;
        let $stonePrice = 10;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            $("#first-research-achievement").css("display", "inline-block");
            $("#achievement-section").css("display", "block");
            $("#architecture-row").css("display", "table-row");
            $("#agriculture-row").css("display", "table-row");
            $("#school-row").css("display", "table-row");
            $("#changes-row").css("display", "none");

            $("#already-known-p").css("display", "block");
            $("#changes-p").css("display", "block");
        }
    });
    $("#architecture-button").click(function researchArchitecture() {
        let $currentknowledgeQuantity = parseFloat($("#knowledge-quantity").text());

        let $knowledgePrice = 30.0;
        if ($currentknowledgeQuantity >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#hut-row").css("display", "table-row");
            $("#changes2-row").css("display", "table-row");

            $("#architecture-row").css("display", "none");

            $("#architecture-p").css("display", "block");
        }
    });
    $("#agriculture-button").click(function researchAgriculture() {
        let $currentknowledgeQuantity = parseFloat($("#knowledge-quantity").text());

        let $knowledgePrice = 30.0;
        if ($currentknowledgeQuantity >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#food-img").attr("src", "res/img/grapes.png");

            recalculateFoodProduction();

            $("#changes2-row").css("display", "table-row");

            $("#agriculture-row").css("display", "none");

            $("#agriculture-p").css("display", "block");
        }
    });
    $("#changes2-button").click(function researchChanges2() {
        let $currentknowledgeQuantity = parseFloat($("#knowledge-quantity").text());

        let $knowledgePrice = 75.0;
        if ($currentknowledgeQuantity >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#agriculture2-row").css("display", "table-row");
            $("#music-row").css("display", "table-row");
            $("#sport-row").css("display", "table-row");
            $("#changes2-row").css("display", "none");

            $("#changes2-p").css("display", "block");
        }
    });
    $("#agriculture2-button").click(function researchAgriculture2() {
        let $currentknowledgeQuantity = parseFloat($("#knowledge-quantity").text());

        let $knowledgePrice = 100.0;
        if ($currentknowledgeQuantity >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#food-img").attr("src", "res/img/food.png");
            recalculateFoodProduction();
            $("#agriculture2-row").css("display", "none");

            $("#agriculture2-p").css("display", "block");
        }
    });
    $("#music-button").click(function researchMusic() {
        let $currentknowledgeQuantity = parseFloat($("#knowledge-quantity").text());

        let $knowledgePrice = 100.0;
        if ($currentknowledgeQuantity >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#music-club-row").css("display", "table-row");
            $("#music-row").css("display", "none");

            $("#music-p").css("display", "block");
        }
    });
    $("#sport-button").click(function researchSport() {
        let $currentknowledgeQuantity = parseFloat($("#knowledge-quantity").text());

        let $knowledgePrice = 100.0;
        if ($currentknowledgeQuantity >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#yoga-club-row").css("display", "table-row");
            $("#architecture2-row").css("display", "table-row");
            $("#change3-row").css("display", "table-row");
            $("#sport-row").css("display", "none");

            $("#sport-p").css("display", "block");
        }
    });
    $("#architecture2-button").click(function researchArchitecture2() {
        let $currentknowledgeQuantity = parseFloat($("#knowledge-quantity").text());

        let $knowledgePrice = 500.0;
        if ($currentknowledgeQuantity >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#changes3-row").css("display", "table-row");
            $("#palace-row").css("display", "table-row");
            $("#architecture2-row").css("display", "none");

            $("#architecture2-p").css("display", "block");
        }
    });

    function checkIsThereFreeCitizen(free, work, remove) {
        return remove ? $(work).text() > 0 : $(free).text() > 0;

    }

    function changeIntNumber(elementName, quantity) {
        let $oldQuantity = parseInt($(elementName).text());
        $oldQuantity += quantity;
        $(elementName).text($oldQuantity);
    }

    function changeFloatNumber(elementName, quantity) {
        let $oldQuantity = parseFloat($(elementName).text());
        $oldQuantity += quantity;
        $(elementName).text($oldQuantity.toFixed(1));
    }

    function findPersonToKill() {
        $("#corpse-row").css("display", "table-row");
        changeIntNumber("#corpse-quantity", 1);

        if ($("#free-people-quantity").text()) {
            changeIntNumber("#free-people-quantity", -1);
        } else if ($("#woodcutter-quantity").text()) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeFloatNumber("#wood-production-quantity", -wood_production);
        } else if ($("#miner-quantity").text()) {
            changeIntNumber("#miner-quantity", -1);
            changeFloatNumber("#stone-production-quantity", -stone_production);
        } else if ($("#farmer-quantity").text()) {
            changeIntNumber("#farmer-quantity", -1);
            changeFloatNumber("#food-production-quantity", -foodProduction);
        } else if ($("#scholar-quantity").text()) {
            changeIntNumber("#scholar-quantity", -1);
            changeFloatNumber("#knowledge-production-quantity", -knowledge_production);
        }
    }

    function recalculateFoodProduction() {
        foodProduction += 0.15;
        let $farmers = parseInt($("#farmer-quantity").text());
        let $currentPopulation = parseInt($("#current-population").text());
        $("#food-production-quantity").text(($farmers * foodProduction - $currentPopulation).toFixed(1));
    }

    function increaseAllProduction() {
        productivity += 0.25;
        changeIntNumber("#productivity-quantity", 25);

        let $index = 1.25;

        foodProduction *= 1.1;
        let $workerAmount = parseInt($("#farmer-quantity").text());
        let $currentPopulation = parseInt($("#current-population").text());
        $("#food-production-quantity").text(($workerAmount * foodProduction - $currentPopulation).toFixed(1));

        wood_production *= $index;
        $workerAmount = parseInt($("#woodcutter-quantity").text());
        $("#wood-production-quantity").text(($workerAmount * wood_production).toFixed(1));

        stone_production *= $index;
        $workerAmount = parseInt($("#miner-quantity").text());
        $("#stone-production-quantity").text(($workerAmount * stone_production).toFixed(1));

        knowledge_production *= $index;
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
        if (parseFloat($("#food-quantity").text()) < 0 && parseFloat($("#current-population").text()) > 0) {
            changeIntNumber("#current-population", -1);
            changeFloatNumber("#food-production-quantity", 1);
            findPersonToKill();
            $("#starvation-warning").css("display", "inline");
            $("#die-of-hunger-achievement").css("display", "inline-block");
            $("#achievement-section").css("display", "block");
            //decrease quantity of health and happy people

            if (parseInt($("#current-happy-people").text()) > $("#current-population")) {
                changeIntNumber("#current-happy-people", -1);
            }
            if (parseInt($("#current-health-people").text()) > $("#current-population")) {
                changeIntNumber("#current-health-people", -1);
            }
        } else {
            $("#starvation-warning").css("display", "none");
        }
        if ($("#food-production-quantity").text() < 0) {
            $("#food-production-quantity").css("background-color", "red");
            $("#food-production-quantity").css("color", "white");
        } else {
            $("#food-production-quantity").css("background-color", "");
            $("#food-production-quantity").css("color", "black");
        }

        //TODO abundance of food
        if (parseInt($("#productivity-quantity").text()) == 175) {
            $("#max-productivity-achievement").css("display", "inline-block");
        }
    }, 1000);

    //WINNER FUNCTION
    let winInterval = setInterval(function checkWinCondition() {
        if (parseFloat($("#knowledge-quantity").text()) >= WINNER_REQUIREMENTS) {
            if (confirm("Congratulations!!! You collected a lot of knowledge!!! \n\n" + userName + ", do you wanna play again?")) {
                document.location.reload(true);
                changeFloatNumber("#knowledge-quantity", WINNER_REQUIREMENTS);
            } else {
                $("#start-again-button").css("display", "block");
                clearInterval(winInterval);
            }
        }
    }, 4000);
});
