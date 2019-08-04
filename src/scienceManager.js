/**
 * Manage researches
 */
class ScienceManager {
    initialization(gameManager) {
        this.gameManager = gameManager;

        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.pageManager = this.gameManager.pageManager;

        this.researchMap = new Map([
            ["changes", new ChangesResearch(this.configManager, this.pageManager, this.eventManager)],
            ["agriculture", new AgricultureResearch(
                new Research(this.configManager.agricultureCost, this.pageManager.techAgricultureElement, [], this.configManager, this.pageManager, this.eventManager)
            )],
            ["architecture", new Research(this.configManager.architectureCost, this.pageManager.techArchitectureElement, [this.pageManager.buildHutRow],
                this.configManager, this.pageManager, this.eventManager)],
            ["funeral", new Research(this.configManager.funeralCost, this.pageManager.techFuneralElement, [this.pageManager.buildScrollRow, this.pageManager.buildGraveRow,
                this.pageManager.emptyRowBeforePopulationBuilding, this.pageManager.techChanges2Element], this.configManager, this.pageManager, this.eventManager)],
            ["changes2", new Research(this.configManager.changes2Cost, this.pageManager.techChanges2Element, [this.pageManager.techAgriculture2Element,
                    this.pageManager.techArchitecture2Element, this.pageManager.techLeadershipElement, this.pageManager.techStoneAgeElement], this.configManager, this.pageManager,
                this.eventManager)],
            ["leadership", new Research(this.configManager.leadershipCost, this.pageManager.techLeadershipElement, [this.pageManager.emptyRowBeforeJobLeader, this.pageManager.leaderRow],
                this.configManager, this.pageManager, this.eventManager)],
            ["agriculture2", new Agriculture2Research(
                new Research(this.configManager.agriculture2Cost, this.pageManager.techAgriculture2Element, [], this.configManager, this.pageManager, this.eventManager)
            )],
            ["architecture2", new Research(this.configManager.architecture2Cost, this.pageManager.techArchitecture2Element, [this.pageManager.buildPitRow],
                this.configManager, this.pageManager, this.eventManager)],
            ["stone age", new Research(this.configManager.stoneAgeCost, this.pageManager.techStoneAgeElement, [this.pageManager.buildGranaryRow, this.pageManager.techArchitecture3Element,
                this.pageManager.techMusicElement, this.pageManager.techSportElement, this.pageManager.techToolElement], this.configManager, this.pageManager, this.eventManager)],
            ["architecture3", new Research(this.configManager.architecture3Cost, this.pageManager.techArchitecture3Element, [this.pageManager.buildDolmenRow],
                this.configManager, this.pageManager, this.eventManager)],
            ["music", new Research(this.configManager.musicCost, this.pageManager.techMusicElement, [this.pageManager.buildMusicClubRow], this.configManager,
                this.pageManager, this.eventManager)],
            ["sport", new Research(this.configManager.sportCost, this.pageManager.techSportElement, [this.pageManager.emptyRowBeforeJobInClubElement,
                this.pageManager.emptyRowBeforeBuildEfficiency, this.pageManager.buildYogaClubRow], this.configManager, this.pageManager, this.eventManager)],
            ["tool", new Research(this.configManager.toolCost, this.pageManager.techToolElement, [this.pageManager.techAxeElement, this.pageManager.techPickaxeElement,
                    this.pageManager.techHoeElement, this.pageManager.techAncientWeaponElement, this.pageManager.techArchitecture4Element], this.configManager, this.pageManager,
                this.eventManager)],
            ["weapon", new Research(this.configManager.ancientWeaponCost, this.pageManager.techAncientWeaponElement, [this.pageManager.emptyRowbeforeBuildWar,
                this.pageManager.buildBarrackRow, this.pageManager.tech2sideScrollElement], this.configManager, this.pageManager, this.eventManager)],
            ["hoe", new HoeResearch(
                new Research(this.configManager.hoeCost, this.pageManager.techHoeElement, [], this.configManager, this.pageManager, this.eventManager)
            )],
            ["axe", new AxeResearch(
                new Research(this.configManager.axeCost, this.pageManager.techAxeElement, [], this.configManager, this.pageManager, this.eventManager)
            )],
            ["pickaxe", new PickAxeResearch(
                new Research(this.configManager.pickaxeCost, this.pageManager.techPickaxeElement, [], this.configManager, this.pageManager, this.eventManager)
            )],
            ["2 side scroll", new TwoSideScrollResearch(
                new Research(this.configManager.bothSideScrollCost, this.pageManager.tech2sideScrollElement, [], this.configManager, this.pageManager, this.eventManager)
            )],
            ["architecture4", new Research(this.configManager.architecture4Cost, this.pageManager.techArchitecture4Element, [this.pageManager.buildPalaceRow, this.pageManager.techBronzeAgeElement],
                this.configManager, this.pageManager, this.eventManager)],
        ]);
    }

