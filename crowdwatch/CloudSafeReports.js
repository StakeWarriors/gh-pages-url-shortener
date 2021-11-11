console.log("Loaded")
let contract_abi;
let contract_address = "0x28B97a68D53cfBEa6313b588255af4F53a0A7754"
let web3;
const NODE_URL = "https://speedy-nodes-nyc.moralis.io/8fb2d79dc07d728a3523252b/polygon/mainnet";

let CrowdSafe;
let highestScamScore;
let highestSafeScore;

let reportedScamsLength;
let scamReportersLength;
let reportedSafeLength;
let safeReportersLength;

let current_url = "https://etherscan.io/address/"

function init() {
    contract_abi = [
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "verifiedContract", "type": "address" }], "name": "ReportSafe", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "fraudContract", "type": "address" }], "name": "ReportScam", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_version", "type": "uint256" }], "name": "__CrowdSafe_init", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountBan", "type": "uint256" }], "name": "_setAmountBan", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_minimumCompensation", "type": "uint256" }], "name": "_setMinimumCompensation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "reporterCountBan", "type": "uint256" }], "name": "_setReporterCountBan", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "founderMintBan", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getReportedSafeLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getReportedScamsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getSafeReportersLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getScamReportersLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestSafetyAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestSafetyAwareness", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestSafetyLevel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestScamThreatAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestScamThreatAwareness", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestScamThreatLevel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "minimumCompensation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "reportedSafe", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "reportedScams", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "safeAwareness", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "safeLevel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "safeReporterSet", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "safeReporters", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "scamReporterSet", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "scamReporters", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "scamThreatAwareness", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "scamThreatLevel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userContractSafeLevel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userContractScamLevel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
    ]
    const provider = new Web3.providers.HttpProvider(NODE_URL);
    web3 = new Web3(provider);
    CrowdSafe = new web3.eth.Contract(contract_abi, contract_address)
}

/**
 * Web3 Functions
 */
async function getSafeContractRegistrar() {
    reportedSafeLength = Number(await CrowdSafe.methods.getReportedSafeLength().call());
    safeReportersLength = Number(await CrowdSafe.methods.getSafeReportersLength().call());
    let syncPromise = []
    for (let safeContracts = 0; safeContracts < reportedSafeLength; safeContracts++) {
        scamContracts = Number(safeContracts);
        let address = await CrowdSafe.methods.reportedSafe(safeContracts).call()
        syncPromise.push([
            address,
            CrowdSafe.methods.scamThreatAwareness(address).call(),
            CrowdSafe.methods.safeAwareness(address).call(),
            CrowdSafe.methods.scamThreatLevel(address).call(),
            CrowdSafe.methods.safeLevel(address).call()
        ]);
    }
    return syncPromise;
}

async function getScamContractRegistrar() {
    reportedScamsLength = Number(await CrowdSafe.methods.getReportedScamsLength().call());
    scamReportersLength = Number(await CrowdSafe.methods.getScamReportersLength().call());
    let syncPromise = []
    for (let scamContracts = 0; scamContracts < reportedScamsLength; scamContracts++) {
        scamContracts = Number(scamContracts);
        let address = await CrowdSafe.methods.reportedScams(scamContracts).call()
        syncPromise.push([
            address,
            CrowdSafe.methods.scamThreatAwareness(address).call(),
            CrowdSafe.methods.safeAwareness(address).call(),
            CrowdSafe.methods.scamThreatLevel(address).call(),
            CrowdSafe.methods.safeLevel(address).call()
        ]);
    }
    return syncPromise;
}

async function getHighestScamScore() {
    let scamLevelPromise = CrowdSafe.methods.highestScamThreatLevel().call();
    let scamAwarenessPromise = CrowdSafe.methods.highestScamThreatAwareness().call();
    let scamAddressPromise = CrowdSafe.methods.highestScamThreatAddress().call();
    highestScamScore = {
        scamLevel: await scamLevelPromise,
        scamAwareness: await scamAwarenessPromise,
        scamAddress: await scamAddressPromise
    }
    return highestScamScore;
}

async function getHighestSafeScore() {
    let safeLevelPromise = CrowdSafe.methods.highestSafetyLevel().call();
    let safeAwarenessPromise = CrowdSafe.methods.highestSafetyAwareness().call();
    let safeAddressPromise = CrowdSafe.methods.highestSafetyAddress().call();
    highestSafeScore = {
        safeLevel: await safeLevelPromise,
        safeAwareness: await safeAwarenessPromise,
        safeAddress: await safeAddressPromise
    }
    return highestSafeScore;
}

/**
 * 
 * Dom Functions
 * 
 */
function blockTrio(id, address, awareness, level) {
    addressShortened = addressShorten(address);

    document.getElementById(id + "Address").title = address;
    document.getElementById(id + "Address").innerText = addressShortened;
    document.getElementById(id + "Address").onclick = () => window.location.href = current_url + address
    document.getElementById(id + "Awareness").innerText = awareness;
    document.getElementById(id + "Level").innerText = level;
}

