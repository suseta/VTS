const { getClient } = require('../db/connect');
const AWS = require('aws-sdk');

require('dotenv').config();
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const region = process.env.region;
const s3bucketName = process.env.s3bucketName;
var client;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region, 
});

const s3 = new AWS.S3();


const addDriver = async (req, res) => {
  let {
    s_entity_id,
      s_entity_id_and_name,
      s_drv_id,
      s_drv_img_path,
      s_drv_lic_img_path,
      s_drv_name,
      s_drv_mb_no,
      s_drv_mail,
      s_drv_add,
      s_lic_no,
      s_drv_city,
      s_drv_pin,
      lic_vld_dt,
      s_smart_crd_no,
      s_drv_cntry,
      s_drv_state,      
      s_hzrd_crt_no,
      hzrd_vld_dt,
      med_tst_dt,
      prd_trn_dt,
      driver_active_status,
      s_drv_rmk,
      ddt_exp_dt,
      cab_vld_dt,
      s_covid_status
  } = req.body
   
  if (
    !s_entity_id_and_name ||
    !s_drv_id ||
    !s_drv_name ||
    !s_drv_mb_no ||
    !s_drv_state ||
    !s_drv_cntry 
  ) {
    return res.status(400).json({
      error:
        's_entity_name or s_driver_id or s_driver_name or i_mobile_no or s_state_name or s_country_name cannot be empty!'
    })
  }

  s_entity_id_and_name = s_entity_id + '^' + s_entity_id_and_name;
  
  let driveFileName = req.files['s_drv_img_path'][0].originalname + '_' + new Date().getTime();
  console.log('v',req.body)
  const sDriverParams = {
    Bucket: s3bucketName,
    Key: `driver-images/${driveFileName}` ,
    Body: req.files['s_drv_img_path'][0].buffer,
    ContentType: req.files['s_drv_img_path'][0].mimetype,
  };
  let licenseFileName = req.files['s_drv_lic_img_path'][0].originalname + '_' + new Date().getTime();
  const sLicenseParams = {
    Bucket: s3bucketName,
    Key: `license-images/${licenseFileName}`,
    Body: req.files['s_drv_lic_img_path'][0].buffer,
    ContentType: req.files['s_drv_lic_img_path'][0].mimetype,
  };

  try {
    const sDriverUpload = await s3.upload(sDriverParams).promise();
    const sDriverUrl = sDriverUpload.Location;
    s_drv_img_path = sDriverUrl;
    
    const sLicenseUpload = await s3.upload(sLicenseParams).promise();
    const sLicenseUrl = sLicenseUpload.Location;
    s_drv_lic_img_path = sLicenseUrl;
    
    const dataToInsert = {
      s_entity_id,
      s_entity_id_and_name,
      s_drv_id,
      s_drv_img_path,
      s_drv_lic_img_path,
      s_drv_name,
      s_drv_mb_no,
      s_drv_mail,
      s_drv_add,
      s_lic_no,
      s_drv_city,
      s_drv_pin,
      lic_vld_dt,
      s_smart_crd_no,
      s_drv_cntry,
      s_drv_state,      
      s_hzrd_crt_no,
      hzrd_vld_dt,
      med_tst_dt,
      prd_trn_dt,
      driver_active_status,
      s_drv_rmk,
      ddt_exp_dt,
      cab_vld_dt,
      s_covid_status
    }
      
    const query = {
      text: `
                INSERT INTO driver_details (
                  s_entity_id,
                  s_entity_id_and_name,
                  s_drv_id,
                  s_drv_img_path,
                  s_drv_lic_img_path,
                  s_drv_name,
                  s_drv_mb_no,
                  s_drv_mail,
                  s_drv_add,
                  s_lic_no,
                  s_drv_city,
                  s_drv_pin,
                  lic_vld_dt,
                  s_smart_crd_no,
                  s_drv_cntry,
                  s_drv_state,      
                  s_hzrd_crt_no,
                  hzrd_vld_dt,
                  med_tst_dt,
                  prd_trn_dt,
                  driver_active_status,
                  s_drv_rmk,
                  ddt_exp_dt,
                  cab_vld_dt,
                  s_covid_status
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,$24, $25)
                RETURNING *;
            `,
      values: [
        dataToInsert.s_entity_id,
        dataToInsert.s_entity_id_and_name,
        dataToInsert.s_drv_id,
        dataToInsert.s_drv_img_path,
        dataToInsert.s_drv_lic_img_path,
        dataToInsert.s_drv_name,
        dataToInsert.s_drv_mb_no,
        dataToInsert.s_drv_mail,
        dataToInsert.s_drv_add,
        dataToInsert.s_lic_no,
        dataToInsert.s_drv_city,
        dataToInsert.s_drv_pin,
        dataToInsert.lic_vld_dt,
        dataToInsert.s_smart_crd_no,
        dataToInsert.s_drv_cntry,
        dataToInsert.s_drv_state,
        dataToInsert.s_hzrd_crt_no,
        dataToInsert.hzrd_vld_dt,
        dataToInsert.med_tst_dt,
        dataToInsert.prd_trn_dt,
        dataToInsert.driver_active_status,
        dataToInsert.s_drv_rmk,
        dataToInsert.ddt_exp_dt,
        dataToInsert.cab_vld_dt,
        dataToInsert.s_covid_status
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      res.status(200).json({
        message: 'Driver data stored successfully',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getDriverDetails = async(req,res) =>{
  try{
      const query = {
          text: 'SELECT s_entity_id_and_name,s_drv_id,s_drv_name FROM driver_details;',
          };
          
          client =await getClient(); 

          try {
              const result = await client.query(query);
              res.status(200).json({
                  message: 'Entity ID, Entity Name, Driver Id, Driver Name Fetched successfully',
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
  addDriver,
  getDriverDetails
}
