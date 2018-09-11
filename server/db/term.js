var dbModule = require('../db');
var mongod = require('mongodb');

module.exports =
    {
        terms: function (parent, language, filter) {
            var db = dbModule.getDataBase();
            var match = {
                parent: parent
            };
            if (mongod.ObjectID.isValid(filter)) {
                //search by id
                match._id = new mongod.ObjectID(filter);
            }
            else {
                match["label." + language] = new RegExp(filter);
            }
            console.log(match);
            var x = db.collection('term')
                .aggregate(
                    [
                        {
                            $match: match
                        },
                        {
                            $project: {value: "$_id", "label": "$label." + language}
                        }
                    ]
                )
            return x.toArray();
        },
        byId: function (language, id) {
            var db = dbModule.getDataBase();
            var match = {
                _id: new mongod.ObjectID(id)
            };
            var x = db.collection('term')
                .aggregate(
                    [
                        {
                            $match: match
                        },
                        {
                            $project: {value: "$_id", "label": "$label." + language}
                        }
                    ]
                )
            return x.toArray();
        },
        _gender: new mongod.ObjectID("5b97977aca9df2110cfd5c5b"),
        _country: new mongod.ObjectID("5b97a763f3dcb33108c1c571")
    }
