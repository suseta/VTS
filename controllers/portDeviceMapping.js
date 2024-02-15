const { getClient } = require('../db/connect')

var client

const setPortDeviceMapping = async (req, res) => {
  let {
    i_imei_no,
    i_port_no,
    prt_dvc_mp_dt,
    prt_dvc_unmp_dt
  } = req.body

  if (!i_imei_no || !i_port_no ) {
    return res.status(400).json({
      error: 'imei no or port no cannot be empty!'
    })
  }
  

  try {
    const dataToInsert = {
        i_imei_no,
        i_port_no,
        prt_dvc_mp_dt,
        prt_dvc_unmp_dt
    }    

    const query = {
      text: `
                INSERT INTO port_device_mapping (
                    i_imei_no,
                    i_port_no,
                    prt_dvc_mp_dt,
                    prt_dvc_unmp_dt
                )
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `,
      values: [
        dataToInsert.i_imei_no,
        dataToInsert.i_port_no,
        dataToInsert.prt_dvc_mp_dt,
        dataToInsert.prt_dvc_unmp_dt
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      console.log('Data inserted successfully:', result.rows[0])
      res.status(200).json({
        message: 'Port Device Mapping data stored successfully!',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getPortDeviceMapping = async(req,res) =>{
  try{
      const imeiNo = req.query.i_imei_no;
      const query = {
          text: `SELECT i_port_no FROM port_device_mapping WHERE i_imei_no = '${imeiNo}';`,
          };
          
          client =await getClient(); 

          try {
              const result = await client.query(query);
              res.status(200).json({
                  message: 'i_port_no Fetched successfully',
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
    setPortDeviceMapping,
    getPortDeviceMapping
}
