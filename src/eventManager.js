class EventManager {
    constructor() {
        this.eventDiv = $("#events-div span");
        this.achievementSection = $("#achiement-section");
    }

    addEvent(what) {
        let newElement;
        switch (what) {
            case "ok":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("Everything is ok. Let s relax. ☕") + "</p>");
                break;
            case "starvation":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("🍽️🍽️HELP!!! We don t have enough food. :(") + "</p>");
                break;
            case "food or houses":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("🤨 Not enough food or houses.") + "</p>");
                break;
            case "more resources":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("🤨 Collect more resources.") + "</p>");
                break;
            case "more knowledge":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("🤨 Collect more knowledge.") + "</p>");
                break;
            case "more campfires":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("🤨 Build more campfires or something else.") + "</p>");
                break;
            case "more barrack":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("🤨 Build more barracks or something else.") + "</p>");
                break;
            case "first research":
                newElement = $("<p style = \"display: none; color: white; background: black;\">" + this.getMsgWithTime("🙈🙈🙈 Get a new achievement.") + "</p>");
                break;

        }
        if (newElement) {
            this.eventDiv.after(newElement);
            newElement.show("slow");
        }

        switch (what) {
            case "first research":
                newElement = $("<img style = \"display: none;\" src=\"res/img/achievement/knowledge.png\" title=\"First research\"/>");
                break;
        }
        this.achievementSection.append(newElement);
        newElement.show("slow");
    }

    getMsgWithTime(msg) {
        return new Date().toLocaleTimeString() + ": " + msg;
    }
}

export default EventManager;