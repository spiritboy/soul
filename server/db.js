var Promise = require("promise");
var mongod = require('mongodb');
var mongoClient = mongod.MongoClient, db;
mongoClient.connect('mongodb://127.0.0.1/').then(function (con) {
    db = con.db('spl');
    console.log("db running");
});

module.exports.getDefinition = function () {
    var o_id = new mongod.ObjectID('5b409b7aacfc2c2ab4e7db2d');
    return new Promise(function (fulfill, reject) {
        db.collection('definition').find({_id: o_id}).toArray().then(function (data) {
            try {
                fulfill(data[0]);
            } catch (ex) {
                reject(ex);
            }
        });
    });
};

module.exports.saveGroup = function (body) {
    return new Promise(function (fulfill, reject) {
        var fkId = parseInt(body.fkId);

        if (fkId == 0) {
            var insertingData = {};
            insertingData[body.menuUid] = {};
            insertingData[body.menuUid][body.groupUid] = body.data;
            getNextSequence("fkId").then(function (ret) {
                insertingData.fkId = fkId = ret.value.seq;
                db.collection('repo').insertOne(insertingData).then(function (result1) {
                    fulfill({fkId: fkId});
                });
            });
        }
        else {
            //update the normalizedData group
            var update = {};
            update[body.menuUid + '.' + body.groupUid] = body.data;
            db.collection('repo').updateOne({fkId: parseInt(fkId)}, {$set: update}).then(function (ret) {
                fulfill({fkId: fkId});
            })
        }
    });
};
module.exports.loadfk = (fkId) => {
    return new Promise(function (fulfill, reject) {
        db.collection('repo').find({fkId: parseInt(fkId)}).project({
            _id: 0,
            fkId: 0
        }).toArray().then(function (data) {
            console.log(data);
            if (data != null) {
                data = data[0];
                for (let i in data)
                    data = data[i];
            }
            fulfill(data);
        })
    });
}
module.exports.search = (query, proj) => {
    return new Promise(function (fulfill, reject) {
        db.collection('repo').find(query).project(proj)
            .toArray()
            .then(function (data) {
                fulfill(data);
            }).catch(function (e) {
            reject(e);
        })
    });
}

function getNextSequence(name) {
    return db.collection('counters').findAndModify({_id: name}, null, {$inc: {seq: 1}});
}
