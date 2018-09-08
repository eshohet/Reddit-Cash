import RedditCash from './../build/contracts/RedditCash.json'

const drizzleOptions = {
    web3: {
        block: false,
        fallback: {
            type: 'ws',
            url: 'ws://127.0.0.1:8545'
        }
    },
    contracts: [
        RedditCash
    ],
    events: {
        Prices: ['Publish']
    },
    polls: {
        accounts: 1500
    }
};

export default drizzleOptions
