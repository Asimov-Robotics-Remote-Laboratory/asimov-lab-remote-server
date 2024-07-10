module.exports = async function(socket, message){
    await socket.send(JSON.stringify(message));
}