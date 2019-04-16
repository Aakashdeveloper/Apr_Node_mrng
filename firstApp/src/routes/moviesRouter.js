import express from 'express'
import mongodb from 'mongodb'

const moviesRouter = express.Router();
const mongo = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";


function router(nav){
    moviesRouter.route('/')
      .get((req,res) => {
        mongo.connect(url,(err,db) => {
          if(err)  throw err;
          const dbo = db.db('classdatabase');
          dbo.collection('movies').find({}).toArray(
            (err,data) => {
              if(err) throw err;
              res.render('movies',{
                title:'Movies Page',
                menu:nav,
                movies:data})
            }
          )
        })
        
    });

    moviesRouter.route('/details')
      .get((req,res) => {
          res.render('movies_details',{
                      title:'Movie Details',
                      menu:nav})
      })
    
    return moviesRouter
}


module.exports = router;