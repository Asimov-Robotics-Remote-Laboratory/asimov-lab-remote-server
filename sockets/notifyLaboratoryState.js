const sendMessage = require('./sendMessage');
const role = require('../utils/enums/role');
module.exports = async function (room, socketExclude, sockets){
    for (const socket of sockets) {
        if(socket == socketExclude){
            continue;
        }
        if(socket.role == role.USER) {
            await sendMessage(socket, {
                messageType: 'LABORATORY_STATE',
                laboratoryId: room.laboratory._id,
                message: room.state
            });
        }
    }
}