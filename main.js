import express from "express"
import multer from "multer"

const app = express()

app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        const strToArr = file.originalname.split(".")
        const ext = strToArr[strToArr.length - 1]
        let prefix = "file"
        switch (ext) {
            case "png":
                prefix = "image";
            case "docx":
                prefix = "document"
            case "mp4":
                prefix = "video"
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, + '-' + uniqueSuffix + "." + ext)
    }
})

const upload = multer({ storage: storage })

app.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
    console.log(req.file)
    res.send(`<h2>Here is the picture:</h2><img src="${req.file.filename}" alt=”something”/>`)
})

app.listen("9000", () => console.log("listening on 9000"))