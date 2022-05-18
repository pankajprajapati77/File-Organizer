//entry point of my command line
let helpfunc = require("./commands/help");
let orgfunc = require("./commands/organize");
let treefn = require("./commands/tree");
//console.log(helpfunc.second());
let inputarr = process.argv.slice(2);
let command = inputarr[0];
let path = inputarr[1];

switch(command){
    case"tree":
    //call tree function
    treefn.tree(path);
    console.log("tree function called and exeuted successfully on path" + path);
    break;

    case"organize":
    //call organize function
    orgfunc.organize(path);  //for execute - node main.js organize "srcpath"
    console.log("organize function called and executed successfully on path" + path);
    break;

    case"help":
    //call help function
    helpfunc.help();  //node main.js help
    console.log("help function called and executed successfully");
    break;

    default:
        console.log("command not recognized: /")
        break;
}

