let foregroundID;

function registerForegroundID(id){
    foregroundID = id;
    console.log("registered id: " + id);
}

export { foregroundID, registerForegroundID};