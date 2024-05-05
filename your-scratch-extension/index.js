const BlockType = require("../../extension-support/block-type")
const ArgumentType = require("../../extension-support/argument-type")
const TargetType = require("../../extension-support/target-type")

class Scratch3YourExtension {
  constructor(runtime) {
    this.runtime = runtime
    this.client = null
    this.latestMessages = {}
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
      blockIconURI:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==",
      menuIconURI:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==",

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
          opcode: "getLatestMessage",
          blockType: BlockType.REPORTER,
          text: "Get latest message from topic [topic]",
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
        this.client = mqtt.connect("wss://test.mosquitto.org:8081/mqtts")
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
          this.latestMessages[topic] = message.toString()
        })
      }
      script.onerror = (error) => {
        console.error("Something went wrong while loading MQTT library:", error)
        reject(error)
      }

      document.head.appendChild(script)
    })
  }

  subscribeToTopic({ topic }) {
    if (!this.client) {
      console.error(
        "MQTT client is not initialized. Please connect to MQTT broker first."
      )
      return
    }
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error("Error subscribing to topic:", err)
      } else {
        console.log(`Subscribed to topic: ${topic}`)
      }
    })
  }

  sendMessage({ topic, message }) {
    if (!this.client) {
      console.error(
        "MQTT client is not initialized. Please connect to MQTT broker first."
      )
      return
    }
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error("Error publishing message:", err)
      } else {
        console.log(`Message published to topic: ${topic}`)
      }
    })
  }

  getLatestMessage({ topic }) {
    return this.latestMessages[topic] || ""
  }
}

module.exports = Scratch3YourExtension
