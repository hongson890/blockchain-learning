
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce ++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ' + this.hash);
    }
}

class BlockChain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        let firstBlock = new Block(0, '01/01/2018', 'Genesis Block', '0');
        return firstBlock;
    }

    getLastestBlock() {
        return this.chain[this.chain.length -1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {

            if (this.chain[i-1].hash !== this.chain[i-1].calculateHash()) {
                return false;
            }

            if(this.chain[i].previousHash !== this.chain[i-1].hash) {
                return false;
            }
        }
        return true;
    }

}

let sonTest = new BlockChain();
console.log('start mining...')
sonTest.addNewBlock(new Block(1, '01/02/2018', {amount: 10}));
sonTest.addNewBlock(new Block(2, '01/03/2018', {amount: 20}));
sonTest.addNewBlock(new Block(3, '01/04/2018', {amount: 30}));
