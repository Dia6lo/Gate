import EventManager = require("../../utility/eventmanager");

interface IMessage {
// ReSharper disable InconsistentNaming
    Header: string;
    Body: Object;
// ReSharper restore InconsistentNaming
}

class Client {
    private static socket = new WebSocket("ws://127.0.0.1:8080");
    private static connected = false;
    private static messageHandlers = new EventManager();

    static onOpen() {
        Client.connected = true;
    }

    static sendMessage(header: string, body: Object) {
        var message: IMessage = {
            Header: header,
            Body: body
        };
        this.socket.send(JSON.stringify(message));
    }

    static onMessage(evt: any) {
        var message: IMessage = JSON.parse(evt.data);
        this.messageHandlers.trigger(message.Header, message.Body);
    }

    static subscribe(message: string, callback: Function, context: Object) {
        this.messageHandlers.on(message, callback, context);
    }

    static initialize() {
        this.socket.onopen = ev => this.onOpen();
        this.socket.onmessage = evt => this.onMessage(evt);
    }
}

export = Client;