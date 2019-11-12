# Todo App ER-Diagram

## User Entity

1. Users have a username and unique id
2. Users may have (or not) TodoLists.

## TodoList Entity

1. Each TodoList consists of TodoItems.
2. TodoList have a name that show their purposes shortly for using listing purposes.
3. Each TodoList may have (or not) a long description about what their purpose is.

## Todo Item Entity

1. TodoItems belongs to a TodoList.
2. Each ToDoItem has a description that explains content of that item, namely, what it is for added to ToDoList.
3. Each TodoItem may be tagged (or not) from the predefined tags.
4. Each TodoItem may have reminders (or not).

## Tag Entity

1. Tags are predefined.
2. Tags may have a description about their purpose.
3. Tags have a name that explains their purpose in a short manner no more than three words.
4. Tags have a color that is used for demonstration purposes on lists to identify the tag easily. (e.g green for completed tag)

## Reminder

1. Reminders are used for scheduling ToDoItems.
2. Reminders must belong to a ToDoItem.
3. Reminders have a description that explains reminders purpose in a detailed manner. (e.g address)
4. Reminders have a time property which is actually an UTC datetime. It points to the first triggering time of the reminder.
5. Reminders may be triggered within different times according to their repetition property.
