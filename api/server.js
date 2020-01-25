
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:dbUser@cluster0-h6xiq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  alert('Collection creer');
  // perform actions on the collection object
  client.close(); 
});
