
const { getClient } = require('../db/connect')

var client

const getDeviceTypeDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT s_device_type_id,s_device_name FROM device_type where is_active = true;',
        };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Device Data Fetched successfully',
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
    getDeviceTypeDetails
}


