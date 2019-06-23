class Page {

    constructor() {
        this.curPopulationElement = $("#current-population");
        this.curLazyBonesElement = $("#free-people-quantity");
        this.foodProductionElement = $("#food-production-quantity");
    }

    static changeIntNumber(element, quantity) {
        element.text(+element.text() + quantity);
    }

    static changeFloatNumber(element, quantity) {
        let $oldQuantity = parseFloat(element.text());
        $oldQuantity = Math.round($oldQuantity * 100 + quantity * 100) / 100;
        element.text($oldQuantity.toFixed(1));
    }

    changePopulation(num) {
        Page.changeIntNumber(this.curPopulationElement, num);
    }

    changeLazyBones(num) {
        Page.changeIntNumber(this.curLazyBonesElement, num);
    }

    changeFoodProduction(number) {
        Page.changeFloatNumber(this.foodProductionElement, number);
    }
}

export default Page;