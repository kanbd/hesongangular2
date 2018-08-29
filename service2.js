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

var post_schema=mongoose.Schema({
    post_title:String,
    post_description:String,
    post_createBy:String,
    psot_like:Number,
    liked_users:Array
});

var com_schema=mongoose.Schema({
    postid:String,
    body:String
});

var post_model=mongoose.model('posts',post_schema);
var com_model=mongoose.model('comments',com_schema);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({
    origin:'http://localhost:4200'
}));
app.get('/getposts',function(req,res){
    console.log("getpost ok");
    db.collection('posts').find({}).toArray(function(err,result){
        if(result!=null){
           // console.log(result.toString());
            res.send(result);
        }else{
            console.log("nothing found!!");
        }
    });
});
app.post('/getcomments',function(req,res){
    console.log("getcomments ok");
    console.log(req.body.id);
    db.collection('comments').find({'postid':req.body.id}).toArray(function(err,result){
        if(result!=null){
           // console.log(result.toString());
           console.log(result);
            res.send(result);
            console.log(req.body.id);
        }else{
            console.log("nothing found!!");
        }
    });
});


app.post('/post',function(req,res){


    var post_doc=post_model({
        post_title:req.body.title,
        post_description:req.body.description,
        post_createBy:req.body.createBy,
        psot_like:0,
    });
    post_doc.save(function(err){
        if(!err){
            console.log('Document saved!!!');
            res.send({
                isPosted:true
            });
        }else{
            res.send({
                isPosted:false,
                err:"contains user"
            });
        }
    });

});

app.post('/like',function(req,res){
    var ObjectId = require('mongodb').ObjectId;
    console.log("gg");
    db.collection("posts").findOne({'_id':ObjectId(req.body.id)},function(err,result){
        var myquery = { _id:ObjectId(req.body.id)};
        if(result.liked_users!=null){
            if(result.liked_users.indexOf(req.body.name) > -1){
            }else
                result.liked_users.push(req.body.name);
                
            
        }else{
            result.liked_users=new Array();
            result.liked_users.push(req.body.name);
        }
        var newvalues = { $set: { psot_like: result.psot_like+1, liked_users: result.liked_users} };
        db.collection("posts").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
          });
        //console.log(result);
    });
});
app.post('/edit',function(req,res){
    var ObjectId = require('mongodb').ObjectId;
    console.log("edit is processing");
    db.collection("posts").findOne({'_id':ObjectId(req.body.id)},function(err,result){
        var myquery = { _id:ObjectId(req.body.id)};
        console.log(req.body.id);
        var newvalues = { $set: { post_title: req.body.title,post_description: req.body.description} };
        db.collection("posts").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
          });
        //console.log(result);
    });
});


app.post('/comment',function(req,res){
    //var ObjectId = require('mongodb').ObjectId;
    console.log("comment is processing");
    var com_doc=com_model({
        postid:req.body.postid,
        body:req.body.body,
        
    });
    com_doc.save(function(err){
        if(!err){
            console.log('Document saved!!!');
            res.send({
                isPosted:true
            });
        }else{
            res.send({
                isPosted:false,
                err:"contains user"
            });
        }
    });
});
app.post('/delete',function(req,res){
    var ObjectId = require('mongodb').ObjectId;
    console.log("db delete");
    console.log(req.body);
    var myquery = { _id: ObjectId(req.body.id) };
    db.collection("posts").remove(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    });
});
// app.post('/authenticate',function(req,res){
//     console.log("hifromserver");
//     console.log(req.body);
//     db.collection('users').findOne({
//         user_Name:req.body.username,
//         user_password:req.body.password
//     },function(err, result) {
//        if(!err){
//             console.log(result);
//             if(result!=null){
//                 var token = jwt.sign({'uname':req.body.username},'not-easy-get',{
//                     expiresIn:'1h'
//                 });
//                 res.send({
//                     token:token,
//                     isLoggedIn:true
//                 });
//             }else{
//                 res.send({
//                     isLoggedIn:false,
//                     err:'Invalid user'   
//                 });
//             }
           
//        }else{
//         res.send({
//             isLoggedIn:false,
//             err:'Invalid user'   
//         });
//        }
//       });
//     // if(req.body.username=="admin"&&req.body.username=="admin"){
//     //     var token = jwt.sign({'uname':req.body.username},'not-easy-get',{
//     //         expiresIn:'1h'
//     //     });
//     //     res.send({
//     //         token:token,
//     //         isLoggedIn:true
//     //     });
//     // }else{
//     //     res.send({
//     //         isLoggedIn:false,
//     //         err:'Invalid user'   
//     //     });
//     // }
// });



// app.post('/signup',function(req,res){
//     console.log("signup");
//     console.log(req.body);
 
//     var user_doc=user_model({
//         user_Name:req.body.username,
//         user_password:req.body.password
//     });

//     user_doc.save(function(err){
//         if(!err){
//             console.log('Document saved!!!');
//             res.send({
//                 isSignUp:true
//             });
//         }else{
//             res.send({
//                 isSignUp:false,
//                 err:"contains user"
//             });
//         }
//     });
// });

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

app.listen(3001,function(){
    console.log('server running @3001');
});