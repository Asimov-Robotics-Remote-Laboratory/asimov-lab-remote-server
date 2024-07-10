const sendMessage = require('./sendMessage');
const socketsManager = require('./socketsManager');
const roomsManager = require('./roomsManager');

module.exports = async function (data, socket){
    await roomsManager.reloadLaboratoriesRooms();
    const rooms = roomsManager.rooms;
    const roomsCopy = [];

    rooms.forEach(room => {
        roomsCopy.push({
            laboratory: room.laboratory,
            state: room.state
        });
    });

    let message = {
        messageType:'LIST_LABORATORIES',
        message: roomsCopy
    }

    if(data.token.user.role === "ADMINISTRATOR"){
        for(let index in socketsManager.sockets){
            await sendMessage(socketsManager.sockets[index], message);
        }
    }else{
        await sendMessage(socket, message);
    }
}