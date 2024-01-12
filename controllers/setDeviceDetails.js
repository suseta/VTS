const { getClient } = require('../db/connect')

var client

const setDeviceDetails = async (req, res) => {
  const {
    i_imei_no,
    s_sim_no,
    s_sim_op,
    s_dvc_typ,
    dvc_mdl_name,
    dvc_timezone,
    dvc_mfg_dt,
    dvc_add_dt,
    dvc_dlt_dt,
    s_atd,
    s_dvc_status,
    is_ign_wr,
    is_air_wr 
  } = req.body


  try {
    const dataToInsert = {
        i_imei_no,
        s_sim_no,
        s_sim_op,
        s_dvc_typ,
        dvc_mdl_name,
        dvc_timezone,
        dvc_mfg_dt,
        dvc_add_dt,
        dvc_dlt_dt,
        s_atd,
        s_dvc_status,
        is_ign_wr,
        is_air_wr  
    }

    const query = {
      text: `
                INSERT INTO device_details (
                    i_imei_no,
                    s_sim_no,
                    s_sim_op,
                    s_dvc_typ,
                    dvc_mdl_name,
                    dvc_timezone,
                    dvc_mfg_dt,
                    dvc_add_dt,
                    dvc_dlt_dt,
                    s_atd,
                    s_dvc_status,
                    is_ign_wr,
                    is_air_wr    
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING *;
            `,
      values: [
        dataToInsert.i_imei_no,
        dataToInsert.s_sim_no,
        dataToInsert.s_sim_op,
        dataToInsert.s_dvc_typ,
        dataToInsert.dvc_mdl_name,
        dataToInsert.dvc_timezone,
        dataToInsert.dvc_mfg_dt,
        dataToInsert.dvc_add_dt,
        dataToInsert.dvc_dlt_dt,
        dataToInsert.s_atd,
        dataToInsert.s_dvc_status,
        dataToInsert.is_ign_wr,
        dataToInsert.is_air_wr
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      res.status(200).json({
        message: 'Device Details stored successfully!',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getDeviceDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT i_imei_no,s_sim_no,s_sim_op,s_dvc_typ,dvc_mdl_name,dvc_timezone,dvc_mfg_dt,dvc_add_dt,dvc_dlt_dt,s_atd,s_dvc_status,is_ign_wr,is_air_wr FROM device_details;',
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
    setDeviceDetails,
    getDeviceDetails
}