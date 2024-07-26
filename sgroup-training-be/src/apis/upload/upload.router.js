import uploadStorage from '../../middleware/middleware.upload.js';

// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
    console.log(req.file)
    return res.send("Single file")
})
//Multiple files
app.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
    console.log(req.files)
    return res.send("Multiple files")
})