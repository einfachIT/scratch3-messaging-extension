# Scratch 3 with Custom Extension Installation Guide (Raspberry Pi)

## Introduction

This guide outlines the steps to install Scratch 3 on your Raspberry Pi and integrate a custom extension for enhanced functionality. The custom extension you'll be using focuses on **Hello World** Extension (replace with the actual extension's purpose if different).

## Prerequisites

1. **Raspberry Pi with Raspbian OS installed**
2. **Basic understanding of command-line interface (CLI) usage**

## Installation Steps

### 1. Create a Workspace Directory

Open a terminal and run the following commands:

```bash
mkdir scratch3
```
```bash
cd scratch3
```

### 2. Clone Scratch Repositories
Clone the Scratch GUI and VM repositories:

```bash
git clone https://github.com/llk/scratch-gui
```
```bash
git clone https://github.com/llk/scratch-vm
```

### 3. Install Dependencies
- Navigate to the scratch-vm directory, install dependencies, and link the VM:
```bash
cd scratch-vm
npm install
npm link
```

- Navigate to the scratch-gui directory, install dependencies, and link scratch-vm:
```bash
cd ../scratch-gui
npm install
npm link scratch-vm
```
## Custom Extension Implementation (Scratch-vm)
### 1. Create a folder (scratch3_helloworld)
- Navigate to the `scratch-vm/src/extensions` directory and make a folder (scratch3_helloworld)
  
```bash
cd ../scratch-vm/src/extensions
mkdir scratch3_helloworld
```

### 2. Download Extension Code
  Navigate to the new created directory `scratch3_helloworld` and download the custom extension index.js file
```bash
cd scratch3_helloword
curl -O -L https://github.com/einfachIT/scratch3-messaging-extension/blob/hello-world-extension/your-scratch-extension/index.js
```

### 3. Update Extension Manager
In `scratch-vm/src/extension-support` directory, add your custom extension to the builtinExtensions object in `extension-manager.js` file
Add the following line:
```javascript
helloworld: () => require('../extensions/scratch3_helloworld'),
```

## Create Custom Extension UI Files (scratch-gui)

### 1. Create a new directory
Create a new directory by the name of `helloworld` within `scratch-gui/src/lib/libraries/extensions`.

### 2. Add Icons for the Extension
Place your extension's icon images (.png and .svg) inside the newly created directory `helloworld` in `scratch-gui/src/lib/libraries/extensions`.

- helloworld.png
- helloworld-small.svg

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
## Start Scratch
Navigate to the `scratch-gui` and run the following command
```bash
npm start
```


