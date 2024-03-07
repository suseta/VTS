const { getClient } = require('../db/connect')

const {sendEmail} = require('../mail/sendMail');


var client

const setUserInfo = async (req, res) => {
    let {
        s_entity_id,
        s_entity_id_and_name,
        s_user_type,
        s_trans_id,
        s_trans_name,
        trans_tmz,
        s_trans_add,
        s_trans_mail,
        s_trans_mb_no,
        s_trans_usr,
        s_trans_pass,
        s_trans_inact_tm,
        s_trans_start_dt,
        s_trans_due_dt,
        s_trans_ext_dt,
        s_trans_act_status,
        s_trans_pan,
        s_vh_sub_sync,
        s_vh_sub_end,
        b_is_bank,
        s_trans_bnk,
        s_trans_brn,
        s_trans_acc_no,
        s_trans_ifsc_cd 
    } = req.body

    s_entity_id_and_name = s_entity_id + '^' + s_entity_id_and_name;
    
    try {
    const dataToInsert = {
        s_entity_id,
        s_entity_id_and_name,
        s_user_type,
        s_trans_id,
        s_trans_name,
        trans_tmz,
        s_trans_add,
        s_trans_mail,
        s_trans_mb_no,
        s_trans_usr,
        s_trans_pass,
        s_trans_inact_tm,
        s_trans_start_dt,
        s_trans_due_dt,
        s_trans_ext_dt,
        s_trans_act_status,
        s_trans_pan,
        s_vh_sub_sync,
        s_vh_sub_end,
        b_is_bank,
        s_trans_bnk,
        s_trans_brn,
        s_trans_acc_no,
        s_trans_ifsc_cd   
    }

    const query = {
        text: `
                INSERT INTO transporter_details (
                    s_entity_id,
                    s_entity_id_and_name,
                    s_user_type,
                    s_trans_id,
                    s_trans_name,
                    trans_tmz,
                    s_trans_add,
                    s_trans_mail,
                    s_trans_mb_no,
                    s_trans_usr,
                    s_trans_pass,
                    s_trans_inact_tm,
                    s_trans_start_dt,
                    s_trans_due_dt,
                    s_trans_ext_dt,
                    s_trans_act_status,
                    s_trans_pan,
                    s_vh_sub_sync,
                    s_vh_sub_end,
                    b_is_bank,
                    s_trans_bnk,
                    s_trans_brn,
                    s_trans_acc_no,
                    s_trans_ifsc_cd     
                )
                VALUES ($1, $2,  $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
                RETURNING *;
            `,
        values: [
                    dataToInsert.s_entity_id,
                    dataToInsert.s_entity_id_and_name,
                    dataToInsert.s_user_type,
                    dataToInsert.s_trans_id,
                    dataToInsert.s_trans_name,
                    dataToInsert.trans_tmz,
                    dataToInsert.s_trans_add,
                    dataToInsert.s_trans_mail,
                    dataToInsert.s_trans_mb_no,
                    dataToInsert.s_trans_usr,
                    dataToInsert.s_trans_pass,
                    dataToInsert.s_trans_inact_tm,
                    dataToInsert.s_trans_start_dt,
                    dataToInsert.s_trans_due_dt,
                    dataToInsert.s_trans_ext_dt,
                    dataToInsert.s_trans_act_status,
                    dataToInsert.s_trans_pan,
                    dataToInsert.s_vh_sub_sync,
                    dataToInsert.s_vh_sub_end,
                    dataToInsert.b_is_bank,
                    dataToInsert.s_trans_bnk,
                    dataToInsert.s_trans_brn,
                    dataToInsert.s_trans_acc_no,
                    dataToInsert.s_trans_ifsc_cd
        ]
    }
    client = await getClient()
    try {
        const result = await client.query(query)

        if(dataToInsert.s_trans_mail != null){
            sendEmail(dataToInsert.s_trans_name,dataToInsert.s_trans_mail,dataToInsert.s_trans_id,dataToInsert.s_trans_pass)
        }  

        const formattedData = result.rows.map((row) => ({
            ...row,
            s_trans_start_dt: row.s_trans_start_dt ? new Date(row.s_trans_start_dt).toLocaleDateString() : null,
            s_trans_due_dt: row.s_trans_due_dt ? new Date(row.s_trans_due_dt).toLocaleDateString() : null,
            s_trans_ext_dt: row.s_trans_ext_dt ? new Date(row.s_trans_ext_dt).toLocaleDateString() : null,
        }));

        res.status(200).json({
        message: 'Transporter Entity info stored successfully!',
        data: result.rows[0]
        })
    } finally {
        await client.end()
    }
    } catch (error) {
    res.status(400).send({ message: error.message })
    }
}


const getTransporterDetails = async (req, res) => {
    try {
        let queryParams = [];
        let conditions = [];
        var pararmsCount=1;

        if (req.query.s_entity_id) {
            conditions.push(`s_entity_id = $${pararmsCount}`);
            queryParams.push(req.query.s_entity_id);
            pararmsCount++;
        }

        if (req.query.s_entity_id_and_name) {
            conditions.push(`s_entity_id_and_name = $${pararmsCount}`);
            queryParams.push(req.query.s_entity_id_and_name);
        }

        let whereClause = '';
        if (conditions.length > 0) {
            whereClause = 'WHERE ' + conditions.join(' OR ');
        }

        const query = {
            text: `SELECT s_entity_id, s_entity_id_and_name, s_trans_id, s_trans_name FROM transporter_details ${whereClause};`,
            values: queryParams,
        };

        const client = await getClient();

        try {
            const result = await client.query(query);
            res.status(200).json({
                message: 'Transporter details fetched successfully',
                data: result.rows,
            });
        } finally {
            await client.end();
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};



module.exports = {
    setUserInfo,
    getTransporterDetails
} 