const WebSocketServer  = require('ws');
const authenticator = require('../middlewares/websocketAuthenticator');
const roomsManager = require('./roomsManager');
const socketsManager = require('./socketsManager');
const roomStateEnum = require('./roomStateEnum');
const listLaboratories = require('./listLaboratories');
const joinLaboratory = require('./joinLaboratory');
const leaveLaboratory = require('./leaveLaboratory');
const startArduinoTask = require('./startArduinoTask');
const stopArduinoTask = require('./stopArduinoTask');
const startArduinoTask0k = require('./startArduinoTask0k');
const stopArduinoTask0k = require('./stopArduinoTask0k');
const offer = require('./offer');
const answer = require('./answer');
const reqRemoteDescription = require('./reqRemoteDescription');
const candidate = require('./candidate');
const sendSourceCode = require('./sendSourceCode');
const send0utputConsole = require('./send0utputConsole');
const newFirmwareSignal = require('./newFirmwareSignal');
const rxSerial = require('./rxSerial');
const txSerial = require('./txSerial');
const verifyDeviceState = require('./verifyDeviceState');
const notifyRoomAgentState = require('./notifyRoomAgentState');
const notifyLaboratoryState = require("./notifyLaboratoryState");
const joystickCommand = require("./joystickCommand");
const restartDevice = require("./restartDevice");
const sendMessage = require("./sendMessage");
const newCameraStream = require("./newCameraStream");

module.exports = {
    pingTimeout: 10000,
    webSocketServer: {},
    startWebSocketServer: async function(server){
        const that = this;
        await roomsManager.loadLaboratoriesRooms();
        this.webSocketServer = new WebSocketServer.Server({server});
        this.webSocketServer.on('connection', (socket) => {
            console.log("Novo socket estabelecido.");
            socket.isAlive = true;

            socket.on('message', function(msg){
                that.onMessage(socket, msg)
            });

            socket.on('pong', function () {
                that.onPong(socket);
            });

            socket.on('close', function () {
                that.onClose(socket);
            });
        });
        setInterval(this.ping, this.pingTimeout);
    },
    onMessage: async function(socket, msg){
        try {
            const data = JSON.parse(msg);
            const token = await authenticator.tokenValidate(data.token);
            data.token = token;

            if(await socketsManager.exists(socket) === false) {
                socket.role = token.role;
                await socketsManager.add(socket);
            }

            switch (data.messageType) {
                case "JOYSTICK_COMM":
                    await joystickCommand(data,socket);
                    break;
                case "LIST_LABORATORIES":
                    await listLaboratories(data, socket);
                    break;
                case "JOIN_LABORATORY":
                    await joinLaboratory(data, socket);
                    break;
                case "LEAVE_LABORATORY":
                    await leaveLaboratory(data, socket);
                    break;
                case 'START_ARDUINO_TASK':
                    await startArduinoTask(data, socket);
                    break;
                case 'STOP_ARDUINO_TASK':
                    await stopArduinoTask(data, socket);
                    break;
                case 'START_ARDUINO_TASK_OK':
                    await startArduinoTask0k(data, socket);
                    break;
                case 'STOP_ARDUINO_TASK_OK':
                    await stopArduinoTask0k(data, socket);
                    break;
                case 'OFFER':
                    await offer(data, socket);
                    break;
                case 'ANSWER':
                    await answer(data, socket);
                    break;
                case 'REQ_REMOTE_DESCRIPTION':
                    await reqRemoteDescription(data, socket);
                    break;
                case 'CANDIDATE':
                    await candidate(data, socket);
                    break;
                case 'SOURCE_CODE':
                    await sendSourceCode(data,socket);
                    break;
                case 'OUTPUT_CONSOLE':
                    await send0utputConsole(data, socket);
                    break;
                case 'NEW_FIRMWARE':
                    await newFirmwareSignal(data, socket);
                    break;
                case 'TX_SERIAL':
                    await txSerial(data, socket);
                    break;
                case 'RX_SERIAL':
                    await rxSerial(data, socket);
                    break;
                case "RESTART_DEVICE":
                    await restartDevice(data, socket);
                    break;
                case "NEW_CAMERA_STREAM":
                    await newCameraStream(data, socket);
                    break;
                case 'DEVICE_STATE':
                    await verifyDeviceState(data.message, data.laboratoryId);
                    break;
            };
        }catch (e) {
            console.log(e);
            socket.close();
        }
    },

    onClose: async function (socket) {
        console.log('Socket desconectado.');
        await socketsManager.remove(socket);
        for (const room of roomsManager.rooms) {
            if(room.user && room.user.socket === socket){
                room.state = roomStateEnum.FREE;
                await clearTimeout(room.user._timeInterval);
                room.user = null;
                if(room.deviceSocket && room.deviceSocket.isAlive){
                    await sendMessage(room.deviceSocket, {
                        messageType: "RESTART_DEVICE"
                    });
                }
                await notifyLaboratoryState(room, socket, socketsManager.sockets);
            }
            if(room.cameraSocket === socket){
                await notifyRoomAgentState(room, socket, 'OFF_LINE');
                room.cameraSocket = null;
            }
            if(room.deviceSocket === socket){
                await notifyRoomAgentState(room, socket, 'OFF_LINE');
                room.deviceSocket = null;
            }
            if(room.localServerSocket === socket){
                await notifyRoomAgentState(room, socket, 'OFF_LINE');
                room.localServerSocket = null;
            }
        }
    },

    onPong: async function(socket) {
        socket.isAlive = true;
        console.log("pong - "+socket.role);
        roomsManager.rooms.forEach(room => {
            notifyRoomAgentState(room, socket, 'ON_LINE');
        });
    },

    ping:  async function() {
        let sockets = socketsManager.sockets;

        for(let i in sockets){
            if(sockets[i].isAlive === false){
                sockets[i].terminate();
                await socketsManager.remove(sockets[i]);
            }else{
                sockets[i].isAlive = false;
                console.log("ping - "+sockets[i].role);
                await sockets[i].ping();
            }
        }
    }
}