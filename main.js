const Blockchain = require("./blockchain.js");

// const EC = require("elliptic").ec;
// const ec = new EC("secp256k1");

// const myKey = ec.keyFromPrivate("3b47cf6d49adf3097079553eff34acfc4db7e2705d666df9fe5da9891b043f19");
// const myWalletAddress = myKey.getPublic("hex");

// let gemshire = new Blockchain();

// const tx1 = new Transaction(myWalletAddress, "040e703637d3e9e403663da9231e0d14240ff1811fde6be4e72cb09d72c4e74ecba7c247cabac0ef1e5634a50af37ea04c3c946486137cc799e8a55ca70aecd43d", 10);
// tx1.signTransaction(myKey);
// gemshire.addTransaction(tx1);


// console.log("\n starting the miner...");
// gemshire.minePendingTransactions(myWalletAddress);

// console.log("\n Balance of Jeremy is finally...", gemshire.getBalanceOfAddress(myWalletAddress));

// gemshire.minePendingTransactions(myWalletAddress);

// console.log("\n Balance of Jeremy is finally after the second mined...", gemshire.getBalanceOfAddress(myWalletAddress));


// console.log("is chain valid", gemshire.isChainValid());

const gemshire = new Blockchain();

module.exports = gemshire;