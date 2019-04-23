import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017";

const maincall = (myObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('apr_node_oo')
        dbo.collection('user').insertOne(myObj,(err) => {
            if(err) throw err;
            console.log('data inserted')
            db.close();
        })
    })
}
maincall.prototype.postData = (colName,myObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('apr_node_oo')
        dbo.collection(colName).insertOne(myObj,(err) => {
            if(err) throw err;
            console.log('data inserted')
            db.close();
        })
    })
}

maincall.prototype.putData = (colName,query,myObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('apr_node_oo')
        dbo.collection(colName).update(query,myObj,(err) => {
            if(err) throw err;
            console.log('data updated')
            db.close();
        })
    })
}

maincall.prototype.deleteData = (colName,query) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('apr_node_oo')
        dbo.collection(colName).deleteOne(query,(err) => {
            if(err) throw err;
            console.log('data updated')
            db.close();
        })
    })
}

let outres;
maincall.prototype.getData = (colName) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('apr_node_oo')
        dbo.collection(colName).find({}).toArray((err,result) => {
            if(err) throw err;
            outres = result
        })
    })

    return outres;
}

module.exports = maincall