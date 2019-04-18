import express from 'express';
import mongodb from 'mongodb';
import 'babel-polyfill'

const moviesRouter = express.Router();
const mongo = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";
const database = 'classdatabase'


function router(nav){
    moviesRouter.route('/')
      .get((req,res) => {
        (async function mongo(){
          let client;
          try{
            client = await mongodb.connect(url);
            const db = client.db(database);
            const col = await db.collection('movies');
            const data = await col.find().toArray();
            res.render('movies',{
              title:'Movies Page',
              menu:nav,
              movies:data})
          }
          catch(err){
            throw err;
          }
        }())  
    });

    moviesRouter.route('/details/:id')
      .get((req,res) => {
          const { id } = req.params;
          (async function mongo(){
            let client;
            try{
              client = await mongodb.connect(url);
              const db = client.db(database);
              const col = await db.collection('movies');
              const data = await col.findOne({_id:id})
              res.render('movies_details',{
                title:'Movies Details',
                menu:nav,
                details:data})
            }
            catch(err){
              throw err
            }

          }())          
      });
    
    return moviesRouter
}


module.exports = router;