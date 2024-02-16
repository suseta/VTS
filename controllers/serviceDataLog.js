const { query } = require('express')
const { getClient } = require('../db/connect')

var client

const getServiceDataLog = async(req,res) =>{
    const {
        i_imei_no,
        reqDate,
        s_port_no
      } = req.query
    
      try {
      const query = {
          text: `SELECT s_raw_pkt FROM datalog WHERE i_imei_no = '${i_imei_no}' AND s_port_no = '${s_port_no}' AND i_status = 1 AND DATE(svr_ht_ts) = '${reqDate}';`,
          }; 
          
          client =await getClient(); 

          try {
              const result = await client.query(query);
              res.status(200).json({
                  message: 'raw packet Fetched successfully',
                  data: result.rows
              });
          } finally {
              await client.end();
          }
  }catch(error){
      res.status(400).send({ message: error.message });
  }   
} 

const getParsedData = async (req, res) => {
    const { s_raw_pkt } = req.query;

    try {
        const query = {
            text: `SELECT s_unique_id from datalog WHERE s_raw_pkt = '${s_raw_pkt}';`,
        };

        client = await getClient();

        try {
            const result = await client.query(query);
            if (result.rowCount > 0) {
                let uniqueId = result.rows[0].s_unique_id;
                const parsed0Details = {
                    text: `SELECT s_pkt_hdr,s_frmwr_ver,s_pkt_typ,s_pkt_status,s_imei_no,s_asset_id,i_gps_status,gps_dt,gps_tm FROM gps_0_parsed_data WHERE s_unique_id = '${uniqueId}';`,
                };
                const gps0parsedData = await client.query(parsed0Details);
                const parsed1Details = {
                    text: `SELECT s_pkt_hdr,s_frmwr_ver,s_pkt_typ,s_pkt_status,s_imei_no,s_asset_id,i_gps_status,gps_dt,gps_tm FROM gps_1_parsed_data WHERE s_unique_id = '${uniqueId}';`,
                };
                const gps1parsedData = await client.query(parsed1Details);

                const combinedData = [...gps0parsedData.rows, ...gps1parsedData.rows];

                if (combinedData.length === 0) {
                    res.status(200).json({
                        message: 'No data found for the given raw packet',
                        data: []
                    });
                } else {
                    res.status(200).json({
                        message: 'Raw packet Fetched successfully',
                        data: combinedData
                    });
                }
            } else {
                res.status(404).json({
                    message: 'No data found for the given raw packet',
                    data: []
                });
            }
        } finally {
            await client.end();
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
 


module.exports = {
    getServiceDataLog,
    getParsedData
}

