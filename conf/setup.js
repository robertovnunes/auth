const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://jrvn:VRLvV127tAzQHwPW@clusterauth.o9swa4i.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Conectado ao MongoDB");
        return client.db();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = {connect};