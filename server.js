var express = require("express"),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    fs = require('fs'),
    cors = require('cors');
    
// require the const endpointName = require("./routes/api/endpointName"); here

const app = express();

// Middleware for BodyParser
// Normal express config middlewares
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Custom api routes
app.get('/uploads/:id', (req, res) => { 
    const file = `${__dirname}/uploads/${req.params.id}`;
    // console.log("prateek",req.params.id, file);
    res.download(file); // Set disposition and send it.
});

// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 
var storage = multer.diskStorage({ 
	destination: function (req, file, cb) { 
		// Uploads is the Upload_folder_name 
		cb(null, "uploads") 
	}, 
	filename: function (req, file, cb) { 
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        if(extension=="x-zip-compressed")
        cb(null, extArray[0] + '.zip')
        
        else
        cb(null, extArray[0]+ '.' +extension)        
	} 
}) 
	
// Define the maximum size for uploading the documents 10 Mb
const maxSize = 10 * 1000 * 1000; 
	
var upload = multer({ 
	storage: storage, 
	limits: { fileSize: maxSize }, 
}).any();	 

// method to upload documents
app.post('/api/uploadFile', function (req, res) { 
	upload(req,res,function(err) { 
        if(err) { 
    		res.send(err) 
		} 
		else {
            var outputFile={
                name:req.files[0].originalname,
                size:req.files[0].size,
                url:req.files[0].path,
            };
            res.status(200).send({
                "success" : 1,
                file:outputFile
            });            
		} 
	}) 
}); 

app.post('/api/addedData',function(req, res, next) {
    var json = JSON.stringify(req.body);
    fs.writeFile('myjsonfile.json', json, 'utf8', ()=>{
        res.send('Server Is Working')
    });
  
})



const port = 5000; // Sets port for server

app.listen(port, () => console.log(`Server started on port ${port}`));
