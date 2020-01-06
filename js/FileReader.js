function ReadFile(currentFile) {
	var reader = {
		progress: function(e) {
			//Useful for notifying the user
		},
		success: function(e) {
			//File processed, e.target.result contains the array buffer
			currentFile.arrayBuffer = e.target.result;
			reader.complete();
		},
		error: function(e) {
			var item = e;
			//Handle the error properly
			reader.complete();
		},
		complete: function() {
			//Pull out some information about the file
			var currentFileJson = {
				name: currentFile.name,
				type: currentFile.type,
				size: currentFile.size,
				lastModified: currentFile.lastModifiedDate,
				arrayBuffer: currentFile.arrayBuffer
			};
			//Store the file using our storageDB variable (see snippet 2)
			storageDB.set(currentFileJson);
		}
	};
	//Create a new file reader and setup events
	//use the readAsArrayBuffer to read in the contents of the file
	var myfileReader = new FileReader();
	myfileReader.onprogress = reader.progress;
	myfileReader.onload = reader.success;
	myfileReader.onerror = reader.error;
	myfileReader.readAsArrayBuffer(currentFile);
}

function HandleFileUpload(event) {
	var oFileArray = event.currentTarget.files;
	if (oFileArray != null && oFileArray.length > 0) {
		for (var i = 0; i < oFileArray.length; i++) {
			ReadFile(oFileArray[i]);
		}
	}
}
//Add a handler for the file input on change event
facebookUpload.onchange = HandleFileUpload;
fileUpload.onchange = HandleFileUpload;
