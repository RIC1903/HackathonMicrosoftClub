var express=require('express');
var connection =require('./Connection/connection.js'); 
var url=require('url');
var session=require('express-session');
var validator=require('express-validator');
var bodyparser=require('body-parser');
//var {spawn} = require("child_process");

var spawnSync = require('child_process').spawnSync;
var login=require('./views/Login/Login.js')
var Signup=require('./views/Login/Signup.js')
//var todo=require('./public/Todo.js')


var app=express();

/**/
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);


/* middleware for creating sessions */
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
var urlencodedParser = bodyparser.urlencoded({ extended: false });

/* middleware for validating form */
app.use(validator());


//templating engine ejs
app.set('view engine','ejs');

app.use('/public',express.static('public'));

//GET REQUEST


//render the homepage
app.get('/',(req,res)=>{
    req.session.success=undefined;
    res.render('Login/Login.ejs');
})

//RENDER the login page
app.get('/Homepage',(req,res)=>{
    res.render('HomePage/HomePage.ejs')  
});

//RENDER the signup page
app.get('/Signup',(req,res)=>{
    
    res.render('Login/Signup.ejs')
    
/*     if(!req.session.user_name)
    {
    console.log(req.session.success);
    console.log(req.session.errors);
    res.render('LOGIN/signin',{exist:0,errors:req.session.errors,success:req.session.success})

    }
    else
    res.render('form/log',{c:0}); */
});

// render rundiagnosis
app.get('/RunDiagnosis',(req,res)=>{
    res.render('NavigationBar/RunDiagnosis')
})

//render symptomchecker
app.get('/SymptomCheker',(req,res)=>{
    res.render('SymptomCheker/SymptomCheker1')
    
 
})

app.get('/bad',(req,res)=>{
    res.render('BadCond/HowBad.ejs');
})

app.get('/Diabetes',(req,res)=>{
    res.render('BadCond/Diabetes.ejs')
})

app.get('/aids',(req,res)=>{
    res.render('BadCond/Aids.ejs');
})

app.get('/maps',(req,res)=>{
    res.render('maps.ejs');
})
/* app.get('/SymptomChecker2',(req,res)=>{
    res.render('SymptomCheker/SymptomCheker2')
}) */
/* app.post('/SymptomChecker',urlencodedParser,(req,res)=>{
    var a=req.body.Disease
    console.log(a);
}) */



app.post('/login',urlencodedParser,login.Login);

app.post('/Signup',urlencodedParser,Signup.signup)

app.post('/Diabetes',urlencodedParser,(req,res)=>{
    var nop=req.body.NOP;
    console.log(nop);
    var glu=req.body.glu;
    console.log(glu);
    var bp =req.body.bp;
    console.log(bp)
    var sk=req.body.sk;
    console.log(sk);
    var In=req.body.In;
    console.log(In)
    var bmi=req.body.bmi;
    console.log(bmi);
    var pf=req.body.pf;
    console.log(pf);
    var age=req.body.age;
    console.log(age);
    
    var process = spawnSync('python.exe',["./python/dibatese.py", 
    nop,glu,bp,sk,In,bmi,pf,age] ); 
    console.log('created child')
    process.stdout.write(process.stdout.toString())
    res.render('DiabetesR.ejs',{val:process.stdout.toString()})

})

app.post('/aids',urlencodedParser,(req,res)=>{
    var cd4=req.body.cd4;
    console.log(cd4);
    var sw=req.body.sw;
    console.log(sw);
    var temp =req.body.temp;
    console.log(temp)
    var bp =req.body.bp;
    console.log(bp);
    var glu=req.body.glu;
    console.log(glu)
    var pl=req.body.pl;
    console.log(pl);
    var swell=req.body.swell;
    console.log(swell);
    var wl=req.body.wl;
    console.log(wl);
    var gender=req.body. gender;
    console.log( gender);
   
    
    var process = spawnSync('python.exe',["./python/aids.py", 
    cd4,sw,temp,bp,glu,pl,swell,wl,gender] ); 
    console.log('created child')
    process.stdout.write(process.stdout.toString())
    res.render('AidsR.ejs',{val:process.stdout.toString()});
})




app.post('/SymptomCheker1',urlencodedParser,(req,res)=>{
    var a=req.body.a;
    var b=req.body.b;
    var c=req.body.c;
    var d=req.body.d;
    var e=req.body.e;
    var f=req.body.f;
    var g=req.body.g;
    var h=req.body.h;
    var i=req.body.i;
    var j=req.body.j;
    var k=req.body.k;
    var l=req.body.l;
    var m=req.body.m;
    var n=req.body.n;
    var o=req.body.o;
    var p=req.body.p;
    var q=req.body.q;
    var r=req.body.r;
    var s=req.body.s;
    var t=req.body.t;

    
    var process = spawnSync('python.exe',["./python/basicSymptoms.py", 
    a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t] ); 
    console.log('created child')
    process.stdout.write(process.stdout.toString())
    res.render('SymptomCheker/SymptomCheker2.ejs',{val:process.stdout.toString()})

})

app.listen(3000,()=>{
    console.log("listening at port 3000")
})