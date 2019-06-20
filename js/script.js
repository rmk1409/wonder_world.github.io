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

            //TODO how to invoke next 3 lines just once?
            $("#funeral-process-job-row").show("slow", function () {
                $("#empty-row-before-funeral").show("slow", function () {
                    $("#in-graves-row").show("slow");
                });
            });

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

            //TODO how to invoke next 3 lines just once?
            $("#in-school-row").show("slow", function () {
                $("#empty-row-before-scholar").show("slow", function () {
                    $("#knowledge-row").show("slow", function () {
                        $("#empty-row-before-knowledge").show("slow");
                    })
                });
            });

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

            //TODO how to invoke next 5 lines just once?
            $("#happiness-row").show("slow", function () {
                $("#empty-row-before-happiness").show("slow", function () {
                    $("#empty-row-before-productivity").show("slow", function () {
                        $("#productivity-row").show("slow", function () {
                            $("#empty-row-before-dj").show("slow", function () {
                                $("#in-dj-row").show("slow");
                            })
                        });
                    });
                });
            });


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

            //TODO how to invoke next 5 lines just once?
            $("#empty-row-before-happiness").show("slow", function () {
                $("#health-row").show("slow", function () {
                    $("#empty-row-before-productivity").show("slow", function () {
                        $("#productivity-row").show("slow", function () {
                            $("#empty-row-before-dj").show("slow", function () {
                                $("#in-instructor-row").show("slow");
                            })
                        });
                    });
                });
            });

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

            $(this).prop("disabled", true);

            //TODO How to invoke this just once?
            if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've just killed: " + (+$("#corpse-quantity").text() + +$("#in-graves-quantity").text()) + " people. Great job!! \n" + userName + ", do you wanna play again?")) {
                document.location.reload(true);
            } else {
                $("#start-again-button").toggle("slow");
            }
        }
    });

    //WORK SETTING
    // 1. FARMER
    $("#remove-farmer-button").click(function removeFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", true)) {
            changeIntNumber("#farmer-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
        }
    });
    $("#add-farmer-button").click(function addFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", false)) {
            changeIntNumber("#farmer-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
        }
    });
    // 2. WOODCUTTER
    $("#remove-woodcutter-button").click(function removeWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", true)) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * wood_production).toFixed(1));
        }
    });
    $("#add-woodcutter-button").click(function addWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", false)) {
            changeIntNumber("#woodcutter-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * wood_production).toFixed(1));
        }
    });
    // 3. MINER
    $("#remove-miner-button").click(function removeMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", true)) {
            changeIntNumber("#miner-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#stone-production-quantity").text((+$("#miner-quantity").text() * stone_production).toFixed(1));
        }
    });
    $("#add-miner-button").click(function addMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", false)) {
            changeIntNumber("#miner-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#stone-production-quantity").text((+$("#miner-quantity").text() * stone_production).toFixed(1));
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

            $("#knowledge-production-quantity").text((+$("#scholar-quantity").text() * knowledge_production).toFixed(1));
            currentSpaceInSchool++;
        }
    });
    $("#add-scholar-button").click(function addScholar() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scholar-quantity", false) && currentSpaceInSchool) {
            changeIntNumber("#scholar-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#knowledge-production-quantity").text((+$("#scholar-quantity").text() * knowledge_production).toFixed(1));
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

            $("#changes-row").toggle("slow", function () {
                $("#agriculture-row").toggle("slow");
                $("#funeral-tech-row").toggle("slow");
                $("#empty-row-before-school").toggle("slow");
                $("#school-row").toggle("slow");
                $("#architecture-row").toggle("slow");

                $("#already-known-p").toggle("slow");
                $("#changes-p").toggle("slow");
            });
        }
    });
    $("#agriculture-button").click(function researchAgriculture() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#food-img").attr("src", "res/img/grapes.png");
            recalculateFoodProduction();

            $("#agriculture-row").toggle("slow", function () {
                $("#agriculture-p").toggle("slow");
            });
        }
    });
    $("#funeral-tech-button").click(function researchFuneralProcess() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#funeral-tech-row").toggle("slow", function () {
                $("#grave-build-row").toggle("slow");
                $("#funeral-p").toggle("slow");
            });
        }
    });
    $("#architecture-button").click(function researchArchitecture() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#architecture-row").toggle("slow", function () {
                $("#hut-row").toggle("slow");
                $("#changes2-row").toggle("slow");
                $("#architecture-p").toggle("slow");
            });
        }
    });
    $("#changes2-button").click(function researchChanges2() {
        let $knowledgePrice = 75.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#changes2-row").toggle("slow", function () {
                $("#agriculture2-row").toggle("slow");
                $("#music-row").toggle("slow");
                $("#sport-row").toggle("slow");

                $("#changes2-p").toggle("slow");
            });
        }
    });
    $("#agriculture2-button").click(function researchAgriculture2() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#food-img").attr("src", "res/img/field.png");
            recalculateFoodProduction();
            unlockAchievement("More Food");

            $("#agriculture2-row").toggle("slow", function () {
                $("#agriculture2-p").toggle("slow");
            });
        }
    });
    $("#music-button").click(function researchMusic() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#music-row").toggle("slow", function () {
                $("#empty-row-before-music-club").show("slow");
                $("#music-club-row").toggle("slow");
                $("#music-p").toggle("slow");
            });
        }
    });
    $("#sport-button").click(function researchSport() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#sport-row").toggle("slow", function () {
                $("#empty-row-before-music-club").show("slow");
                $("#yoga-club-row").toggle("slow");
                $("#architecture2-row").toggle("slow");
                $("#change3-row").toggle("slow");

                $("#sport-p").toggle("slow");
            });
        }
    });
    $("#architecture2-button").click(function researchArchitecture2() {
        let $knowledgePrice = 500.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#architecture2-row").toggle("slow", function () {
                $("#palace-row").toggle("slow");
                $("#changes3-row").toggle("slow");

                $("#architecture2-p").toggle("slow");
            });
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
            $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * wood_production).toFixed(1));
        } else if (+$("#miner-quantity").text()) {
            changeIntNumber("#miner-quantity", -1);
            $("#stone-production-quantity").text((+$("#miner-quantity").text() * stone_production).toFixed(1));
        } else if (+$("#scholar-quantity").text()) {
            changeIntNumber("#scholar-quantity", -1);
            $("#knowledge-production-quantity").text((+$("#scholar-quantity").text() * knowledge_production).toFixed(1));
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
            $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
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

        let $workerAmount = parseInt($("#farmer-quantity").text());
        let $currentPopulation = parseInt($("#current-population").text());
        $("#food-production-quantity").text(($workerAmount * foodProduction - $currentPopulation).toFixed(1));

        wood_production = Math.round(wood_production * 1000 + 0.125 * 1000) / 1000;
        $workerAmount = parseInt($("#woodcutter-quantity").text());
        $("#wood-production-quantity").text(($workerAmount * wood_production).toFixed(1));

        stone_production = Math.round(stone_production * 1000 + 0.05 * 1000) / 1000;
        $workerAmount = parseInt($("#miner-quantity").text());
        $("#stone-production-quantity").text(($workerAmount * stone_production).toFixed(1));

        knowledge_production = Math.round(knowledge_production * 1000 + 0.025 * 1000) / 1000;
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
            $("#starvation-warning").show("slow");
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
            $("#starvation-warning").hide("slow");
        }

        productionColor();

        //TODO abundance of food
        //

        if ($("#productivity-quantity").text() == 175) {
            unlockAchievement("Productivity");
        }
    }, 1000);

    function productionColor() {
        // FOOD
        if ($("#food-production-quantity").text() < 0) {
            $("#food-production-span").css("background-color", "red");
            $("#food-production-span").css("color", "white");
            $("#add-farmer-button").css("background-color", "green");
            $("#add-farmer-button").css("color", "white");
        } else if ($("#food-production-quantity").text() > 0) {
            $("#food-production-span").css("background-color", "green");
            $("#food-production-span").css("color", "white");
            $("#add-farmer-button").css("background-color", "");
            $("#add-farmer-button").css("color", "black");
        } else {
            $("#food-production-span").css("background-color", "");
            $("#food-production-span").css("color", "black");
        }

        // WOOD
        if ($("#wood-production-quantity").text() > 0) {
            $("#wood-production-span").css("background-color", "green");
            $("#wood-production-span").css("color", "white");
        } else {
            $("#wood-production-span").css("background-color", "");
            $("#wood-production-span").css("color", "black");
        }

        // STONE
        if ($("#stone-production-quantity").text() > 0) {
            $("#stone-production-span").css("background-color", "green");
            $("#stone-production-span").css("color", "white");
        } else {
            $("#stone-production-span").css("background-color", "");
            $("#stone-production-span").css("color", "black");
        }

        //KNOWLEDGE
        if ($("#knowledge-production-quantity").text() > 0) {
            $("#knowledge-production-span").css("background-color", "green");
            $("#knowledge-production-span").css("color", "white");
        } else {
            $("#knowledge-production-span").css("background-color", "");
            $("#knowledge-production-span").css("color", "black");
        }

        // LAZYBONES
        if (+$("#free-people-quantity").text()) {
            $("#free-people-quantity").css("background-color", "red");
            $("#free-people-quantity").css("color", "white");
        } else {
            $("#free-people-quantity").css("background-color", "");
            $("#free-people-quantity").css("color", "black");

        }
    }

    //FUNERAL PROCESS
    setInterval(function funeralProcess() {
        let $funeralProcesses = +$("#funeral-process-quantity").text();
        let $corpses = +$("#corpse-quantity").text();
        let $graves = +$("#max-in-graves-quantity").text();
        let $inGraves = +$("#in-graves-quantity").text();

        if ($funeralProcesses && $corpses && ($inGraves < $graves)) {
            changeIntNumber("#corpse-quantity", -1);
            changeIntNumber("#in-graves-quantity", 1);
            $("#funeral-process-img").show("slow");
        } else {
            $("#funeral-process-img").hide("slow");
        }
    }, 5000);

    //WINNER FUNCTION
    let winInterval = setInterval(function checkWinCondition() {
        if ($("#knowledge-quantity").text() >= WINNER_REQUIREMENTS) {
            if (confirm("Congratulations! You collected a lot of knowledge!! \nAlso you've killed: " + $("#corpse-quantity").text() + " people. No so bad..\n" + userName + ", do you wanna play again?")) {
                document.location.reload(true);
            } else {
                changeFloatNumber("#knowledge-quantity", -WINNER_REQUIREMENTS);
                $("#start-again-button").toggle("slow");
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
