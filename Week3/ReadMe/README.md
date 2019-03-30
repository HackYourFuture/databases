// We have now 3 routes to use
/user => for User Routes
/list => for List Routes
/item => for Item Routes

## in user route I can add user through this route

http://localhost:3000/user and give the user any user_name

## in list routes You can post new list and delete list

1- to save data into database
http://localhost:3000/list and type the name of the list and say for which user this list belongs
2- to delete list you need to choose the id of the list
http://localhost:3000/list/1

## ## in item routes You can post new item and delete item and make the item as completed

1- to save data into database
http://localhost:3000/item and type the name of the item and say for which user this item belongs and for which list this item is belnogs, but by default will create this item as not completed by [0] value
2- to delete item you need to choose the id of the item
http://localhost:3000/item/1
3- to make this item completed
http://localhost:3000/item/1/markAsComplete
