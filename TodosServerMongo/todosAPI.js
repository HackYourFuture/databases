var todosAPI = {

    /**
    PLEASE READ THE COMMENTS BELOW
    For those of you coming from a procedural programming language this may look strange.
    You might want to write getTodos like below in the comments. Please uncomment the getTodos
    below and try it out. You will see that the return value is undefined in the commented version.
    Why? Because the query is an asynchronous call and returns immediately so the return never happens!
    Try it out and see for yourself.
    */
    /*
    getTodos: function(connection, id, callback) {
        if (!id) {
            connection.query('select id, name, done from todos', function(err, rows, fields) {
                if (!err) {
                    return rows;
                } else {
                    console.warn('Error in getTodos')
                    return rows;
                }
            });
        }
    }
    */
    getTodos: function(collection, document, callback) {
        collection.find().toArray(function(err, result) {
            if (err) {
                console.log(err);
                callback('Error getting todos', null);
            } else if (result.length) {
                console.log('Found:', result);
                callback(null, result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }
        })
    }
}
module.exports.todosAPI = todosAPI;
