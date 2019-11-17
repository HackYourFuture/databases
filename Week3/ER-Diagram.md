# Todo App ER-Diagram

## User Entity

1. Users have a username and unique id
2. Users may have (or not) TodoLists.

## TodoList Entity

1. Each TodoList consists of TodoItems and Reminders.
2. TodoList have a name that show their purposes shortly for using listing purposes.
3. Each TodoList may have (or not) a long description about what their purpose is.
4. Each TodoList must belong to a user.

## Todo Item Entity

1. TodoItems belongs to a TodoList.
2. Each ToDoItem has a description that explains content of that item, namely, what it is for added to ToDoList.
3. Each TodoItem may be tagged (or not) from the predefined tags.
4. Each TodoItem may be marked as completed or not completed.

## Tag Entity

1. Tags are predefined and also can be created by users.
2. Tags may have a description about their purpose.
3. Tags have a name that explains their purpose in a short manner no more than three words.
4. Tags have a color that is used for demonstration purposes on lists to identify the tag easily. (e.g red for urgent tag)

## Reminder

1. Reminders are used for scheduling TodoLists.
2. Reminders must belong to a TodoList.
3. Reminders have a description that explains reminders purpose in a detailed manner. (e.g address)
4. Reminders have a remindingTime property which is actually an UTC datetime. It points to the triggering time of the reminder.
