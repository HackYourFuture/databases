# First of all

Hello this is Eli's little application (which is, unfortunately, partially succesfull). I still hope you enjoy it while you discovering it.

# About the instructions

- On the main page you will see that there are to inputs for you to fill (with the name of the list and your reminder of course).
- If everyhting goes well, you will be sent to another page which says 'Thank you for your patience etc.'
- After that, you can go back to main page and start adding some items to your brand new list by clicking on 'Add Items To Your List'.
- After clicking on that, you can write your task, whether it is completed or not and which list it belongs to.
- Since you add some task to your list, you can see them as a table by clicking on 'View List'.
- There you can either decide to add some more items, creating another list or delete a list.
- So after you decide to delete an item, or a list you have to use postman.

# About Postman

FOR DELETING AN ITEM OR A LIST

- Open your postman
- Choose your method (Delete in this case)
- Type the path and then for deleting an item: /deleteItem/<--itemname-->
- For deleting a list /deleteList/<--listname-->
- You will get the response that says 'Succesfully deleted'

FOR UPDATING THE STATUS OF AN ITEM

- Open you postman
- Chose your method as PUT
- Type the path and then for deleting an item: /update/<itemYouWantToUpdate>/<updatedStatus>
- You will get the response that says 'Your item is up to date'
