var url=require('url');
module.exports.signup=function(req,res){
    var sign_uname=req.body.username;
    var sign_email=req.body.email;
    var sign_password=req.body.pass;
    var sign_rpassword=req.body.Rpass;
    var sql_check="select * from healthapp.auth where UserName=?";
    var sql_insert="insert into healthapp.auth set ?";
    console.log(sign_uname)
    
    /* req.check('email','Entered Email Is  Not Valid').isEmail();
    req.check('pass','Password must be at least 5 character long').isLength({min:5});
    req.check('pass','Entered password does not match confirm password').equals(req.body.Rpass);

    var errors=req.validationErrors();
    console.log(errors);
   
    if(errors){
        req.session.errors=errors;
        res.render('LOGIN/signin',{exist:0,errors:req.session.errors,success:0})
    }
     */

    //if(!errors){
    connection.query(sql_check,[sign_uname],function(err,row,fields){
        if (err)
        console.error(err);
        else{
            if(row.length>0){
            console.log("this user already exist try using other user name");
            res.render('LOGIN/Signup')
            }
            else{
                var values={
                    "UserName":sign_uname,
                    "password":sign_password
                }
                console.log(values);
                connection.query("insert into healthapp.auth (UserName,password) values(?,?)",[sign_uname,sign_password],function(err,row1,fields){
                    if(err)
                    {
                        console.log("error in signup",err);
                    }
                    req.session.user_name=sign_uname
                    console.log("signed up");
                    res.render('HomePage/Homepage.ejs');
                   });
                /*    res.render(url.format({
                    pathname:"homepage/index1"
                }));  */  
            }
        }
    });
//}
}