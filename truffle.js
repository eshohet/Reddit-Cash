module.exports = {
    migrations_directory: "./migrations",
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            host: "localhost",
            port: 8545,
            network_id: 3,
            skipDryRun: true,
            from: "0xbef388e584897c4703f4417b8e5b7150ada53d96"
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 500
        }
    }
};
