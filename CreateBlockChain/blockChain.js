const Block = require('./block');
const { generateHash } = require('./hashGenerator');

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    addBlock(data){
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length - 1],
            data,
        })
        this.chain.push(newBlock);
    }
    static isChainValid(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for(let i=1; i<chain.length; i++){
            const {data,hash,prevHash,timeStamp,nonce,difficulty} = chain[i];
            const realPrevHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;
            if(prevHash !== realPrevHash) return false;
            const realHash = generateHash(timeStamp,prevHash,data,nonce,difficulty);
            if(hash !== realHash) return false;
            if(Math.abs(lastDifficulty - difficulty)>1) return false; 
        }
        return true;
    }
    replaceChain(chain){
        if(chain<=this.chain.length){
            console.error("the current chian is not longer");
            return;
        }
        if(!BlockChain.isChainValid(chain)){
            console.error("Chain is not valid");
            return;
        }
        this.chain = chain;
    }
}

// const blockChain = new BlockChain(); 
// blockChain.addBlock("hi i am tohit");
// blockChain.addBlock("hi i am punit");
// blockChain.addBlock("hi i am junit");
// console.log(blockChain);
// console.log(BlockChain.isChainValid(blockChain.chain));

module.exports = BlockChain;