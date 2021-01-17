const mongodb = require("mongodb");

class Database {

  constructor(dbName, collection) {
    this.dbName = dbName;
    this.collection = collection;
  }

  async loadConnection() {
    const client = await mongodb.MongoClient.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.db(this.dbName).collection(this.collection);
  }
}

module.exports = Database;