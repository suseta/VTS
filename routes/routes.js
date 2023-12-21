const express = require('express')
const router = express.Router()

const { index, addDriver } = require('../controllers/driverDetails')
const {addVehicle } = require('../controllers/vehicleDetails')
const {setAssetInfo,getFuelDetails,getAssetTypeDetails,getAssetCapacityDetails} = require('../controllers/setAssetInfo')
router.route('/').get(index)

router.route('/addVehicle').post(addVehicle);
// router.route("/vehicleDetails").post(vehicleDetails);
router.route('/addDriver').post(addDriver);
// router.route("/driverDetails").post(driverDetails);
router.route('/setAssetInfo').post(setAssetInfo);
router.route('/getFuelDetails').get(getFuelDetails);
router.route('/getAssetTypeDetails').get(getAssetTypeDetails);
router.route('/getAssetCapacityDetails').get(getAssetCapacityDetails);

module.exports = router
