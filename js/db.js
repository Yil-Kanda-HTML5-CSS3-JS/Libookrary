function openDatabase(dbName) {
  var request = indexedDB.open(dbName);
  request.onsuccess = function (e) {
    var database = request.result;
    if (database) {
      console.log("Database initialized.");
    } else {
      console.error("Database is not initialized!");
    }

    //Your code goes here
    database.close();
  }
  request.onerror = function (e) {
    console.error( e.target.error.message);
  }
}

function createTable(dbName, dbversion, tableName) {
  var request = indexedDB.open(dbName, dbversion);
  request.onupgradeneeded = function (e) {
    var database = e.target.result;
    var objectStore = database.createObjectStore(tableName, {
        keyPath: 'id'
    });
    console.log("Object Store Created");
  };
  request.onsuccess = function (e) {
    var database = e.target.result;

    //code to verify that the table was created
    database.objectStoreNames.contains(storeName);

    database.close();
  }
  request.onerror = function (e) {
    console.error(e.target.error.message);
  }
}

/*

function createTable(dbName, tableName) {
  var request = indexedDB.open(dbName);
  request.onsuccess = function (e){
    var database = e.target.result;
    var version =  parseInt(database.version);
    database.close();
    var secondRequest = indexedDB.open(dbName, version+1);
    secondRequest.onupgradeneeded = function (e) {
        var database = e.target.result;
        var objectStore = database.createObjectStore(storeName, {
            keyPath: 'id'
        });
    };
    secondRequest.onsuccess = function (e) {
        e.target.result.close();
    }
  }
}

*/
