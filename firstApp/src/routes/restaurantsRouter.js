import express from 'express';
import mongodb from 'mongodb';
import 'babel-polyfill'

const restaurantRouter = express.Router();
const mongo = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";
const database = 'classdatabase'

function router(nav){
  restaurantRouter.route('/')
    .get((req,res) => {
      (async function mongo(){
        let client;
        try{
          client = await mongodb.connect(url);
          const db = client.db(database);
          const col = await db.collection('restaurants');
          const data = await col.find().toArray();
          res.render('restaurants',{
            title:'Restaurants Page',
                    menu:nav,
                    restaurants:data
          })
        }
        catch(err){
          throw err;
        }
      }()) 
  })

  restaurantRouter.route('/details/:name')
      .get((req,res) => {
        const {name} = req.params;
        (async function mongo(){
          let client;
          try{
            client = await mongodb.connect(url);
            const db = client.db(database);
            const col = await db.collection('restaurants');
            const data = await col.findOne({name:name})
            res.render('restaurants_details',{
              title:'Restaurants Details',
              menu:nav,
              details:data})
          }
          catch(err){
            throw err;
          }
        }())    
  });

  return restaurantRouter
}


module.exports = router;

