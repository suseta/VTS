const { getClient } = require('../db/connect')

var client

const getServiceDataLog = async(req,res) =>{
    const {
        i_imei_no,
        reqDate,
        s_port_no
      } = req.body
    
    
      try {
        const dataToInsert = {
            i_imei_no,
            reqDate,
            s_port_no  
        }  
      const query = {
          text: `SELECT s_raw_pkt FROM datalog WHERE i_imei_no = '${dataToInsert.i_imei_no}' AND s_port_no = '${dataToInsert.s_port_no}' AND i_status = 1 AND DATE(svr_ht_ts) = '${dataToInsert.reqDate}';`,
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


module.exports = {
    getServiceDataLog
}

