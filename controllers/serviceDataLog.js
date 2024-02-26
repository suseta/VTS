const { query } = require('express')
const { getClient } = require('../db/connect')

var client

const getServiceDataLog = async (req, res) => {
    const {
        i_imei_no,
        reqDate,
        s_port_no
    } = req.query

    try {
        const query = {
            text: `SELECT s_raw_pkt FROM datalog WHERE i_imei_no = '${i_imei_no}' AND s_port_no = '${s_port_no}' AND i_status = 1 AND DATE(svr_ht_ts) = '${reqDate}';`,
        };

        client = await getClient();

        try {
            const result = await client.query(query);
            res.status(200).json({
                message: 'raw packet Fetched successfully',
                data: result.rows
            });
        } finally {
            await client.end();
        }
    } catch (error) {
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
                    text: `SELECT  
                    s_pkt_hdr,
                    s_frmwr_ver,
                    s_pkt_typ,
                    s_pkt_status,
                    s_imei_no,
                    s_asset_id,
                    i_gps_status,
                    gps_dt,
                    gps_tm,
                    d_lat,
                    s_lat_dir,
                    d_long,
                    s_long_dir,
                    d_alt,
                    d_spd,
                    s_grd_crs,
                    i_sat_cnt,
                    d_hdop,
                    d_pdop,
                    s_ntw_op,
                    s_ntw_typ,
                    d_sgnl_pwr,
                    d_mn_pwr,
                    d_int_bat_volt,
                    s_ign_ip,
                    s_buz_op,
                    s_dyn_f1,
                    s_bt_f,
                    s_u_art,
                    s_ext_adc_val,
                    s_dvc_state,
                    s_odometer,
                    s_pkt_cnt,
                    s_crc
                    FROM gps_0_parsed_data WHERE s_unique_id = '${uniqueId}';`,
                };
                const gps0parsedData = await client.query(parsed0Details);
                const parsed1Details = {
                    text: `SELECT  
                    s_pkt_hdr,
                    s_frmwr_ver,
                    s_pkt_typ,
                    s_pkt_status,
                    s_imei_no,
                    s_asset_id,
                    i_gps_status,
                    gps_dt,
                    gps_tm,
                    d_lat,
                    s_lat_dir,
                    d_long,
                    s_long_dir,
                    d_alt,
                    d_spd,
                    s_grd_crs,
                    i_sat_cnt,
                    d_hdop,
                    d_pdop,
                    s_ntw_op,
                    s_ntw_typ,
                    d_sgnl_pwr,
                    d_mn_pwr,
                    d_int_bat_volt,
                    s_ign_ip,
                    s_buz_op,
                    s_dyn_f1,
                    s_bt_f,
                    s_u_art,
                    s_ext_adc_val,
                    s_dvc_state,
                    s_odometer,
                    s_pkt_cnt,
                    s_crc
                    FROM gps_1_parsed_data WHERE s_unique_id = '${uniqueId}';`,
                };
                const gps1parsedData = await client.query(parsed1Details);

                const combinedData = [...gps0parsedData.rows, ...gps1parsedData.rows].map(row => ({
                    ...row,
                    gps_dt: new Date(row.gps_dt).toISOString().split('T')[0] // Extracting only date
                }));

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


const getClientDeviceDetails = async (req, res) => {
    const { s_entity_id } = req.query;

    try {
        const query = {
            text: `SELECT s_asset_id, i_nw_imei_no FROM asset_device_mapping where s_entity_id = '${s_entity_id}';`,
        };

        client = await getClient();

        try {
            const result = await client.query(query);
            if (result.rowCount > 0) {
                const allData = [];

                for (let row of result.rows) {
                    const { s_asset_id, i_nw_imei_no } = row;
                    const existingDataQuery = {
                        text: `SELECT * FROM lastGpsParsedDataInfo WHERE "s_imei_no" = $1 AND "s_asset_id" = $2`,
                        values: [i_nw_imei_no, s_asset_id],
                    };
                    const existingDataResult = await client.query(existingDataQuery);
                    if (existingDataResult.rowCount !== 0) {
                        const formattedData = existingDataResult.rows.map(item => ({
                            ...item,
                            gps_dt: new Date(item.gps_dt).toISOString().split('T')[0], // Extracting date part
                        }));
                        allData.push(formattedData);
                    }
                    
                }
                res.status(200).json({
                    message: 'Client Parsed Datalog fetched successfully',
                    data: allData
                });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        } finally {
            await client.end();
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


module.exports = {
        getServiceDataLog,
        getParsedData,
        getClientDeviceDetails
}

