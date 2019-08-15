import EventManager from "./eventManager";

class LoaderManager {
    initialization(gameManager) {
        this.gameManager = gameManager;

        this.funnyPhrases = [
            "Adding Vanilla Flavor to Ice Giants",
            "All races of Norrath will learn to work together",
            "Attaching Beards to Dwarves",
            "Creating Randomly Generated Feature",
            "Delivering the Lion Meat to Halas",
            "Doing The Impossible",
            "Dusting Off Spellbooks",
            "Ensuring Everything Works Perfektly",
            "Ensuring Gnomes Are Still Short",
            "If You Squeeze Dark Elves You Don't Get Wine",
            "Outfitting Pigs With Wings",
            "Refreshing Death Touch Ammunition",
            "Sanding Wood Elves... now 34% smoother.",
            "Sharpening Swords",
            "Starching High Elf Robes",
            "Stringing Bows",
            "Stupidificationing Ogres",
            "Warning: Half Elves Are Now .49999 Elves.",
            "Whacking Trolls With Ugly Stick",
            "Load not interesting stuff",
        ];
    }

    checkSavedGame() {
        let userName = localStorage.getItem(this.gameManager.configManager.userKey);
        if (userName) {
            $("#user-name-input").attr("value", userName);
        }

        if (!localStorage.getItem("INITIAL_VALUE_MAP")){
            $("#main-menu-load-button").prop("disabled", true);
            $("#in-game-load-button").prop("disabled", true);
        }
    }

    loadGameFromMenu() {
        this.gameManager.pageManager.getUserNameFromModal();
        this.loadGame();
    }

    loadGame() {
        this.runSaveLoadModal();
        $("#events-section div").remove();

        let valMap = this.gameManager.configManager.initialValueMap = new Map(JSON.parse(localStorage.getItem("INITIAL_VALUE_MAP")));
        let confManager = JSON.parse(localStorage.getItem("CONFIG_MANAGER"));
        let elementToShowArray = this.gameManager.pageManager.showElementArray = JSON.parse(localStorage.getItem("ELEMENT_TO_SHOW"));
        let elementToHideArray = this.gameManager.pageManager.hideElementArray = JSON.parse(localStorage.getItem("ELEMENT_TO_HIDE"));

        // set Primitives
        Object.keys(confManager).forEach((item) => {
            if (typeof confManager[item] !== 'object') {
                this.gameManager.configManager[item] = confManager[item];
            }
        });
        // set values to Resource objects
        for (let [k, v] of valMap) {
            this.gameManager.configManager[k].setValue(v);
        }

        this.gameManager.pageManager.showElement(elementToShowArray.map((item) => $(`#${item}`)));
        this.gameManager.pageManager.hideElement(elementToHideArray.map((item) => $(`#${item}`)));
        if (+this.gameManager.configManager.leader) {
            $(".ten-work-td").slideDown("slow");
        } else {
            $(".ten-work-td").slideUp("slow");
        }
    }

    saveGame() {
        this.runSaveLoadModal();

        this.gameManager.pageManager.loadButton.prop("disabled", false);

        let valMap = this.gameManager.configManager.initialValueMap;

        for (let [k] of valMap) {
            valMap.set(k, +this.gameManager.configManager[k]);
        }

        localStorage.setItem("INITIAL_VALUE_MAP", JSON.stringify(Array.from(valMap.entries())));
        localStorage.setItem("CONFIG_MANAGER", JSON.stringify(this.gameManager.configManager));
        localStorage.setItem("ELEMENT_TO_SHOW", JSON.stringify(this.gameManager.pageManager.showElementArray));
        localStorage.setItem("ELEMENT_TO_HIDE", JSON.stringify(this.gameManager.pageManager.hideElementArray));
    }

    runSaveLoadModal() {
        $("#save-load-modal").modal();
        let progress = 0;
        let id = setInterval(() => {
            if (progress > 100) {
                progress = 0;
                clearInterval(id);
                $("#save-load-modal").modal("toggle");
            }
            $(".progress-bar").css("width", progress + "%").text(progress + "%");
            progress += EventManager.getRandomInt(20);
            $("#progress-p").text(this.funnyPhrases[EventManager.getRandomInt(this.funnyPhrases.length - 1)]);
        }, 600);
    }
}

export default LoaderManager;