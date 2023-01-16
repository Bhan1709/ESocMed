import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import helmet, { crossOriginResourcePolicy } from "helmet";
import morgan from "morgan";
import path from "path"; //native Node lib
import { fileURLToPath } from "url"; //native Node lib

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*FILE STORAGE*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* MONGOOSE SETUP */
const port = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
}).catch((err) => console.log(`${err} did not connect.`));