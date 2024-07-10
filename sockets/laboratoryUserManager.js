const sendMessage = require('./sendMessage');
const {DateTime} = require("luxon");

const DEFAULT_TIMEOUT = 1800;
const TIMEOUT_WARNING = 60;

module.exports = {
    users:[],
    async createUser(userId, socket, laboratoryId, userSchedule){
        try {
            let user = await this.findUserByIdAndLaboratoryId(userId,laboratoryId);

            if(user){
               user.userSchedule = userSchedule;
               await this._updateSocket(user, socket);
               await this._defineTimeout(user);
               await this._stopTimer(user);
               await this._initTimer(user);
            }else{
               user = {
                   _id : userId,
                   id : userId,
                   laboratoryId: laboratoryId,
                   socket: socket,
                   startTime: DateTime.now(),
                   timeoutWarning: false,
                   userSchedule: userSchedule
               };
               await this._defineTimeout(user);
               await this._initTimer(user);
               this.users.push(user);
            }
            return user;
        }catch (e){
            throw e;
        }
    },

    async _defineTimeout(user){
        if(user.userSchedule){
            const now = DateTime.now();
            const end = DateTime.fromJSDate(user.userSchedule.end);
            const diff = end.diff(now,'seconds').toObject();
            user.remainingTime = parseInt(diff.seconds,10);
        }else{
            //const now = DateTime.now();
            //const diff = now.diff(user.startTime,'seconds').toObject();
            //user.remainingTime = DEFAULT_TIMEOUT - parseInt(diff.seconds,10);
            user.remainingTime = DEFAULT_TIMEOUT;
        }
    },

    async destroyUser(user){
        await this._stopTimer(user);
        await user.socket.terminate();
        await this._removeUserById(user.id);
    },

    async findUserByIdAndLaboratoryId(userId, laboratoryId){
        return await this.users.find((user) => {
            if (user.id === userId && user.laboratoryId === laboratoryId) {
                return user;
            }
        });
    },

    async _updateSocket(user, newSocket){
        if(user.socket.isAlive) {
            await sendMessage(user.socket, {messageType: 'CHANGE_WEBSOCKET_CONNECTION'});
        }
        await user.socket.terminate();
        user.socket = newSocket;
    },

    async _stopTimer(user){
        await clearTimeout(user._timeInterval);
        console.log(user.id +" Timer stopped");
    },

    async _initTimer(user){
        let that = this;
        user._timeInterval = setInterval(async () => {
            user.remainingTime--;
            console.log(user.remainingTime);
            if(!user.timeoutWarning && user.remainingTime < TIMEOUT_WARNING){
                await sendMessage(user.socket, {messageType: 'TIMEOUT_WARNING', message:TIMEOUT_WARNING});
                user.timeoutWarning = true;
            }

            if (user.remainingTime < 0) {
                await sendMessage(user.socket, {messageType: 'LABORATORY_TIMEOUT'});
                await that.destroyUser(user);
            }
        },1000);
    },

    async _removeUserById(userId){
        for(let i in this.users){
            if(this.users[i].id === userId){
                this.users.splice(i,1);
                return;
            }
        }
    }
}