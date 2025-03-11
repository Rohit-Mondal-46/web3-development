const express = require('express');
const BlockChain = require('./blockChain');
const bodyParser = require('body-parser')


const PORT = 3000;
const app = express();
const blockChain = new BlockChain()
app.use(bodyParser.json())


app.get('/api/blocks',(req,res)=>{
    res.json(blockChain.chain);
})

app.post('/api/mine',(req,res)=>{
    const {data} = req.body;
    blockChain.addBlock(data);
    res.json(blockChain.chain);
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT: ${PORT}`);
})