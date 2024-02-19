class helloWorld {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "Hello",
            "name": "Hello",
            color1: '#000000',
            color2: '#fc0303',
            "blocks": [
                   {
                        "opcode": "sayHelloWorld",
                        "blockType": "reporter",
                        "text": "Say [hello] to the [world]",
                        "arguments": {
                            "hello": {
                                "type": "string",
                                "defaultValue": "Hello"
                            },
                            "world": {
                                "type": "string",
                                "defaultValue": "World"
                            },
                        }
                    },
                ],
        };
    }
    sayHelloWorld ({hello, world}) {
        // example implementation to return a string
        return hello + ' ' + world;
    }
}

Scratch.extensions.register(new helloWorld())
