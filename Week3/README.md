## ToDo App

### Database
  - Execute `todo.sql` file to create and import database
  - Set username/password into `todo/db.js` file

### Initialize App (cli)
- Navigate to app folder `cd todo`
- Install Required Packages `npm install`
- Start App `node express`
- App Started at http://localhost:3000

### Test App (Postman)
Action | Method | Request | JSON Payload
--- | --- | --- | --- |
Login | POST | ./auth/login | { "name": "", "password": "" }
Fetch all user"s lists | GET | ./lists/ | 
Fetch list by its id | GET | ./lists/:id | 
Create a new list | POST | ./lists/ | { "title": "" }
Delete list by its id | DELETE | ./lists/:id | 
Create a new reminder by list's id | POST | ./lists/reminder/:id | { "text": "", "datetime": "2019-01-01 15:00:00" }
Create a new item by list"s id | POST | ./items/ | { "title": "" }
Delete item by its id | DELETE | ./items/:id |
Mark item as completed by its id | PUT | ./items/:id |

### Login Credentials
**Username:** Hiba **Password:** 12345678

**Username:** Tala **Password:** 23456789