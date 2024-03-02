const { getClient } = require('../db/connect')

var client

const setSimDetails = async (req, res) => {
    const {
        s_sim_no,
        s_sim_op,
        sim_add_dt,
        sim_dlt_dt,
        s_sim_status
    } = req.body


    try {
        const dataToInsert = {
            s_sim_no,
            s_sim_op,
            sim_add_dt,
            sim_dlt_dt,
            s_sim_status
        }

        const query = {
            text: `
                INSERT INTO sim_details (
                    s_sim_no,
                    s_sim_op,
                    sim_add_dt,
                    sim_dlt_dt,
                    s_sim_status  
                )
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `,
            values: [
                dataToInsert.s_sim_no,
                dataToInsert.s_sim_op,
                dataToInsert.sim_add_dt,
                dataToInsert.sim_dlt_dt,
                dataToInsert.s_sim_status,

            ]
        }
        client = await getClient()
        try {
            const result = await client.query(query)
            res.status(200).json({
                message: 'SIM Details stored successfully!',
                data: result.rows[0].s_sim_no
            })
        } finally {
            await client.end()
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const getInactiveSimDetails = async (req, res) => {
    try {
        const query = {
            text: 'SELECT s_sim_no,s_sim_op FROM sim_details where s_sim_status = false;',
        };

        client = await getClient();

        try {
            const result = await client.query(query);
            res.status(200).json({
                message: 'Device Data Fetched successfully',
                data: result.rows
            });
        } finally {
            await client.end();
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = {
    setSimDetails,
    getInactiveSimDetails
}