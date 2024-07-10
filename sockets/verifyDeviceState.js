const sendMessage = require ("./sendMessage");
const roomsManager = require('./roomsManager');

module.exports = async function (state, laboratoryId){
    const room = await roomsManager.findLaboratoryRoom(laboratoryId);

    if(!room.user){
        return;
    }

    await sendMessage(room.user.socket, {
        messageType:"DEVICE_STATE",
        laboratoryId: laboratoryId,
        message: state
    });
}