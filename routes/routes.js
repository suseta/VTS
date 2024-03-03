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
  getAllCity,
  deviceConfig
} = require('../controllers/helper')
const {
  setUserInfo,
  getTransporterDetails
} = require('../controllers/setUserInfo')
const { addVehicle, getVehicleDetails } = require('../controllers/setAssetVehicleDetails')
const {
  setAssetInfo,
  getAssetTypeDetails,
  getAssetCapacityDetails
} = require('../controllers/setAssetInfo')
const { setSimDetails, getInactiveSimDetails, getActiveSimDetails } = require('../controllers/simRegistration')
const { setDeviceDetails, getDeviceDetails } = require('../controllers/setDeviceDetails')
const { setAssetDeviceMapping, getAssetDeviceMapping } = require('../controllers/assetDeviceMapping')
const { setAssetDriverMapping, getAssetDriverMapping } = require('../controllers/assetDriverMapping')
const { getDeviceTypeDetails } = require('../controllers/deviceType');
const { setPortDeviceMapping, getPortDeviceMapping, getLatestAccessPortByImei } = require('../controllers/portDeviceMapping');
const { getServiceDataLog, getParsedData, getLiveVehicleData } = require('../controllers/serviceDataLog');
const { generateExcel } = require('../controllers/jsonToExcel')

router.route('/').get(index);
router.route('/setEntityInfo').post(setEntityInfo);
router.route('/getAllEntityNameList').get(getAllEntityNameList);
router.route('/getAllCountries').get(getAllCountries);
router.route('/getAllState').get(getAllState);
router.route('/getAllCity').get(getAllCity);
router.route('/timezones').get(timezones);
router.route('/setUserInfo').post(setUserInfo);
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
router.route('/getDeviceTypeDetails').get(getDeviceTypeDetails);
router.route('/setPortDeviceMapping').post(setPortDeviceMapping);
router.route('/getPortDeviceMapping').get(getPortDeviceMapping);
router.route('/getLatestAccessPortByImei').get(getLatestAccessPortByImei);
router.route('/getServiceDataLog').get(getServiceDataLog);
router.route('/getParsedData').get(getParsedData);
router.route('/getLiveVehicleData').get(getLiveVehicleData);
router.route('/generateExcel').get(generateExcel)
router.route('/deviceConfig').post(deviceConfig);
router.route('/setSimDetails').post(setSimDetails);
router.route('/getInactiveSimDetails').get(getInactiveSimDetails);
router.route('/getActiveSimDetails').get(getActiveSimDetails);

module.exports = router
