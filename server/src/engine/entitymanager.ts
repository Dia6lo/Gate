class EntityManager {
    private lowestUnassignedEntityID: number;
    private entityStore: number[];
    private entityHumanReadableNames: { [entity: number]: string };
    private componentStore: { [name: string]: { [entity: number]: Component } };

    constructor() {
        this.lowestUnassignedEntityID = 1;
        this.entityStore = [];
        this.componentStore = {};
        this.entityHumanReadableNames = [];
    }

    generateNewEntityID(): number {
        //TODO: Make it synchronous
        {
            if (this.lowestUnassignedEntityID < Number.MAX_VALUE) {
                return this.lowestUnassignedEntityID++;
            }
            else {
                for (var i = 1; i < Number.MAX_VALUE; i++) {
                    if (this.entityStore.indexOf(i) != -1)
                        return i;
                }
                throw new Error("ERROR: no available Entity IDs; too many entities!");
            }
        }
    }

    createEntity(name?: string): number {
        var entity = this.generateNewEntityID();
        if (entity < 1) {
            return 0; //And I'm like "WTF?"
        }
        else {
            this.entityStore.push(entity);
            if (name)
                this.entityHumanReadableNames[entity] = name;
            return entity;
        }
    }

    addComponent(entity: number, component: Component): void {
        var store = this.componentStore[component.getType()];
        if (store == undefined) {
            store = {};
            this.componentStore[component.getType()] = store;
        }
        store[entity] = component;
    }

    addComponents(entity: number, components: Component[]): void {
        for (var i = 0; i < components.length; i++) {
            this.addComponent(entity, components[i]);
        }
    }

    hasComponent<T extends Component>(entity: number, componentType: { prototype: T}) {
        var store = this.componentStore[componentType.prototype.getType()];
        if (store == undefined)
            return false;
        else
            return store[entity] != undefined;
    }

    getComponent<T extends Component>(entity: number, componentType: { prototype: T}): T {
        var store = this.componentStore[componentType.prototype.getType()];
        if (store == undefined)
            throw new Error("GET FAIL: there are no entities with a Component of class: " + componentType.prototype.getType());
        var result: T = <T> store[entity];
        if (result == undefined)
            throw new Error("GET FAIL: " + this.nameFor(entity) + " does not possess Component of class\n missing: " + componentType.prototype.getType());
        return result;
    }

getAllComponentsOfType<T extends Component>(componentType:{ prototype: T }): T[] {
        var store = this.componentStore[componentType.prototype.getType()];
        var result = [];
        if (store != undefined)
            for (var entity in store)
                result.push(store[entity]);
        return result;
    }

getAllEntitiesPossessingComponent<T extends Component>(componentType: { prototype: T }): number[] {
        var store = this.componentStore[componentType.prototype.getType()];
        var result = [];
        if (store != undefined)
            for (var entity in store)
                result.push(entity);
        return result;
    }

    getAllComponentsOnEntity<T extends Component>(entity: number): T[] {
        var components: T[] = [];
        for (var componentType in this.componentStore) {
            var component = this.componentStore[componentType][entity];
            if (component == undefined)
                continue;
            components.push(<T>component);
        }
        return components;
    }

    removeComponent<T extends Component>(entity: number, componentType: { prototype: T }): void {
        var store = this.componentStore[componentType.prototype.getType()];
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
        var index = this.entityStore.indexOf(entity);
        if (index == -1) {
            return;
        }
        this.entityStore.splice(index, 1);
        if (entity == this.lowestUnassignedEntityID)
            this.lowestUnassignedEntityID--;
        for (var componentType in this.componentStore) {
            this.componentStore[componentType][entity] = undefined;
        }
    }

    destroyEntities(entities: number[]) {
        for (var i = 0; i < entities.length; i++) {
            this.destroyEntity(entities[i]);
        }
    }

    setEntityName(entity: number, name: string): void {
        this.entityHumanReadableNames[entity] = name;
    }

    nameFor(entity: number): string {
        return this.entityHumanReadableNames[entity];
    }
}

export = EntityManager;