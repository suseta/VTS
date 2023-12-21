const { getClient } = require('../db/connect')

var client

const setAssetInfo = async (req, res) => {
  const {
    fuel_type,
    asset_type,
    asset_capacity  
  } = req.body

  try {
    const dataToInsert = {
        fuel_type,
        asset_type,
        asset_capacity  
    }

    const query = {
      text: `
                INSERT INTO asset_info (
                    fuel_type,
                    asset_type,
                    asset_capacity     
                )
                VALUES ($1, $2, $3)
                RETURNING *;
            `,
      values: [
        dataToInsert.fuel_type,
        dataToInsert.asset_type,
        dataToInsert.asset_capacity
      ]
    }
    client = await getClient()
    try {
      const result = await client.query(query)
      console.log('Data inserted successfully:', result.rows[0])
      res.status(200).json({
        message: 'asset info stored successfully!',
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
    setAssetInfo
}
