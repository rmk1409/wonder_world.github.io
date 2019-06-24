class Page {

    constructor() {
        this.foodQuantity = $("#food-quantity");
        this.maxFoodQuantity = $("#max-food-quantity-span");
        this.woodQuantity = $("#wood-quantity");
        this.maxWoodQuantity = $("#max-wood-quantity-span");
        this.stoneQuantity = $("#stone-quantity");
        this.maxStoneQuantity = $("#max-stone-quantity-span");
        this.emptyRowBeforeKnowledge = $("#empty-row-before-knowledge");
        this.knowledgeRow = $("#knowledge-row");
        this.knowledgeQuantity = $("#knowledge-quantity");
        this.maxKnowledgeQuantity = $("#max-knowledge-quantity-span");

        this.foodProductionElement = $("#food-production-quantity");

        this.curPopulationElement = $("#current-population");
        this.maxPopulationElement = $("#max-population");
        this.inGravesRow = $("#in-graves-row");
        this.corpQuantityElement = $("#corpse-quantity");
        this.inGraveQuantityElement = $("#in-graves-quantity");
        this.maxInGravesQuantityElement = $("#max-in-graves-quantity");
        this.emptyRowBeforHappinessRowElement = $("#empty-row-before-happiness");
        this.happinessRowElement = $("#happiness-row");
        this.healthRowElement = $("#health-row");
        this.curHappyPeople = $("#current-happy-people");
        this.maxHappyPeople = $("#max-happy-people");
        this.curHealthPeople = $("#current-health-people");
        this.maxHealthPeopleElement = $("#max-health-people");
        this.emptyRowBeforProductivityRowElement = $("#empty-row-before-productivity");
        this.productivityRowElement = $("#productivity-row");

        this.curLazybonesElement = $("#free-people-quantity");

        this.emptyRowBeforeJobScientist = $("#empty-row-before-job-scientist");
        this.jobScientistRow = $("#job-scientist-row");
        this.emptyRowBeforeJobFuneral = $("#empty-row-before-job-funeral");
        this.jobFuneralRow = $("#job-funeral-process-row");
        this.maxScientistQuantityElement = $("#max-scientist-quantity");
        this.emptyRowBeforeJobInClubElement = $("#empty-row-before-job-in-club");
        this.jobDjRowElement = $("#job-dj-row");
        this.djQuantityElement = $("#dj-quantity");
        this.maxDjQuantity = $("#max-dj-quantity");
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
        Page.changeIntNumber(this.curPopulationElement, num);
    }

    changeCurLazybone(num) {
        Page.changeIntNumber(this.curLazybonesElement, num);
    }

    changeFoodProduction(num) {
        Page.changeFloatNumber(this.foodProductionElement, num);
    }

    changeCurResourceQuantity(resName, num) {
        let resource = this.foodQuantity;
        let storageResource = this.maxFoodQuantity;

        switch (resName) {
            case "wood":
                resource = this.woodQuantity;
                storageResource = this.maxWoodQuantity;
                break;
            case "stone":
                resource = this.stoneQuantity;
                storageResource = this.maxStoneQuantity;
                break;
            // case "knowledge":
            //     break;
        }

        Page.changeFloatNumber(resource, num);
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
}

export default Page;