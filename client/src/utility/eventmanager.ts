class EventManager {

    events: { [type: string]: { callback: Function; context: Object }[] } = {};

    on(type: string, callback: Function, context: Object) {
        if (this.events[type] == undefined)
            this.events[type] = [];
        this.events[type].push({
            callback: callback,
            context: context
        });
    }

    trigger(type: string, ...params: any[]) {
        var callbacks = this.events[type];
        if (callbacks == undefined)
            return;
        for (var i = 0; i < callbacks.length; i++) {
            var callback = callbacks[i].callback;
            var context = callbacks[i].context;
            if (context == undefined)
                context = this;
            callback.apply(context, params);
        }
    }
}

export = EventManager;