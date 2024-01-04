const express = require('express')
const router = express.Router()

const { index, addDriver } = require('../controllers/driverDetails')
const {addVehicle } = require('../controllers/vehicleDetails')
const {setAssetInfo,getFuelDetails,getAssetTypeDetails,getAssetCapacityDetails} = require('../controllers/setAssetInfo')
const {setEntityInfo,getAllEntityNameList} = require('../controllers/setEntityInfo');
const {timezones,getAllCountries,getAllState,getAllCity} = require('../controllers/helper');
const{setTransporterInfo, getCustomerEntityDetails} = require('../controllers/setTransporterInfo') 
const {setLocationInfo, getAllLocationNameDetails, getAllLocationPinDetails} = require('../controllers/setLocInfo')

router.route('/').get(index)

router.route('/addVehicle').post(addVehicle);
// router.route("/vehicleDetails").post(vehicleDetails);
router.route('/addDriver').post(addDriver);
// router.route("/driverDetails").post(driverDetails);
router.route('/setAssetInfo').post(setAssetInfo);
router.route('/getFuelDetails').get(getFuelDetails);
router.route('/getAssetTypeDetails').get(getAssetTypeDetails);
router.route('/getAssetCapacityDetails').get(getAssetCapacityDetails);
router.route('/setEntityInfo').post(setEntityInfo);
router.route('/getAllEntityNameList').get(getAllEntityNameList);
router.route('/getAllCountries').get(getAllCountries);
router.route('/getAllState').get(getAllState);
router.route('/getAllCity').get(getAllCity);
router.route('/timezones').get(timezones);
router.route('/setTransporterInfo').post(setTransporterInfo);
router.route('/getCustomerEntityDetails').get(getCustomerEntityDetails);
router.route('/setLocationInfo').post(setLocationInfo);
router.route('/getAllLocationNameDetails').get(getAllLocationNameDetails);
router.route('/getAllLocationPinDetails').get(getAllLocationPinDetails);



module.exports = router
