var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {

  connectToServer: function(callback) {
    MongoClient.connect( "mongodb://localhost:27017",{useNewUrlParser: true}, function( err, client ) {
      try {
        _db = client.db('facebookData');
        return callback( client );
      } catch (TypeError) {
        console.log(TypeError);
        return TypeError;  
      }  
    });
  },

  getDb: function() {
    return _db;
  }
};