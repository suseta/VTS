const {Client} = require('pg');
async function dataLog(database) {
 //   const connectionString = `postgresql://postgres:root@localhost:5432/${database}`;
const connectionString = `postgresql://postgres:postgres@postgres-db.cahr3oxezjyh.ap-south-1.rds.amazonaws.com:5432/vtsdb`;   
 let client = new Client({
        connectionString,
    });
    await client.connect();
        try {
            const query = `
                CREATE TABLE IF NOT EXISTS datalog (
                    rawpacket varchar(100000) PRIMARY KEY,
                    serverhittimestamp TIMESTAMP,
                    status SMALLINT
                );
            `;
            await client.query(query);
            console.log('Table created successfully');
        } catch (error) {
            console.error('Error creating table:', error);
        } finally {
                if (client._ending) {
                    console.error('Error: Connection already closed.');
            } else {
                await client.end();
            }
        }
}

dataLog('vtsdb')
