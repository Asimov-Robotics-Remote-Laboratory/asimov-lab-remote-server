const role = require("../utils/enums/role");
const sendMessage = require ("./sendMessage");
const roomsManager = require('./roomsManager');

const lab_roles = [
    role.LOCAL_SERVER
];

module.exports = async function(data, socket){
    try{
        if(!lab_roles.includes(data.role)){
            throw {
                messageType:'ERROR_MESSAGE',
                message: 'Papel inválido para realizar envio de sinal de novo Firmware.'
            };
        }
        const room = await roomsManager.findLaboratoryRoom(data.laboratoryId);
        if(room.deviceSocket) {
            await sendMessage(room.deviceSocket, data);
        }
    }catch (e) {
        await sendMessage(socket, {messageType:"ERROR_MESSAGE",message:"03"});
    }
}
