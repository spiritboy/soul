var Promise = require("promise");
var mongod = require('mongodb');
var mongoClient = mongod.MongoClient, db;
mongoClient.connect('mongodb://spiritboy:aminspiritboy2@ds257732.mlab.com:57732/soul').then(function (con) {
    db = con.db('soul');
    console.log("db running");
});
module.exports.getDataBase = () => {
    return db;
}
//will return the full definition if a menu from the database
module.exports.getDefinition = function (language) {
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

//will update a group
module.exports.saveGroup = function (body) {
    return new Promise(function (fulfill, reject) {
        var fkId = parseInt(body.fkId);

        //if it is new perform an insert
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

//load all group values of the specified fk
//first find the record from repo, and then prepare the results to return in  a proper format
module.exports.loadfk = (fkId) => {
    return new Promise(function (fulfill, reject) {
        db.collection('repo').find({fkId: parseInt(fkId)}).project({
            _id: 0,
            fkId: 0
        }).toArray().then(function (data) {
            if (data != null) {
                data = data[0];
                for (let i in data)
                    data = data[i];
            }
            fulfill(data);
        })
    });
}

//will search the database based on a query and return a projected result
module.exports.search = (query, projection) => {
    return new Promise(function (fulfill, reject) {
        db.collection('repo').find(query).project(projection)
            .toArray()
            .then(function (data) {
                fulfill(data);
            }).catch(function (e) {
            reject(e);
        })
    });
}
//will list all  the available menus
module.exports.menus = () => {
    return new Promise(function (fulfill, reject) {
        db.collection('definition').find().project({
            _id: 1,
            uid: 1,
            title: 1,
            "groups.title": 1,
            "groups.uid": 1,
            "groups.groupInfo.type": 1,
            "groups.questions.title": 1,
            "groups.questions.uid": 1,
            "groups.questions.fieldInfo": 1
        }).toArray().then(function (data) {
            fulfill(data);
        }).catch(function (e) {
            reject(e);
        })
    });
};

//will get the group
module.exports.group = (muid, guid) => {
    return new Promise(function (fulfill, reject) {
        var query = {uid: muid, 'groups.uid': guid};
        var proj = {_id: 0, 'groups': {$elemMatch: {uid: guid}}};
        db.collection('definition').find(query).project(proj).toArray().then(function (data) {
            var group = null;
            if (data.length > 0)
                group = data[0].groups[0];
            fulfill(group);
        }).catch(function (e) {
            reject(e);
        })
    });
};
//will update a group
module.exports.saveGroup_admin = function (body) {
    return new Promise(function (fulfill, reject) {
        var query = {uid: body.muid, 'groups.uid': body.uid};
        db.collection('definition').update(query, {
            $set: {
                'groups.$.title.fa': body.fatitle,
                'groups.$.title.en': body.entitle,
                'groups.$.groupInfo.type': body.type,
                'groups.$.uid': body.uid,
            }
        }).then(function (d) {
            console.log(d);
            fulfill(d);
        }).catch(function (e) {
            reject(e);
        });
    });
}

//will get the group
module.exports.menu = (muid) => {
    return new Promise(function (fulfill, reject) {
        var query = {uid: muid};
        var proj = {_id: 0, 'title': 1, 'uid': 1};
        db.collection('definition').find(query).project(proj).toArray().then(function (data) {
            var menu = null;
            if (data.length > 0)
                menu = data[0];
            fulfill(menu);
        }).catch(function (e) {
            reject(e);
        })
    });
};
//will update a group
module.exports.saveMenu_admin = function (body) {
    return new Promise(function (fulfill, reject) {
        var query = {uid: body.uid};
        db.collection('definition').update(query, {
            $set: {
                'title.fa': body.fatitle,
                'title.en': body.entitle,
                'uid': body.uid,
            }
        }).then(function (d) {
            console.log(d);
            fulfill(d);
        }).catch(function (e) {
            reject(e);
        });
    });
}
//will get the group
module.exports.question = (muid, guid, quid) => {
    return new Promise(function (fulfill, reject) {
        var aggregate = [{$match: {uid: muid, 'groups.uid': guid, 'groups.questions.uid': quid}}
            , {
                $addFields:
                    {
                        question: {
                            $arrayElemAt: [{
                                $arrayElemAt: [{
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: '$groups',
                                                'as': 'g',
                                                'cond': {$eq: ["$$g.uid", guid]}
                                            }
                                        },
                                        as: 'g',
                                        'in':
                                            {
                                                $filter: {
                                                    input: '$$g.questions',
                                                    'as': 'q',
                                                    'cond': {$eq: ["$$q.uid", quid]}
                                                }
                                            }
                                    }
                                }, 0]
                            }, 0]
                        }
                    }
            }
            , {$project: {_id: 0, question: 1}}
        ];
        db.collection('definition').aggregate(aggregate).toArray().then(function (data) {
            var q = null;
            if (data.length > 0)
                q = data[0].question;
            console.log(q)
            fulfill(q);
        }).catch(function (e) {
            reject(e);
        })
    });
};
//will update a group
module.exports.saveQuestion_admin = function (body) {
    return new Promise(function (fulfill, reject) {
        let query = {uid: body.muid, 'groups.uid': body.guid, 'groups.questions.uid': body.uid};
        let cursor = db.collection('definition').find(query);
        cursor.toArray()
            .then((item) => {
                item[0].groups.forEach(g => {
                    if (g.uid === body.guid) {
                        g.questions.forEach(q => {
                            if (q.uid === body.uid) {
                                q.title = body.title;
                                q.inSearch = body.inSearch;
                                q.events = body.events;
                                q.validation = body.validation;
                            }
                        })
                    }
                });
                db.collection('definition').update({_id: item[0]._id}, item[0]).then(d => fulfill(d))
            }).catch(e => reject(e));
    });
}

function getNextSequence(name) {
    return db.collection('counters').findAndModify({_id: name}, null, {$inc: {seq: 1}});
}
