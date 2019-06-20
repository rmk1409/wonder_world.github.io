$(function () {
    "use strict";
    // VARIABLES
    // 1.Win
    let WINNER_REQUIREMENTS = 1e6;
    // 2.Spaces
    var availableScientistSpaces = 0,
        currentDjSpaces = 0,
        currentInstructorSpaces = 0,
        spaceInOneClub = 25,
        spaceInOneCampfire = 2,
        spaceInOneDolmen = 5,
        spaceInOneSchool = 12;
    // 3.Productivity flags
    var djProductivity = false,
        healthProductivity = false,
        abundance = false,
        leaderFlag = false;
    // 4. User name
    var userName = prompt("＼(￣▽￣)／ Great man, what is your name?") || "UFO Alien";
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
    $("#build-scroll-storage-button").click(function buildScroll() {
        let $stonePrice = 10;
        if ($("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#scroll-quantity", 1);
            changeIntNumber("#max-knowledge-quantity-span", 5);
        }
    });
    $("#build-granary-storage-button").click(function buildGranary() {
        let $woodPrice = 50;
        let $stonePrice = 50;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#granary-quantity", 1);
            changeIntNumber("#max-food-quantity-span", 50);
        }
    });
    $("#build-pit-storage-button").click(function buildPit() {
        let $woodPrice = 50;
        let $stonePrice = 50;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#pit-quantity", 1);
            changeIntNumber("#max-wood-quantity-span", 50);
            changeIntNumber("#max-stone-quantity-span", 50);
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
    $("#build-campfire-button").click(function buildSchool() {
        let $woodPrice = 30;
        let $stonePrice = 10;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            //TODO how to invoke next 3 lines just once?
            $("#in-work-scientist-row").show("slow", function () {
                $("#empty-row-before-work-scientist-row").show("slow", function () {
                    $("#knowledge-row").show("slow", function () {
                        $("#empty-row-before-knowledge").show("slow");
                    })
                });
            });

            changeIntNumber("#campfire-quantity", 1);
            availableScientistSpaces += spaceInOneCampfire;
            changeIntNumber("#max-scientist-quantity", spaceInOneCampfire);
        }
    });
    $("#build-dolmen-button").click(function buildDolmen() {
        let $woodPrice = 20;
        let $stonePrice = 30;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#dolmen-quantity", 1);
            availableScientistSpaces += spaceInOneDolmen;
            changeIntNumber("#max-scientist-quantity", spaceInOneDolmen);
        }
    });
    $("#build-school-button").click(function buildSchool() {
        let $woodPrice = 75;
        let $stonePrice = 75;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            changeIntNumber("#school-quantity", 1);
            availableScientistSpaces += spaceInOneSchool;
            changeIntNumber("#max-scientist-quantity", spaceInOneSchool);
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
            let dolmenInOnePalace = 5;
            let musicClubInOnePalace = 10;
            let sportClubInOnePalace = 10;
            changeIntNumber("#dolmen-quantity", dolmenInOnePalace);
            changeIntNumber("#music-club-quantity", musicClubInOnePalace);
            changeIntNumber("#yoga-club-quantity", sportClubInOnePalace);

            changeIntNumber("#max-scientist-quantity", spaceInOneDolmen * dolmenInOnePalace);
            changeIntNumber("#max-happy-people", spaceInOneClub * musicClubInOnePalace);
            changeIntNumber("#max-health-people", spaceInOneClub * sportClubInOnePalace);
            availableScientistSpaces += spaceInOneDolmen * dolmenInOnePalace;
            changeIntNumber("#max-dj-quantity", musicClubInOnePalace);
            currentDjSpaces += musicClubInOnePalace;
            changeIntNumber("#max-instructor-quantity", sportClubInOnePalace);
            currentInstructorSpaces += sportClubInOnePalace;

            $(this).prop("disabled", true);

            //TODO How to invoke this just once?
            if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've just killed: " + (+$("#corpse-quantity").text() + +$("#in-graves-quantity").text()) + " people. (￣▽￣)ノGreat job!! \n" + userName + ", do you wanna play again?")) {
                document.location.reload(true);
            } else {
                $("#start-again-button").toggle("slow");
            }
        }
    });
    $("#build-barrack-button").click(function buildBarrack() {
        let $woodPrice = 200;
        let $stonePrice = 100;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            //TODO how to invoke next 2 lines just once?
            $("#empty-row-before-war").show("slow", function () {
                $("#work-war-warriors-row").show("slow");
            });

            changeIntNumber("#barrack-quantity", 1);
            changeIntNumber("#max-warrior-quantity", 10);
        }
    });

    //WORK SETTING
    // 1. FARMER
    $("#remove-10-farmer-button").click(function () {
        for (var i = 0; i < 10; i++) {
            removeFarmer();
        }
    });
    $("#remove-farmer-button").click(removeFarmer);

    function removeFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", true)) {
            changeIntNumber("#farmer-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
        }
    }

    $("#add-10-farmer-button").click(function () {
        for (var i = 0; i < 10; i++) {
            addFarmer();
        }
    });
    $("#add-farmer-button").click(addFarmer);

    function addFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", false)) {
            changeIntNumber("#farmer-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
        }
    }

    // 2. WOODCUTTER
    $("#remove-10-woodcutter-button").click(function () {
        for (var i = 0; i < 10; i++) {
            removeWoodcutter();
        }
    });
    $("#remove-woodcutter-button").click(removeWoodcutter);

    function removeWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", true)) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * wood_production).toFixed(1));
        }
    }

    $("#add-10-woodcutter-button").click(function () {
        for (var i = 0; i < 10; i++) {
            addWoodcutter();
        }
    });
    $("#add-woodcutter-button").click(addWoodcutter);

    function addWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", false)) {
            changeIntNumber("#woodcutter-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * wood_production).toFixed(1));
        }
    }

    // 3. MINER
    $("#remove-10-miner-button").click(function () {
        for (var i = 0; i < 10; i++) {
            removeMiner();
        }
    });
    $("#remove-miner-button").click(removeMiner);

    function removeMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", true)) {
            changeIntNumber("#miner-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#stone-production-quantity").text((+$("#miner-quantity").text() * stone_production).toFixed(1));
        }
    }

    $("#add-10-miner-button").click(function () {
        for (var i = 0; i < 10; i++) {
            addMiner();
        }
    });
    $("#add-miner-button").click(addMiner);

    function addMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", false)) {
            changeIntNumber("#miner-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#stone-production-quantity").text((+$("#miner-quantity").text() * stone_production).toFixed(1));
        }
    }

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
    });// 4. SCIENTIST
    $("#remove-10-scientist-button").click(function () {
        for (var i = 0; i < 10; i++) {
            removeScientist();
        }
    });
    $("#remove-scientist-button").click(removeScientist);

    function removeScientist() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scholar-quantity", true)) {
            changeIntNumber("#scholar-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#knowledge-production-quantity").text((+$("#scholar-quantity").text() * knowledge_production).toFixed(1));
            availableScientistSpaces++;
        }
    }

    $("#add-10-scientist-button").click(function () {
        for (var i = 0; i < 10; i++) {
            addScientist();
        }
    });
    $("#add-scientist-button").click(addScientist);

    function addScientist() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scholar-quantity", false) && availableScientistSpaces) {
            changeIntNumber("#scholar-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#knowledge-production-quantity").text((+$("#scholar-quantity").text() * knowledge_production).toFixed(1));
            availableScientistSpaces--;
        }
    }

    // 5. LEADER
    $("#add-leader-button").click(function addLeader() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#leader-quantity", false)) {
            changeIntNumber("#leader-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            if (!leaderFlag) {
                $(".ten-work-td").show("slow");
            }
        }
    });
    // 6. WARRIOR
    $("#add-warrior-button").click(function addWarrior() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#warrior-quantity", false) && +$("#max-warrior-quantity").text() > +$("#warrior-quantity").text()) {
            changeIntNumber("#warrior-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);
        }
    });
    // 7. Dj
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
    // 8. Instructor
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
                $("#max-food-quantity-span").toggle("slow");
                $("#max-wood-quantity-span").toggle("slow");
                $("#max-stone-quantity-span").toggle("slow");
                $("#max-knowledge-quantity-span").toggle("slow");

                $("#empty-row-before-knowledge-building").toggle("slow");
                $("#campfire-build-row").toggle("slow");

                $("#agriculture-row").toggle("slow");
                $("#funeral-tech-row").toggle("slow");
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
    $("#architecture-button").click(function researchArchitecture() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#architecture-row").toggle("slow", function () {
                $("#hut-row").toggle("slow");
                $("#architecture-p").toggle("slow");
            });
        }
    });
    $("#funeral-tech-button").click(function researchFuneralProcess() {
        let $knowledgePrice = 30.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#funeral-tech-row").toggle("slow", function () {
                $("#scroll-storage-row").toggle("slow", function () {
                    $("#grave-build-row").toggle("slow");
                });
                $("#changes2-row").toggle("slow");
                $("#funeral-p").toggle("slow");
            });
        }
    });

    $("#changes2-button").click(function researchChanges2() {
        let $knowledgePrice = 75.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#changes2-row").toggle("slow", function () {
                $("#tech-agriculture-2-row").toggle("slow");
                $("#tech-architecture-2-row").toggle("slow");
                $("#tech-leadership-row").toggle("slow");
                $("#tech-stone-age-row").toggle("slow");

                $("#changes2-p").toggle("slow");
            });
        }
    });

    $("#tech-agriculture-2-button").click(function researchAgriculture2() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#food-img").attr("src", "res/img/field.png");
            recalculateFoodProduction();
            unlockAchievement("More Food");

            $("#tech-agriculture-2-row").toggle("slow", function () {
                $("#agriculture2-p").toggle("slow");
            });
        }
    });
    $("#tech-architecture-2-button").click(function researchArchitecture2() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-architecture-2-row").toggle("slow", function () {
                $("#architecture2-p").toggle("slow");
                $("#build-storage-pit-row").toggle("slow");
            });
        }
    });
    $("#tech-leadership-button").click(function researchLeadership() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#in-work-leader-row").toggle("slow");
        }
    });
    $("#tech-stone-age-button").click(function researchStoneAge() {
        let $knowledgePrice = 300.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-stone-age-row").toggle("slow", function () {
                $("#build-storage-granary-row").toggle("slow");

                $("#tech-architecture-3-row").toggle("slow");
                $("#tech-music-row").toggle("slow");
                $("#tech-sport-row").toggle("slow");
                $("#tools").toggle("slow");
            });
        }
    });
    $("#tech-architecture-3-button").click(function researchArchitecture3() {
        let $knowledgePrice = 500.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-architecture-3-row").toggle("slow", function () {
                $("#build-knowledge-dolmen-row").toggle("slow");
            });
        }
    });
    $("#tech-music-button").click(function researchMusic() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-music-row").toggle("slow", function () {
                $("#empty-row-before-music-club").show("slow");
                $("#music-club-row").toggle("slow");
                $("#music-p").toggle("slow");
            });
        }
    });
    $("#tech-sport-button").click(function researchSport() {
        let $knowledgePrice = 100.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-sport-row").toggle("slow", function () {
                $("#empty-row-before-music-club").show("slow");
                $("#yoga-club-row").toggle("slow");
                $("#architecture2-row").toggle("slow");
                $("#change3-row").toggle("slow");

                $("#sport-p").toggle("slow");
            });
        }
    });
    $("#tech-tools-button").click(function researchTools() {
        let $knowledgePrice = 500.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-tools-row").toggle("slow", function () {
                $("#tech-axe-row").toggle("slow");
                $("#tech-pickaxe-row").toggle("slow");
                $("#tech-hoe-row").toggle("slow");
                $("#tech-weapon-row").toggle("slow");
            });
        }
    });
    $("#tech-weapon-row").click(function researchWeapon() {
        let $knowledgePrice = 500.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-weapon-row").toggle("slow", function () {
                $("#build-war-barrack-row").toggle("slow");
            });
        }
    });
    $("#tech-hoe-button").click(function researchHoe() {
        let $knowledgePrice = 300.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-hoe-row").toggle("slow", function () {
                recalculateFoodProduction();
            });
        }
    });
    $("#tech-axe-button").click(function researchAxe() {
        let $knowledgePrice = 300.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-axe-row").toggle("slow", function () {
                recalculateWoodProduction();
            });
        }
    });
    $("#tech-pickaxe-button").click(function researchPickaxe() {
        let $knowledgePrice = 300.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#tech-pickaxe-row").toggle("slow", function () {
                recalculateStoneProduction();
            });
        }
    });
    $("#tech-architecture-4-button").click(function researchArchitecture2() {
        let $knowledgePrice = 900.0;
        if ($("#knowledge-quantity").text() >= $knowledgePrice) {
            changeFloatNumber("#knowledge-quantity", -$knowledgePrice);

            $("#architecture2-row").toggle("slow", function () {
                $("#palace-row").toggle("slow");
                $("#tech-bronze-age-row").toggle("slow");
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

    function increaseAllProduction() {
        productivity = Math.round(productivity * 100 + 0.25 * 100) / 100;
        changeIntNumber("#productivity-quantity", 25);

        recalculateFoodProduction();
        recalculateWoodProduction();
        recalculateStoneProduction();
        recalculateKnowledgeProduction();
    }


    function recalculateFoodProduction() {
        foodProduction = Math.round(foodProduction * 100 + 0.15 * 100) / 100;
        let $farmers = +$("#farmer-quantity").text();
        let $currentPopulation = +$("#current-population").text();
        $("#food-production-quantity").text((Math.round($farmers * (foodProduction * 100) - $currentPopulation * 100) / 100).toFixed(1));
    }

    function recalculateWoodProduction() {
        wood_production = Math.round(wood_production * 1000 + 0.125 * 1000) / 1000;
        $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * wood_production).toFixed(1));
    }

    function recalculateStoneProduction() {
        stone_production = Math.round(stone_production * 1000 + 0.05 * 1000) / 1000;
        $("#stone-production-quantity").text((+$("#miner-quantity").text() * stone_production).toFixed(1));
    }

    function recalculateKnowledgeProduction() {
        knowledge_production = Math.round(knowledge_production * 1000 + 0.025 * 1000) / 1000;
        $("#knowledge-production-quantity").text((+$("#scholar-quantity").text() * knowledge_production).toFixed(1));
    }

    //ONE STEP
    setInterval(function oneStep() {
        // get resources
        changeFloatNumber("#food-quantity", parseFloat($("#food-production-quantity").text()));
        changeFloatNumber("#wood-quantity", parseFloat($("#wood-production-quantity").text()));
        changeFloatNumber("#stone-quantity", parseFloat($("#stone-production-quantity").text()));
        changeFloatNumber("#knowledge-quantity", parseFloat($("#knowledge-production-quantity").text()));

        //check max storage
        checkMaxStorage();

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

        console.log(document.hasFocus());
        funnyThings();
    }, 1000);

    function funnyThings() {
        var funnyChance = 2;
        if (!document.hasFocus()) {
            funnyChance = 10;
        }

        //TODO wolves(-citizen), thieves(stones), storm(wood), crazy rabbits(food), woman rapes(increased citizen cost), pets, scientists went work abroad
    }

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

    function checkMaxStorage() {
        var $maxQuantity = +$("#max-food-quantity-span").text();
        var $currentQuantity = $("#food-quantity");
        if ($maxQuantity < $currentQuantity.text()) {
            $currentQuantity.text($maxQuantity);
        }
        $maxQuantity = +$("#max-wood-quantity-span").text();
        $currentQuantity = $("#wood-quantity");
        if ($maxQuantity < $currentQuantity.text()) {
            $currentQuantity.text($maxQuantity);
        }
        $maxQuantity = +$("#max-stone-quantity-span").text();
        $currentQuantity = $("#stone-quantity");
        if ($maxQuantity < $currentQuantity.text()) {
            $currentQuantity.text($maxQuantity);
        }
        $maxQuantity = +$("#max-knowledge-quantity-span").text();
        $currentQuantity = $("#knowledge-quantity");
        if ($maxQuantity < $currentQuantity.text()) {
            $currentQuantity.text($maxQuantity);
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
                $("<img id=\"ufo-achievement\" src=\"res/img/alien.png\" title=\"Player is an alien\"/>").appendTo("#achievement-section");
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
