class ScienceManager {
    constructor(gameManager){
        this.gameManager = gameManager;

        this.configManager = this.gameManager.configManager;
        this.eventManager = this.gameManager.eventManager;
        this.pageManager = this.gameManager.pageManager;
    }

    changes(){
        let woodPrice = 10;
        let stonePrice = 10;
        if (this.configManager.woodQuantity >= woodPrice && this.configManager.stoneQuantity >= stonePrice) {
            this.configManager.changeCurResourceQuantity("wood", -woodPrice);
            this.configManager.changeCurResourceQuantity("stone", -stonePrice);

            this.eventManager.addEvent("first research");

            // TODO stopped here
            this.pageManager.toggleElement(this.pageManager.techChangesElement, [])
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
            this.eventManager.addEvent("more resources");
        }
    }
}

export default ScienceManager;