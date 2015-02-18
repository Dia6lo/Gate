//SUGGESTION: Transform it to system?
//TODO: make it use data from DB
class EntityManager {
    private _lowestUnassignedEntityID: number;
    private _entityStore: number[];
    private _entityHumanReadableNames: { [entity: number]: string };
    private _componentStore: { [name: string]: { [entity: number]: Component } };

    constructor() {
        this._lowestUnassignedEntityID = 1;
        this._entityStore = [];
        this._componentStore = {};
        this._entityHumanReadableNames = [];
    }

    private _generateNewEntityID(): number {
        //TODO: Make it synchronous
        {
            if (this._lowestUnassignedEntityID < Number.MAX_VALUE) {
                return this._lowestUnassignedEntityID++;
            }
            else {
                for (var i = 1; i < Number.MAX_VALUE; i++) {
                    if (this._entityStore.indexOf(i) != -1)
                        return i;
                }
                throw new Error("ERROR: no available Entity IDs; too many entities!");
            }
        }
    }

    createEntity(name?: string): number {
        var entity = this._generateNewEntityID();
        if (entity < 1) {
            throw new Error("WTF? Entity < 1");
        }
        else {
            this._entityStore.push(entity);
            if (name)
                this._entityHumanReadableNames[entity] = name;
            return entity;
        }
    }

    addComponent(entity: number, component: Component): void {
        var store = this._componentStore[component.componentName];
        if (store == undefined) {
            store = {};
            this._componentStore[component.componentName] = store;
        }
        store[entity] = component;
    }

    addComponents(entity: number, components: Component[]): void {
        for (var i = 0; i < components.length; i++) {
            this.addComponent(entity, components[i]);
        }
    }

    hasComponent<T extends Component>(entity: number) {
        var store = this._componentStore[typeof T];
        if (store == undefined)
            return false;
        else
            return store[entity] != undefined;
    }

    getComponent<T extends Component>(entity: number, componentType: { prototype: T }): T {
        var store = this._componentStore[componentType.prototype.getType()];
        if (store == undefined)
            throw new Error("GET FAIL: there are no entities with a Component of class: " + componentType.prototype.getType());
        var result: T = <T> store[entity];
        if (result == undefined)
            throw new Error("GET FAIL: " + this.nameFor(entity) + " does not possess Component of class\n missing: " + componentType.prototype.getType());
        return result;
    }

    getAllComponentsOfType<T extends Component>(componentType: { prototype: T }): T[] {
        var store = this._componentStore[componentType.prototype.getType()];
        var result = [];
        if (store != undefined)
            for (var entity in store)
                result.push(store[entity]);
        return result;
    }

    getAllEntitiesPossessingComponent<T extends Component>(componentType: { prototype: T }): number[] {
        var store = this._componentStore[componentType.prototype.getType()];
        var result = [];
        if (store != undefined)
            for (var entity in store)
                result.push(entity);
        return result;
    }

    getAllComponentsOnEntity<T extends Component>(entity: number): T[] {
        var components: T[] = [];
        for (var componentType in this._componentStore) {
            var component = this._componentStore[componentType][entity];
            if (component == undefined)
                continue;
            components.push(<T>component);
        }
        return components;
    }

    removeComponent<T extends Component>(entity: number, componentType: { prototype: T }): void {
        var store = this._componentStore[componentType.prototype.getType()];
        if (store == undefined)
            throw new Error("REMOVE FAIL: there are no entities with a Component of class: " + componentType.prototype.getType());
        store[entity] = undefined;
    }

    removeComponents<T extends Component>(entity: number, componentTypes: { prototype: T }[]): void {
        for (var i = 0; i < componentTypes.length; i++) {
            this.removeComponent(entity, componentTypes[i]);
        }
    }

    destroyEntity(entity: number): void {
        //TODO: Make it synchronous
        var index = this._entityStore.indexOf(entity);
        if (index == -1) {
            return;
        }
        this._entityStore.splice(index, 1);
        if (entity == this._lowestUnassignedEntityID)
            this._lowestUnassignedEntityID--;
        for (var componentType in this._componentStore) {
            this._componentStore[componentType][entity] = undefined;
        }
    }

    destroyEntities(entities: number[]) {
        for (var i = 0; i < entities.length; i++) {
            this.destroyEntity(entities[i]);
        }
    }

    setEntityName(entity: number, name: string): void {
        this._entityHumanReadableNames[entity] = name;
    }

    nameFor(entity: number): string {
        return this._entityHumanReadableNames[entity];
    }
}

export = EntityManager;