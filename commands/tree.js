const fs = require("fs");
const path = require("path");

function treefn(dirpath){
    if(dirpath == undefined){
        console.log("Please Enter Valid Path");
        return;
    }
    let doesExist = fs.existsSync(dirpath);
    if(doesExist == true){
        treeHelper(dirpath, "");
    }
}
function treeHelper(targetpath, indent){
    let isfile = fs.lstatSync(targetpath).isFile();

    if(isfile == true){
        let filename = path.basename(targetpath);
        console.log(indent + "├──" + filename);
        return;
    }
    let dirname = path.basename(targetpath);
    console.log(indent + "└──" + dirname);

    let children = fs.readdirSync(targetpath);

    for(let i = 0; i < children.length; i++){
        let childpath = path.join(targetpath, children[i]);
        treeHelper(childpath, indent + "\t");
    }
}
module.exports = {
    tree : treefn
};

// let srcpath = "C:\\Users\\Pankaj\\OneDrive\\Documents\\pepcoding\\Course Projects\\File Organizer"
// treefn(srcpath);