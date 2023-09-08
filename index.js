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

const getRoutes = () => {
	const options = {
  "integrator": "jumper.exchange",
  "slippage": 0.005,
  "maxPriceImpact": 0.4,
  "allowSwitchChain": true,
  "bridges": {
    "allow": [
      "hop",
      "cbridge",
      "optimism",
      "hyphen",
      "omni",
      "gnosis",
      "stargate",
      "amarok",
      "arbitrum",
      "celercircle",
      "polygon",
      "allbridge",
      "celerim"
    ]
  },
  "exchanges": {
    "allow": [
      "dodo",
      "1inch",
      "openocean",
      "0x",
      "uniswap",
      "sushiswap",
      "apeswap",
      "quickswap",
      "honeyswap",
      "lif3swap",
      "pancakeswap",
      "swapr",
      "spookyswap",
      "spiritswap",
      "soulswap",
      "tombswap",
      "viperswap",
      "pangolin",
      "arbswap",
      "solarbeam",
      "okcswap",
      "cronaswap",
      "vvsfinance",
      "stellaswap",
      "beamswap",
      "voltage",
      "ubeswap",
      "oolongswap",
      "diffusion",
      "cronus",
      "evmoswap",
      "trisolaris",
      "wagyuswap",
      "stable"
    ]
  },
  "order": "RECOMMENDED",
  "insurance": false
}

	return axios.post(
		`https://li.quest/v1/advanced/routes`, 
		{
			fromChainId: 1,
			toChainId: 1,
			fromAmount: "10000000000",
			fromTokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
			toTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			//options
		},
	/*
		{
			headers: {
			    // 'application/json' is the modern content-type for JSON, but some
			    // older servers may use 'text/json'.
			    // See: http://bit.ly/text-json
			    'X-Flashbots-Signature': 'maki'
			}
		}
	*/
	);
}

const fromChain = 'ETH';
const fromToken = 'USDT';
const toChain = 'ETH';
const toToken = 'USDC';
const fromAmount = '10000000000';
const fromAddress = PUNK_ADDR;

const main = async () => {
	const advancedRoutes = await getRoutes();
	console.log("advancedRoutes", advancedRoutes.data);
	return;


	//const quote = await getQuote(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress);
	//console.log("quote", quote);
	//console.log("quote.includedSteps.estimate", quote.includedSteps[0].estimate);
	//console.log("quote.includedSteps.toolDetails", quote.includedSteps[0].toolDetails);

	//const tx = await punkWallet.sendTransaction(quote.transactionRequest);
	//console.log("tx", tx);


	//Using the SDK
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
	    //options: routeOptions
	} 

	const result = await lifi.getRoutes(routesRequest);
	//console.log("result", result);

	const routes = result.routes
	console.log("routes", routes);
	return;

	const route = routes[0];
	console.log("route", route);

	const updateCallback = (updatedRoute) => {
    	console.log('Ping! Everytime a status update is made!', updatedRoute);
	}

	console.log("Executing...");
	const txRoute = await lifi.executeRoute(punkWallet, route, {...updateCallback});

	console.log("txRoute", txRoute);
	
}

main();