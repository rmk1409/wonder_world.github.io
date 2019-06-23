import Game from './game';
import Page from './page';

const userKey = "USER_NAME";

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
        productivityAchivementFlag: false,
        // abundance : false,
        // 4. User name
        /*JSON.stringify({a: "hello"});
        JSON.parse()*/

        // Game variables
        citizenCost: 10,
        booster: 1,
        productivity: 1.0,
        foodIncreaseStep: 0.15,
        // Tech flags
        techFuneralFlag: false,
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
    let USER_NAME = localStorage.getItem(userKey);
    USER_NAME = confirm(`Hello, ${USER_NAME}! Continue?`) && USER_NAME
        || prompt("＼(￣▽￣)／ Great man, what is your name?") || "UFO Alien";

    let {
        WINNER_REQUIREMENTS,
        availableScientistSpaces,
        knowledgeStoreInOneScroll,
        currentDjSpaces,
        currentInstructorSpaces,
        spaceInOneClub,
        spaceInOneCampfire,
        spaceInOneDolmen,
        djProductivityFlag,
        healthProductivityFlag,
        productivityAchivementFlag,

        citizenCost,
        booster,
        productivity,
        foodIncreaseStep,
        techFuneralFlag,
        scientistPresentFlag,
        djPresentFlag,
        instructorPresentFlag,
        barrackPresentFlag,
        palacePresentFlag,
        leaderPresentFlag,
        corpsePresentFlag,
        foodProduction,
        woodProduction,
        stoneProduction,
        knowledgeProduction,
    } = config;

    let game = new Game(new Page());

    localStorage.setItem(userKey, USER_NAME);
    $("#user-name").text(USER_NAME);
    if (USER_NAME === "UFO Alien") {
        unlockAchievement("UFO Alien");
    }
    // CLICK EVENTS

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
    function createOneCitizen() {
        changeIntNumber("#current-population", 1);
        changeIntNumber("#free-people-quantity", 1);
        changeFloatNumber("#food-production-quantity", -1);
    }

    $("#create-worker-button").click(function createWorker() {
        if ($("#food-quantity").text() >= citizenCost && +$("#current-population").text() < $("#max-population").text()) {
            changeFloatNumber("#food-quantity", -citizenCost);
            game.createCitizen(1);

            if (+$("#current-population").text() <= +$("#dj-quantity").text() * spaceInOneClub) {
                $("#current-happy-people").text($("#current-population").text());
            }
            if (+$("#current-population").text() <= +$("#instructor-quantity").text() * spaceInOneClub) {
                $("#current-health-people").text($("#current-population").text());
            }
        } else {
            $("#events-div span").after("<p style = \"color: white; background: black;\">" + getMsgWithTime("🤨 Not enough food or houses.") + "</p>");
        }
    });

    // 4. BUILD
    function build(woodPrice, stonePrice, elementNamesAr, quantityAr) {
        if ($("#wood-quantity").text() >= woodPrice && $("#stone-quantity").text() >= stonePrice) {
            changeFloatNumber("#wood-quantity", -woodPrice);
            changeFloatNumber("#stone-quantity", -stonePrice);

            elementNamesAr.forEach(function (item, index) {
                changeIntNumber(item, quantityAr[index]);
            });

            return true;
        } else {
            $("#events-div span").after("<p style = \"color: white; background: black;\">" + getMsgWithTime("🤨 Collect more resources.") + "</p>");
            return false;
        }
    }

    $("#build-grave-button").click(function buildGrave() {
        if (build(10, 10, ["#grave-quantity", "#max-in-graves-quantity"], [1, 1])) {

            if (!techFuneralFlag) {
                $("#job-funeral-process-row").show("slow", function () {
                    $("#empty-row-before-job-funeral").show("slow", function () {
                        $("#in-graves-row").show("slow");
                    });
                });
                techFuneralFlag = true;
            }
        }
    });
    $("#build-scroll-button").click(function buildScroll() {
        build(0, 10, ["#scroll-quantity", "#max-knowledge-quantity-span"], [1, knowledgeStoreInOneScroll]);
    });
    $("#build-storage-granary-button").click(function buildGranary() {
        build(50, 50, ["#granary-quantity", "#max-food-quantity-span"], [1, 50]);
    });
    $("#build-storage-pit-button").click(function buildPit() {
        build(50, 50, ["#pit-quantity", "#max-wood-quantity-span", "#max-stone-quantity-span"], [1, 50, 50]);
    });
    $("#build-tent-button").click(function buildTent() {
        build(20, 0, ["#tent-quantity", "#max-population"], [1, 2]);
    });
    $("#build-hut-button").click(function buildHut() {
        build(50, 20, ["#hut-quantity", "#max-population"], [1, 5]);
    });
    $("#build-campfire-button").click(function buildCampfire() {
        if (build(30, 10, ["#campfire-quantity", "#max-scientist-quantity"], [1, spaceInOneCampfire])) {
            if (!scientistPresentFlag) {
                $("#job-scientist-row").show("slow", function () {
                    $("#empty-row-before-job-scientist").show("slow", function () {
                        $("#knowledge-row").show("slow", function () {
                            $("#empty-row-before-knowledge").show("slow");
                        })
                    });
                });
                scientistPresentFlag = true;
            }
            availableScientistSpaces += spaceInOneCampfire;
        }
    });
    $("#build-dolmen-button").click(function buildDolmen() {
        if (build(80, 80, ["#dolmen-quantity", "#max-scientist-quantity"], [1, spaceInOneDolmen])) {
            availableScientistSpaces += spaceInOneDolmen;
        }
    });
    // TODO in bronze age
    // $("#build-parthenon-button").click(function buildParthenon() {
    //     let $woodPrice = 75;
    //     let $stonePrice = 75;
    //     if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
    //         changeFloatNumber("#wood-quantity", -$woodPrice);
    //         changeFloatNumber("#stone-quantity", -$stonePrice);
    //
    //         changeIntNumber("#parthenon-quantity", 1);
    //         availableScientistSpaces += spaceInOneParthenon;
    //         changeIntNumber("#max-scientist-quantity", spaceInOneParthenon);
    //     }
    // });
    $("#build-music-club-button").click(function buildMusicClub() {
        if (build(75, 75, ["#music-club-quantity", "#max-dj-quantity", "#max-happy-people"], [1, 1, spaceInOneClub])) {
            if (!djPresentFlag) {
                $("#happiness-row").show("slow", function () {
                    $("#empty-row-before-happiness").show("slow", function () {
                        $("#empty-row-before-productivity").show("slow", function () {
                            $("#productivity-row").show("slow", function () {
                                $("#empty-row-before-job-in-club").show("slow", function () {
                                    $("#job-dj-row").show("slow");
                                })
                            });
                        });
                    });
                });
                djPresentFlag = true;
            }
            currentDjSpaces++;
        }
    });
    $("#build-yoga-club-button").click(function buildSportClub() {
        if (build(75, 75, ["#yoga-club-quantity", "#max-instructor-quantity", "#max-health-people"], [1, 1, spaceInOneClub])) {
            if (!instructorPresentFlag) {
                $("#health-row").show("slow", function () {
                    $("#empty-row-before-happiness").show("slow", function () {
                        $("#empty-row-before-productivity").show("slow", function () {
                            $("#productivity-row").show("slow", function () {
                                $("#empty-row-before-job-in-club").show("slow", function () {
                                    $("#job-instructor-row").show("slow");
                                })
                            });
                        });
                    });
                });
                instructorPresentFlag = true;
            }
            currentInstructorSpaces++;
        }
    });
    $("#build-palace-button").click(function buildPalace() {
        if (build(1000, 1000, ["#palace-quantity", "#dolmen-quantity", "#music-club-quantity", "#yoga-club-quantity", "#max-scientist-quantity", "#max-happy-people", "#max-health-people", "#max-dj-quantity", "#max-instructor-quantity"], [1, 5, 10, 10, 5 * spaceInOneDolmen, 10 * spaceInOneClub, 10 * spaceInOneClub, 10, 10])) {
            unlockAchievement("Palace");
            if (!palacePresentFlag) {
                if (confirm("Congratulations!!! You built a palace for yourself!! \nAlso you've just killed: " + (+$("#corpse-quantity").text() + +$("#in-graves-quantity").text()) + " people. (￣▽￣)ノ Great job!! \n" + USER_NAME + ", do you wanna start again?")) {
                    document.location.reload(true);
                } else {
                    $("#start-again-button").slideToggle("slow");
                }
                $(this).prop("disabled", true);
                palacePresentFlag = true;
            }
            availableScientistSpaces += spaceInOneDolmen * 5;
            let clubInOnePalace = 10;
            currentDjSpaces += clubInOnePalace;
            currentInstructorSpaces += clubInOnePalace;
        }
    });
    $("#build-barrack-button").click(function buildBarrack() {
        if (build(200, 100, ["#barrack-quantity", "#max-warrior-quantity"], [1, 10])) {
            if (!barrackPresentFlag) {
                $("#job-warrior-row").show("slow");
                barrackPresentFlag = true;
            }
        }
    });

    //TODO Improve WORK SETTING

    // 1. FARMER
    function checkIsThereFreeCitizen(free, work, checkWorker, number) {
        if (number) {
            return checkWorker ? $(work).text() > 0 : $(free).text() >= number;
        } else {
            return checkWorker ? $(work).text() > 0 : $(free).text() > 0;
        }

    }

    function removeFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", true)) {
            changeIntNumber("#farmer-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
        }
    }

    $("#remove-10-farmer-button").click(function () {
        for (let i = 0; i < 10; i++) removeFarmer();
    });
    $("#remove-farmer-button").click(removeFarmer);

    function addFarmer() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#farmer-quantity", false)) {
            changeIntNumber("#farmer-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
        }
    }

    $("#add-10-farmer-button").click(function () {
        for (let i = 0; i < 10; i++) addFarmer();
    });
    $("#add-farmer-button").click(addFarmer);

    // 2. WOODCUTTER
    function removeWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", true)) {
            changeIntNumber("#woodcutter-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * woodProduction).toFixed(1));
        }
    }

    $("#remove-10-woodcutter-button").click(function () {
        for (var i = 0; i < 10; i++) removeWoodcutter();
    });
    $("#remove-woodcutter-button").click(removeWoodcutter);

    function addWoodcutter() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#woodcutter-quantity", false)) {
            changeIntNumber("#woodcutter-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * woodProduction).toFixed(1));
        }
    }

    $("#add-10-woodcutter-button").click(function () {
        for (var i = 0; i < 10; i++) addWoodcutter();
    });
    $("#add-woodcutter-button").click(addWoodcutter);

    // 3. MINER
    function removeMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", true)) {
            changeIntNumber("#miner-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#stone-production-quantity").text((+$("#miner-quantity").text() * stoneProduction).toFixed(1));
        }
    }

    $("#remove-10-miner-button").click(function () {
        for (var i = 0; i < 10; i++) removeMiner();
    });
    $("#remove-miner-button").click(removeMiner);

    function addMiner() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#miner-quantity", false)) {
            changeIntNumber("#miner-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#stone-production-quantity").text((+$("#miner-quantity").text() * stoneProduction).toFixed(1));
        }
    }

    $("#add-10-miner-button").click(function () {
        for (var i = 0; i < 10; i++) addMiner();
    });
    $("#add-miner-button").click(addMiner);

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
    });

    // 4. SCIENTIST
    function removeScientist() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scientist-quantity", true)) {
            changeIntNumber("#scientist-quantity", -1);
            changeIntNumber("#free-people-quantity", 1);

            $("#knowledge-production-quantity").text((+$("#scientist-quantity").text() * knowledgeProduction).toFixed(1));
            availableScientistSpaces++;
        }
    }

    $("#remove-10-scientist-button").click(function () {
        for (let i = 0; i < 10; i++) removeScientist();
    });
    $("#remove-scientist-button").click(removeScientist);

    function addScientist() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#scientist-quantity", false) && availableScientistSpaces) {
            changeIntNumber("#scientist-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            $("#knowledge-production-quantity").text((+$("#scientist-quantity").text() * knowledgeProduction).toFixed(1));
            availableScientistSpaces--;
        }
        if (!availableScientistSpaces) {
            $("#events-div span").after("<p style = \"color: white; background: black;\">" + getMsgWithTime("🤨 Build more scroll or something else.") + "</p>");
        }
    }

    $("#add-10-scientist-button").click(function () {
        for (let i = 0; i < 10; i++) addScientist();
    });
    $("#add-scientist-button").click(addScientist);

    // 5. LEADER
    $("#add-leader-button").click(function addLeader() {
        if (checkIsThereFreeCitizen("#free-people-quantity", "#leader-quantity", false)) {
            changeIntNumber("#leader-quantity", 1);
            changeIntNumber("#free-people-quantity", -1);

            if (!leaderPresentFlag) {
                $(".ten-work-td").show("slow");
                $("#work-table .empty-row td").attr("colspan", "6");

                leaderPresentFlag = true;
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

            if (!djProductivityFlag) {
                increaseAllProduction();
                djProductivityFlag = !djProductivityFlag;
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

            if (!healthProductivityFlag) {
                increaseAllProduction();
                healthProductivityFlag = !healthProductivityFlag;
            }
        }
    });

    // TECHNOLOGIES
    $("#tech-changes-button").click(function researchChanges() {
        let $woodPrice = 10;
        let $stonePrice = 10;
        if ($("#wood-quantity").text() >= $woodPrice && $("#stone-quantity").text() >= $stonePrice) {
            changeFloatNumber("#wood-quantity", -$woodPrice);
            changeFloatNumber("#stone-quantity", -$stonePrice);

            unlockAchievement("First Research");

            $("#tech-changes-row").toggle("slow", function () {
                $("#max-food-quantity-span").toggle("slow");
                $("#max-wood-quantity-span").toggle("slow");
                $("#max-stone-quantity-span").toggle("slow");
                $("#max-knowledge-quantity-span").toggle("slow");

                $("#empty-row-before-knowledge-building").toggle("slow");
                $("#build-knowledge-campfire-row").toggle("slow");

                $("#tech-agriculture-row").toggle("slow");
                $("#tech-funeral-row").toggle("slow");
                $("#tech-architecture-row").toggle("slow");

                $("#already-known-p").toggle("slow");
                $("#changes-p").toggle("slow");
            });
        } else {
            $("#events-div span").after("<p style = \"color: white; background: black;\">" + getMsgWithTime("🤨 Collect more resources.") + "</p>");
        }
    });

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
            $("#events-div span").after("<p style = \"color: white; background: black;\">" + getMsgWithTime("🤨 Collect more knowledge.") + "</p>");
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
        if (+$("#current-population").text() > 0) {
            let withDecrease = true;
            if (+$("#free-people-quantity").text()) {
                changeIntNumber("#free-people-quantity", -1);
            } else if (+$("#woodcutter-quantity").text()) {
                withDecrease = false;
                killWoodcutter();
            } else if (+$("#miner-quantity").text()) {
                withDecrease = false;
                killMiner();
            } else if (+$("#funeral-process-quantity").text()) {
                changeIntNumber("#funeral-process-quantity", -1);
                changeIntNumber("#free-people-quantity", 1);
            } else if (+$("#scientist-quantity").text()) {
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
            alert(USER_NAME + " you killed: " + $("#corpse-quantity").text() + " people. I believe in you. Please, try again. 🧟🧟");
            $("#start-again-button").slideToggle("slow");
        }
    }

    function decreasePopulation() {
        changeIntNumber("#current-population", -1);
        changeFloatNumber("#food-production-quantity", 1);

        if (!corpsePresentFlag) {
            $("#corpse-row").css("display", "table-row");
            corpsePresentFlag = true;
        }
        changeIntNumber("#corpse-quantity", 1);
    }

    function killWoodcutter() {
        decreasePopulation()
        changeIntNumber("#woodcutter-quantity", -1);
        $("#wood-production-quantity").text((+$("#woodcutter-quantity").text() * woodProduction).toFixed(1));
    }

    function killMiner() {
        decreasePopulation()
        changeIntNumber("#miner-quantity", -1);
        $("#stone-production-quantity").text((+$("#miner-quantity").text() * stoneProduction).toFixed(1));
    }

    function killFarmer() {
        decreasePopulation()
        changeIntNumber("#farmer-quantity", -1);
        $("#food-production-quantity").text((+$("#farmer-quantity").text() * foodProduction - +$("#current-population").text()).toFixed(1));
    }

    function killScientist() {
        decreasePopulation();
        changeIntNumber("#scientist-quantity", -1);
        $("#knowledge-production-quantity").text((+$("#scientist-quantity").text() * knowledgeProduction).toFixed(1));
        availableScientistSpaces++;
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
        changeFloatNumber("#food-quantity", parseFloat($("#food-production-quantity").text()));
        changeFloatNumber("#wood-quantity", parseFloat($("#wood-production-quantity").text()));
        changeFloatNumber("#stone-quantity", parseFloat($("#stone-production-quantity").text()));
        changeFloatNumber("#knowledge-quantity", parseFloat($("#knowledge-production-quantity").text()));

        //check max storage
        balanceToMaxStorage();

        //starvation process
        if ($("#food-quantity").text() < 0 && $("#current-population").text() > 0) {
            $("#events-div span").after("<p style = \"color: white; background: black;\">" + getMsgWithTime("🍽️🍽️HELP!!! We don t have enough food. :(") + "</p>");
            unlockAchievement("Starvation");
            $("#starvation-warning").show("slow");

            findPersonToKill();

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

        checkProduction();

        // TODO abundance of food

        if (!productivityAchivementFlag && $("#productivity-quantity").text() >= 190) {
            unlockAchievement("Productivity");
            productivityAchivementFlag = true;
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
        $("#events-div span").after("<p>" + getMsgWithTime("Everything is ok. Let s relax. ☕") + "</p>");
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
                    for (let i = 0, amount = newMaleAmount; i < amount; i++) {
                        createOneCitizen();
                    }
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
                for (let i = 0; i < changeAmount; i++) {
                    createOneCitizen();
                }
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
                $("#events-div span").after("<p>" + getMsgWithTime("🐰🐰🐰 Farmers found wild rabbits on the field. When farmers wanted to take potatoes, wild rabbits attacked. Obviously it was bad decision to try to take rabbit's food. We lost: " + Math.round(farmerQuantityEl.text() * 0.15) + " farmers.") + "</p>");
                for (let i = 0, amount = Math.round(farmerQuantityEl.text() * 0.15); i < amount; i++) {
                    killFarmer();
                }
                break;
            case 3:
                $("#events-div span").after("<p>" + getMsgWithTime("🐰🐰🐰 Farmers came to new kind of food, than they noticed red-eye rabbits near and farmers decided to go back. Maybe that was a right decision.") + "</p>");
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
        changeColor($("#free-people-quantity"), $("#free-people-quantity"));
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
            if (confirm("Congratulations! You collected a lot of knowledge!! \nAlso you've killed: " + $("#corpse-quantity").text() + " people. No so bad..\n" + USER_NAME + ", do you try again?")) {
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
