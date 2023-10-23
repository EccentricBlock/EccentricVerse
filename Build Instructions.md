# Setting up a Base Blockchain VM - Software Install

## Introduction
This guide is meant to provide a minimum baseline to be used when running the environment.  Please ensure your hosting system has been sufficiently hardened in conjunction with the below instructions. 

## Pre-requisites

1. A blank Ubuntu installation (Im running on WSL).
2. Internet Access

## Step-by-step Installation
The following tools will be installed:
* General Development Frameworks:  NodeJS (npm & yarn), Python 3 (pip)
* Solidity Development Frameworks: HardHat, solc-select, solc

### 1. Updating & Upgrading the System

Before we start, ensure that the WSL Ubuntu system is up-to-date:

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Installing Node.js

`hardhat` runs on Node.js. Let's install it:

```bash
sudo apt install -y ca-certificates curl gnupg
# Used to store nodesource and yarn repo keys
sudo mkdir -p /etc/apt/keyrings

# Download nodesource rpo cert
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg


#Change for different versions
NODE_MAJOR=20

# Add to apt repo list
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Update Apt Cached List
sudo apt update
sudo apt install -y nodejs
```

Some smart contract projects also use `Yarn` as their package manager:
```bash
# Download Yarnpkg repo cert
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null

# Add to apt repo list
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# Update Apt Cached List
sudo apt update 
sudo apt install -y yarn

```

### 3. Installing Python 3

`pip` (easier package install, step 6) runs on Python3. Let's install it:

```bash
sudo apt install -y python3-pip
```

### 4. Installing `hardhat`

With Node.js in place, we can proceed to install `hardhat`:

```bash
npm install --save-dev hardhat
```

### 5. Installing Solidity Compiler (`solc`)

Next, we'll install the Solidity compiler:

```bash
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc
```

### 6. Installing `solc-select`

To switch between different versions of the Solidity compiler, we use `solc-select`, install with `pip` (step 3):

```bash
pip install solc-select
```


### 7. Update `PATH` for `solc` and `solc-select`

To ensure both `solc` and `solc-select` are accessible from any directory, we need to add `/home/user/.local/bin` to the `PATH` environment variable:

```bash
echo 'export PATH=$PATH:/home/user/.local/bin' >> ~/.bashrc
source ~/.bashrc
```

With this step completed, you should be able to access `solc` (step 5) and `solc-select` (step 6) from any location within the terminal.

### 8. Setting Up the Environment

Initialize a new `hardhat` project:

```bash
npx hardhat
```

Follow the on-screen prompts to set up your project.