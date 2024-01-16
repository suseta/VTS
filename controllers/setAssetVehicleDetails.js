const { getClient } = require('../db/connect')

var client

const addVehicle = async (req, res) => {
  let {
    s_asset_id,
    s_asset_mk,
    s_asset_mdl,
    s_entity_id,
    s_entity_id_and_name,
    s_trans_name,
    s_fuel_typ,
    s_asset_cap,
    s_asset_typ,
    s_site_loc,
    i_bat_volt,
    i_mileage,
    idle_time,
    reg_dt,
    mfg_yr,
    reg_vld_dt,
    gt_pass_vld_dt,
    ftns_crt_vld_dt,
    plt_crt_vld_dt,
    ins_vld_dt,
    state_permit_vld_dt,
    nat_permit_vld_dt,
    intrnat_permit_vld_dt,
    gds_permit_vld_dt,
    rd_permit_vld_dt,
    bat_pur_dt,
    bat_exp_dt,
    i_std_km,
    peso_lic_dt,
    rule_18_dt,
    rule_19_dt,
    s_fnd_dvc_id
  } = req.body

  if (!s_entity_id || !s_asset_id || !s_asset_typ) {
    return res.status(400).json({
      error: 's_entity_id or s_asset_id or s_asset_typ cannot be empty!'
    })
  }
  
  s_entity_id_and_name = s_entity_id + '^' + s_entity_id_and_name;

  try {
    const dataToInsert = {
      s_asset_id,
      s_entity_id,
      s_asset_mk,
      s_asset_mdl,
      s_entity_id_and_name,
      s_trans_name,
      s_fuel_typ,
      s_asset_cap,
      s_asset_typ,
      s_site_loc,
      i_bat_volt,
      i_mileage,
      idle_time,
      reg_dt,
      mfg_yr,
      reg_vld_dt,
      gt_pass_vld_dt,
      ftns_crt_vld_dt,
      plt_crt_vld_dt,
      ins_vld_dt,
      state_permit_vld_dt,
      nat_permit_vld_dt,
      intrnat_permit_vld_dt,
      gds_permit_vld_dt,
      rd_permit_vld_dt,
      bat_pur_dt,
      bat_exp_dt,
      i_std_km,
      peso_lic_dt,
      rule_18_dt,
      rule_19_dt,
      s_fnd_dvc_id
    }
    

    const query = {
      text: `
                INSERT INTO asset_details (
                  s_asset_id,
                  s_entity_id,
                  s_asset_mk,
                  s_asset_mdl,
                  s_entity_id_and_name,
                  s_trans_name,
                  s_fuel_typ,
                  s_asset_cap,
                  s_asset_typ,
                  s_site_loc,
                  i_bat_volt,
                  i_mileage,
                  idle_time,
                  reg_dt,
                  mfg_yr,
                  reg_vld_dt,
                  gt_pass_vld_dt,
                  ftns_crt_vld_dt,
                  plt_crt_vld_dt,
                  ins_vld_dt,
                  state_permit_vld_dt,
                  nat_permit_vld_dt,
                  intrnat_permit_vld_dt,
                  gds_permit_vld_dt,
                  rd_permit_vld_dt,
                  bat_pur_dt,
                  bat_exp_dt,
                  i_std_km,
                  peso_lic_dt,
                  rule_18_dt,
                  rule_19_dt,
                  s_fnd_dvc_id
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32)
                RETURNING *;
            `,
      values: [
        dataToInsert.s_asset_id,
        dataToInsert.s_entity_id,
        dataToInsert.s_asset_mk,
        dataToInsert.s_asset_mdl,
        dataToInsert.s_entity_id_and_name,
        dataToInsert.s_trans_name,
        dataToInsert.s_fuel_typ,
        dataToInsert.s_asset_cap,
        dataToInsert.s_asset_typ,
        dataToInsert.s_site_loc,
        dataToInsert.i_bat_volt,
        dataToInsert.i_mileage,
        dataToInsert.idle_time,
        dataToInsert.reg_dt,
        dataToInsert.mfg_yr,
        dataToInsert.reg_vld_dt,
        dataToInsert.gt_pass_vld_dt,
        dataToInsert.ftns_crt_vld_dt,
        dataToInsert.plt_crt_vld_dt,
        dataToInsert.ins_vld_dt,
        dataToInsert.state_permit_vld_dt,
        dataToInsert.nat_permit_vld_dt,
        dataToInsert.intrnat_permit_vld_dt,
        dataToInsert.gds_permit_vld_dt,
        dataToInsert.rd_permit_vld_dt,
        dataToInsert.bat_pur_dt,
        dataToInsert.bat_exp_dt,
        dataToInsert.i_std_km,
        dataToInsert.peso_lic_dt,
        dataToInsert.rule_18_dt,
        dataToInsert.rule_19_dt,
        dataToInsert.s_fnd_dvc_id
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      console.log('Data inserted successfully:', result.rows[0])
      res.status(200).json({
        message: 'Asset data stored successfully!',
        data: result.rows[0]
      })
    } finally {
      await client.end()
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getVehicleDetails = async (req, res) => {
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
          text: `SELECT s_asset_id, s_entity_id, s_trans_name FROM asset_details ${whereClause};`,
          values: queryParams,
      };

      const client = await getClient();

      try {
          const result = await client.query(query);
          res.status(200).json({
              message: 'Asset Vehicle Mapping details fetched successfully',
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
  addVehicle,
  getVehicleDetails
}
