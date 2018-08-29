var express = require('express'),
    app=express(),
    cors  = require('cors'),
    jwt = require('jsonwebtoken'),
    bodyParser=require('body-parser'),
    mongoose =require('mongoose');

mongoose.Promise=require('q').Promise;

mongoose.connect('mongodb://localhost:27017/ass');
var db = mongoose.connection;
db.on('error',function(){
    console.log("error happened!")
});
db.on('open',function(){
    console.log('Connection estabilised');
});

var user_schema=mongoose.Schema({
    user_Name:String,
    user_password:String
});

var user_model=mongoose.model('users',user_schema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({
    origin:'http://localhost:4200'
}));


app.get('/getposts',function(req,res){
    console.log("getpost ok");
    db.collection('posts').find({},function(err,result){
        if(result!=null){
            console.log(result.toString());
            res.send(result.toString());
        }else{
            console.log("nothing found!!");
        }
    });
});


app.post('/authenticate',function(req,res){
    console.log("hifromserver");
    console.log(req.body);
    db.collection('users').findOne({
        user_Name:req.body.username,
        user_password:req.body.password
    },function(err, result) {
       if(!err){
            console.log(result);
            if(result!=null){
                var token = jwt.sign({'uname':req.body.username},'not-easy-get',{
                    expiresIn:'1h'
                });
                res.send({
                    token:token,
                    isLoggedIn:true
                });
            }else{
                res.send({
                    isLoggedIn:false,
                    err:'Invalid user'   
                });
            }
           
       }else{
        res.send({
            isLoggedIn:false,
            err:'Invalid user'   
        });
       }
      });
    // if(req.body.username=="admin"&&req.body.username=="admin"){
    //     var token = jwt.sign({'uname':req.body.username},'not-easy-get',{
    //         expiresIn:'1h'
    //     });
    //     res.send({
    //         token:token,
    //         isLoggedIn:true
    //     });
    // }else{
    //     res.send({
    //         isLoggedIn:false,
    //         err:'Invalid user'   
    //     });
    // }
});



app.post('/signup',function(req,res){
    console.log("signup");
    console.log(req.body);
 
    var user_doc=user_model({
        user_Name:req.body.username,
        user_password:req.body.password
    });

    user_doc.save(function(err){
        if(!err){
            console.log('Document saved!!!');
            res.send({
                isSignUp:true
            });
        }else{
            res.send({
                isSignUp:false,
                err:"contains user"
            });
        }
    });
});

// app.use(function(req,res,next){
//     var token = req.body.authorization||req.query.authorization||req.headers.authorization;
//     console.log(token);
//     if(token){
//         jwt.verify(token,'not-easy-get',function(err,decoded){
//             if(!err){
//                 req.decoded=decoded;
//                 next();
//             }else{
//                 console.log("flse1");
//                 res.send({
                    
//                     isLoggedIn:false,
//                     err:'Invalid user' 
//                 });
//             }
//         })
//     }else{
//         console.log("flse2");
//         res.send({
//             isLoggedIn:false,
//             err:'Invalid user' 
//         });
//     }
// });

app.listen(3000,function(){
    console.log('server running @3000');
});