$(function () {
    "use strict";
    let WINNER_REQUIREMENTS = 100000;

    var currentSpaceInLibraries = 0,
        currentDjSpaces = 0,
        currentInstructorSpaces = 0;

    var djProductivity = false,
        healthProductivity = false;

    //    var userName = "Goblin";
    var userName = prompt("Великий человек, как тебя зовут?");
    userName = userName || "UFO alien";
    $("#user-name").text(userName);

    var citizenCost = 2,
        buster = 10,
        wood_production = 0.5 * buster,
        stone_production = 0.2 * buster,
        thought_production = 0.1 * buster,
        foodProduction = 1.2 * buster,
        productivity = 1.0;

    //clicker events
    $("#food-button").click(function () {
        changeFloatNumber("#food-quantity", 1);
    });
    $("#wood-button").click(function () {
        changeFloatNumber("#wood-quantity", 0.5);
    });
    $("#stone-button").click(function () {
        changeFloatNumber("#stone-quantity", 0.2);
    });
    $("#thought-button").click(function () {
        changeFloatNumber("#thought-quantity", 0.1);
    });

    //create-worker event
    $("#create-worker-button").click(function () {
        var $foodQuantity = parseFloat($("#food-quantity").text());
        var $currentPopulationQuantity = parseInt($("#current-population").text());
        var $maxPopulationQuantity = parseInt($("#max-population").text());

        if ($foodQuantity >= citizenCost && $currentPopulationQuantity < $maxPopulationQuantity) {
            changeFloatNumber("#food-quantity", -citizenCost);
            changeIntNumber("#current-population", 1);
            changeFloatNumber("#food-quantity-produce", -1);
            changeIntNumber("#free-quantity", 1);
        }

        //TODO add happiness settings
        //TODO add health settings
    });

    //build event
    $("#build-tent-button").click(function () {
        let $currentWoodQuantity = $("#wood-quantity").text();

        let $woodPrice = 20;
        if ($currentWoodQuantity >= $woodPrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeIntNumber("#tent-quantity", 1);
            changeIntNumber("#max-population", 2);
        }
    });
    $("#build-library-button").click(function () {
        let $currentWoodQuantity = $("#wood-quantity").text();
        let $currentStoneQuantity = $("#stone-quantity").text();

        let $woodPrice = 20;
        let $stonePrice = 20;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeIntNumber("#library-quantity", 1);
            currentSpaceInLibraries += 3;
            $("#in-libraries-row").css("display", "table-row");
            $("#thought-row").css("display", "table-row");

            changeIntNumber("#max-scholar-quantity", 3);
        }
    });
    $("#build-hut-button").click(function () {
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
    $("#build-music-club-button").click(function () {
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
    $("#build-yoga-club-button").click(function () {
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
            changeIntNumber("#max-health-quantity", 25);
            changeIntNumber("#max-instructor-quantity", 1);
        }
    });
    $("#build-palace-button").click(function () {
        let $currentWoodQuantity = $("#wood-quantity").text();
        let $currentStoneQuantity = $("#stone-quantity").text();
        let $woodPrice = 1000;

        let $stonePrice = 1000;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#palace-quantity", 1);
            changeIntNumber("#music-club-quantity", 10);
            changeIntNumber("#yoga-club-quantity", 10);
            changeIntNumber("#library-quantity", 10);

            changeIntNumber("#max-happy-people", 250);
            changeIntNumber("#max-health-quantity", 250);

            changeIntNumber("#max-scholar-quantity", 30);
            currentSpaceInLibraries += 30;
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

    //worker setting
    //1. farmer
    $("#remove-farmer-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#farmer-quantity", true)) {
            changeIntNumber("#farmer-quantity", -1);
            changeIntNumber("#free-quantity", 1);

            changeFloatNumber("#food-quantity-produce", -foodProduction);
        }
    });
    $("#add-farmer-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#farmer-quantity", false)) {
            changeIntNumber("#farmer-quantity", 1);
            changeIntNumber("#free-quantity", -1);

            changeFloatNumber("#food-quantity-produce", foodProduction);
        }
    });
    //2. woodcutter
    $("#remove-wood-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#woodcutter-quantity", true)) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeIntNumber("#free-quantity", 1);

            changeFloatNumber("#wood-quantity-produce", -wood_production);
        }
    });
    $("#add-wood-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#woodcutter-quantity", false)) {
            changeIntNumber("#woodcutter-quantity", 1);
            changeIntNumber("#free-quantity", -1);

            changeFloatNumber("#wood-quantity-produce", wood_production);
        }
    });
    //3. stone
    $("#remove-stone-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#miner-quantity", true)) {
            changeIntNumber("#miner-quantity", -1);
            changeIntNumber("#free-quantity", 1);

            changeFloatNumber("#stone-quantity-produce", -stone_production);

        }
    });
    $("#add-stone-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#miner-quantity", false)) {
            changeIntNumber("#miner-quantity", 1);
            changeIntNumber("#free-quantity", -1);
            changeFloatNumber("#stone-quantity-produce", stone_production);
        }
    });
    //4. scholar
    $("#remove-scholar-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#scholar-quantity", true)) {
            changeIntNumber("#scholar-quantity", -1);
            changeIntNumber("#free-quantity", 1);

            changeFloatNumber("#thought-quantity-produce", -thought_production);
            currentSpaceInLibraries++;
        }
    });
    $("#add-scholar-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#scholar-quantity", false) && currentSpaceInLibraries) {
            changeIntNumber("#scholar-quantity", 1);
            changeIntNumber("#free-quantity", -1);

            changeFloatNumber("#thought-quantity-produce", thought_production);
            currentSpaceInLibraries--;
        }
    });
    //5. dj
    //    $("#remove-dj-button").click(function () {
    //        if (checkIsThereFreeCitizen("#free-quantity", "#dj-quantity", true)) {
    //            changeIntNumber("#dj-quantity", -1);
    //            changeIntNumber("#free-quantity", 1);
    //
    //            //            changeFloatNumber("#thought-quantity-produce", -THOUGHT_PRODUCTION);
    //            //TODO fix hapiness
    //            currentDjSpaces++;
    //        }
    //    });
    $("#add-dj-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#dj-quantity", false) && currentDjSpaces) {
            changeIntNumber("#dj-quantity", 1);
            changeIntNumber("#free-quantity", -1);

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
    //6. instructor
    //    $("#remove-instructor-button").click(function () {
    //        if (checkIsThereFreeCitizen("#free-quantity", "#instructor-quantity", true)) {
    //            changeIntNumber("#instructor-quantity", -1);
    //            changeIntNumber("#free-quantity", 1);
    //
    //            //            changeFloatNumber("#thought-quantity-produce", -THOUGHT_PRODUCTION);
    //            //TODO fix health
    //            currentInstructorSpaces++;
    //        }
    //    });
    $("#add-instructor-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#instructor-quantity", false) && currentInstructorSpaces) {
            changeIntNumber("#instructor-quantity", 1);
            changeIntNumber("#free-quantity", -1);

            currentInstructorSpaces--;

            let $peopleAmount = parseInt($("#current-population").text());
            let $instructorAmount = parseInt($("#instructor-quantity").text());
            if (($peopleAmount - $instructorAmount * 25) <= 0) {
                $("#current-health-quantity").text($peopleAmount);
            } else {
                changeIntNumber("#current-health-quantity", 25);
            }

            if (!healthProductivity) {
                increaseAllProduction();

                healthProductivity = !healthProductivity;
            }
        }
    });

    //TECHNOLOGIES
    $("#changes-button").click(function () {
        let $currentWoodQuantity = parseFloat($("#wood-quantity").text());
        let $currentStoneQuantity = parseFloat($("#stone-quantity").text());

        let $woodPrice = 10;
        let $stonePrice = 10;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            $("#architecture-row").css("display", "table-row");
            $("#agriculture-row").css("display", "table-row");
            $("#library-row").css("display", "table-row");
            $("#changes-row").css("display", "none");

            $("#already-known-p").css("display", "block");
            $("#changes-p").css("display", "block");
        }
    });
    $("#architecture-button").click(function () {
        let $currentThoughtQuantity = parseFloat($("#thought-quantity").text());

        let $thoughtPrice = 30.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#hut-row").css("display", "table-row");
            $("#change2-row").css("display", "table-row");

            $("#architecture-row").css("display", "none");

            $("#architecture-p").css("display", "block");
        }
    });
    $("#agriculture-button").click(function () {
        let $currentThoughtQuantity = parseFloat($("#thought-quantity").text());

        let $thoughtPrice = 30.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#food-img").attr("src", "res/img/grapes.png");

            recalculateFoodProduction();

            $("#change2-row").css("display", "table-row");

            $("#agriculture-row").css("display", "none");

            $("#agriculture-p").css("display", "block");
        }
    });
    $("#change2-button").click(function () {
        let $currentThoughtQuantity = parseFloat($("#thought-quantity").text());

        let $thoughtPrice = 75.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#agriculture2-row").css("display", "table-row");
            $("#music-row").css("display", "table-row");
            $("#sport-row").css("display", "table-row");
            $("#change2-row").css("display", "none");

            $("#changes2-p").css("display", "block");
        }
    });
    $("#agriculture2-button").click(function () {
        let $currentThoughtQuantity = parseFloat($("#thought-quantity").text());

        let $thoughtPrice = 100.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#food-img").attr("src", "res/img/food.png");
            recalculateFoodProduction();
            $("#agriculture2-row").css("display", "none");

            $("#agriculture2-p").css("display", "block");
        }
    });
    $("#music-button").click(function () {
        let $currentThoughtQuantity = parseFloat($("#thought-quantity").text());

        let $thoughtPrice = 100.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#music-club-row").css("display", "table-row");
            $("#music-row").css("display", "none");

            $("#music-p").css("display", "block");
        }
    });
    $("#sport-button").click(function () {
        let $currentThoughtQuantity = parseFloat($("#thought-quantity").text());

        let $thoughtPrice = 100.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#yoga-club-row").css("display", "table-row");
            $("#architecture2-row").css("display", "table-row");
            $("#change3-row").css("display", "table-row");
            $("#sport-row").css("display", "none");

            $("#sport-p").css("display", "block");
        }
    });
    $("#architecture2-button").click(function () {
        let $currentThoughtQuantity = parseFloat($("#thought-quantity").text());

        let $thoughtPrice = 500.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

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

    //one step
    setInterval(function () {
        changeFloatNumber("#food-quantity", parseFloat($("#food-quantity-produce").text()));
        changeFloatNumber("#wood-quantity", parseFloat($("#wood-quantity-produce").text()));
        changeFloatNumber("#stone-quantity", parseFloat($("#stone-quantity-produce").text()));
        changeFloatNumber("#thought-quantity", parseFloat($("#thought-quantity-produce").text()));

        //starvation process
        if (parseFloat($("#food-quantity").text()) < 0 && parseFloat($("#current-population").text()) > 0) {
            changeIntNumber("#current-population", -1);
            changeFloatNumber("#food-quantity-produce", 1);
            findPersonToKill();
            $("#starvation").css("display", "inline");
        } else {
            $("#starvation").css("display", "none");
        }

        if ($("#food-quantity-produce").text() < 0) {
            $("#food-quantity-produce").css("background-color", "red");
            $("#food-quantity-produce").css("color", "white");
        } else {
            $("#food-quantity-produce").css("background-color", "");
            $("#food-quantity-produce").css("color", "black");
        }

        //abundance of food
        //TODO
    }, 1000);

    function findPersonToKill() {
        $("#corpse-row").css("display", "table-row");
        changeIntNumber("#corpse-quantity", 1);

        if ($("#free-quantity").text()) {
            changeIntNumber("#free-quantity", -1);
        } else if ($("#woodcutter-quantity").text()) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeFloatNumber("#wood-quantity-produce", -wood_production);
        } else if ($("#miner-quantity").text()) {
            changeIntNumber("#miner-quantity", -1);
            changeFloatNumber("#stone-quantity-produce", -stone_production);
        } else if ($("#farmer-quantity").text()) {
            changeIntNumber("#farmer-quantity", -1);
            changeFloatNumber("#food-quantity-produce", -foodProduction);
        } else if ($("#scholar-quantity").text()) {
            changeIntNumber("#scholar-quantity", -1);
            changeFloatNumber("#thought-quantity-produce", -thought_production);
        }
    }

    function recalculateFoodProduction() {
        foodProduction += 0.15;
        let $farmers = parseInt($("#farmer-quantity").text());
        let $currentPopulation = parseInt($("#current-population").text());
        $("#food-quantity-produce").text(($farmers * foodProduction - $currentPopulation).toFixed(1));
    }

    function increaseAllProduction() {
        productivity += 0.25;
        changeIntNumber("#productivity-quantity", 25);

        let $index = 1.25;

        foodProduction *= 1.1;
        let $workerAmount = parseInt($("#farmer-quantity").text());
        let $currentPopulation = parseInt($("#current-population").text());
        $("#food-quantity-produce").text(($workerAmount * foodProduction - $currentPopulation).toFixed(1));

        wood_production *= $index;
        $workerAmount = parseInt($("#woodcutter-quantity").text());
        $("#wood-quantity-produce").text(($workerAmount * wood_production).toFixed(1));

        stone_production *= $index;
        $workerAmount = parseInt($("#miner-quantity").text());
        $("#stone-quantity-produce").text(($workerAmount * stone_production).toFixed(1));

        thought_production *= $index;
        //TODO why it doesn't work?
//        thought_production = thought_production.toFixed(2);
        $workerAmount = parseInt($("#scholar-quantity").text());
        $("#thought-quantity-produce").text(($workerAmount * thought_production).toFixed(1));
    }

    //winner function
    let winInterval = setInterval(function () {
        if (parseFloat($("#thought-quantity").text()) >= WINNER_REQUIREMENTS) {
            if (confirm("Congratulations!!! You collected a lot of knowledge!!! \n\n" + userName + ", do you wanna play again?")) {
                document.location.reload(true);
                changeFloatNumber("#thought-quantity", WINNER_REQUIREMENTS);
            } else {
                $("#start-again-button").css("display", "block");
                clearInterval(winInterval);
            }
        }
    }, 4000);

    $("#start-again-button").click(function () {
        document.location.reload(true);
    });
});
