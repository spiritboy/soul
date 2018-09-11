module.exports = {
    //will prepare the searchResults in  a proper format, sot they can be rendered in a desired way
    prepareSearchResults: function (searchResults, menu) {
        return searchResults.map((row) => {
            return this.prepareSearchResult(row, menu);
        });
    },

    //will prepare each searchResult in  a proper format
    //1-iterate through questions within a group and obtain their title
    //2-use the title for the column name
    //3-if the group is an array (repeated) use a recursive approach
    // { _id: 5b4266f9f6e79a2c2c171d86,
    //     people:
    //     { primaryInfo: { fname: 'امیر', lname: 'رضوانی' },
    //         contactInfo: [] },
    //     fkId: 18 }
    //======>>>>>>
    // { fkId: 18,
    //     _id: 5b4266f9f6e79a2c2c171d86,
    //     'نام': 'امیر',
    //     'نام خانوادگی': 'رضوانی' }
    prepareSearchResult: function (row, menu) {
        console.log(row);
        var newRow = {fkId: row.fkId, _id: row._id};
        delete row.fkId;
        delete row._id;
        for (let menuUid in row) {
            for (let gUid in row[menuUid]) {
                if (Array.isArray(row[menuUid][gUid])) {
                    for (let item of row[menuUid][gUid]) {
                        for (let qUid in item) {
                            if (newRow[menu.findQuestion(gUid, qUid).title] == null)
                                newRow[menu.findQuestion(gUid, qUid).title] = '';
                            newRow[menu.findQuestion(gUid, qUid).title] += (' ' + item[qUid]);
                        }
                    }
                }
                else {
                    for (let qUid in row[menuUid][gUid])
                        newRow[menu.findQuestion(gUid, qUid).title] = row[menuUid][gUid][qUid];
                }
            }
        }
        console.log(newRow);
        return newRow;
    }
}