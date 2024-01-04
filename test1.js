const ct = require('countries-and-timezones');

    const timezonesDetails = ct.getAllTimezones();
    const namesArray = Object.values(timezonesDetails).map(entry => entry.name);
    console.log(namesArray);
    
// console.log(timezonesDetails);