    research(name) {
        this.researchMap.get(name).conductResearch();
    }
}

/**
 * For 1st research, it's separate due to specific resources to conduct the research.
 */
class ChangesResearch {
    constructor(configManager, pageManager, eventManager) {
        this.woodPrice = 10;
        this.stonePrice = 10;

        this.configManager = configManager;
        this.pageManager = pageManager;
        this.eventManager = eventManager;
    }

    conductResearch() {
        return this.tryToResearch();
    }

    tryToResearch() {
        let result = true;

        if (+this.configManager.wood >= this.woodPrice && +this.configManager.stone >= this.stonePrice) {
            this.configManager.wood.changeValue(-this.woodPrice);
            this.configManager.stone.changeValue(-this.stonePrice);

            this.eventManager.addAchievement("First Research");

            this.pageManager.hideFirstShowSecond(this.pageManager.techChangesElement, [this.pageManager.emptyRowBeforeKnowledge, this.pageManager.knowledgeRow,
                this.pageManager.emptyRowBeforeJobScientist, this.pageManager.jobScientistRow, this.pageManager.emptyRowBeforeBuildKnowlegde, this.pageManager.buildCampfireRow,
                this.pageManager.techAgricultureElement, this.pageManager.techFuneralElement, this.pageManager.techArchitectureElement]);
        } else {
            this.eventManager.addEvent("more resources");
            result = false;
        }

        return result;
    }
}

/**
 * Class base research
 */
class Research {
    constructor(price, elementToHide, elementToShowAr, configManager, pageManager, eventManager) {
        this.price = price;
        this.elementToHide = elementToHide;
        this.elementToShowAr = elementToShowAr;

        this.configManager = configManager;
        this.pageManager = pageManager;
        this.eventManager = eventManager;
    }

    conductResearch() {
        return this.tryToResearch();
    }

    tryToResearch() {
        let result = true;

        if (+this.configManager.knowledge >= this.price) {
            this.configManager.knowledge.changeValue(-this.price);
            if (this.elementToHide && this.elementToShowAr) {
                this.pageManager.hideFirstShowSecond(this.elementToHide, this.elementToShowAr);
            }
        } else {
            this.eventManager.addEvent("more knowledge");
            result = false;
        }

        return result;
    }
}

/**
 * Example of "decorator" pattern
 */
class ResearchWithExtraLogic {
    constructor(research) {
        this.research = research;
    }

    conductResearch() {
        let result = this.research.conductResearch();
        if (result) {
            this.extraLogic();
        }
        return result;
    }

    extraLogic() {
    }
}

/**
 * Example of "template method" pattern
 */
class AgricultureResearch extends ResearchWithExtraLogic {
    constructor(research) {
        super(research);
    }

    extraLogic() {
        this.research.configManager.changeProduction("food", true);
    }
}

class Agriculture2Research extends ResearchWithExtraLogic {
    constructor(research) {
        super(research);
    }

    extraLogic() {
        this.research.configManager.changeProduction("food", true);
        this.research.eventManager.addAchievement("More Food");
    }
}

class HoeResearch extends ResearchWithExtraLogic {
    constructor(research) {
        super(research);
    }

    extraLogic() {
        this.research.configManager.foodIncreaseStep = 0.1;
        this.research.configManager.changeProduction("food", true);
        this.research.configManager.productivity.changeValue(6.25);
    }
}

class AxeResearch extends ResearchWithExtraLogic {
    constructor(research) {
        super(research);
    }

    extraLogic() {
        this.research.configManager.changeProduction("wood", true);
        this.research.configManager.productivity.changeValue(6.25);
    }
}

class PickAxeResearch extends ResearchWithExtraLogic {
    constructor(research) {
        super(research);
    }

    extraLogic() {
        this.research.configManager.changeProduction("stone", true);
        this.research.configManager.productivity.changeValue(6.25);
    }
}

class TwoSideScrollResearch extends ResearchWithExtraLogic {
    constructor(research) {
        super(research);
    }

    extraLogic() {
        this.research.configManager.knowledgeStorage.changeValue(+this.research.configManager.scroll * +this.research.configManager.knowledgeInScroll);
        this.research.configManager.knowledgeInScroll.changeValue(5);
        this.research.pageManager.gameManager.builderManager.buildingMap.get("scroll").resourceToChangeAr[1][1] = +this.research.configManager.knowledgeInScroll;
        this.research.pageManager.buildScrollButton.text("2-side scroll");
    }
}

export default ScienceManager;