var dbModule = require('../db');
var sql = require("mssql");
var config = {
    user: 'nourian',
    password: 'N4567',
    server: '172.16.0.109',
    database: 'kowsar_his'
};

sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT Name FROM pub.PublicTerms WHERE tag = \'country\'', function (err, recordset) {
        console.log(1);
        var db = dbModule.getDataBase();
         db.collection('term').insertOne({parent:null,label:{en:'country',fa:'کشور'}})
             .then(d=>db.collection('term').insertMany(recordset.recordsets[0].map(f => {
                 return {parent: d.insertedId, label: {fa: f.Name, en: f.Name}}
             })))

        // send records as a response

    });
});