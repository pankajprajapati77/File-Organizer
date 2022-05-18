const fs = require("fs"); //fs module
const path = require("path"); //path module
let types = {
    media: ["mp4", "mkv", "mp3","mov"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 
    'tex',"csv",'json'],
    app: ['exe', 'dmg', 'pkg', "deb","apk"],
    images: ['png','jpg','jpeg']
}

function organize(srcpath){
    //1). to check if srcpath is present
    if(srcpath == undefined){
        //the process .cwd() method returns the current working directory of the Node.js process
        //console.log(srcpath);  undefined
        srcpath = process.cwd();
        //console.log("source path is " ,srcpath);
    }

    //2). to check a directory -> organized_files
    //let organizedfiles = srcpath+ "/" + "organized_files"; //same as path.join
    let organizedfiles = path.join(srcpath, "organized_files");
    console.log("organized files folder path is", organizedfiles);
    if(fs.existsSync(organizedfiles) == false){
        //if there is no folder name with organizedfiles then make it
        fs.mkdirSync(organizedfiles);
    }else console.log("folder aldready exist");

    //3). scan the entire srcpath(downloads folder in this case).

    //reads the contents of the directory -> basically reads the names of files present in directory
    let allfiles = fs.readdirSync(srcpath);
    //console.log(allfiles);

    //4). traverse overall the files and classify them on the basis of their extension(.pdf, .mp3).

    for(let i = 0; i < allfiles.length; i++){
        //let ext = allfiles[i];
        //extname returns the extension of the file
        let fullpathoffile = path.join(srcpath, allfiles[i]);
        console.log(fullpathoffile);
        //1. check if it is a file or folder
        //lstatsync gives the information regarding the link provides.
        let isthisAfile = fs.lstatSync(fullpathoffile).isFile();//true-> if file is present or false-> if it is folder 
        console.log(allfiles[i] + "is" + isthisAfile);
        if(isthisAfile){
            //1.1 get ext name
            let ext = path.extname(allfiles[i]).split(".")[1];
            //console.log(ext);
            //1.2 get folder name from extension
            let folderName = getfoldername(ext);
            //console.log(folderName);
            //1.3 copy from src folder(srcpath) and paste in dest folder(folder name e.g document, media etc)
                         //copy      jo copy krna h    paste
            copyfileToDest(srcpath, fullpathoffile, folderName);
        }
    }
}

function getfoldername(ext){
    for(let key in types){
    //console.log(key);
    for(let i = 0; i < types[key].length; i++){
        if(types[key][i] == ext){
            return key;
        }
    }
}
return "miscellaneous"
}

function copyfileToDest(srcpath, fullpathoffile, folderName){
    //1. make foldername path
    let destfolderpath = path.join(srcpath, "organized_files", folderName);
    //console.log(dest);

    //2. check folder if exists, if it does not, then make folder
    if(!fs.existsSync(destfolderpath)){
        fs.mkdirSync(destfolderpath);
    }

    //3. copy file from src folder to dest folder

    //returns the last portion of a path
    let filename = path.basename(fullpathoffile);
    let destfilename = path.join(destfolderpath, filename);
                     //src              dest
    fs.copyFileSync(fullpathoffile, destfilename);
}

// let srcpath= "C:\\Users\\Pankaj\\OneDrive\\Documents\\pepcoding\\Course Projects\\File Organizer\\downloads"
// organize(srcpath);

module.exports = {
    organize : organize
}