//Not sure if this is a good way to init components
class ComponentFactory {

    static newPlayer(name: string): Player {
        return {
            componentName: "Player",
            name: name
        }
    }

    static newRender(type: string): Render {
        return {
            componentName: "Render",
            type: type
        }
    }

    static newShape(volume: number): Shape {
        return {
            componentName: "Shape",
            volume: volume
        }
    }

    static newTransform(position: Vector2): Transform {
        return {
            componentName: "Transform",
            position: position
        }
    }
}

export = ComponentFactory;