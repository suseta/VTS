const { getClient } = require('../db/connect')

var client

const registerSimDetails = async (req, res) => {
    const {
        s_sim_no,
        s_sim_op,
        sim_add_dt
    } = req.body


    try {
        const dataToInsert = {
            s_sim_no,
            s_sim_op,
            sim_add_dt
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
                VALUES ($1, $2, $3, $4,$5)
                RETURNING *;
            `,
            values: [
                dataToInsert.s_sim_no,
                dataToInsert.s_sim_op,
                dataToInsert.sim_add_dt,
                null,
                false,

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

const deActivateSimDetails = async (req, res) => {
    const { s_sim_no, sim_dlt_dt } = req.body;

    try {
        const query = {
            text: `
                UPDATE sim_details 
                SET sim_dlt_dt = $1, s_sim_status = $2 
                WHERE s_sim_no = $3
                RETURNING *;
            `,
            values: [sim_dlt_dt, false, s_sim_no]
        };

        client = await getClient();
        try {
            const result = await client.query(query);
            res.status(200).json({
                message: 'SIM Details updated successfully!',
                data: result.rows[0].s_sim_no
            });
        } finally {
            await client.end();
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


const getInactiveSimDetails = async (req, res) => {
    try {
        const query = {
            text: 'SELECT s_sim_no,s_sim_op FROM sim_details where s_sim_status = false;',
        };

        client = await getClient();

        try {
            const result = await client.query(query);
            res.status(200).json({
                message: 'Inactive SIM Details Data Fetched successfully',
                data: result.rows
            });
        } finally {
            await client.end();
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const getActiveSimDetails = async (req, res) => {
    try {
        const query = {
            text: 'SELECT s_sim_no,s_sim_op FROM sim_details where s_sim_status = true;',
        };

        client = await getClient();

        try {
            const result = await client.query(query);
            res.status(200).json({
                message: 'Active SIM Details Data Fetched successfully',
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
    registerSimDetails,
    deActivateSimDetails,
    getInactiveSimDetails,
    getActiveSimDetails
}