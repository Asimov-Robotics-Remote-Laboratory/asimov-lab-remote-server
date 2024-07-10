const config = require('config');
const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const uri = config.get('mongoURI');
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true
        };
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri, options);
        console.log("Conectado ao MongoAtlas!")
    } catch (e) {
        console.log("Problema na conexão com o banco!"+ e)
    }
};