const express=require('express')
const multer=require('multer')
const path=require('path')
const app=express()
app.set('view engine','ejs')
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
}).single('myImage')
app.use(express.static('./public'));
app.get("/",(req,res)=>{
    res.render("index")
})
app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }else{
            console.log(req.file)
            res.render("upload.ejs",{
                file:req.file,
            })
        }
    })
})
app.listen(3000,()=>{
    console.log("Server just started")
})