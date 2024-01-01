
const { Client } = require('pg');

require('dotenv').config();
const UbuntuIP = process.env.UbuntuIP;
const password = process.env.Password;

const connect = async () => {
    const connectionString = `postgresql://postgres:password@UbuntuIP:5432/navXdb`;
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
