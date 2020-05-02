const Blockchain = require("./blockchain.js");

const gemshire = require("./main.js");

const bc1 = {
chain: [
{
index: 1,
timestamp: 1588182218822,
nounce: 100,
hash: "0",
previousBlockHash: "0"
},
{
index: 2,
timestamp: 1588182296896,
transactions: [
{
amount: 100,
sender: "JEREMYFJALDKFJ123J2M3M3MMM",
recipient: "ADLFKJ2L3JK2LK3M23LMK23LKM",
transactionId: "b93af642b8f743f589338f8d41fa7eb2"
},
{
amount: 100,
sender: "JOSHJALDKFJ123J2M3M3MMM",
recipient: "JEREMYFJALDKFJ123J2M3M3MMM",
transactionId: "7a4bd2663c7a46009762f61e5c4c2191"
}
],
nounce: 84921,
hash: "00007ef064587e8b380896aff18ee15af98b3e3aec6f39061ef620ae02c284a8",
previousBlockHash: "0"
},
{
index: 3,
timestamp: 1588182317993,
transactions: [
{
amount: 12.5,
sender: "00",
recipient: "264ba2ba6e5f44b7bfc5c870d721294c",
transactionId: "9f2f684f88f3436ab910f1559fc0c63d"
},
{
amount: 500,
sender: "JOSHJALDKFJ123J2M3M3MMM",
recipient: "JEREMYFJALDKFJ123J2M3M3MMM",
transactionId: "261fb414424d4d4faf45421f45a2eb72"
},
{
amount: 1000,
sender: "JOSHJALDKFJ123J2M3M3MMM",
recipient: "JEREMYFJALDKFJ123J2M3M3MMM",
transactionId: "bf1c04e14bc446228400d2ffdbc042ad"
}
],
nounce: 19528,
hash: "00003f790880a4dc9444fb0f19f8df661686535ccc9c808e6cb1812c7d9486cf",
previousBlockHash: "00007ef064587e8b380896aff18ee15af98b3e3aec6f39061ef620ae02c284a8"
},
{
index: 4,
timestamp: 1588182340260,
transactions: [
{
amount: 12.5,
sender: "00",
recipient: "264ba2ba6e5f44b7bfc5c870d721294c",
transactionId: "5fd3af80bf6940e8847965b30c017a92"
},
{
amount: 2000,
sender: "JOSHJALDKFJ123J2M3M3MMM",
recipient: "JEREMYFJALDKFJ123J2M3M3MMM",
transactionId: "1fb90fc40a9c4df18773f81be79f9e30"
},
{
amount: 2000,
sender: "JEREMYFJALDKFJ123J2M3M3MMM",
recipient: "JOSHFJALDKFJ123J2M3M3MMM",
transactionId: "d14acd73d6a949708aa044e928061789"
}
],
nounce: 104146,
hash: "000080965925be17f796012dbf6a535858adba143ea96049ec2e3b942ea125fe",
previousBlockHash: "00003f790880a4dc9444fb0f19f8df661686535ccc9c808e6cb1812c7d9486cf"
}
],
newTransactions: [ ],
currentNodeUrl: "http://localhost:5000",
networkNodes: [ ],
pendingTransactions: [
{
amount: 12.5,
sender: "00",
recipient: "264ba2ba6e5f44b7bfc5c870d721294c",
transactionId: "031c61ad4fb44d61a43b8ba21f055b72"
}
]
}
console.log("valid :", gemshire.chainIsValid(bc1.chain));