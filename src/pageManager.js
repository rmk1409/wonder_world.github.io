class PageManager {
    constructor(game) {
        this.game = game;

        // HTML Elements
        this.foodQuantityElement = $("#food-quantity");
        this.maxFoodQuantity = $("#max-food-quantity-span");
        this.foodProductionElement = $("#food-production-quantity");
        this.woodQuantityElement = $("#wood-quantity");
        this.maxWoodQuantityElement = $("#max-wood-quantity-span");
        this.woodProductionElement = $("#wood-production-quantity");
        this.stoneQuantityElement = $("#stone-quantity");
        this.maxStoneQuantity = $("#max-stone-quantity-span");
        this.stoneProductionElement = $("#stone-production-quantity");
        this.emptyRowBeforeKnowledge = $("#empty-row-before-knowledge");
        this.knowledgeRow = $("#knowledge-row");
        this.knowledgeQuantityElement = $("#knowledge-quantity");
        this.maxKnowledgeQuantity = $("#max-knowledge-quantity-span");
        this.knowledgeProductionElement = $("#knowledge-production-quantity");

        this.curPopulationElement = $("#current-population");
        this.maxPopulationElement = $("#max-population");
        this.corpseRow = $("#corpse-row");
        this.corpseQuantityElement = $("#corpse-quantity");
        this.inGravesRow = $("#in-graves-row");
        this.inGraveQuantityElement = $("#in-graves-quantity");
        this.maxInGravesQuantityElement = $("#max-in-graves-quantity");
        this.emptyRowBeforHappinessRowElement = $("#empty-row-before-happiness");
        this.happinessRowElement = $("#happiness-row");
        this.healthRowElement = $("#health-row");
        this.curHappyPeople = $("#current-happy-people");
        this.maxHappyPeopleElement = $("#max-happy-people");
        this.curHealthPeople = $("#current-health-people");
        this.maxHealthPeopleElement = $("#max-health-people");
        this.emptyRowBeforProductivityRowElement = $("#empty-row-before-productivity");
        this.productivityRowElement = $("#productivity-row");

        this.tenWorkTd = $(".ten-work-td");
        this.curLazybonesElement = $("#lazybone-quantity");
        this.farmerQuantityElement = $("#farmer-quantity");
        this.woodmenQuantityElement = $("#woodcutter-quantity");
        this.minerQuantityElement = $("#miner-quantity");
        this.emptyRowBeforeJobScientist = $("#empty-row-before-job-scientist");
        this.jobScientistRow = $("#job-scientist-row");
        this.emptyRowBeforeJobFuneral = $("#empty-row-before-job-funeral");
        this.jobFuneralRow = $("#job-funeral-process-row");
        this.funeralQuantityElement = $("#funeral-process-quantity");
        this.curScientistQuantityElement = $("#scientist-quantity");
        this.maxScientistQuantityElement = $("#max-scientist-quantity");
        this.emptyRowBeforeJobInClubElement = $("#empty-row-before-job-in-club");
        this.jobDjRowElement = $("#job-dj-row");
        this.djQuantityElement = $("#dj-quantity");
        this.maxDjQuantityElement = $("#max-dj-quantity");
        this.jobInstructorRowElement = $("#job-instructor-row");
        this.maxInstructorQuantityElement = $("#max-instructor-quantity");
        this.instructorQuantityElement = $("#instructor-quantity");
        this.jobWarriorRow = $("#job-warrior-row");
        this.maxWarriorQuantityElement = $("#max-warrior-quantity");

        this.graveQuantityElement = $("#grave-quantity");
        this.scrollQuantityElement = $("#scroll-quantity");
        this.granaryQuantityElement = $("#grave-quantity");
        this.pitQuantityElement = $("#pit-quantity");
        this.tentQuantityElement = $("#tent-quantity");
        this.hutQuantityElement = $("#hut-quantity");
        this.campfireQuantityElement = $("#campfire-quantity");
        this.dolmenQuantityElement = $("#dolmen-quantity");
        this.musicClubQuantityElement = $("#music-club-quantity");
        this.yogaClubQuantityElement = $("#yoga-club-quantity");
        this.palaceQuantityElement = $("#palace-quantity");
        this.barrackQuantityElement = $("#barrack-quantity");

        this.achievementSection = $("#achievement-section");
        this.ufoAchievement = $("<img src=\"res/img/achievement/alien.png\" title=\"Player is an alien\"/>");
        this.palaceAchievement = $("<img src=\"res/img/achievement/blueprint.png\" title=\"Build a palace\"/>");
        this.rirstResearchAchievement = $("<img src=\"res/img/achievement/knowledge.png\" title=\"First research\"/>");
        this.hungerAchievement = $("<img src=\"res/img/common/death.png\" title=\"Die of hunger\"/>");
        this.productivityAchievement = $("<img src=\"res/img/achievement/speedometer.png\" title=\"Achieve high productivity (more than 190%)\"/>");
        this.moreFoodAchievement = $("<img src=\"res/img/achievement/food.png\" title=\"Even more food, hurray!!! :)\"/>");

        this.techChangesElement = $("#tech-changes-row");
        this.techAgricultureElement = $("#tech-agriculture-row");
        this.techArchitectureElement = $("#tech-architecture-row");
        this.techFuneralElement = $("#tech-funeral-row");
        this.techChanges2Element = $("#tech-changes2-row");
        this.techLeadershipElement = $("#tech-leadership-row");
        this.techAgriculture2Element = $("#tech-agriculture-2-row");
        this.techArchitecture2Element = $("#tech-architecture-2-row");
        this.techStoneAgeElement = $("#tech-stone-age-row");
        this.techArchitecture3Element = $("#tech-architecture-3-row");
        this.techMusicElement = $("#tech-music-row");
        this.techSportElement = $("#tech-sport-row");
        this.techToolElement = $("#tech-tools-row");
        this.techAncientWeaponElement = $("#tech-weapon-row");
        this.techHoeElement = $("#tech-hoe-row");
        this.techAxeElement = $("#tech-axe-row");
        this.techPickaxeElement = $("#tech-pickaxe-row");
        this.tech2sideScrollElement = $("#tech-2-side-scroll-row");
        this.techArchitecture4Element = $("#tech-architecture-4-row");
    }

    static changeIntNumber(element, quantity) {
        element.text(+element.text() + quantity);
    }

    static changeFloatNumber(element, quantity) {
        let $oldQuantity = parseFloat(element.text());
        $oldQuantity = Math.round($oldQuantity * 100 + quantity * 100) / 100;
        element.text($oldQuantity.toFixed(1));
    }

    static reloadSite() {
        document.location.reload(true);
    }

    changeCurPopulation(num) {
        PageManager.changeIntNumber(this.curPopulationElement, num);
    }

    changeCurLazybone(num) {
        PageManager.changeIntNumber(this.curLazybonesElement, num);
    }

    changeFoodProduction(num) {
        PageManager.changeFloatNumber(this.foodProductionElement, num);
    }

    changeCurResourceQuantity(resName, num) {
        let resource = this.foodQuantityElement;
        let storageResource = this.maxFoodQuantity;

        switch (resName) {
            case "wood":
                resource = this.woodQuantityElement;
                storageResource = this.maxWoodQuantityElement;
                break;
            case "stone":
                resource = this.stoneQuantityElement;
                storageResource = this.maxStoneQuantity;
                break;
        }

        PageManager.changeFloatNumber(resource, num);
        if (+resource.text() > storageResource.text()) {
            resource.text(storageResource.text());
        }
    }

    unlockAchievement(name) {
        switch (name) {
            case "UFO Alien":
                this.achievementSection.append(this.ufoAchievement);
                break;
            case "Palace":
                this.achievementSection.append(this.palaceAchievement);
                break;
            case "First Research":
                this.achievementSection.append(this.rirstResearchAchievement);
                break;
            case "Starvation":
                this.achievementSection.append(this.hungerAchievement);
                break;
            case "Productivity":
                this.achievementSection.append(this.productivityAchievement);
                break;
            case "More Food":
                this.achievementSection.append(this.moreFoodAchievement);
                break;
        }
    }

    showElement(ar) {
        ar.forEach((item) => item.show("slow"));
    }
    toggleElement(item, ar) {
        item.toggle("slow", ()=>{ar.forEach((item) => item.toggle("slow"))});
    }
}

export default PageManager;