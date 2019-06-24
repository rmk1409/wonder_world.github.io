import Page from "./page";

// Create buildings
class Builder {
    constructor(page, event) {
        this.page = page;
        this.event = event;
    }

    build(woodPrice, stonePrice, elementNamesAr, quantityAr) {
        if (this.page.woodQuantity.text() >= woodPrice && this.page.stoneQuantity.text() >= stonePrice) {
            this.page.changeCurResourceQuantity("wood", -woodPrice);
            this.page.changeCurResourceQuantity("stone", -stonePrice);
            elementNamesAr.forEach(function (item, index) {
                Page.changeIntNumber(item, quantityAr[index]);
            });
            return true;
        }
        else {
            this.event.addEvent("more resources");
            return false;
        }
    }
}

export default Builder;