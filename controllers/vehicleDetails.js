const { getClient } = require('../db/connect')

var client

const addVehicle = async (req, res) => {
  const {
    s_entity_identity,
    s_transporter_id,
    s_asset_id,
    s_asset_name,
    imei_number,
    s_asset_type,
    s_fuel_type,
    i_tare_weight,
    i_gross_weight,
    s_asset_model,
    capacity_name,
    s_vendor_name,
    registration_date,
    mfg_dt,
    rc_validity_date,
    gate_pass,
    fitness_certificate_date,
    polution_certificate_date,
    isurance_validity_date,
    state_permit_date,
    international_permit_date,
    goods_permit_date,
    road_permit_date,
    battery_purchase_date,
    battery_expiry_date,
    i_standard_km,
    peso_license_date,
    rule_18,
    rule_19,
    s_driver_name,
    s_billing_remark,
    s_customer_remark,
    s_fnd_device_id,
    s_site_location,
    s_national_certificate_no,
    national_test_date,
    national_validity_date,
    vehicle_active_status,
    i_seating_capacity
  } = req.body

  if (!s_entity_identity || !s_asset_id || !s_asset_type) {
    return res.status(400).json({
      error: 's_entity_identity or s_asset_id or s_asset_type cannot be empty!'
    })
  }

  try {
    const dataToInsert = {
      s_entity_identity,
      s_transporter_id,
      s_asset_id,
      s_asset_name,
      imei_number,
      s_asset_type,
      s_fuel_type,
      i_tare_weight,
      i_gross_weight,
      s_asset_model,
      capacity_name,
      s_vendor_name,
      registration_date,
      mfg_dt,
      rc_validity_date,
      gate_pass,
      fitness_certificate_date,
      polution_certificate_date,
      isurance_validity_date,
      state_permit_date,
      international_permit_date,
      goods_permit_date,
      road_permit_date,
      battery_purchase_date,
      battery_expiry_date,
      i_standard_km,
      peso_license_date,
      rule_18,
      rule_19,
      s_driver_name,
      s_billing_remark,
      s_customer_remark,
      s_fnd_device_id,
      s_site_location,
      s_national_certificate_no,
      national_test_date,
      national_validity_date,
      vehicle_active_status,
      i_seating_capacity
    }

    const query = {
      text: `
                INSERT INTO asset_details (
                    s_entity_identity, 
                    s_transporter_id, 
                    s_asset_id, 
                    s_asset_name, 
                    imei_number, 
                    s_asset_type, 
                    s_fuel_type,
                    i_tare_weight, 
                    i_gross_weight, 
                    s_asset_model, 
                    capacity_name, 
                    s_vendor_name, 
                    registration_date, 
                    mfg_dt, 
                    rc_validity_date, 
                    gate_pass, 
                    fitness_certificate_date, 
                    polution_certificate_date, 
                    isurance_validity_date, 
                    state_permit_date, 
                    international_permit_date, 
                    goods_permit_date, 
                    road_permit_date,
                    battery_purchase_date,
                    battery_expiry_date,
                    i_standard_km,
                    peso_license_date,
                    rule_18,
                    rule_19,
                    s_driver_name,
                    s_billing_remark,
                    s_customer_remark,
                    s_fnd_device_id,
                    s_site_location,
                    s_national_certificate_no,
                    national_test_date,
                    national_validity_date,
                    vehicle_active_status,
                    i_seating_capacity
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38)
                RETURNING *;
            `,
      values: [
        dataToInsert.s_entity_identity,
        dataToInsert.s_transporter_id,
        dataToInsert.s_asset_id,
        dataToInsert.s_asset_name,
        dataToInsert.imei_number,
        dataToInsert.s_asset_type,
        dataToInsert.s_fuel_type,
        dataToInsert.i_tare_weight,
        dataToInsert.i_gross_weight,
        dataToInsert.s_asset_model,
        dataToInsert.capacity_name,
        dataToInsert.s_vendor_name,
        dataToInsert.registration_date,
        dataToInsert.mfg_dt,
        dataToInsert.rc_validity_date,
        dataToInsert.gate_pass,
        dataToInsert.fitness_certificate_date,
        dataToInsert.polution_certificate_date,
        dataToInsert.isurance_validity_date,
        dataToInsert.state_permit_date,
        dataToInsert.international_permit_date,
        dataToInsert.goods_permit_date,
        dataToInsert.road_permit_date,
        dataToInsert.battery_purchase_date,
        dataToInsert.battery_expiry_date,
        dataToInsert.i_standard_km,
        dataToInsert.peso_license_date,
        dataToInsert.rule_18,
        dataToInsert.rule_19,
        dataToInsert.s_driver_name,
        dataToInsert.s_billing_remark,
        dataToInsert.s_customer_remark,
        dataToInsert.s_fnd_device_id,
        dataToInsert.s_site_location,
        dataToInsert.s_national_certificate_no,
        dataToInsert.national_test_date,
        dataToInsert.national_validity_date,
        dataToInsert.vehicle_active_status,
        dataToInsert.i_seating_capacity
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

module.exports = {
  addVehicle
}
