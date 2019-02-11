const express = require('express');
var sess = "";
var FB = require('fb');


  



module.exports = function(dbs, app){
    const router = express.Router();
    router.post('/', (req, res, next) => {
        sess = req.session;
        var access_token = req.body.access_token;
        //console.log(access_token);
        
        if(access_token){
            FB.setAccessToken(access_token);
            FB.api('me', function (result) {
                if(!result || result.error) {
                    console.log(!result ? 'error occurred' : result.error);
                    return;
                }
                //console.log(result);
                sess.result = result;
                //return result;
                res.send('localIdvalid') ;
            });
        }else {
            res.send('localIdinvalid') ;
            //res.redirect('/home');
        }
        
    });
    router.post('/logout', (req, res, next) => {
        sess = req.session;
        delete sess.result;
        res.send('localIdinvalid') ;
    });

    return router;
};