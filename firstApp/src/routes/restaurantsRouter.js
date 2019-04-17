import express from 'express';
import mongodb from 'mongodb';
const restaurantRouter = express.Router();
const mongo = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";

function router(nav){
  restaurantRouter.route('/')
    .get((req,res) => {
    mongo.connect(url,(err,db) => {
      if(err) throw err;
      let dbo = db.db('classdatabase');
      dbo.collection('restaurants').find({}).toArray((err,data)=>{
        if(err) throw err
        res.render('restaurants',{
          title:'Restaurants Page',
                  menu:nav,
                  restaurants:data
        })
      })
    })
  })

  restaurantRouter.route('/details/:name')
      .get((req,res) => {
        const {name} = req.params
        mongo.connect(url,(err,db) => {
          if(err) throw err;
          let dbo = db.db('classdatabase');
          dbo.collection('restaurants').findOne({name:name}, (err,data)=>{
            console.log(data)
            if(err) throw err
            res.render('restaurants_details',{
              title:'Restaurants Details',
              menu:nav,
              details:data})
          })
        })
        
  });

  return restaurantRouter
}


module.exports = router;

