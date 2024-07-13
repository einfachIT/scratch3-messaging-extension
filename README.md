
# Scratch 3 with Custom Extension Installation Guide (Raspberry Pi)

## Introduction

This guide outlines the steps to install Scratch 3 on your Raspberry Pi and integrate a custom extension for enhanced functionality. The custom extension you'll be using focuses on **MQTT** Extension.

## Prerequisites

1. **Raspberry Pi with Raspbian OS installed**
2. **Basic understanding of command-line interface (CLI) usage**
3. **Node.js and npm installed**
   - We strongly recommend using a Node version manager like nvm to install Node.js and npm.
   - To install or update nvm, you should run the following command
   
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
``` 

   - To install Node , you should run the the following command
    
```bash
nvm install 14
```

## Installation Steps

### 1. Create a Workspace Directory

Open a terminal and run the following commands:

```bash
mkdir scratch3
```
```bash
cd scratch3
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/b092232b-3888-4444-9aba-06694badb804)


### 2. Clone Scratch Repositories
Clone the Scratch GUI and VM repositories:

```bash
git clone https://github.com/llk/scratch-gui
git clone https://github.com/llk/scratch-vm
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/23d5ebb1-352c-497d-94ad-61b482c79c55)
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/bf0608b5-aac2-4a6f-98fb-653aafbd5a09)

### 3. Install Dependencies
- Navigate to the scratch-vm directory and install dependencies:

```bash
cd scratch-vm
npm install
npm link
```

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/fd8b3406-0f0c-483c-b7e7-c265a318257e)

- Navigate to the scratch-gui directory, install dependencies, and link scratch-vm:
  
```bash
cd ../scratch-gui
npm install
npm link scratch-vm
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/4996430d-d436-44a2-abda-3f969d222eef)


## Custom Extension Implementation (Scratch-vm)
### 1. Create a Directory (scratch3_mqtt)
- Navigate to the `scratch-vm/src/extensions` directory and create a directory (scratch3_mqtt)
  
```bash
cd ../scratch-vm/src/extensions
mkdir scratch3_mqtt
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/b4acf3a5-d063-42ca-b432-5575e547e4ed)

### 2. Download Extension Code
  Navigate to the new created directory `scratch3_mqtt` and download the custom extension index.js file
```bash
cd scratch3_mqtt
curl -O -L https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/master/mqtt-extension/index.js
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/49470260-29ec-4208-b312-a0b9588f2796)


### 3. Update Extension Manager
Open `scratch3` folder in the `home/[username]` \
goto `scratch-vm/src/extension-support` \
open  `extension-manager.js` file \
![image](https://github.com/user-attachments/assets/07811fcb-6dcb-483a-9c12-19f42f9b05f4)

and add Add the following line to the builtinExtensions object like other extensions \

```javascript
mqtt: () => require('../extensions/scratch3_mqtt'),
```
after adding the above line save it with `ctrl+s`
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/e95cd467-c31b-4b54-bb5a-5fe91cd967db)


## Create Custom Extension UI Files (scratch-gui)

### 1. Create a new directory
Create a new directory by the name of `mqtt` within `scratch-gui/src/lib/libraries/extensions`.

```bash
cd ../../../../scratch-gui/src/lib/libraries/extensions
mkdir mqtt
cd mqtt
```

### 2. Donwload and Add Icons for the Extension
Place your extension's icon images (.png and .svg) inside the newly created directory `mqtt` in `scratch-gui/src/lib/libraries/extensions`.
```bash
curl -O -L https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/master/mqtt.png
```
```bash
curl -O -L https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/master/mqtt-small.svg
```
  
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/aead260e-cd13-4bf1-8aa9-4fa161b4e796)


### 3. Update Extension List
In `scratch-gui/src/lib/libraries/extensions/index.jsx`, import your extension's icon URLs and add it to the registeredExtensions array:

```javascript
import mqttIconURL from "./mqtt/mqtt.png"
import mqttInsetIconURL from "./mqtt/mqtt-small.svg"

export default = [
  // ... other extensions
  {
    name: (
      <FormattedMessage
        defaultMessage="mqtt" // Replace with your extension's name
        description="Name for the 'mqtt' extension"
        id="gui.extension.mqtt.name"
      />
    ),
    extensionId: "mqtt",
    iconURL: mqttIconURL,
    insetIconURL: mqttInsetIconURL,
    description: (
      <FormattedMessage
        defaultMessage="mqtt extension"
        id="gui.extension.mqtt.description"
      />
    ),
    featured: true,
  },
];
```

## Start Scratch
Navigate to the `scratch-gui` and run the following command
```bash
npm start
```
go the browser and run the following URL \
`http://localhost:8602/`

