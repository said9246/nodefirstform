const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");
const LogInCollection = require("./mongo");
require("./mongo")


const PORT =process.env.PORT || 3500;

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

const tem =path.join(__dirname, 'template');
const publicPath = path.join(__dirname, 'public');

app.set('view engine' ,'hbs');
app.set('views',tem);
app.use(express.static(publicPath))





app.get("/",(req,res)=>{
        res.render("register")
})
app.get("/login",(req,res)=>{
        res.render("login")
})
app.get("/signup",(req,res)=>{
        res.render("signup")
})

app.post("/signup",async(req,res)=>{
        const data={
            name: req.body.name,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password
        }

        await LogInCollection.insertMany([data]);

        res.render("register");

});

app.post('/login', async (req, res) => {

        try {
            const check = await LogInCollection.findOne({ email: req.body.email })
    
            if (check.password === req.body.password) {
                res.status(201).render("register", { naming: `${req.body.password}+${req.body.name}` })
            }
    
            else {
                res.send("incorrect password")
            }
    
    
        } 
        
        catch (e) {
    
            res.send("wrong details")
            
    
        }
    
    
    })
    
    

// app.post('/signup', async (req, res) => {
    
//         // const data = new LogInCollection({
//         //     name: req.body.name,
//         //     password: req.body.password
//         // })
//         // await data.save()
    
//         const data = {
//             name: req.body.name,
//             password: req.body.password
//         }
    
//         const checking = await LogInCollection.findOne({ name: req.body.name })
    
//        try{
//         if (checking.name === req.body.name && checking.password===req.body.password) {
//             res.send("user details already exists")
//         }
//         else{
//             await LogInCollection.insertMany([data])
//         }
//        }
//        catch{
//         res.send("wrong inputs")
//        }
     
//         res.status(201).render("home", {
//             naming: req.body.name
//         })
//     })
    



    





app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
})