import multer from "multer";
import storage from "../service/service.upload.js";

const uploadStorage = multer({ storage: storage });

export default uploadStorage;