const sendMessage = require('./sendMessage');

module.exports = async function (room, socket, state){
    let data = {};

    if(room.cameraSocket == socket){
        data = {
            messageType:"CAMERA_STATE",
            laboratoryId: room.laboratory._id,
            message: state
        }
    }

    if(room.deviceSocket == socket){
        data = {
            messageType:"DEVICE_STATE",
            laboratoryId: room.laboratory._id,
            message: state
        }
    }

    if(room.localServerSocket == socket){
        data = {
            messageType:"LOCAL_SERVER_STATE",
            laboratoryId: room.laboratory._id,
            message: state
        }
    }

    if(room.user){
        await sendMessage(room.user.socket, data);
    }
}