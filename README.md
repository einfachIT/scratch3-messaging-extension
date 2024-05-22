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
## Custom Extension Implementation
### 1. Implement Custom Extension
- Navigate to the **scratch-vm/src/extensions** directory and make a folder (scratch3_helloworld)
  
```bash
cd ../scratch-vm/src/extensions
mkdir scratch3_helloworld
```

- Download Extension Code:
  Navigate to the new created folder (scratch3_helloworld) and download or place the custom extension index.js file
```bash
cd scratch3_helloword
curl -O -L https://github.com/einfachIT/scratch3-messaging-extension/blob/hello-world-extension/your-scratch-extension/index.js
```


