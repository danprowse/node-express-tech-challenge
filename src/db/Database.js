const mongodb = require("mongodb");

class Database {

  dbString = process.env.DBURI || process.env.DATABASE;
  
  constructor(dbName, collection) {
    this.dbName = dbName;
    this.collection = collection;
  }

  async loadConnection() {
    const client = await mongodb.MongoClient.connect(this.dbString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.db(this.dbName).collection(this.collection);
  }
}

module.exports = Database;