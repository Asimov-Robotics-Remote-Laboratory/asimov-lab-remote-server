const listAllLaboratories = require ("../services/laboratory/business/listAllLaboratories");
const roomStateEnum = require('./roomStateEnum');
const laboratoryUserManager = require('./laboratoryUserManager');
const socketsManager = require('./socketsManager');
const sendMessage = require('./sendMessage');

module.exports = {
    rooms:[],

    loadLaboratoriesRooms: async function (){
        const laboratories = await listAllLaboratories();
        await laboratories.forEach(laboratory => {
            const laboratoryRoom = {
                laboratory : laboratory,
                state: roomStateEnum.FREE,
                user: null,
                deviceSocket: null,
                localServerSocket: null,
                cameraSocket: null
            }
            this.rooms.push(laboratoryRoom);
        });
    },

    reloadLaboratoriesRooms: async function (){
        const laboratories = await listAllLaboratories();

        a: for(let i in laboratories) {
            for (let x in this.rooms) {
                if (this.rooms[x].laboratory._id.toString() == laboratories[i]._id.toString()) {
                    if(this.rooms[x].laboratory.name !== laboratories[i].name){
                        this.rooms[x].laboratory.name = laboratories[i].name;
                    }

                    if(this.rooms[x].laboratory.description !== laboratories[i].description){
                        this.rooms[x].laboratory.description = laboratories[i].description;
                    }

                    if(this.rooms[x].laboratory.imageLink !== laboratories[i].imageLink){
                        this.rooms[x].laboratory.imageLink = laboratories[i].imageLink;
                    }

                    if(this.rooms[x].laboratory.orderLab !== laboratories[i].orderLab){
                        this.rooms[x].laboratory.orderLab = laboratories[i].orderLab;
                    }

                    continue a;
                }
            }

            const laboratoryRoom = {
                laboratory: laboratories[i],
                state: roomStateEnum.FREE,
                user: null,
                deviceSocket: null,
                localServerSocket: null,
                cameraSocket: null
            }
            this.rooms.push(laboratoryRoom);
        }
        let spliceList=[];

        b: for(let i in this.rooms) {
            for (let x in laboratories) {
                if (this.rooms[i].laboratory._id.toString() == laboratories[x]._id.toString()) {
                    continue b;
                }
            }
            if(this.rooms[i].user) {
                await laboratoryUserManager.destroyUser(this.rooms[i].user);
            }
            if(this.rooms[i].deviceSocket) {
                await this.rooms[i].deviceSocket.terminate();
            }
            if(this.rooms[i].localServerSocket) {
                await this.rooms[i].localServerSocket.terminate();
            }
            if(this.rooms[i].cameraSocket) {
                await this.rooms[i].cameraSocket.terminate();
            }
            spliceList.push(i);
        }

        for(let i in spliceList){
            this.rooms.splice(spliceList[i],1);
        }

        const roomsCopy = [];

        this.rooms.forEach(room => {
            roomsCopy.push({
                laboratory: room.laboratory,
                state: room.state
            });
        });

        const message = {
            messageType:'LIST_LABORATORIES',
            message: roomsCopy
        }

        for(let i in socketsManager.sockets){
            await sendMessage(socketsManager.sockets[i], message);
        }
    },

    findLaboratoryRoom: async function (laboratoryId){
        return await this.rooms.find(room => { return room.laboratory._id == laboratoryId });
    }


}