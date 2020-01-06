//Setup some useful parameters
var dbName = "Files",
	storeName = "FileStore",
	database,
	dbReady = false;
var storageDB = {
	init: function() {
		// indexedDB is not part of HTML5 so need vendor specifics so that we can use across browsers
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		if (!window.indexedDB) {
			alert("What?! No IndexedDB?");
		}
		try {
			// Create new database with name and version
			var request = window.indexedDB.open(dbName, 1);
			request.onerror = function(event) {
				//Handle the error, notify the user, provide fallback using localStorage?
			};
			request.onsuccess = function(event) {
				//Store our new database into a variable we can access later
				database = request.result;
				dbReady = true;
			};
			//onUpgradeNeeded is fired if the version is changed, so if you want to make
			//schema changes then add them in here and increased your version number
			request.onupgradeneeded = function(event) {
				var db = event.target.result;
				//We are using "id" as the identifier for the object and
				//allowing the database to keep track of this for us by using autoIncrement: true
				var objectStore = db.createObjectStore(storeName, {
					keyPath: "id",
					autoIncrement: true
				});
			};
		} catch (Error) {}
	},
	set: function(value) {
		//Use our database parameter set earlier along with our store name
		//Create transaction and use this to access the object store
		var transaction = database.transaction([storeName], "readwrite");
		var objectStore = transaction.objectStore(storeName);
		var request = objectStore.put(value);
		request.onsuccess = function(event) {
			var item = event;
			value.id = event.target.result;
			alert("File Stored, ID: " + value.id);
		};
		request.onerror = function(event) {
			// Handle the error
		}
	},
	get: function(Id) {
		//Retrieve an object by its Id, methods can be chained for shorter scripts
		var request = database.transaction([storeName], "readwrite").objectStore(storeName).get(Id);
		request.onsuccess = function(event) {
			var item = event.target.result;
		};
	}
};
// Call to setup the database<
storageDB.init();
