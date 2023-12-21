const express = require('express')
const router = express.Router()

const { index, addDriver } = require('../controllers/driverDetails')
const {addVehicle } = require('../controllers/vehicleDetails')
const {setAssetInfo} = require('../controllers/setAssetInfo')
router.route('/').get(index)

router.route('/addVehicle').post(addVehicle)
// router.route("/vehicleDetails").post(vehicleDetails);
router.route('/addDriver').post(addDriver)
// router.route("/driverDetails").post(driverDetails);
router.route('/setAssetInfo').post(setAssetInfo)

module.exports = router
