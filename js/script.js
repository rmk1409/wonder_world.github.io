$(function () {
    "use strict";
    var WINNER_REQUIREMENTS = 10000;

    var spaceInLibraries = 0,
        djAmount = 0,
        instructorAmount = 0;

    var djProductivity = false;
    var healthProductivity = false;

    //    var userName = "Goblin";
    var userName = prompt("Великий человек, как тебя зовут?");
    userName = userName || "UFO alien";
    $("#user-name").text(userName);

    var citizenCost = 2,
        buster = 1,
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
            changeNumber("#current-population", 1);
            changeFloatNumber("#food-quantity-produce", -1);
            changeNumber("#free-quantity", 1);
        }

        //TODO add happiness settings
        //TODO add health settings
    });

    //build event
    $("#build-tent-button").click(function () {
        var $currentWoodQuantity = $("#wood-quantity").text();

        var $woodPrice = 20;
        if ($currentWoodQuantity >= $woodPrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeNumber("#tent-quantity", 1);
            changeNumber("#max-population", 2);
        }
    });
    $("#build-library-button").click(function () {
        var $currentWoodQuantity = $("#wood-quantity").text();
        var $currentStoneQuantity = $("#stone-quantity").text();

        var $woodPrice = 20;
        var $stonePrice = 20;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeNumber("#library-quantity", 1);
            spaceInLibraries += 3;
            $("#in-libraries-row").css("display", "table-row");
            $("#thought-row").css("display", "table-row");
        }
    });
    $("#build-hut-button").click(function () {
        var $currentWoodQuantity = $("#wood-quantity").text();
        var $currentStoneQuantity = $("#stone-quantity").text();

        var $woodPrice = 40;
        var $stonePrice = 20;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeNumber("#hut-quantity", 1);
            changeNumber("#max-population", 5);
        }
    });
    $("#build-music-club-button").click(function () {
        var $currentWoodQuantity = $("#wood-quantity").text();
        var $currentStoneQuantity = $("#stone-quantity").text();

        var $woodPrice = 75;
        var $stonePrice = 75;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeNumber("#music-club-quantity", 1);
            djAmount++;

            $("#in-dj-row").css("display", "table-row");
            $("#happiness-row").css("display", "table-row");
            $("#productivity-row").css("display", "table-row");

            changeNumber("#max-happy-people", 25);
        }
    });
    $("#build-yoga-club-button").click(function () {
        var $currentWoodQuantity = $("#wood-quantity").text();
        var $currentStoneQuantity = $("#stone-quantity").text();

        var $woodPrice = 75;
        var $stonePrice = 75;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeNumber("#yoga-club-quantity", 1);
            instructorAmount++;

            $("#in-instructor-row").css("display", "table-row");
            $("#health-row").css("display", "table-row");
            $("#productivity-row").css("display", "table-row");

            changeNumber("#max-health-quantity", 25);
        }
    });
    $("#build-palace-button").click(function () {
        var $currentWoodQuantity = $("#wood-quantity").text();
        var $currentStoneQuantity = $("#stone-quantity").text();

        var $woodPrice = 1000;
        var $stonePrice = 1000;
        if ($currentWoodQuantity >= $woodPrice && $currentStoneQuantity >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);
            changeNumber("#palace-quantity", 1);
            changeNumber("#music-club-quantity", 10);
            djAmount += 10;
            changeNumber("#yoga-club-quantity", 10);
            instructorAmount += 10;

            spaceInLibraries += 30;
            changeNumber("#max-happy-people", 250);
            changeNumber("#max-health-quantity", 250);

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
            changeNumber("#farmer-quantity", -1);
            changeNumber("#free-quantity", 1);

            changeFloatNumber("#food-quantity-produce", -foodProduction);
        }
    });
    $("#add-farmer-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#farmer-quantity", false)) {
            changeNumber("#farmer-quantity", 1);
            changeNumber("#free-quantity", -1);

            changeFloatNumber("#food-quantity-produce", foodProduction);
        }
    });
    //2. woodcutter
    $("#remove-wood-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#woodcutter-quantity", true)) {
            changeNumber("#woodcutter-quantity", -1);
            changeNumber("#free-quantity", 1);

            changeFloatNumber("#wood-quantity-produce", -wood_production);
        }
    });
    $("#add-wood-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#woodcutter-quantity", false)) {
            changeNumber("#woodcutter-quantity", 1);
            changeNumber("#free-quantity", -1);

            changeFloatNumber("#wood-quantity-produce", wood_production);
        }
    });
    //3. stone
    $("#remove-stone-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#miner-quantity", true)) {
            changeNumber("#miner-quantity", -1);
            changeNumber("#free-quantity", 1);

            changeFloatNumber("#stone-quantity-produce", -stone_production);

        }
    });
    $("#add-stone-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#miner-quantity", false)) {
            changeNumber("#miner-quantity", 1);
            changeNumber("#free-quantity", -1);
            changeFloatNumber("#stone-quantity-produce", stone_production);
        }
    });
    //4. schollar
    $("#remove-schollar-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#schollar-quantity", true)) {
            changeNumber("#schollar-quantity", -1);
            changeNumber("#free-quantity", 1);

            changeFloatNumber("#thought-quantity-produce", -thought_production);
            spaceInLibraries++;
        }
    });
    $("#add-schollar-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#schollar-quantity", false) && spaceInLibraries) {
            changeNumber("#schollar-quantity", 1);
            changeNumber("#free-quantity", -1);

            changeFloatNumber("#thought-quantity-produce", thought_production);
            spaceInLibraries--;
        }
    });
    //5. dj
    //    $("#remove-dj-button").click(function () {
    //        if (checkIsThereFreeCitizen("#free-quantity", "#dj-quantity", true)) {
    //            changeNumber("#dj-quantity", -1);
    //            changeNumber("#free-quantity", 1);
    //
    //            //            changeFloatNumber("#thought-quantity-produce", -THOUGHT_PRODUCTION);
    //            //TODO fix hapiness
    //            djAmount++;
    //        }
    //    });
    $("#add-dj-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#dj-quantity", false) && djAmount) {
            changeNumber("#dj-quantity", 1);
            changeNumber("#free-quantity", -1);

            djAmount--;

            var $peopleAmount = parseInt($("#current-population").text());
            var $djAmount = parseInt($("#dj-quantity").text());
            if (($peopleAmount - $djAmount * 25) <= 0) {
                $("#current-happy-people").text($peopleAmount);
            } else {
                changeNumber("#current-happy-people", 25);
            }

            if (!djProductivity) {
                recalculateAllProduction();

                djProductivity = !djProductivity;
            }
        }
    });
    //6. instructor
    //    $("#remove-instructor-button").click(function () {
    //        if (checkIsThereFreeCitizen("#free-quantity", "#instructor-quantity", true)) {
    //            changeNumber("#instructor-quantity", -1);
    //            changeNumber("#free-quantity", 1);
    //
    //            //            changeFloatNumber("#thought-quantity-produce", -THOUGHT_PRODUCTION);
    //            //TODO fix health
    //            instructorAmount++;
    //        }
    //    });
    $("#add-instructor-button").click(function () {
        if (checkIsThereFreeCitizen("#free-quantity", "#instructor-quantity", false) && instructorAmount) {
            changeNumber("#instructor-quantity", 1);
            changeNumber("#free-quantity", -1);

            instructorAmount--;

            var $peopleAmount = parseInt($("#current-population").text());
            var $instructorAmount = parseInt($("#instructor-quantity").text());
            if (($peopleAmount - $instructorAmount * 25) <= 0) {
                $("#current-health-quantity").text($peopleAmount);
            } else {
                changeNumber("#current-health-quantity", 25);
            }

            if (!healthProductivity) {
                recalculateAllProduction();

                healthProductivity = !healthProductivity;
            }
        }
    });

    //TECHNOLOGIES
    $("#changes-button").click(function () {
        var $currentWoodQuantity = $("#wood-quantity").text();
        var $currentStoneQuantity = $("#stone-quantity").text();

        var $woodPrice = 10;
        var $stonePrice = 20;
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
        var $currentThoughtQuantity = $("#thought-quantity").text();

        var $thoughtPrice = 30.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#hut-row").css("display", "table-row");
            $("#change2-row").css("display", "table-row");

            $("#architecture-row").css("display", "none");

            $("#architecture-p").css("display", "block");
        }
    });
    $("#agriculture-button").click(function () {
        var $currentThoughtQuantity = $("#thought-quantity").text();

        var $thoughtPrice = 30.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#food-img").attr("src", "../img/grapes.png");

            recalculateFoodProduction();

            $("#change2-row").css("display", "table-row");

            $("#agriculture-row").css("display", "none");

            $("#agriculture-p").css("display", "block");
        }
    });
    $("#change2-button").click(function () {
        var $currentThoughtQuantity = $("#thought-quantity").text();

        var $thoughtPrice = 75.0;
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
        var $currentThoughtQuantity = $("#thought-quantity").text();

        var $thoughtPrice = 100.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#food-img").attr("src", "../img/food.png");
            recalculateFoodProduction();
            $("#agriculture2-row").css("display", "none");

            $("#agriculture2-p").css("display", "block");
        }
    });
    $("#music-button").click(function () {
        var $currentThoughtQuantity = $("#thought-quantity").text();

        var $thoughtPrice = 100.0;
        if ($currentThoughtQuantity >= $thoughtPrice) {
            changeFloatNumber("#thought-quantity", -$thoughtPrice);

            $("#music-club-row").css("display", "table-row");
            $("#music-row").css("display", "none");

            $("#music-p").css("display", "block");
        }
    });
    $("#sport-button").click(function () {
        var $currentThoughtQuantity = $("#thought-quantity").text();

        var $thoughtPrice = 100.0;
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
        var $currentThoughtQuantity = $("#thought-quantity").text();

        var $thoughtPrice = 500.0;
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

    function changeNumber(elementName, quantity) {
        var $oldQuantity = parseInt($(elementName).text());
        $oldQuantity += quantity;
        $(elementName).text($oldQuantity);
    }

    function changeFloatNumber(elementName, quantity) {
        var $oldQuantity = parseFloat($(elementName).text());
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
        if ($("#food-quantity").text() < 0 && $("#current-population").text() > 0) {
            changeNumber("#current-population", -1);
            changeFloatNumber("#food-quantity-produce", 1);
            findPersonToDie();
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

    function findPersonToDie() {
        $("#corpse-row").css("display", "table-row");
        changeNumber("#corpse-quantity", 1);

        if ($("#free-quantity").text() > 0) {
            changeNumber("#free-quantity", -1);
        } else if ($("#woodcutter-quantity").text() > 0) {
            changeNumber("#woodcutter-quantity", -1);
            changeFloatNumber("#wood-quantity-produce", -wood_production);
        } else if ($("#miner-quantity").text() > 0) {
            changeNumber("#miner-quantity", -1);
            changeFloatNumber("#stone-quantity-produce", -stone_production);
        } else if ($("#farmer-quantity").text() > 0) {
            changeNumber("#farmer-quantity", -1);
            changeFloatNumber("#food-quantity-produce", -foodProduction);
        } else if ($("#schollar-quantity").text() > 0) {
            changeNumber("#schollar-quantity", -1);
            changeFloatNumber("#thought-quantity-produce", -thought_production);
        }
    }

    function recalculateFoodProduction() {
        foodProduction += 0.15;
        var $farmers = parseInt($("#farmer-quantity").text());
        var $currentPopulation = parseInt($("#current-population").text());
        $("#food-quantity-produce").text(($farmers * foodProduction - $currentPopulation).toFixed(1));
        //        alert($farmers * foodProduction);
    }

    function recalculateAllProduction() {
        productivity += 0.25;
        changeNumber("#productivity-quantity", 25);

        var $kofficient = 1.25;
        foodProduction *= $kofficient;
        var $workerAmount = parseInt($("#farmer-quantity").text());
        var $currentPopulation = parseInt($("#current-population").text());
        $("#food-quantity-produce").text(($workerAmount * foodProduction  - $currentPopulation).toFixed(1));

        wood_production *= $kofficient;
        $workerAmount = parseInt($("#woodcutter-quantity").text());
        $("#wood-quantity-produce").text(($workerAmount * wood_production).toFixed(1));

        stone_production *= $kofficient;
        $workerAmount = parseInt($("#miner-quantity").text());
        $("#stone-quantity-produce").text(($workerAmount * stone_production).toFixed(1));

        thought_production *= $kofficient;
        $workerAmount = parseInt($("#schollar-quantity").text());
        $("#thought-quantity-produce").text(($workerAmount * thought_production).toFixed(1));
    }

    //winner function
    setInterval(function () {
        if (parseFloat($("#thought-quantity").text()) >= WINNER_REQUIREMENTS) {
            if (confirm("Congratulations!!! You collected a lot of knowledge!!! \n\n" + userName + ", do you wanna play again?")) {
                document.location.reload(true);
                changeFloatNumber("#thought-quantity", WINNER_REQUIREMENTS);
            } else {
                $("#start-again-button").css("display", "block");
            }
        }
    }, 4000);

    $("#start-again-button").click(function () {
        document.location.reload(true);
    });
});
