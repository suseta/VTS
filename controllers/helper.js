const ct = require('countries-and-timezones');
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;

const index = async (req, res) => {
    res.status(200).json({ message: 'I am in index' })
}

const timezones = async(req,res) =>{
    const timezonesDetails = ct.getAllTimezones();
    const timezonesName = Object.values(timezonesDetails).map(entry => entry.name);
    res.status(200).json({ 
        message: 'Timezone Fetched Successfully',
        data: timezonesName
    })    
}

const getAllCountries = async(req, res) =>{
    try{
        countryDetails = Country.getAllCountries()
        noOfcountry = countryDetails.length;
        countryISO = []
        for(i=0; i < noOfcountry; i++){
            countryISO.push(countryDetails[i].name,countryDetails[i].isoCode);
        }
        res.status(200).json({
            message: 'Country ISO Fetched successfully',
            countryISO: countryISO
        });
    }
    catch(error){
        res.status(400).send({ message: error.message });
    }       
}

const getAllState = async(req,res) =>{
    const {
        s_entity_countryName
    } = req.query
    try{
        stateDetails = State.getStatesOfCountry(s_entity_countryName)
        noOfState = stateDetails.length;
        stateName = []
        for(i=0; i < noOfState; i++){
            stateName.push(stateDetails[i].name);
        }
        res.status(200).json({
            message: 'State Fetched successfully',
            state: stateName
        });
    }
    catch(error){
        res.status(400).send({ message: error.message });
    }    
}

const getAllCity = async(req,res) =>{
    const {
        s_entity_countryName,
        s_entity_state
    } = req.query
    isoCode = await getISObyStateName(s_entity_countryName,s_entity_state);
    try{
        cityDetails = City.getCitiesOfState(s_entity_countryName,isoCode);
        noOfCity = cityDetails.length;
        cityName = []
        for(i=0; i < noOfCity; i++){
            cityName.push(cityDetails[i].name);
        }
        res.status(200).json({
            message: 'City Fetched successfully',
            city: cityName
        });
    }
    catch(error){
        res.status(400).send({ message: error.message });
    }    
}

const getISObyStateName = async(s_entity_countryName,s_entity_state) => {
    var stateDetails = State.getStatesOfCountry(s_entity_countryName)
    var noOfState = stateDetails.length;
    var stateName = []
    var isoCode;
    for(i=0; i < noOfState; i++){
        stateName.push(stateDetails[i].name);
    }
    for(i = 0; i < noOfState; i++){
        if(s_entity_state == stateName[i]){
            isoCode = stateDetails[i].isoCode;
            break;
        }
    }   
    return isoCode;  
}


module.exports ={
    index,
    timezones,
    getAllCountries,
    getAllState,
    getAllCity,
}