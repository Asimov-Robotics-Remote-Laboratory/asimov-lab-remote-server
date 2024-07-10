const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

module.exports = {
    getTemplate : async (path) => {
        try{
            const template = await readFile(path);
            return template.toString();
        }catch (e) {
            console.log(e);
        }
    },
    async setValue(template,key,value){
        return template.replace(`{{${key}}}`,value);
    },
    async setValues(template,values){
        for(let key in values){
            template = template.replace(`{{${key}}}`,values[key]);
        }
        return template;
    }
}


