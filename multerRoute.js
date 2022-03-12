const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const { imageFilter } = require('./helpers');
const multerController = require('./multerController');
const router = require('express').Router();

// Định nghĩa nơi lưu trữ, cách lấy file
const storage = multer.diskStorage({
    // đích đến, nơi lưu file
    destination: (req, file, cb) => {
        // Nếu không có file trả về null, ngược lại có file thì file này sẽ được lưu vào thư mục images
        console.log('>>> Check approot: ', appRoot);
        cb(null, appRoot + '/public/images/');
    },
    // tên của file 
    filename: (req, file, cb) => {
        // Nếu không có file trả về null, ngược lại có file thì trả về tên file (Lưu ý tên file ảnh phải là unique do đó ta nên cộng chuỗi để đảm bảo tính unique)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage, fileFilter: imageFilter });

// upload.single('profile_picture') là 1 middleware nằm giữa. Nếu thằng middleware này thành công thì mói chạy đến multerController.handleUploadSignleFile
// Nếu thằng middleware này thất bại thì sẽ không chạy đến multerController.handleUploadSignleFile 
// single: Only 1 file image can be uploaded
router.post('/upload-single-file', upload.single('profile_picture'), multerController.handleUploadSignleFile);

// upload.array('multiple_pictures', 3) là 1 middleware nằm giữa. Nếu thằng middleware này thành công thì mói chạy đến multerController.handleUploadMultipleFile
// Nếu thằng middleware này thất bại thì sẽ không chạy đến multerController.handleUploadMultipleFile 
// array: Can upload multiple file images
// 3 ở đây là tối đa 3 file ảnh
router.post('/upload-multiple-file', upload.array('multiple_pictures', 3), multerController.handleUploadMultipleFile);
module.exports = router;