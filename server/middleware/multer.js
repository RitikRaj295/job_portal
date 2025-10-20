import multer from 'multer';


const storage = multer.memoryStorage(); // defining the storage as this function store the uploaded file in memory

export const singleUpload= multer({storage}).single("file");