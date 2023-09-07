require('dotenv').config();
const PUNK_ADDR = process.env.PUNK_ADDR;
const PUNK_PK = process.env.PUNK_PK;

const axios = require("axios");
const { BigNumber, ethers, utils, Wallet } = require("ethers");

const LI_FI_API_URL = "https://li.quest/v1";

const getQuote = async (fromChain, toChain, fromToken, toToken, fromAmount, fromAddress) => {
    const result = await axios.get('https://li.quest/v1/quote', {
        params: {
            fromChain,
            toChain,
            fromToken,
            toToken,
            fromAmount,
            fromAddress,
        }
    });
    return result.data;
}




const fromChain = 'DAI';
const fromToken = 'USDC';
const toChain = 'POL';
const toToken = 'USDC';
const fromAmount = '1000000';
const fromAddress = PUNK_ADDR;



const main = async () => {
	const quote = await getQuote(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress);
	console.log("quote", quote);
}

main();