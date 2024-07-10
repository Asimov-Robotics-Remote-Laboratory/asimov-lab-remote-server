module.exports = {
    sockets: [],
    async add(socket){
        this.sockets.push(socket);
    },
    async remove(socket){
        for(let i in this.sockets){
            if(this.sockets[i] == socket){
                this.sockets.splice(i,1);
                return;
            }
        }
    },
    async exists(socket){
        for(let s of this.sockets){
            if(s == socket){
                return true;
            }
        }
        return false;
    }
}