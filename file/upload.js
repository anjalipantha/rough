const multer = require("multer");

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

//now to filter the file
// for example we may only need to upload image file

const filter = function (req, file, cb) {
    if(file.mimetype=="image/jpeg" || 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    
    }
  }
  const upload = multer({
      storage: storage,
      fileFilter: filter
  })
  module.exports = upload;