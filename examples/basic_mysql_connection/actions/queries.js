module.exports = {
    count: "SELECT COUNT(*) AS total FROM todos",
    done: "SELECT * FROM todos WHERE done = 1",
    notDone: "SELECT * FROM todos WHERE done <> 1",
    recent: "SELECT * FROM todos ORDER BY Due DESC",
    lastAdded: "SELECT * FROM todos ORDER BY Due DESC LIMIT 1",
    allDB: "SELECT * FROM todos WHERE Name LIKE '%databases%'",
    qInsert: "INSERT INTO todos (Name, Done, Due) VALUES (?, ?, ?)",
    update: "UPDATE todos SET Name = ?, Done = ?, Due = ? WHERE Id = ?",
    delete: "DELETE FROM todos WHERE Id = ?"
}