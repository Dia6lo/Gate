class Entity implements IEntity {
	id: number;
	type: string;
	components:{ [name: string]: Component; };
	constructor(id: number, type: string) {
		this.components = {};
	}

	hasComponent(name: string): boolean {
		return (this.components[name] !== undefined);
	}

    getComponent<T extends Component>(a: T): T {
		return <T> this.components[a.getName()];
	}

	addComponent(component: Component): void {
		this.components[component.getName()] = component;
	}

	removeComponent(component: Component): void {
		this.components[component.getName()] = undefined;
	}
}

export = Entity;