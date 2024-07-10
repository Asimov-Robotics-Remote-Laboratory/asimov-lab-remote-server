const role = require("../utils/enums/role");
const sendMessage = require ("./sendMessage");
const roomsManager = require('./roomsManager');

const lab_roles = [
    role.USER
];

module.exports = async function(data, socket){
    try{
        if(!lab_roles.includes(data.role)){
            throw {
                messageType:'ERROR_MESSAGE',
                message: 'Papel inválido para realizar envio de código fonte.'
            };
        }

        const room = await roomsManager.findLaboratoryRoom(data.laboratoryId);

        if(room.localServerSocket) {
            await sendMessage(room.localServerSocket, data);
        }
    }catch (e) {
        await sendMessage(socket, {messageType:"ERROR_MESSAGE",message:"07"});
    }
}