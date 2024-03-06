const { getClient } = require('../db/connect')

var client

const setDeviceDetails = async (req, res) => {
  const {
    i_imei_no,
    s_dvc_typ,
    dvc_mdl_name,
    dvc_timezone,
    dvc_mfg_dt,
    dvc_add_dt,
    s_atd,
    is_ign_wr,
    is_air_wr 
  } = req.body


  try {
    const dataToInsert = {
        i_imei_no,
        s_dvc_typ,
        dvc_mdl_name,
        dvc_timezone,
        dvc_mfg_dt,
        dvc_add_dt,
        s_atd,
        is_ign_wr,
        is_air_wr  
    }

    const query = {
      text: `
                INSERT INTO device_details (
                    i_imei_no,
                    s_dvc_typ,
                    dvc_mdl_name,
                    dvc_timezone,
                    dvc_mfg_dt,
                    dvc_add_dt,
                    dvc_dlt_dt,
                    s_atd,
                    is_dvc_status,
                    is_ign_wr,
                    is_air_wr    
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *;
            `,
      values: [
        dataToInsert.i_imei_no,
        dataToInsert.s_dvc_typ,
        dataToInsert.dvc_mdl_name,
        dataToInsert.dvc_timezone,
        dataToInsert.dvc_mfg_dt,
        dataToInsert.dvc_add_dt,
        null,
        dataToInsert.s_atd,
        false,
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

const deActivateDeviceDetails = async (req, res) => {
  const { i_imei_no, dvc_dlt_dt } = req.body;
  try {
      const query = {
          text: `
              UPDATE device_details 
              SET dvc_dlt_dt = $1, is_dvc_status = $2 
              WHERE i_imei_no = $3
              RETURNING *;
          `,
          values: [dvc_dlt_dt, false, i_imei_no]
      };

      client = await getClient();
      try {
          const result = await client.query(query);
          res.status(200).json({
              message: 'Device Details updated successfully!',
              data: result.rows[0].i_imei_no
          });
      } finally {
          await client.end();
      }
  } catch (error) {
      res.status(400).send({ message: error.message });
  }
};

const getDeviceDetails = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT i_imei_no,s_dvc_typ,dvc_mdl_name,dvc_timezone,dvc_mfg_dt,dvc_add_dt,dvc_dlt_dt,s_atd,is_dvc_status,is_ign_wr,is_air_wr FROM device_details;',
        };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                const formattedData = result.rows.map((row) => ({
                    ...row,
                    dvc_mfg_dt: row.dvc_mfg_dt ? new Date(row.dvc_mfg_dt).toLocaleDateString() : null,
                    dvc_add_dt: row.dvc_add_dt ? new Date(row.dvc_add_dt).toLocaleDateString() : null,
                    dvc_dlt_dt: row.dvc_dlt_dt ? new Date(row.dvc_dlt_dt).toLocaleDateString() : null,
                }));
                res.status(200).json({
                    message: 'Device Data Fetched successfully',
                    data: formattedData
                });
            } finally {
                await client.end();
            }
    }catch(error){
        res.status(400).send({ message: error.message });
    }   
}

const getActiveDeviceDetails = async(req,res) =>{
  try{
      const query = {
          text: 'SELECT i_imei_no,s_dvc_typ,dvc_mdl_name,dvc_timezone,dvc_mfg_dt,dvc_add_dt,dvc_dlt_dt,s_atd,is_dvc_status,is_ign_wr,is_air_wr FROM device_details where is_dvc_status = true ;',
      };
          
          client =await getClient(); 

          try {
              const result = await client.query(query);
              const formattedData = result.rows.map((row) => ({
                  ...row,
                  dvc_mfg_dt: row.dvc_mfg_dt ? new Date(row.dvc_mfg_dt).toLocaleDateString() : null,
                  dvc_add_dt: row.dvc_add_dt ? new Date(row.dvc_add_dt).toLocaleDateString() : null,
                  dvc_dlt_dt: row.dvc_dlt_dt ? new Date(row.dvc_dlt_dt).toLocaleDateString() : null,
              }));
              res.status(200).json({
                  message: 'Device Data Fetched successfully',
                  data: formattedData
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
    deActivateDeviceDetails,
    getDeviceDetails,
    getActiveDeviceDetails
}