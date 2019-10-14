var url=require('url');
module.exports.Login=function(req,res){
        
    var email=req.body.email;
    console.log("uname=",email);
    
    var password=req.body.pass;
    console.log("password=", password);

    var sql="select * from healthapp.auth where UserName=? and password=?";

    connection.query(sql,[email,password],function(err,row,fields){
            if(err)
                console.log(err);
            else if (row.length>0){
                console.log("row=",row.length);
                console.log('login');
                req.session.user_name=email;
                req.session.success=1;
                console.log("req.session.user_name=",req.session.user_name);
                res.redirect(url.format({
                    pathname:'/Homepage'
                }))
                /*  res.redirect(url.format({
                                pathname:'/'
                                })) */
                
                /*  else{
                        res.redirect(url.format({
                        pathname:'/'
                }))  */
            }
    
            if(row.length===0){
                console.log("invalid crediantals");
                req.session.success=-1;
                res.redirect(url.format({
                    pathname:'/login'
                }));
    }

});
};