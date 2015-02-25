import Map = require("../render/Map");

class Client {

    static socket: WebSocket;
    static connected: boolean;
    static map: Map;

    onOpen() {
        Client.connected = true;
    }

    onMessage(evt: any) {
        var a = JSON.parse(evt.data);
        var b = JSON.parse(a.Body);
        if (a.Header == "map")
            Client.map.update(b);
    }

    constructor(map: Map) {
        Client.map = map;
        Client.socket = new WebSocket("ws://127.0.0.1:8080");
        Client.socket.onopen = ev => this.onOpen();
        Client.socket.onmessage = evt => this.onMessage(evt);
    }
}

export = Client;