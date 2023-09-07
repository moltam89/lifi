require('dotenv').config();
const PUNK_ADDR = process.env.PUNK_ADDR;
const PUNK_PK = process.env.PUNK_PK;

const axios = require("axios");
const { BigNumber, ethers, utils, Wallet } = require("ethers");

const LI_FI_API_URL = "https://li.quest/v1";

const provider = new ethers.providers.StaticJsonRpcProvider("https://polygon-rpc.com");
const punkWallet = new ethers.Wallet(PUNK_PK, provider);


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




const fromChain = 'POL';
const fromToken = 'USDC';
const toChain = 'DAI';
const toToken = 'USDC';
const fromAmount = '4000000';
const fromAddress = PUNK_ADDR;



const main = async () => {
	const quote = await getQuote(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress);
	console.log("quote", quote);
	console.log("quote.includedSteps.estimate", quote.includedSteps[0].estimate);
	console.log("quote.includedSteps.toolDetails", quote.includedSteps[0].toolDetails);

	//const tx = await punkWallet.sendTransaction(quote.transactionRequest);
	//console.log("tx", tx);
}

main();