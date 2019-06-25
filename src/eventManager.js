class EventManager {
    constructor() {
        this.eventDiv = $("#events-div span");
    }

    addEvent(what) {
        switch (what) {
            case "food or houses":
                this.eventDiv.after("<p style = \"color: white; background: black;\">" + this.getMsgWithTime("🤨 Not enough food or houses.") + "</p>");
                break;
            case "more resources":
                this.eventDiv.after("<p style = \"color: white; background: black;\">" + this.getMsgWithTime("🤨 Collect more resources.") + "</p>");
                break;
        }
    }

    getMsgWithTime(msg) {
        return new Date().toLocaleTimeString() + ": " + msg;
    }
}

export default EventManager;