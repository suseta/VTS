const { getClient } = require('../db/connect')

var client

const setAssetDriverMapping = async (req, res) => {
  let {
    s_entity_id,
    s_entity_id_and_name,
    s_asset_id,
    s_drv1_name,
    s_drv2_name
  } = req.body

  if (!s_entity_id || !s_asset_id || !s_drv1_name) {
    return res.status(400).json({
      error: 's_entity_id or s_asset_id or s_drv1_name cannot be empty!'
    })
  }
  
  s_entity_id_and_name = s_entity_id + '^' + s_entity_id_and_name;

  try {
    const dataToInsert = {
        s_entity_id,
        s_entity_id_and_name,
        s_asset_id,
        s_drv1_name,
        s_drv2_name
    }    

    const query = {
      text: `
                INSERT INTO asset_driver_mapping (
                    s_entity_id,
                    s_entity_id_and_name,
                    s_asset_id,
                    s_drv1_name,
                    s_drv2_name
                )
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `,
      values: [
        dataToInsert.s_entity_id,
        dataToInsert.s_entity_id_and_name,
        dataToInsert.s_asset_id,
        dataToInsert.s_drv1_name,
        dataToInsert.s_drv2_name
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      console.log('Data inserted successfully:', result.rows[0])
      res.status(200).json({
        message: 'Asset Driver Mapping data stored successfully!',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getAssetDriverMapping = async(req,res) =>{
  try{
      const query = {
          text: 'SELECT s_entity_id,s_asset_id, s_drv1_name, s_drv2_name FROM asset_driver_mapping;',
          };
          
          client =await getClient(); 

          try {
              const result = await client.query(query);
              res.status(200).json({
                  message: 'Entity Id, Asset ID, and Device Id Fetched successfully',
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
    setAssetDriverMapping,
    getAssetDriverMapping
}
