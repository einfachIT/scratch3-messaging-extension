# Scratch 3 with Custom Extension Installation Guide (Raspberry Pi)

## Introduction

This guide outlines the steps to install Scratch 3 on your Raspberry Pi and integrate a custom extension for enhanced functionality. The custom extension you'll be using focuses on **Hello World** Extension (replace with the actual extension's purpose if different).

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
### 1. Create a Directory (scratch3_helloworld)
- Navigate to the `scratch-vm/src/extensions` directory and create a directory (scratch3_helloworld)
  
```bash
cd ../scratch-vm/src/extensions
mkdir scratch3_helloworld
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/509ec20a-9b88-4fb4-9197-4e9679946432)

### 2. Download Extension Code
  Navigate to the new created directory `scratch3_helloworld` and download the custom extension index.js file
```bash
cd scratch3_helloword
curl -O -L https://github.com/einfachIT/scratch3-messaging-extension/blob/hello-world-extension/your-scratch-extension/index.js
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/49470260-29ec-4208-b312-a0b9588f2796)


### 3. Update Extension Manager
In `scratch-vm/src/extension-support` directory, add your custom extension to the builtinExtensions object in `extension-manager.js` file
Add the following line:
```javascript
helloworld: () => require('../extensions/scratch3_helloworld'),
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/2f1387f8-9493-4e23-92ce-cd2fcc128d65)

## Create Custom Extension UI Files (scratch-gui)

### 1. Create a new directory
Create a new directory by the name of `helloworld` within `scratch-gui/src/lib/libraries/extensions`.

### 2. Add Icons for the Extension
Place your extension's icon images (.png and .svg) inside the newly created directory `helloworld` in `scratch-gui/src/lib/libraries/extensions`.
  
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/294d6d90-3b8f-413b-9b7a-f0ce704e98e0)

### 3. Update Extension List
In `scratch-gui/src/lib/libraries/extensions/index.jsx`, import your extension's icon URLs and add it to the registeredExtensions array:

```javascript
import helloworldIconURL from "./helloworld/helloworld.png"
import helloworldInsetIconURL from "./helloworld/helloworld-small.svg"

export default = [
  // ... other extensions
  {
    name: (
      <FormattedMessage
        defaultMessage="helloworld" // Replace with your extension's name
        description="Name for the 'helloworld' extension"
        id="gui.extension.helloworld.name"
      />
    ),
    extensionId: "helloworld",
    iconURL: helloworldIconURL,
    insetIconURL: helloworldInsetIconURL,
    description: (
      <FormattedMessage
        defaultMessage="helloworld extension" // Replace with your extension's description
        id="gui.extension.helloworld.description"
      />
    ),
    featured: true,
  },
];
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/8f365e0e-0135-41ce-aca2-d84535834b4b)


## Start Scratch
Navigate to the `scratch-gui` and run the following command
```bash
npm start
```
go the browser and run the following URL \
`http://localhost:8602/`

