
const { Client } = require('pg');

const connect = async () => {
    const connectionString = `postgresql://postgres:root@localhost:5432/vtsdatabase`;
    const client = new Client({
        connectionString,
    });

    await client.connect();
    return client;
}

const getClient = async () => {
    const client = await connect();
    return client;
}

module.exports = {
    connect,
    getClient
}
