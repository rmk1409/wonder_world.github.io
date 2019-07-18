/**
 * Manage researches
 */
class ScienceManager {
    initialization(gameManager) {
        this.gameManager = gameManager;

        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.pageManager = this.gameManager.pageManager;

        // this.researchMap = new Map([
        //     ["agriculture", new Research(this.configManager.agricultureCost, this.pageManager.techAgricultureElement, [this.pageManager.agricultureP], this.configManager, this.pageManager,
        //         this.eventManager)],
        //     ["architecture", new],
        //     ["", new],
        // ]);
    }

    researchChanges() {
        let woodPrice = 10;
        let stonePrice = 10;
        if (this.configManager.woodQuantity >= woodPrice && this.configManager.stoneQuantity >= stonePrice) {
            this.configManager.changeCurResourceQuantity("wood", -woodPrice);
            this.configManager.changeCurResourceQuantity("stone", -stonePrice);

            this.eventManager.addAchievement("First Research");

            this.pageManager.toggleElement(this.pageManager.techChangesElement, [this.pageManager.maxFoodQuantity, this.pageManager.maxWoodQuantityElement,
                this.pageManager.maxStoneQuantityElement, this.pageManager.emptyRowBeforeKnowledge, this.pageManager.knowledgeRow, this.pageManager.emptyRowBeforeJobScientist, this.pageManager.jobScientistRow,
                this.pageManager.emptyRowBeforeBuildKnowlegde, this.pageManager.buildCampfireRow, this.pageManager.techAgricultureElement, this.pageManager.techFuneralElement, this.pageManager.techArchitectureElement,
                this.pageManager.alreadyKnownP, this.pageManager.changesP]);
        } else {
            this.eventManager.addEvent("more resources");
        }
    }

    research(knowledgePrice, firstElementToShow, otherElementsAr) {
        let result = true;

        if (this.configManager.knowledgeQuantity >= knowledgePrice) {
            this.configManager.changeCurResourceQuantity("knowledge", -knowledgePrice);
            if (firstElementToShow && otherElementsAr) {
                this.pageManager.toggleElement(firstElementToShow, otherElementsAr);
            }
        } else {
            this.eventManager.addEvent("more knowledge");
            result = false;
        }

        return result;
    }

