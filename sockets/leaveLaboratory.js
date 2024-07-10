const sendMessage = require ("./sendMessage");
const notifyLaboratoryState = require ("./notifyLaboratoryState");
const roomsManager = require('./roomsManager');
const roomStateEnum = require('./roomStateEnum');
const laboratoryUserManager = require('./laboratoryUserManager');
const socketsManager = require("./socketsManager");

module.exports = async function (data, socket){
    const room = await roomsManager.findLaboratoryRoom(data.laboratoryId);
    if (data.role === role.USER) {
        await laboratoryUserManager.destroyUser(room.user);
        room.user = null
        room.state = roomStateEnum.FREE;
    }

    if (data.role === role.DEVICE) {
        room.deviceSocket = null;
    }

    if (data.role === role.LOCAL_SERVER) {
        room.localServerSocket = null;
    }

    if (data.role === role.CAMERA) {
        room.cameraSocket = null;
    }

    await sendMessage(socket, {messageType: 'LEAVE_LABORATORY_OK'});
    await notifyLaboratoryState(data.laboratoryId, socket, socketsManager.sockets);
}