const { getClient } = require('../db/connect')

var client

const setAssetInfo = async (req, res) => {
  const {
    s_asset_typ,
    s_asset_cap 
  } = req.body

  try {
    const dataToInsert = {
        s_asset_typ,
        s_asset_cap  
    }

    const query = {
      text: `
                INSERT INTO asset_info (
                    s_asset_typ,
                    s_asset_cap     
                )
                VALUES ($1, $2)
                RETURNING *;
            `,
      values: [
        dataToInsert.s_asset_typ,
        dataToInsert.s_asset_cap
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      console.log('Data inserted successfully:', result.rows[0])
      res.status(200).json({
        message: 'asset info stored successfully!',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getAssetTypeDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT s_asset_typ FROM asset_info;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Asset Type Data Fetched successfully',
                    data: result.rows
                });
            } finally {
                await client.end();
            }
    }catch(error){
        res.status(400).send({ message: error.message });
    }   
}

const getAssetCapacityDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT s_asset_cap FROM asset_info;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Asset Capacity Data Fetched successfully',
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
    setAssetInfo,
    getAssetTypeDetails,
    getAssetCapacityDetails
}
