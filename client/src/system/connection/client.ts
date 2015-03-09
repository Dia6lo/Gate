import EventManager = require("../../utility/eventmanager");

interface IMessage {
// ReSharper disable InconsistentNaming
    Header: string;
    Body: Object;
// ReSharper restore InconsistentNaming
}

class Client {
    private static socket: WebSocket = null;
    private static connected = false;
    private static messageHandlers = new EventManager();

    static onOpen(evt: any) {
        this.connected = true;
        this.sendMessage("request_map", null);
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

    static initialize(url: string) {
        this.socket = new WebSocket(url);
        this.socket.onopen = evt => this.onOpen(evt);
        this.socket.onmessage = evt => this.onMessage(evt);
    }
}

export = Client;