const { getClient } = require('../db/connect');
const {sendEmail} = require('../mail/sendMail');


var client

const setEntityInfo = async (req, res) => {
    const {
            s_entity_id,
            s_entity_name,
            s_prnt_entity,
            s_entity_typ,
            s_entity_grp,
            s_entity_mail,
            s_entity_pass,
            s_entity_mb_no,
            s_entity_add,
            s_entity_pin,
            s_entity_country,
            s_entity_state,
            s_entity_city,
            b_is_billing,
            s_billing_name,
            s_billing_typ,
            s_billing_md,
            s_billing_svr_chrg,
            s_msr_unit,
            s_gst_no,
            s_sap_code,
            s_pan_no,
            s_svr_typ,
            s_mb_actv,
            i_ovr_spd_lmt,
            s_rep_wp,
            s_frc_entity_map,
            b_is_fnd,
            s_fnd_rt
    } = req.body
    
    try {
    const dataToInsert = {
        s_entity_id,
            s_entity_name,
            s_prnt_entity,
            s_entity_typ,
            s_entity_grp,
            s_entity_mail,
            s_entity_pass,
            s_entity_mb_no,
            s_entity_add,
            s_entity_pin,
            s_entity_country,
            s_entity_state,
            s_entity_city,
            b_is_billing,
            s_billing_name,
            s_billing_typ,
            s_billing_md,
            s_billing_svr_chrg,
            s_msr_unit,
            s_gst_no,
            s_sap_code,
            s_pan_no,
            s_svr_typ,
            s_mb_actv,
            i_ovr_spd_lmt,
            s_rep_wp,
            s_frc_entity_map,
            b_is_fnd,
            s_fnd_rt   
    }

    const query = {
        text: `
                INSERT INTO entity_details (
                    s_entity_id,
                    s_entity_name,
                    s_prnt_entity,
                    s_entity_typ,
                    s_entity_grp,
                    s_entity_mail,
                    s_entity_pass,
                    s_entity_mb_no,
                    s_entity_add,
                    s_entity_pin,
                    s_entity_country,
                    s_entity_state,
                    s_entity_city,
                    b_is_billing,
                    s_billing_name,
                    s_billing_typ,
                    s_billing_md,
                    s_billing_svr_chrg,
                    s_msr_unit,
                    s_gst_no,
                    s_sap_code,
                    s_pan_no,
                    s_svr_typ,
                    s_mb_actv,
                    i_ovr_spd_lmt,
                    s_rep_wp,
                    s_frc_entity_map,
                    b_is_fnd,
                    s_fnd_rt       
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25,$26, $27, $28, $29)
                RETURNING *;
            `,
        values: [
                    dataToInsert.s_entity_id,
                    dataToInsert.s_entity_name,
                    dataToInsert.s_prnt_entity,
                    dataToInsert.s_entity_typ,
                    dataToInsert.s_entity_grp,
                    dataToInsert.s_entity_mail,
                    dataToInsert.s_entity_pass,
                    dataToInsert.s_entity_mb_no,
                    dataToInsert.s_entity_add,
                    dataToInsert.s_entity_pin,
                    dataToInsert.s_entity_country,
                    dataToInsert.s_entity_state,
                    dataToInsert.s_entity_city,
                    dataToInsert.b_is_billing,
                    dataToInsert.s_billing_name,
                    dataToInsert.s_billing_typ,
                    dataToInsert.s_billing_md,
                    dataToInsert.s_billing_svr_chrg,
                    dataToInsert.s_msr_unit,
                    dataToInsert.s_gst_no,
                    dataToInsert.s_sap_code,
                    dataToInsert.s_pan_no,
                    dataToInsert.s_svr_typ,
                    dataToInsert.s_mb_actv,
                    dataToInsert.i_ovr_spd_lmt,
                    dataToInsert.s_rep_wp,
                    dataToInsert.s_frc_entity_map,
                    dataToInsert.b_is_fnd,
                    dataToInsert.s_fnd_rt
        ]
    }
    client = await getClient()
    try {
        const result = await client.query(query)
        if(dataToInsert.s_entity_mail != null){
            sendEmail(dataToInsert.s_entity_name,dataToInsert.s_entity_mail,dataToInsert.s_entity_id,dataToInsert.s_entity_pass)
        }          
        res.status(200).json({
        message: 'Entity info stored successfully!',
        data: result.rows[0]
        })
    } finally {
        await client.end()
    }
    } catch (error) {
    res.status(400).send({ message: error.message })
    }
}

const getAllEntityNameList = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT s_entity_id,s_entity_name FROM entity_details;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                res.status(200).json({
                    message: 'Entity ID and Entity Name Fetched successfully',
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
    setEntityInfo,
    getAllEntityNameList
}