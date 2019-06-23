class Game {

    constructor(page) {
        this.page = page;
    }

    createCitizen(num) {
        this.page.changePopulation(num);
        this.page.changeLazyBones(num);
        this.page.changeFoodProduction(-num);
    }

}

export default Game;