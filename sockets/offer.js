const role = require("../utils/enums/role");
const sendMessage = require ("./sendMessage");
const roomsManager = require('./roomsManager');

const lab_roles = [
    role.CAMERA,
    role.USER
];

module.exports = async function (data, socket) {
    try{
        if(!lab_roles.includes(data.role)){
            throw {
                messageType:'ERROR_MESSAGE',
                message: 'Papel inválido para realizar OFFER'
            };
        }

        const room = await roomsManager.findLaboratoryRoom(data.laboratoryId);

        if(room.cameraSocket && data.role == role.USER){
            await sendMessage(room.cameraSocket, data);
        }
        if(room.user && data.role == role.CAMERA){
            await sendMessage(room.user.socket, data);
        }
    }catch (e) {
        await sendMessage(socket, {messageType:"ERROR_MESSAGE",message:"04"});
    }
}