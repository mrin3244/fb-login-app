const express = require('express');
var sess = "";

module.exports = function(dbs){
    const router = express.Router();
    router.get('/', (req, res, next) => {
        sess = req.session;
        if(sess.result){
            var id = sess.result.id;
            //console.log(id);
            res.render('home', {id: sess.result.id, name: sess.result.name});
        }else {
            res.redirect('/err');
        }
        
    });

    return router;
};