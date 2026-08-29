import express from "express";
const app = express();
app.use(express.urlencoded({ extended: true }));

const inputCleaner = (req, res, next) => {
    if(req.body.username){
        req.body.username = req.body.username.toLowerCase()
        
    };
    if (req.body.comment){
        req.body.comment = req.body.comment.replace(/<[^>]*>/g, "")
    }
    next()
}

const inputValidator =(req, res, next) => {
    if(req.body.username && req.body.username.length >= 3){
        next()
        
    }else{
        res.redirect("/form?error=Username must be at least 3 characters.")
    }

    
    
}

export {inputCleaner, inputValidator}