const express = require('express')
const router = express.Router()

const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });


const { addDriver, getDriverDetails } = require('../controllers/driverDetails')
const {
  setEntityInfo,
  getAllEntityNameList
} = require('../controllers/setEntityInfo')
const {
  index,
  timezones,
  getAllCountries,
  getAllState,
  getAllCity
} = require('../controllers/helper')
const {
  setTransporterInfo,
  getTransporterDetails
} = require('../controllers/setTransporterInfo')
// const { addVehicle } = require('../controllers/vehicleDetails')
const {
  setAssetInfo,
  getAssetTypeDetails,
  getAssetCapacityDetails
} = require('../controllers/setAssetInfo')

// const {
//   setLocationInfo,
//   getAllLocationNameDetails,
//   getAllLocationPinDetails
// } = require('../controllers/old/setLocInfo')
// const { setAssetDetails } = require('../controllers/setAssetDetails')
const { setDeviceDetails,getDeviceDetails } = require('../controllers/setDeviceDetails')
const {getDeviceTypeDetails} = require('../controllers/deviceType')
// const { assetDeviceMapping } = require('../controllers/assetDeviceMapping')
// const { assetDriverMapping } = require('../controllers/assetDriverMapping')

router.route('/').get(index);
router.route('/setEntityInfo').post(setEntityInfo);
router.route('/getAllEntityNameList').get(getAllEntityNameList);
router.route('/getAllCountries').get(getAllCountries);
router.route('/getAllState').get(getAllState);
router.route('/getAllCity').get(getAllCity);
router.route('/timezones').get(timezones);
router.route('/setTransporterInfo').post(setTransporterInfo);
router.route('/getTransporterDetails').get(getTransporterDetails);
router.route('/addDriver').post(upload.fields([{ name: 's_drv_img_path', maxCount: 1 }, { name: 's_drv_lic_img_path', maxCount: 1 }]), addDriver);
router.route('/getDriverDetails').get(getDriverDetails);
router.route('/setAssetInfo').post(setAssetInfo);
router.route('/getAssetTypeDetails').get(getAssetTypeDetails);
router.route('/getAssetCapacityDetails').get(getAssetCapacityDetails); 
router.route('/setDeviceDetails').post(setDeviceDetails);
router.route('/getDeviceDetails').get(getDeviceDetails);
router.route('/getDeviceTypeDetails').get(getDeviceTypeDetails);




// router.route('/setLocationInfo').post(setLocationInfo)
// router.route('/getAllLocationNameDetails').get(getAllLocationNameDetails)
// router.route('/getAllLocationPinDetails').get(getAllLocationPinDetails)

// router.route('/addVehicle').post(addVehicle)
// router.route("/vehicleDetails").post(vehicleDetails);





// 
// router.route('/assetDeviceMapping').get(assetDeviceMapping)
// router.route('/assetDriverMapping').get(assetDriverMapping)

module.exports = router
