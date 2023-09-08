require('dotenv').config();
const PUNK_ADDR = process.env.PUNK_ADDR;
const PUNK_PK = process.env.PUNK_PK;

const axios = require("axios");
const { BigNumber, ethers, utils, Wallet } = require("ethers");

const { LiFi } = require("@lifi/sdk")
const lifi = new LiFi({
  integrator: 'Your dApp/company name'
})

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
const fromToken = 'MATIC';
const toChain = 'DAI';
const toToken = 'DAI';
const fromAmount = '100000000000000000';
const fromAddress = PUNK_ADDR;

const main = async () => {
	const quote = await getQuote(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress);
	console.log("quote", quote);
	//console.log("quote.includedSteps.estimate", quote.includedSteps[0].estimate);
	//console.log("quote.includedSteps.toolDetails", quote.includedSteps[0].toolDetails);

	//const tx = await punkWallet.sendTransaction(quote.transactionRequest);
	//console.log("tx", tx);

/*	Using the SDK
	const routeOptions = {
	    slippage: 3 / 100, // 3%
	    order: 'RECOMMENDED'
	}

	const routesRequest = {
	    fromChainId: 137,
	    fromAmount,
	    fromTokenAddress: fromToken,
	    fromAddress,
	    toChainId: 100,
	    toTokenAddress: toToken,
	    //toAddress?: string;
	    options: routeOptions
	} 

	const result = await lifi.getRoutes(routesRequest);
	//console.log("result", result);

	const routes = result.routes
	const route = routes[0];
	console.log("route", route);

	const updateCallback = (updatedRoute) => {
    	console.log('Ping! Everytime a status update is made!', updatedRoute);
	}

	console.log("Executing...");
	const txRoute = await lifi.executeRoute(punkWallet, route, {...updateCallback});

	console.log("txRoute", txRoute);
*/
	
}

main();