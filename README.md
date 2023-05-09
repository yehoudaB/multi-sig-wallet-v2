# Using EtherWallet Project

This guide provides step-by-step instructions on how to use the EtherWallet project. EtherWallet is a decentralized web application that allows you to interact with the Ethereum blockchain. Follow the steps below to get started:

## Prerequisites

Before using EtherWallet, make sure you have the following prerequisites installed:

- Git: To clone the project.
- Node.js: To run the necessary commands and scripts.
- Angular CLI: To serve the web application.
- Metamask: A browser extension wallet for Ethereum.

## Steps

1. Clone the project:
   ``
   git clone <project_url>
   ``

2. Start a local development blockchain:
   ``
   npx hardhat node
   ``

3. Compile the project's smart contracts:
   ``
   npx hardhat compile
   ``

4. Serve the web application:
   ``
   ng serve --open
   ``

5. Deploy the smart contracts to the local development network:
   ``
   npx hardhat run scripts/deploy.ts --network localhost
   ``

6. Add a new network to Metamask:
   - Open Metamask in your browser.
   - Click on the network selection dropdown (usually showing "Mainnet" or "Ropsten").
   - Select "Custom RPC" at the bottom.
   - Enter the following details:
     - Network Name: Localhost (or any name you prefer)
     - New RPC URL: ``http://127.0.0.1:8545/``
     - Chain ID: 1337
   - Click "Save" to add the new network.

7. Import one of the accounts generated when you ran ``npx hardhat node`` into Metamask:
   - In Metamask, click on your account avatar or initials in the top right corner.
   - Select "Import Account" or "Import Account with Private Key."
   - Enter the private key associated with one of the accounts from the ``npx hardhat node`` output.
   - Follow the prompts to complete the import process.

8. Access the EtherWallet web application:

9. Connect Metamask to the website:
- In the EtherWallet web application, you will see a "Connect Wallet" or similar button.
- Click on it to initiate the wallet connection process.
- Metamask will prompt you to connect to the website.
- Approve the connection request in Metamask.

You are now ready to use the EtherWallet project! You can interact with Ethereum through the web application and perform various operations using your connected Metamask wallet.

Note: Remember that the local development network is for testing purposes and should not be used for production or real transactions on the Ethereum mainnet.
