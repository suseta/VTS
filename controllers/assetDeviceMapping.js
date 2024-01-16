const { getClient } = require('../db/connect')

var client

const setAssetDeviceMapping = async (req, res) => {
  let {
    s_entity_id,
    s_entity_id_and_name,
    s_ad_mp_pur,
    asset_dvc_mp_dt,
    s_dvc_typ,
    s_prd_typ,
    s_asset_id,
    s_asset_typ,
    i_nw_imei_no,
    i_old_imei_no,
    s_trk_typ,
    s_old_sim_no,
    s_nw_sim_no,
    s_sim_op,
    s_mx_spd,
    s_crct_spd,
    s_svr_eng_name,
    s_svr_eng_mail,
    s_svr_eng_mb_no
  } = req.body

  if (!s_entity_id || !s_asset_id || !s_asset_typ) {
    return res.status(400).json({
      error: 's_entity_id or s_asset_id or s_asset_typ cannot be empty!'
    })
  }
  
  s_entity_id_and_name = s_entity_id + '^' + s_entity_id_and_name;

  try {
    const dataToInsert = {
        s_entity_id,
        s_entity_id_and_name,
        s_ad_mp_pur,
        asset_dvc_mp_dt,
        s_dvc_typ,
        s_prd_typ,
        s_asset_id,
        s_asset_typ,
        i_nw_imei_no,
        i_old_imei_no,
        s_trk_typ,
        s_old_sim_no,
        s_nw_sim_no,
        s_sim_op,
        s_mx_spd,
        s_crct_spd,
        s_svr_eng_name,
        s_svr_eng_mail,
        s_svr_eng_mb_no
    }    

    const query = {
      text: `
                INSERT INTO asset_device_mapping (
                    s_entity_id,
                    s_entity_id_and_name,
                    s_ad_mp_pur,
                    asset_dvc_mp_dt,
                    s_dvc_typ,
                    s_prd_typ,
                    s_asset_id,
                    s_asset_typ,
                    i_nw_imei_no,
                    i_old_imei_no,
                    s_trk_typ,
                    s_old_sim_no,
                    s_nw_sim_no,
                    s_sim_op,
                    s_mx_spd,
                    s_crct_spd,
                    s_svr_eng_name,
                    s_svr_eng_mail,
                    s_svr_eng_mb_no
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
                RETURNING *;
            `,
      values: [
        dataToInsert.s_entity_id,
        dataToInsert.s_entity_id_and_name,
        dataToInsert.s_ad_mp_pur,
        dataToInsert.asset_dvc_mp_dt,
        dataToInsert.s_dvc_typ,
        dataToInsert.s_prd_typ,
        dataToInsert.s_asset_id,
        dataToInsert.s_asset_typ,
        dataToInsert.i_nw_imei_no,
        dataToInsert.i_old_imei_no,
        dataToInsert.s_trk_typ,
        dataToInsert.s_old_sim_no,
        dataToInsert.s_nw_sim_no,
        dataToInsert.s_sim_op,
        dataToInsert.s_mx_spd,
        dataToInsert.s_crct_spd,
        dataToInsert.s_svr_eng_name,
        dataToInsert.s_svr_eng_mail,
        dataToInsert.s_svr_eng_mb_no
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      console.log('Data inserted successfully:', result.rows[0])
      res.status(200).json({
        message: 'Asset Device Mapping stored successfully!',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getAssetDeviceMapping = async(req,res) =>{
  try{
      const query = {
          text: 'SELECT s_entity_id,s_asset_id, i_nw_imei_no FROM asset_device_mapping;',
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
    setAssetDeviceMapping,
    getAssetDeviceMapping
}
