const { getClient } = require('../db/connect')

var client

const setEntityInfo = async (req, res) => {
    const {
        s_entity_id,
        s_entity_name,
        s_entity_type,
        s_transporter_id,
        s_transporter_name,
        s_customer_id,
        s_customer_name,
        s_customer_type,
        s_parent_entity_id,
        s_immediate_parent_entity_name,
        i_user_id,
        s_user_type  
    } = req.body

    try {
    const dataToInsert = {
        s_entity_id,
        s_entity_name,
        s_entity_type,
        s_transporter_id,
        s_transporter_name,
        s_customer_id,
        s_customer_name,
        s_customer_type,
        s_parent_entity_id,
        s_immediate_parent_entity_name,
        i_user_id,
        s_user_type  
    }

    const query = {
        text: `
                INSERT INTO entity_details (
                    s_entity_id,
                    s_entity_name,
                    s_entity_type,
                    s_transporter_id,
                    s_transporter_name,
                    s_customer_id,
                    s_customer_name,
                    s_customer_type,
                    s_parent_entity_id,
                    s_immediate_parent_entity_name,
                    i_user_id,
                    s_user_type     
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *;
            `,
        values: [
                    dataToInsert.s_entity_id,
                    dataToInsert.s_entity_name,
                    dataToInsert.s_entity_type,
                    dataToInsert.s_transporter_id,
                    dataToInsert.s_transporter_name,
                    dataToInsert.s_customer_id,
                    dataToInsert.s_customer_name,
                    dataToInsert.s_customer_type,
                    dataToInsert.s_parent_entity_id,
                    dataToInsert.s_immediate_parent_entity_name,
                    dataToInsert.i_user_id,
                    dataToInsert.s_user_type
        ]
    }
    client = await getClient()
    try {
        const result = await client.query(query)
        console.log('Entity Data inserted successfully:', result.rows[0])
        res.status(200).json({
        message: 'Entity info stored successfully!',
        data: result.rows[0]
        })
    } finally {
        await client.end()
    }
    } catch (error) {
    res.status(400).send({ message: error.message })
    }
}

const getEntityAndTransporterDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT s_entity_name and s_transporter_name FROM entity_details;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Entity and Transporter Name data Fetched successfully',
                    data: result.rows
                });
            } finally {
                await client.end();
            }
    }catch(error){
        res.status(400).send({ message: error.message });
    }   
} 

module.exports = {
    setEntityInfo,
    getEntityAndTransporterDetails
}