module.exports = {

    prepareSearchResults: function (searchResults, menu) {
        return searchResults.map((row) => {
            return this.prepareSearchResult(row, menu);
        });
    },
    prepareSearchResult: function (row, menu) {
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
        return newRow;
    }
}