const { getClient } = require('../db/connect')

var client

const setTransporterInfo = async (req, res) => {
    const {
        cus_entity_id,
        s_trans_id,
        s_trans_name 
    } = req.body
    
    try {
    const dataToInsert = {
        s_trans_id,
        s_trans_name   
    }

    const query = {
        text: `
                INSERT INTO transporter_details (
                    s_trans_id,
                    s_trans_name     
                )
                VALUES ($1, $2)
                RETURNING *;
            `,
        values: [
                    dataToInsert.s_trans_id,
                    dataToInsert.s_trans_name
        ]
    }
    client = await getClient()
    try {
        const result = await client.query(query)
        console.log('Transporter Data inserted successfully:', result.rows[0])
        res.status(200).json({
        message: 'Transporter Entity info stored successfully!',
        data: result.rows[0]
        })
    } finally {
        await client.end()
    }
    } catch (error) {
    res.status(400).send({ message: error.message })
    }
}

const TransporterMapping = async(cus_entity_id,s_trans_id)

const getCustomerEntityDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT cus_entity_name FROM customer_entity_details;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Customer Entity Name Fetched successfully',
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
    setTransporterInfo,
    getCustomerEntityDetails
}