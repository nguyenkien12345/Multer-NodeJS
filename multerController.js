const multer = require("multer");
const fs = require('fs');

const multerController = {
    // req.file contains information of uploaded file (req.file chứa thông tin của tệp đã tải lên)
    // req.body contains information of text fields, if there were any (req.body chứa thông tin của các trường văn bản, nếu có)

    homepage: async (req, res) => {
        res.render('main');
    },

    handleUploadSignleFile: async (req, res) => {
        let file = req.file;
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!file) {
            return res.send('Please select an image to upload');
        }
        // Display uploaded image for user validation
        // res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="http://127.0.0.1:5500/MulterDemo/index.html">Upload another image</a>`);
        else {
            return res.status(200).json({
                data: file
            })
        }
    },

    handleUploadMultipleFile: async (req, res) => {
        let files = req.files;
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!files) {
            return res.send('Please select an image to upload');
        }
        // Display uploaded image for user validation
        // let result = "You have uploaded images: <hr />";
        // const files = req.files;
        // let index, len;
        // // Loop through all the uploaded images and display them on frontend
        // for (index = 0, len = files.length; index < len; ++index) {
        //     result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        // }
        // result += '<hr/><a href="http://127.0.0.1:5500/MulterDemo/index.html">Upload more images</a>';
        // res.send(result);
        else {
            let imgArray = files.map((file) => {
                let img = fs.readFileSync(file.path);
                return encode_image = img.toString('base64');
            })

            imgArray.map((src, index) => {
                // Create object to store data in the collection
                let finalImg = {
                    filename: files[index].originalname,
                }
            })
        }
    },
}

module.exports = multerController;