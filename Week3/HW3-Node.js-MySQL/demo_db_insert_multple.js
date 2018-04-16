 var mysql = require('mysql');
var con = mysql.createConnection({
 host: "localhost",
  user: "",
 password: "",
  database: "mydb"
});
con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
 var sql = "INSERT INTO customers (name, address) VALUES ?";
 var values = [
    ['Kemirdin', 'Highway 71'],
    ['Fadir', 'Lowstreet 4'],
 ['Jams', 'Apple st 652'],
    ['Sam', 'Mountain 21'],
 ['Mahmut', 'Valley 345'],
    ['Emre', 'Ocean blvd 2'],
 ['Anas', 'Green Grass 1'],
    ['Elmire', 'Sky st 331'],
 ['Hamza', 'One way 98'],
    ['Diana', 'Yellow Garden 2'],
 ['Kenan', 'Park Lane 38'],
    ['Jason', 'Central st 954'],
 ['Maartje', 'Main Road 989'],
    ['Gijs', 'Sideway 1633']
 ];
  con.query(sql, [values], function (err, result) {
 if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}); 
