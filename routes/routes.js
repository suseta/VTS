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
const { addVehicle, getVehicleDetails } = require('../controllers/setAssetVehicleDetails')
const {
  setAssetInfo,
  getAssetTypeDetails,
  getAssetCapacityDetails
} = require('../controllers/setAssetInfo')
const { setDeviceDetails,getDeviceDetails } = require('../controllers/setDeviceDetails')
const { setAssetDeviceMapping,getAssetDeviceMapping } = require('../controllers/assetDeviceMapping')
const { setAssetDriverMapping, getAssetDriverMapping } = require('../controllers/assetDriverMapping')

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
router.route('/addVehicle').post(addVehicle)
router.route("/getVehicleDetails").get(getVehicleDetails);
router.route('/setAssetDeviceMapping').post(setAssetDeviceMapping)
router.route('/getAssetDeviceMapping').get(getAssetDeviceMapping);
router.route('/setAssetDriverMapping').post(setAssetDriverMapping);
router.route('/getAssetDriverMapping').get(getAssetDriverMapping);

module.exports = router
