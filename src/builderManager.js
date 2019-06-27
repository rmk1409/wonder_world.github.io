// Create buildings
class BuilderManager {
    initialization(gameManager) {
        this.gameManager = gameManager;
        this.configManager = this.gameManager.configManager;

        this.eventManager = this.gameManager.eventManager;
    }

    build(woodPrice, stonePrice, elementNamesAr, quantityAr) {
        if (this.configManager.woodQuantity >= woodPrice && this.configManager.stoneQuantity >= stonePrice) {
            this.configManager.changeCurResourceQuantity("wood", -woodPrice);
            this.configManager.changeCurResourceQuantity("stone", -stonePrice);
            for (let i = 0; i < elementNamesAr.length; i++) {
                this.configManager.changeCurResourceQuantity(elementNamesAr[i], quantityAr[i]);
            }
            return true;
        }
        else {
            this.eventManager.addEvent("more resources");
            return false;
        }
    }
}

export default BuilderManager;