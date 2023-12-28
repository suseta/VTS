const { getClient } = require('../db/connect')

var client

const setCustomerEntityInfo = async (req, res) => {
    const {
        cus_entity_id,
        cus_entity_name,
        cus_entity_typ,
        cus_entity_active_status,
        cus_parent_entity_id,
        cus_imdt_parent_entity_id 
    } = req.body
    
    try {
    const dataToInsert = {
        cus_entity_id,
        cus_entity_name,
        cus_entity_typ,
        cus_entity_active_status,
        cus_parent_entity_id,
        cus_imdt_parent_entity_id   
    }

    const query = {
        text: `
                INSERT INTO customer_entity_details (
                    cus_entity_id,
                    cus_entity_name,
                    cus_entity_typ,
                    cus_entity_active_status,
                    cus_parent_entity_id,
                    cus_imdt_parent_entity_id      
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *;
            `,
        values: [
                    dataToInsert.cus_entity_id,
                    dataToInsert.cus_entity_name,
                    dataToInsert.cus_entity_typ,
                    dataToInsert.cus_entity_active_status,
                    dataToInsert.cus_parent_entity_id,
                    dataToInsert.cus_imdt_parent_entity_id
        ]
    }
    client = await getClient()
    try {
        const result = await client.query(query)
        console.log('Customer Entity Data inserted successfully:', result.rows[0])
        res.status(200).json({
        message: 'Customer Entity info stored successfully!',
        data: result.rows[0]
        })
    } finally {
        await client.end()
    }
    } catch (error) {
    res.status(400).send({ message: error.message })
    }
}

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

const setSubCustomerEntityInfo = async (req, res) => {
    const {
        sub_cus_entity_id,
        sub_cus_entity_name,
        sub_cus_entity_typ,
        sub_cus_entity_active_status,
        sub_cus_parent_entity_id,
        sub_cus_imdt_parent_entity_id 
    } = req.body
    
    try {
    const dataToInsert = {
        sub_cus_entity_id,
        sub_cus_entity_name,
        sub_cus_entity_typ,
        sub_cus_entity_active_status,
        sub_cus_parent_entity_id,
        sub_cus_imdt_parent_entity_id    
    }

    const query = {
        text: `
                INSERT INTO sub_cus_entity_details (
                    sub_cus_entity_id,
                    sub_cus_entity_name,
                    sub_cus_entity_typ,
                    sub_cus_entity_active_status,
                    sub_cus_parent_entity_id,
                    sub_cus_imdt_parent_entity_id      
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *;
            `,
        values: [
                    dataToInsert.sub_cus_entity_id,
                    dataToInsert.sub_cus_entity_name,
                    dataToInsert.sub_cus_entity_typ,
                    dataToInsert.sub_cus_entity_active_status,
                    dataToInsert.sub_cus_parent_entity_id,
                    dataToInsert.sub_cus_imdt_parent_entity_id
        ]
    }
    client = await getClient()
    try {
        const result = await client.query(query)
        console.log('Sub Customer Entity Data inserted successfully:', result.rows[0])
        res.status(200).json({
        message: 'Sub Customer Entity info stored successfully!',
        data: result.rows[0]
        })
    } finally {
        await client.end()
    }
    } catch (error) {
    res.status(400).send({ message: error.message })
    }
}

const getSubCustomerEntityDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT sub_cus_entity_name FROM sub_cus_entity_details;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Sub Customer Entity Name Fetched successfully',
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
    setCustomerEntityInfo,
    getCustomerEntityDetails,
    setSubCustomerEntityInfo,
    getSubCustomerEntityDetails
}