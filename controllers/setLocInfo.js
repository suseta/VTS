const { getClient } = require('../db/connect')

var client

const setLocationInfo = async (req, res) => {
    const {
        cus_entity_id,
        s_loc_pin,
        s_loc_name
    } = req.body
    
    try {
    const dataToInsert = {
        cus_entity_id,
        s_loc_pin,
        s_loc_name
    }

    const query = {
        text: `
                INSERT INTO plant_loc_details (
                    s_loc_pin,
                    s_loc_name
                )
                VALUES ($1, $2)
                RETURNING *;
            `,
        values: [
                    dataToInsert.s_loc_pin,
                    dataToInsert.s_loc_name
        ]
    }
    client = await getClient()
    try {
        const result = await client.query(query)
        console.log('Location Data inserted successfully:', result.rows[0])
        res.status(200).json({
        message: 'Location info stored successfully!',
        data: result.rows[0]
        })
    } finally {
        await client.end()
    }
    } catch (error) {
    res.status(400).send({ message: error.message })
    }
}

const custLocationMapped = async(cus_entity_id,s_loc_pin) => {

}

const getAllLocationNameDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT s_loc_name FROM plant_loc_details;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Location Name List Fetched successfully',
                    data: result.rows
                });
            } finally {
                await client.end();
            }
    }catch(error){
        res.status(400).send({ message: error.message });
    }   
} 

const getAllLocationPinDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT s_loc_pin FROM plant_loc_details;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Location Pin List Fetched successfully',
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
    setLocationInfo,
    getAllLocationNameDetails,
    getAllLocationPinDetails
}