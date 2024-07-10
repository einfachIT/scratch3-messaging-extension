---

## Launch codespaces

Click on **Code** -> **Codespaces** -> **Create codespace**

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/89e457e3-c9bc-4a52-b4e4-fd8c93b61c0f)

It can take a minute or two to set up your codespace.

Your codespace is ready for use.

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/63959f1d-a7c1-42ee-8c86-8b0ce7d88350)

---

## Set up your repository

In the terminal at the bottom of the window, run:
```sh
./0-setup.sh
```

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/e2b7cd60-3ca9-4264-9f89-056f3bb019bc)


This should be very quick.

You only need to do this once (but it is safe if you run it again).

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/605f9eea-bea7-4dc8-ad36-767606e6e8f7)

---

## Launch a private test of MQTT extension

In the terminal at the bottom of the window, run:
```sh
./2-build.sh
```

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/af43a9e6-8093-4955-b098-c111a63e0b6b)


This can take a minute to run. Wait for this to complete.

In the terminal at the bottom of the window, run:
```sh
./3-run-private.sh
```

![screenshot](./docs/52-run.png)

A pop-up should appear in the bottom-right with a button to open a private window with your modified version of Scratch.

![screenshot](./docs/53-running.png)

If it doesn't appear, or you accidentally dismiss it, you can get the link from the **Open in browser** button on the **Ports** tab.

![screenshot](./docs/54-open-in-browser.png)

Either way, click on **Open in browser**.

![screenshot](./docs/55-private-scratch.png)

This is a private copy of Scratch that only you can access. You can use this to test your new extension.

Click on the **Extensions** button.

![screenshot](./docs/55-extensions-button.png)

You should see your extension added to the menu. Click on it.

![screenshot](./docs/55-extensions-menu.png)

Make a simple Scratch project using your extension.

![screenshot](./docs/56-testing.png)

If you need to make a change, stop your Scratch test by pressing **Control-C** in the terminal.

Make your code changes.

Then re-build and test again by typing:
```sh
./2-build.sh
./3-run-private.sh
```

Once you have finished, stop your Scratch test by pressing **Control-C** in the terminal.

![screenshot](./docs/57-stop-test.png)

---



# Scratch 3 with Custom Extension Installation Guide (Raspberry Pi)

## Introduction

This guide outlines the steps to install Scratch 3 on your Raspberry Pi and integrate a custom extension for enhanced functionality. The custom extension you'll be using focuses on **MQTT** Extension.

## Prerequisites

1. **Raspberry Pi with Raspbian OS installed**
2. **Basic understanding of command-line interface (CLI) usage**
3. **npm (Node Package Manager) installed**
    - you can install **npm** by the following command
 ```bash
sudo apt install npm
```
**Note:** If first try doesn't work please try again.

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
```

```bash
git clone https://github.com/llk/scratch-vm
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/23d5ebb1-352c-497d-94ad-61b482c79c55)
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/bf0608b5-aac2-4a6f-98fb-653aafbd5a09)

### 3. Install Dependencies
- Navigate to the scratch-vm directory and install dependencies:
- npm link need root privileges. please run this with **sudo**.
```bash
cd scratch-vm
npm install
sudo npm link
```

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/fd8b3406-0f0c-483c-b7e7-c265a318257e)

- Navigate to the scratch-gui directory, install dependencies, and link scratch-vm:
- npm link need root privileges. please run this with **sudo**.
  
```bash
cd ../scratch-gui
npm install
sudo npm link scratch-vm
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
In `scratch-vm/src/extension-support` directory, add your custom extension to the builtinExtensions object in `extension-manager.js` file
Add the following line:
```javascript
mqtt: () => require('../extensions/scratch3_mqtt'),
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/e95cd467-c31b-4b54-bb5a-5fe91cd967db)


## Create Custom Extension UI Files (scratch-gui)

### 1. Create a new directory
Create a new directory by the name of `mqtt` within `scratch-gui/src/lib/libraries/extensions`.

### 2. Donwload and Add Icons for the Extension
```bash
curl -O -L https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/master/mqtt.png
```
```bash
curl -O -L https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/master/mqtt-small.svg
```

Place your extension's icon images (.png and .svg) inside the newly created directory `mqtt` in `scratch-gui/src/lib/libraries/extensions`.
  
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