function paintTable(size, baseId, contractRegistrar, sortIndex) {
    let maxProg = contractRegistrar[0][sortIndex];// Because It Is already Sorted
    let baseAttr = `${size}-${baseId}-`;
    if (size == "sm") {
        for (let i = 0; i < contractRegistrar.length; i++) {
            let address = contractRegistrar[i][0];
            let ratio = (contractRegistrar[i][sortIndex] / maxProg) * 100;
            let scamA = contractRegistrar[i][1];
            let safeA = contractRegistrar[i][2];
            let score = `${ratio}% ${contractRegistrar[i][sortIndex]} (${safeA} safe : ${scamA} scam)`;

            let innerH = createSmall(i + 1, address, score);
            let anchor;
            if (document.getElementById(baseAttr + "container").childElementCount <= i + 1) {
                let anchor = document.createElement("div");//Anchor
                anchor.class = "flex items-center text-xs px-4 border-b";
                anchor.innerHTML = innerH;
                document.getElementById(baseAttr + "container").appendChild(anchor);
            } else {
                anchor = document.getElementById(baseAttr + "container").children[i + 1];
                anchor.innerHTML = innerH;
            }
        }
    } else {
        for (let i = 0; i < contractRegistrar.length; i++) {
            let address = contractRegistrar[i][0];
            let ens = "--";
            let ratio = (contractRegistrar[i][sortIndex] / maxProg) * 100;
            let scamA = contractRegistrar[i][1];
            let safeA = contractRegistrar[i][2];
            let numReporters = `${safeA} safe : ${scamA} scam`;
            let scamLevel = contractRegistrar[i][3];
            let safeLevel = contractRegistrar[i][4];

            let anchor;
            let innerH = createLarge(i + 1, address, ens, ratio, numReporters, scamLevel, safeLevel);
            if (document.getElementById(baseAttr + "container").childElementCount <= i) {
                anchor = document.createElement("tr");//Anchor
                anchor.class = "border-b border-background h-10";
                anchor.innerHTML = innerH;
                document.getElementById(baseAttr + "container").appendChild(anchor);
            } else {
                anchor = document.getElementById(baseAttr + "container").children[i];
                anchor.innerHTML = innerH;
            }
        }
    }
}

function repaint(tvl, safeContractRegistrar, scamContractRegistrar) {

    document.getElementById("getReportedScamsLength").innerText = reportedScamsLength;
    document.getElementById("getScamReportersLength").innerText = scamReportersLength;
    document.getElementById("getReportedSafeLength").innerText = reportedSafeLength;
    document.getElementById("getSafeReportersLength").innerText = safeReportersLength;
    document.getElementById("tvl").innerText = web3.utils.fromWei(tvl) + " Matic";

    blockTrio("highestScam", highestScamScore.scamAddress, highestScamScore.scamAwareness, highestScamScore.scamLevel);
    blockTrio("highestSafety", highestSafeScore.safeAddress, highestSafeScore.safeAwareness, highestSafeScore.safeLevel);

    let safeContractLast = safeContractRegistrar[reportedSafeLength - 1];
    let newSafeAddress = safeContractLast[0]
    let newSafeAwareness = safeContractLast[2];
    let newSafeLevel = safeContractLast[4];
    blockTrio("newestSafety", newSafeAddress, newSafeAwareness, newSafeLevel);

    let scamContractLast = scamContractRegistrar[reportedScamsLength - 1];
    let newScamAddress = "0x0000000000000000000000000000000000000000";
    let newScamAwareness = 0;
    let newScamLevel = 0;
    if (scamContractLast && scamContractLast.length > 0) {
        newScamAddress = scamContractLast[0];
        newScamAwareness = scamContractLast[1];
        newScamLevel = scamContractLast[3];
    }
    blockTrio("newestScam", newScamAddress, newScamAwareness, newScamLevel);

    safeContractRegistrar = safeContractRegistrar.sort((e1, e2) => e2[4] - e1[4]);
    paintTable("sm", "top-ver", safeContractRegistrar, 4);
    paintTable("lg", "top-ver", safeContractRegistrar, 4);

    scamContractRegistrar = scamContractRegistrar.sort((e1, e2) => e2[3] - e1[3])
    if (scamContractRegistrar.length > 0) {
        paintTable("sm", "top-scam", scamContractRegistrar, 3);
        paintTable("lg", "top-scam", scamContractRegistrar, 3);
    } else if (document.getElementById("lg-top-scam-container").childElementCount == 0) {
        let emptyLg = document.createElement("tr");
        emptyLg.innerHTML = "No Entries Made At This Time";
        let emptySm = document.createElement("div");
        emptySm.innerHTML = "No Entries Made At This Time";
        document.getElementById("lg-top-scam-container").appendChild(emptyLg);
        document.getElementById("sm-top-scam-container").appendChild(emptySm);
    }
}

async function onRepeat() {

    getHighestScamScore();
    getHighestSafeScore();
    tvl = web3.eth.getBalance(contract_address);

    safeContractRegistrarPromise = await getSafeContractRegistrar();
    scamContractRegistrarPromise = await getScamContractRegistrar();

    safeContractRegistrar = await Promise.all(safeContractRegistrarPromise.map(e => Promise.all(e)));
    scamContractRegistrar = await Promise.all(scamContractRegistrarPromise.map(e => Promise.all(e)));

    repaint(await tvl, safeContractRegistrar, scamContractRegistrar);
}

function main() {
    init();
    onRepeat();
    setInterval(onRepeat, 60 * 1000);
}
main();