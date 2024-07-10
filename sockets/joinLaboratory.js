const role = require("../utils/enums/role");
const sendMessage = require ("./sendMessage");
const notifyLaboratoryState = require('./notifyLaboratoryState');
const roomsManager = require('./roomsManager');
const roomStateEnum = require('./roomStateEnum');
const socketsManager = require("./socketsManager");
const laboratoryUserManager = require('./laboratoryUserManager');
const checkIfTheUserHasASchedule = require('../services/schedule/business/checkIfTheUserHasASchedule');

module.exports = async function(data, socket){
    const room = await roomsManager.findLaboratoryRoom(data.laboratoryId);
    try {
        if (data.role === role.USER) {
            // Verifica se o laboratório está em uso.
            if(room.state === roomStateEnum.MAINTENANCE){
                await sendMessage(socket, {messageType: 'LABORATORY_IN_MAINTENANCE'});
                return;
            }

            // Verifica se o usuário tem agendamento.
            const userSchedule = await checkIfTheUserHasASchedule(data.token.user, data.laboratoryId);

            // Caso o usuário não tenha agendamendo e o laboratório se encontra ocupado.
            if(userSchedule === null && room.state === roomStateEnum.IN_USE){
                await sendMessage(socket, {messageType: 'LABORATORY_IN_USE'});
                return;
            }

            // Desconecta outro usuário que não tenha agendamento mas está usando o laboratório
            if(userSchedule !== null && room.user !== null && userSchedule.userId !== room.user.id && !room.user.userSchedule){
                await sendMessage(room.user.socket, {messageType: 'LABORATORY_IN_USE'});
                await laboratoryUserManager.destroyUser(room.user);
            }

            // Vincula o usuário ao laboratório.
            room.user = await laboratoryUserManager.createUser(data.token.user.id, socket, data.laboratoryId, userSchedule);

            // Coloca o laboratório em uso.
            room.state = roomStateEnum.IN_USE;

            // Reinicia o dispositivo
            if(room.deviceSocket && room.deviceSocket.isAlive){
                //await sendMessage(room.deviceSocket, { messageType: 'RESTART_DEVICE'});
            }

            // Manda mensagem de confirmação ao usuário.
            await sendMessage(socket, {messageType: 'JOIN_LABORATORY_OK', message: room.user.remainingTime});

            // Notifica aos outros usuários que o laboratório entrou em uso.
            await notifyLaboratoryState(room, room.user.socket, socketsManager.sockets);
            return;
        }

        if (data.role === role.DEVICE) {
            room.deviceSocket = socket;
            await sendMessage(socket, {messageType: 'JOIN_LABORATORY_OK'});
            return;
        }

        if (data.role === role.LOCAL_SERVER) {
            room.localServerSocket = socket;
            await sendMessage(socket, {messageType: 'JOIN_LABORATORY_OK'});
            return;
        }

        if (data.role === role.CAMERA) {
            room.cameraSocket = socket;
            await sendMessage(socket, {messageType: 'JOIN_LABORATORY_OK'});
        }
    }catch (e){
        await sendMessage(socket, {messageType:'ERROR_MESSAGE', message: e});
    }
}

