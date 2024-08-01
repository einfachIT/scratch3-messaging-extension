const BlockType = require("../../extension-support/block-type")
const ArgumentType = require("../../extension-support/argument-type")
const TargetType = require("../../extension-support/target-type")

class Node {
  constructor(data) {
     this.data = data;
 }
}

class Queue {
  constructor() {
     this.elements = [];
  }
  
  enqueue(item) {
     this.elements.push(item);
  }

  dequeue() {
     if(this.elements.length > 0) { 
         return this.elements.shift();
     } else {
         return 'Underflow situation';
     }
  }
  isEmpty() {
     return this.elements.length == 0;
  }
  
  front() {
     if(this.elements.length > 0) {
         return this.elements[0];
     } else {
         return "The Queue is empty!";
     }
  }
  
  print() {
     return this.elements;
  }
}



// class TopicQueue {
//   constructor() {
//     this.queues = []
//   }

//   enqueue(item) {
//     this.queues.push(item);
//   }

//   dequeue(topic) {
//     const index = this.queues.findIndex(item => item.topic === topic);
//     if (index !== -1) {
//       const removedItem = this.queues.splice(index, 1)[0];
//       return removedItem.message;
//     } else {
//       return 'Item not found';
//     }
//   }

//   isEmpty(topic) {
//     const queue = this.queues[topic];
//     return !queue || queue.length === 0;
//   }
// }
// const topicQueue = new TopicQueue();
const queue = new Queue();

class Scratch3YourExtension {
  constructor(runtime) {
    this.runtime = runtime
    this.client = null
    this.latestMessages = {}
    this.returnMessage = null
  }

  /**
   * Returns the metadata about your extension.
   */
  getInfo() {
    return {
      // unique ID for your extension
      id: "mqtt",
      
      // name that will be displayed in the Scratch UI
      name: "MQTT Extension",

      // colours to use for your extension blocks
      color1: "#000099",
      color2: "#660066",

      // icons to display
      // blockIconURI:
      //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==",
     
      // your Scratch blocks
      blocks: [
        {
          opcode: "connectToBroker",
          blockType: BlockType.COMMAND,
          text: "Connect to MQTT Broker",
        },
        {
          opcode: "subscribeToTopic",
          blockType: BlockType.COMMAND,
          text: "Subscribe to topic [topic]",
          arguments: {
            topic: {
              type: ArgumentType.STRING,
              defaultValue: "test/topic",
            },
          },
        },
        {
          opcode: "sendMessage",
          blockType: BlockType.COMMAND,
          text: "Send message [message] to topic [topic]",
          arguments: {
            topic: {
              type: ArgumentType.STRING,
              defaultValue: "test/topic",
            },
            message: {
              type: ArgumentType.STRING,
              defaultValue: "Hello, MQTT!",
            },
          },
        },
        {
          opcode: "newMessage",
          blockType: BlockType.HAT,
          text: "New Message from [topic]",
          arguments: {
            topic: {
              type: ArgumentType.STRING,
              defaultValue: "test/topic",
            },
          },
        },
        {
          opcode: "getLatestMessage",
          blockType: BlockType.REPORTER,
          text: "Message from [topic]",
          arguments: {
            topic: {
              type: ArgumentType.STRING,
              defaultValue: "test/topic",
            },
          },
        },
      ],
    }
  }

  connectToBroker() {
    return new Promise((resolve, reject) => {
      const url =
        "https://cdnjs.cloudflare.com/ajax/libs/mqtt/5.3.6/mqtt.min.js"
      const script = document.createElement("script")
      script.src = url
      script.onload = () => {
        // Check if the library properly exposes functionality
        if (typeof mqtt === "undefined" || typeof mqtt.connect !== "function") {
          reject(new Error("MQTT library not properly loaded from CDN"))
          return
        }

        // Initialize the MQTT client
        // this.client = mqtt.connect("wss://test.mosquitto.org:8081/mqtts")
        this.client = mqtt.connect("http://localhost:1883")
        // Event handlers for MQTT client
        this.client.on("connect", () => {
          console.log("Connected to MQTT broker")
          resolve()
        })
        this.client.on("error", (error) => {
          console.error("MQTT connection error:", error)
          reject(error)
        })
      
      this.client.on("message", (topic, message) => {
        // Store the latest message for the topic
          // this.latestMessages[topic] = message.toString();
          queue.enqueue({[topic]: message.toString()});
          // topicQueue.enqueue({ topic: topic, message: message.toString() });
          console.log(queue.elements)
      })
      script.onerror = (error) => {
        console.error("Something went wrong while loading MQTT library:", error)
        reject(error)
      }
    }
      document.head.appendChild(script)
    })
  }

  subscribeToTopic({ topic }) {
    if (!this.client) {
      console.log(
        "MQTT client is not initialized. Please connect to MQTT broker first."
      )
      return
    }
    this.client.subscribe(topic,{ qos: 1 }, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Subscribed to topic: ${topic}`)
      }
    })
  }


  sendMessage({ topic, message }) {
    if (!this.client) {
      console.log(
        "MQTT client is not initialized. Please connect to MQTT broker first."
      )
      return
      
    }
    this.client.publish(topic, message, { qos: 1 }, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`${message} is published to topic: ${topic} from Publish call`)
        console.log(queue.elements[0])
      }
    })
  }
 
    
  newMessage({topic}){
    // return this.latestMessages[topic] || ""

       if(this.returnMessage){
        return this.returnMessage[topic]
       }else{
        return 'no return message'
       }
    // return queue.dequeue();
}

  getLatestMessage({ topic }) {
    // return this.latestMessages[topic] || ""
    this.returnMessage = queue.dequeue()
    // console.log(this.elements[0])
    // return this.elements[0].topic || ""
    return this.returnMessage[topic] || ""
  }
}

module.exports = Scratch3YourExtension
