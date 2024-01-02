var axios = require('axios');

const test = async() =>{
    var entityName;
    var config = {
    method: 'get',
    url: 'http://65.2.31.11:1410/api/v0/getAllEntityNameList',
    headers: { }
    };

    try{
        response = await axios(config)
        entityName = response.data.data;
    }
    catch(error){
        console.log(error);
    }
        console.log("entity name list");
        for(i = 0; i< entityName.length; i++){
            console.log(entityName[i].s_entity_name);
        }
}

test()

