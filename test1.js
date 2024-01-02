let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;

stateDetails = State.getStatesOfCountry('IN')
noOfState = stateDetails.length;
stateName = []
for(i=0; i < noOfState; i++){
    stateName.push(stateDetails[i].name);
}

cityDetails = City.getCitiesOfCountry('IN')
noOfCity = cityDetails.length;
cityName = []
for(i=0; i < noOfCity; i++){
    cityName.push(cityDetails[i].name);
}

