In this todo-app you can:

1.  add user: via sign in page;
2.  login: via login page;
3.  add list: after login page(after click user) user page will open;
4.  in user page: two forms: add list form and add item form, you can easily input all kind of inputs,
    (in add item form there is select box: options are based on specific user's existed lists, you choose a list from select box and add your todo item to that list, default: done is false)
5.  show lists: in user page right-bottom button to lists page;
6.  delete lists: in lists page via delete button in list form you can delete that list and included items;
7.  show lists: in lists page via show items button in list form you can show that list with its items;
8.  mark as done: in show list page you can mark items done via done button in item form;(default done for items are false, all items marked as done will deleted);

bugs:

1. delete, update... working well, but the result will effect after refresh the page or with a new visit;
2. url path bugs;
3. error handling;
4. other bugs (because of nodemon and pc condition it's hard to test all features, same code get different testing result )

planned implementation:

1. user interface implementation;
2. use cookies, express.session to improve login,register system;
3. complete error handling.

for test: login: username:ddf; password: ddf.