    researchFromGame(name) {
        // this.researchMap.get(name).tryToResearch();
        switch (name) {
            case "changes":
                this.researchChanges();
                break;
            case "agriculture":
                if (this.research(this.configManager.agricultureCost, this.pageManager.techAgricultureElement, [this.pageManager.agricultureP])) {
                    this.configManager.changeProduction("food", true);
                }
                break;
            case "architecture":
                this.research(this.configManager.architectureCost, this.pageManager.techArchitectureElement, [this.pageManager.buildHutRow, this.pageManager.architectureP]);
                break;
            case "funeral":
                this.research(this.configManager.funeralCost, this.pageManager.techFuneralElement, [this.pageManager.buildScrollRow, this.pageManager.buildGraveRow,
                    this.pageManager.emptyRowBeforePopulationBuilding, this.pageManager.techChanges2Element, this.pageManager.funeralP]);
                break;
            case "changes2":
                this.research(this.configManager.changes2Cost, this.pageManager.techChanges2Element, [this.pageManager.pauseButton, this.pageManager.techAgriculture2Element,
                    this.pageManager.techArchitecture2Element, this.pageManager.techLeadershipElement, this.pageManager.techStoneAgeElement, this.pageManager.changes2P]);
                break;
            case "leadership":
                this.research(this.configManager.leadershipCost, this.pageManager.techLeadershipElement, [this.pageManager.emptyRowBeforeJobLeader, this.pageManager.leaderRow,
                    this.pageManager.leadershipP]);
                break;
            case "agriculture2":
                if (this.research(this.configManager.agriculture2Cost, this.pageManager.techAgriculture2Element, [this.pageManager.agriculture2P])) {
                    this.configManager.changeProduction("food", true);
                    this.gameManager.unlockAchievement("More Food");
                }
                break;
            case "architecture2":
                this.research(this.configManager.architecture2Cost, this.pageManager.techArchitecture2Element, [this.pageManager.buildPitRow, this.pageManager.architecture2P]);
                break;
            case "stone age":
                this.research(this.configManager.stoneAgeCost, this.pageManager.techStoneAgeElement, [this.pageManager.buildGranaryRow, this.pageManager.techArchitecture3Element,
                    this.pageManager.techMusicElement, this.pageManager.techSportElement, this.pageManager.techToolElement, this.pageManager.stoneAgeP]);
                break;
            case "architecture3":
                this.research(this.configManager.architecture3Cost, this.pageManager.techArchitecture3Element, [this.pageManager.buildDolmenRow, this.pageManager.architecture3P]);
                break;
            case "music":
                this.research(this.configManager.musicCost, this.pageManager.techMusicElement, [this.pageManager.emptyRowBeforeBuildEfficiency, this.pageManager.buildMusicClubRow,
                    this.pageManager.musicP]);
                break;
            case "sport":
                this.research(this.configManager.sportCost, this.pageManager.techSportElement, [this.pageManager.emptyRowBeforeJobInClubElement,
                    this.pageManager.emptyRowBeforeBuildEfficiency, this.pageManager.buildYogaClubRow, this.pageManager.sportP]);
                break;
            case "tool":
                this.research(this.configManager.toolCost, this.pageManager.techToolElement, [this.pageManager.techAxeElement, this.pageManager.techPickaxeElement,
                    this.pageManager.techHoeElement, this.pageManager.techAncientWeaponElement, this.pageManager.techArchitecture4Element, this.pageManager.toolP]);
                break;
            case "weapon":
                if (this.research(this.configManager.ancientWeaponCost, this.pageManager.techAncientWeaponElement, [this.pageManager.emptyRowbeforeBuildWar,
                    this.pageManager.buildBarrackRow, this.pageManager.tech2sideScrollElement, this.pageManager.weaponP])) {
                }
                break;
            case "hoe":
                if (this.research(this.configManager.hoeCost, this.pageManager.techHoeElement, [this.pageManager.hoeP])) {
                    this.configManager.foodIncreaseStep = 0.1;
                    this.configManager.changeProduction("food", true);
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "axe":
                if (this.research(this.configManager.axeCost, this.pageManager.techAxeElement, [this.pageManager.axeP])) {
                    this.configManager.changeProduction("wood", true);
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "pickaxe":
                if (this.research(this.configManager.pickaxeCost, this.pageManager.techPickaxeElement, [this.pageManager.pickAxeP])) {
                    this.configManager.changeProduction("stone", true);
                    this.configManager.changeCurResourceQuantity("productivity", 6.25);
                }
                break;
            case "2 side scroll":
                if (this.research(this.configManager.bothSideScrollCost, this.pageManager.tech2sideScrollElement, [this.pageManager.twoSideScrollP])) {
                    this.configManager.changeCurResourceQuantity("maxKnowledge", this.configManager.scrollQuantity * this.configManager.knowledgeInScroll);
                    this.configManager.knowledgeInScroll *= 2;
                    this.pageManager.buildScrollDefinition.text("+10 space for knowledge");
                    this.pageManager.buildScrollButton.text("2-side scroll");
                }
                break;
            case "architecture4":
                this.research(this.configManager.architecture4Cost, this.pageManager.techArchitecture4Element, [this.pageManager.buildPalaceRow, this.pageManager.techBronzeAgeElement,
                    this.pageManager.architecture4P]);
                break;
        }
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

    conductResearch(){
        return this.tryToResearch();
    }

    tryToResearch() {
        let result = true;

        if (this.configManager.knowledgeQuantity >= this.price) {
            this.configManager.changeCurResourceQuantity("knowledge", -this.price);
            if (this.elementToHide && this.elementToShowAr) {
                this.pageManager.toggleElement(this.elementToHide, this.elementToShowAr);
            }
        } else {
            this.eventManager.addEvent("more knowledge");
            result = false;
        }

        return result;
    }
}

class ResearchWithExtraLogic {
    constructor(research){
        this.research = research;
    }
    conductResearch(){
        let result = this.research.conductResearch();
        if (result) {
            this.extraLogic();
        }
        return result;
    }
    extraLogic(){}
}

export default ScienceManager;