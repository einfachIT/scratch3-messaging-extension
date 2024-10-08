# Table of Contents
1. [Installing and Configuring Mosquitto MQTT broker server locally in the Raspberry Pi](#Mosquitto)
   1. [Installation of mosquitto and mosquitto-clients](#mosquitto-clients)
   2. [Configure Mosquitto to listen `localhost` in port `8883`](#localhost)
3. [Installing Uncomplicated Firewall UFW](#UFW)
4. [Scratch 3 with Custom Extension Installation Guide (Raspberry Pi)](#Scratch-3-with-Custom-Extension-Installation-Guide)
   1. [Introduction](#Introduction)
   2. [Prerequisites](#Prerequisites)
   3. [Create a Workspace Directory](#Create-a-Workspace-Directory)
   4. [Clone Scratch Repositories](#Clone-Scratch-Repositories)
   5. [Install Dependencies](#installdependencies)
   6. [Custom Extension Implementation (Scratch-vm)](#implemntionScratch-vm)
         1. [Create a Directory (scratch3_mqtt)](#dirscratch3_mqtt)
         2. [Download Extension Code](#DownloadExtensionCode)
         3. [Update Extension Manager](#UpdateExtensionManager)
   7. [Custom Extension Implementation (scratch-gui)](#scratch-gui)
         1. [Create a new directory (mqtt)](#mqtt)
         2. [Donwload and Add Icons for the Extension](#icon)
         3. [Update Extension List](#extensionlist)
   8. [Start Scratch](#StartScratch)
5. [How to Use MQTT Extension](#HowtoUseMQTTExtension)
   1. [Overview](#Overview)
   2. [Load the Extension](#LoadtheExtension)
   3. [Using MQTT Blocks](#UsingMQTTBlocks)





<a id="Scratch-3-with-Custom-Extension-Installation-Guide"> </a>
# Scratch 3 with Custom Extension Installation Guide (Raspberry Pi) 

<a id="Introduction"></a>
## Introduction

This guide outlines the steps to install Scratch 3 on your Raspberry Pi and integrate a custom extension for enhanced functionality. The custom extension you'll be using focuses on **MQTT** Extension.

<a id="Prerequisites"></a>
## Prerequisites

1. **Raspberry Pi with Raspbian OS installed**
2. **Basic understanding of command-line interface (CLI) usage**
3. **Node.js and npm installed**
   - We strongly recommend using a Node version manager like nvm to install Node.js and npm.
   - To install or update nvm, you should run the following command \
   
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

After that, the installer will clone the nvm repository into ~/.nvm/ directory and you should add some lines below at the end of ~/.bashrc file to load nvm.\
run the following command in the terminal.
```bash
export NVM_DIR="$HOME/.nvm"
# This loads nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# This loads nvm bash_completion
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

**Note : Close the shell and open a new shell here, otherwise you get command not found.**

   - To install Node, you should run the the following commands
   - open new shell (terminal)
    
```bash
nvm install node
```


 - To install NPM, you should run the the following commands
```bash
nvm install --latest-npm
```

<a id="Create-a-Workspace-Directory"></a>
## Create a Workspace Directory

Open a terminal and run the following commands:

```bash
mkdir scratch3
```
```bash
cd scratch3
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/b092232b-3888-4444-9aba-06694badb804)

<a id="Clone-Scratch-Repositories"></a>
## Clone Scratch Repositories
Clone the Scratch GUI and VM repositories:

```bash
git clone --filter=tree:0 https://github.com/llk/scratch-gui
git clone --filter=tree:0 https://github.com/llk/scratch-vm
```

<a id="installdependencies"></a>
## Install Dependencies 
- Navigate to the scratch-vm directory and install dependencies:

```bash
cd scratch-vm
npm install
```

  - Install Link dependency
```bash
npm link
```

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/fd8b3406-0f0c-483c-b7e7-c265a318257e)

- Navigate to the scratch-gui directory, install dependencies, and link scratch-vm:
  
```bash
cd ../scratch-gui
npm install
```

  - Install Link dependency with scratch-vm
```bash
npm link scratch-vm
```

![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/4996430d-d436-44a2-abda-3f969d222eef)

<a id="implemntionScratch-vm"></a>
## Custom Extension Implementation (Scratch-vm)

<a id="dirscratch3_mqtt"></a>
### Create a Directory (scratch3_mqtt)
- Navigate to the `scratch-vm/src/extensions` directory and create a directory (scratch3_mqtt)
  
```bash
cd ../scratch-vm/src/extensions
mkdir scratch3_mqtt
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/b4acf3a5-d063-42ca-b432-5575e547e4ed)

<a id="DownloadExtensionCode"></a>
### Download Extension Code
  Navigate to the new created directory `scratch3_mqtt` and download the custom extension index.js file
  
```bash
cd scratch3_mqtt
curl -H "Authorization: token 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" -L "https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/master/your-scratch-extension/index.js" -o index.js
```
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/49470260-29ec-4208-b312-a0b9588f2796)

<a id="UpdateExtensionManager"></a>
### Update Extension Manager
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

<a id="scratch-gui"></a>
## Custom Extension Implementation (scratch-gui)

<a id="mqtt"></a>
### Create a new directory (mqtt)
Create a new directory by the name of `mqtt` within `scratch-gui/src/lib/libraries/extensions`.

```bash
cd scratch3/scratch-gui/src/lib/libraries/extensions
mkdir mqtt
cd mqtt
```
<a id="icon"></a>
### Donwload and Add Icons for the Extension
Place your extension's icon images (.png and .svg) inside the newly created directory `mqtt` in `scratch-gui/src/lib/libraries/extensions`.
```bash
curl -H "Authorization: token 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" -L "https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/mqtt_extension_v1/mqtt.png" -o mqtt.png
```
```bash
curl -H "Authorization: token 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" -L "https://raw.githubusercontent.com/einfachIT/scratch3-messaging-extension/master/mqtt-small.svg" -o mqtt-small.svg
```
  
![image](https://github.com/einfachIT/scratch3-messaging-extension/assets/70327713/aead260e-cd13-4bf1-8aa9-4fa161b4e796)

<a id="extensionlist"></a>
### Update Extension List
Goto  `scratch3` folder in the `home/[username]` using file explorer \
open `index.jsx` file in `scratch-gui/src/lib/libraries/extensions/'

import your extension's icon URLs and add it to the registeredExtensions array:

add the following lines in the index.jsx file after react where other icons are imported.
```javascript
import mqttIconURL from "./mqtt/mqtt.png";
import mqttInsetIconURL from "./mqtt/mqtt-small.svg";
```
![image](https://github.com/user-attachments/assets/8b3635ce-68c8-478e-96d4-76321a456f25)

 add the following lines to the export default array

find **export default = [ paste it here ]** 

```javascript
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
```
Save the file with **CTRL + S**

![image](https://github.com/user-attachments/assets/9b8cb56a-3b3d-48fa-b966-4da33f54a614)


<a id="StartScratch"></a>

<a id="Mosquitto"></a>
# Installing and Configuring Mosquitto MQTT broker server locally in the (Raspberry Pi)

<a id="mosquitto-clients"></a>
   ## Installation of mosquitto 
   - we need to install mosquitto MQTT broker server locally in the (Raspberry Pi) \
         run the following command in the terminal and hit Enter
   ```bash    
       sudo apt-get install -y mosquitto
   ```
    
   <a id="localhost"></a>
   ## Configure Mosquitto to listen `localhost` in port `8883`
      
   - After installing Mosquitto and  mosquitto-clients, you need to configure it to use in our mqtt extension. The location of the `mosquitto.conf` file is: 
      `/etc/mosquitto/mosquitto.conf`
           
   - Now open mosquitto.conf file with the following command:

   ```bash
   sudo nano /etc/mosquitto/mosquitto.conf 
   ```
   - Add the following code to the end of mosquitto.conf file

   ```bash
   listener 1883
   listener 8883
   protocol websockets
   allow_anonymous true
   ```
   ![image](https://github.com/user-attachments/assets/1b39cd90-9ad9-45df-9e5d-0aaa19757005)

   - after adding the above code press `CTRL + X` \
       and then press `Y` key from keyboard 
       and then press `Enter` key to save the changes.

   - load the configuration file you just created. Insert the following command into the terminal and click Enter:

   ```bash
   sudo mosquitto -c /etc/mosquitto/mosquitto.conf
   ```

   - now the broker server will listen to the `htpp://localhost:8883/` which is configured in the mqtt extension code.


## Start Scratch
Navigate to the `scratch-gui` and run the following command

```bash
cd ../../../../../
```

```bash
npm start
```
go the browser and run the following URL \

```bash
http://localhost:8601/
```

<a id="HowtoUseMQTTExtension"></a>
# How to Use MQTT Extension

 <a id="Overview"></a>
## Overview

   The MQTT Extension for Scratch 3 allows you to connect, subscribe, and publish messages to an MQTT broker. This guide will help you get started with using the extension in your Scratch projects.

<a id="Load the Extension"></a>
    
## Load the Extension:
   - In the Scratch interface, click on the "Extensions" button (a puzzle piece icon at the bottom left).
     
     ![image](https://github.com/user-attachments/assets/bd32e64e-ea02-4449-9bd6-c66f247b5bd0)

   - Your custom MQTT extension should appear in the list of available extensions. Click on it to load the extension into your project.
     
     ![image](https://github.com/user-attachments/assets/4aa9ee5c-2042-44b3-bbe6-8cacd7423f84)

   - You will have a blocks in your project
     
      ![image](https://github.com/user-attachments/assets/df12b488-e128-43d3-b0c2-1847f5fd8346)



<a id="UsingMQTTBlocks"></a>
## Using MQTT Blocks:
   
   - **Connect to MQTT Broker:**
      - Drag the "Connect to MQTT Broker" block into your scripts area. Use this block to establish a connection to the MQTT broker.
        ![image](https://github.com/user-attachments/assets/1cd5449b-a44a-45ac-87c7-71d85db3011f)

        
   - **Subscribe to a Topic:**
      - Drag the "Subscribe to topic [topic]" block into your scripts area. Replace [topic] with the topic you want to subscribe to.
        
         ![image](https://github.com/user-attachments/assets/b92f6f28-ddfd-4e94-a435-74cf429ba8e8)

   - **Send a Message:**
      - Drag the "Send message [message] to topic [topic]" block into your scripts area. Replace [message] with the message you want to send and [topic] with the target topic.

        ![image](https://github.com/user-attachments/assets/23d9d1f6-1ce9-46bf-9dd5-f6db2070318b)


   - **New Message Event:**
      - Use the "New Message from [topic]" block as a hat block to trigger scripts when a new message is received on the specified topic.

        ![image](https://github.com/user-attachments/assets/7eee9738-0794-456a-876f-0267c2a593d7)

 
   - **Get Latest Message:**
      - Drag the "Message from [topic]" block into your scripts area. This reporter block returns the latest message received from the specified topic.
        
        ![image](https://github.com/user-attachments/assets/e709ac36-3d8c-4d9b-ae07-fb0bd4083087)


 ##  Here’s a simple an example of how you can use these blocks in a Scratch project together:     
   
- when green flag clicked
- connect to MQTT Broker
- subscribe to topic [test/topic]
- send message [Hello, MQTT!] to topic [test/topic]

- when I receive new message from [test/topic]
- say (join [New message received: ] (message from [test/topic]))

   
![image](https://github.com/user-attachments/assets/554f0ce8-4f82-4b01-b6a2-4cfda029ea8c)

## Additional Notes
   - **Ensure Broker Accessibility:**
       Make sure the MQTT broker you are connecting to is accessible from the Scratch environment. The broker address **(http:/localhost:8883/**) should work. /

   - **Debugging:**
       If you encounter any issues, check the browser console for error messages that can help you troubleshoot the problem.



