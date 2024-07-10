const role = require("../utils/enums/role");
const sendMessage = require ("./sendMessage");
const roomsManager = require('./roomsManager');

const lab_roles = [
    role.CAMERA
];

module.exports = async function (data, socket){
    try{
        if(!lab_roles.includes(data.role)){
            throw {
                messageType:'ERROR_MESSAGE',
                message: 'Papel inválido para realizar esta operação.'
            };
        }

        const room = await roomsManager.findLaboratoryRoom(data.laboratoryId);
        if(room.user) {
            await sendMessage(room.user.socket, data);
        }
    }catch (e) {
        await sendMessage(socket, {messageType:"ERROR_MESSAGE",message:"13"});
    }
}