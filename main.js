//entry point of my command line
let helpfunc = require("./commands/help");
let inputarr = process.argv.slice(2);
let command = inputarr[0];
let path = inputarr[1];

switch(command){
    case"tree":
    //call tree function
    console.log("tree function called and exeuted successfully on path" + path);
    break;
    
    case"organize":
    //call organize function
    console.log("organize function called and executed successfully on path" + path);
    break;

    case"help":
    //call help function
    helpfunc.help();
    console.log("help function called and executed successfully");
    break;

    default:
        console.log("command not recognized: /")
        break;
}

