import Component = require("./components/interface");
import Movement = require("./components/movement");
import Position = require("./components/position");

class Entity {
	id: number;
	sprite: string;
	components:{ [name: string]: Component; };
	constructor(id: number, sprite: string, x: number, y: number, movementSystem) {
		this.components = {};
		this.id = id;
		this.sprite = sprite;
		this.addComponent(new Position(x, y));
		this.addComponent(new Movement(movementSystem));
	}

	hasComponent(name: string): boolean {
		return (this.components[name] !== undefined);
	}

	getComponent(name: string): Component {
		return this.components[name];
	}

	addComponent(component: Component): void {
		this.components[component.name] = component;
	}

	removeComponent(component: Component): void {
		this.components[component.name] = undefined;
	}
}

export = Entity;