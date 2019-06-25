import PageManager from "./pageManager";

// Create buildings
class BuilderManager {
    constructor(game) {
        this.gameManager = game;
        this.configManager = this.gameManager.configManager;

        this.eventManager = this.gameManager.eventManager;
    }

    build(woodPrice, stonePrice, elementNamesAr, quantityAr) {
        if (this.configManager.woodQuantity >= woodPrice && this.configManager.stoneQuantity >= stonePrice) {
            this.configManager.changeCurResourceQuantity("wood", -woodPrice);
            this.configManager.changeCurResourceQuantity("stone", -stonePrice);
            elementNamesAr.forEach(function (item, index) {
                PageManager.changeIntNumber(item, quantityAr[index]);
            });
            return true;
        }
        else {
            this.eventManager.addEvent("more resources");
            return false;
        }
    }
}

export default BuilderManager;