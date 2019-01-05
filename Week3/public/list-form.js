"use strict";

function renderCreateListForm(view) {
  view.innerHTML = " ";
  const listForm = util.createAppend("form", view, { action: "/create-list", method: "post", name: "createList", id: "create-list-form" });
  util.createAppend("h2", listForm, { txt: "Create ToDo list form", class: "headings" });
  let list = util.createAppend("div", listForm, { class: "containers" });
  util.createAppend("label", list, { txt: "List", for: "list" });
  util.createAppend("input", list, { type: "text", name: "list", id: "list", placeholder: "List Name" }).required = true;

  let category = util.createAppend("div", listForm, { class: "containers" });
  util.createAppend("label", category, { txt: "Category", for: "category" });
  const select = util.createAppend("select", category, { name: "category" });
  util.createAppend("option", select, { txt: "Holiday", value: "holiday" });
  util.createAppend("option", select, { txt: "Work", value: "work" });
  util.createAppend("option", select, { txt: "Meeting", value: "meeting" });
  util.createAppend("option", select, { txt: "Family", value: "family" });
  util.createAppend("option", select, { txt: "Friends", value: "friends" });
  util.createAppend("option", select, { txt: "Personal", value: "personal" });

  util.createAppend("p", listForm, { txt: "Reminder", class: "radio-titles" });
  util.createAppend("input", listForm, { type: "radio", name: "reminder", value: "no", id: "no" }).checked = true;
  util.createAppend("label", listForm, { txt: "No", for: "no", class: "radio-label" });
  util.createAppend("input", listForm, { type: "radio", name: "reminder", value: "yes", id: "yes" });
  util.createAppend("label", listForm, { txt: "Yes", for: "yes", class: "radio-label" });

  let reminderDate = util.createAppend("div", listForm, { class: "show-hide" });
  util.createAppend("label", reminderDate, { txt: "Date", for: "date" });
  util.createAppend("input", reminderDate, { type: "date", name: "date", id: "date" });
  let reminderStart = util.createAppend("div", listForm, { class: "show-hide" });
  util.createAppend("label", reminderStart, { txt: "Start Time", for: "start-time" });
  util.createAppend("input", reminderStart, { type: "time", name: "startTime", id: "start-time" });
  let reminderEnd = util.createAppend("div", listForm, { class: "show-hide" });
  util.createAppend("label", reminderEnd, { txt: "End Time", for: "end-time" });
  util.createAppend("input", reminderEnd, { type: "time", name: "endTime", id: "end-time" });

  let todo = util.createAppend("div", listForm, { class: "containers" });
  util.createAppend("label", todo, { txt: "ToDo", for: "todo" });
  util.createAppend("input", todo, { type: "text", name: "todo", id: "todo", placeholder: "ToDo Name" }).required = true;

  let tag = util.createAppend("div", listForm, { class: "containers" });
  util.createAppend("label", tag, { txt: "Tag", for: "tags" });
  let tagSelect = util.createAppend("select", tag, { name: "tag", id: "tags" });
  util.createAppend("option", tagSelect, { txt: "Important", value: "Important" });
  util.createAppend("option", tagSelect, { txt: "Normal", value: "normal" });
  util.createAppend("option", tagSelect, { txt: "Regular", value: "regular" });

  let description = util.createAppend("div", listForm, { class: "containers" });
  util.createAppend("label", description, { txt: "Description", for: "description" });
  util.createAppend("textarea", description, { name: "description", id: "description", col: "30", rows: "10", placeholder: "Description for ToDo" }).required = true;

  util.createAppend("p", listForm, { txt: "Mark as done", class: "radio-titles" });
  util.createAppend("input", listForm, { type: "radio", name: "markAs", value: "false", id: "not-completed" }).checked = true;
  util.createAppend("label", listForm, { txt: "Not Completed", for: "not-completed", class: "radio-label" });
  util.createAppend("input", listForm, { type: "radio", name: "markAs", value: "true", id: "completed" });
  util.createAppend("label", listForm, { txt: "Completed", for: "completed", class: "radio-label" });

  util.createAppend("button", listForm, { txt: "submit", id: "submit-btn" });
  listForm.addEventListener("submit", e => createNewList(e, view));

  document.createList.reminder.forEach(radio => {
    radio.addEventListener("change", () => {
      if (reminderDate.classList.contains("show-hide")) {
        reminderDate.className = "containers";
        reminderStart.className = "containers";
        reminderEnd.className = "containers";
        listForm.date.required = true;
        listForm.startTime.required = true;
        listForm.endTime.required = true;
      } else {
        reminderDate.className = "show-hide";
        reminderStart.className = "show-hide";
        reminderEnd.className = "show-hide";
        listForm.date.required = false;
        listForm.startTime.required = false;
        listForm.endTime.required = false;
      }
    });
  });
}


function renderCreateTodoForm(view) {
  view.innerHTML = " ";
  const todoForm = util.createAppend("form", view, { action: "/create-todo", method: "post", name: "createTodo", id: "create-todo-form" });
  util.createAppend("h2", todoForm, { txt: "Create ToDo form", class: "headings" });

  let listsIDsCont = util.createAppend("div", todoForm, { class: "containers" });
  renderListsSelect("/all-lists/", listsIDsCont);

  let todo = util.createAppend("div", todoForm, { class: "containers" });
  util.createAppend("label", todo, { txt: "ToDo", for: "todo" });
  util.createAppend("input", todo, { type: "text", name: "todo", id: "todo", placeholder: "ToDo Name" }).required = true;

  let tag = util.createAppend("div", todoForm, { class: "containers" });
  util.createAppend("label", tag, { txt: "Tag", for: "tags" });
  let tagSelect = util.createAppend("select", tag, { name: "tag", id: "tags" });
  util.createAppend("option", tagSelect, { txt: "Important", value: "Important" });
  util.createAppend("option", tagSelect, { txt: "Normal", value: "normal" });
  util.createAppend("option", tagSelect, { txt: "Regular", value: "regular" });

  let description = util.createAppend("div", todoForm, { class: "containers" });
  util.createAppend("label", description, { txt: "Description", for: "description" });
  util.createAppend("textarea", description, { name: "description", id: "description", col: "30", rows: "10", placeholder: "Description for ToDo" }).required = true;

  util.createAppend("p", todoForm, { txt: "Mark as done", class: "radio-titles" });
  util.createAppend("input", todoForm, { type: "radio", name: "markAs", value: "false", id: "not-completed" }).checked = true;;
  util.createAppend("label", todoForm, { txt: "Not Completed", for: "not-completed", class: "radio-label" });
  util.createAppend("input", todoForm, { type: "radio", name: "markAs", value: "true", id: "completed" });
  util.createAppend("label", todoForm, { txt: "Completed", for: "completed", class: "radio-label" });

  util.createAppend("button", todoForm, { txt: "submit", id: "submit-btn" });
  todoForm.addEventListener("submit", e => createNewTodo(e, view));
}

function renderListsSelect(path, selectBox) {
  const url = path + document.getElementById("user-email").innerText;
  util.createAppend("label", selectBox, { txt: "List ID", for: "listId" });
  const listsSelect = util.createAppend("select", selectBox, { name: "listId", id: "listId" });
  fetchLists(url, lists => {
    if (!lists[0]) {
      selectBox.innerHTML = " ";
      util.createAppend("h2", selectBox, { txt: "No Items", for: "no-items" });
    } else {
      lists.forEach(list => {
        let txt = `${list.id}-${list.name}-${list.category}`
        util.createAppend("option", listsSelect, { txt: txt, value: list.id });
      });
    }
  });
  return listsSelect;
}

function renderEditingForm(view) {
  view.innerHTML = " ";
  util.createAppend("h2", view, { txt: "Editing List ToDo and Reminder form", class: "headings" });
  util.createAppend("p", view, { class: "headings" }).innerHTML = "<strong>Note:</strong> if delete a list will delete all its ToDo items as well as reminder ";

  let selectBox = util.createAppend("div", view, { id: "editing-cont" });
  let resultBox = util.createAppend("div", view, { id: "result-box" });
  const select = renderListsSelect("/all-lists/", selectBox);
  if (select) {
    select.addEventListener("change", e => showList("/list/" + e.target.value, resultBox));
    setTimeout(() => { showList("/list/" + select.value, resultBox) }, 500)
  }
}

function showList(url, resultBox) {
  fetchLists(url, list => {
    resultBox.innerHTML = " ";
    let listBox = util.createAppend("div", resultBox, { class: "found-list" });
    util.createAppend("p", listBox, { txt: list.id });
    util.createAppend("p", listBox, { txt: list.name });
    util.createAppend("p", listBox, { txt: list.category });

    util.createAppend("button", listBox, { txt: "Edit" })
      .addEventListener("click", e => renderListForm(e.target.parentNode, listBox));
    util.createAppend("button", listBox, { txt: "Remove" })
      .addEventListener("click", e => removeMe(e.target.parentNode, "list", resultBox));

    if (list.reminder) {
      let date = new Date(list.reminder.date).toDateString();
      let reminderBox = util.createAppend("div", resultBox, { class: "found-reminder" });
      util.createAppend("p", reminderBox, { txt: list.reminder.reminderId });
      util.createAppend("p", reminderBox, { txt: date });
      util.createAppend("p", reminderBox, { txt: list.reminder.startTime });
      util.createAppend("p", reminderBox, { txt: list.reminder.endTime });

      util.createAppend("button", reminderBox, { txt: "Edit" })
        .addEventListener("click", e => renderReminderForm(e.target.parentNode, reminderBox));
      util.createAppend("button", reminderBox, { txt: "Remove" })
        .addEventListener("click", e => removeMe(e.target.parentNode, "reminder", reminderBox));
    }
    list.todos.forEach(todo => {
      let todosBox = util.createAppend("div", resultBox, { class: "found-todos" });
      util.createAppend("p", todosBox, { txt: todo.listId });
      util.createAppend("p", todosBox, { txt: todo.name });
      util.createAppend("p", todosBox, { txt: todo.description });
      util.createAppend("p", todosBox, { txt: todo.isCompleted });
      util.createAppend("p", todosBox, { txt: todo.tag });

      util.createAppend("button", todosBox, { txt: "Edit" })
        .addEventListener("click", e => renderTodoForm(e.target.parentNode, todosBox));
      util.createAppend("button", todosBox, { txt: "Remove" })
        .addEventListener("click", e => removeMe(e.target.parentNode, "todo", todosBox));
    });
  });
}

function renderListForm(e, parent) {
  let id = e.children[0].innerText;
  let txt = e.children[1].innerText;
  parent.innerHTML = " ";
  const form = util.createAppend("form", parent, { action: "/edit-list", method: "post", name: "editList", id: "edit-list-form" });
  util.createAppend("h2", form, { txt: "Edit ToDo list with ID: " + id, class: "headings" });
  let list = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", list, { txt: "List", for: "list" });
  util.createAppend("input", list, { type: "text", name: "list", id: "list", value: txt }).required = true;
  let category = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", category, { txt: "Category", for: "category" });
  const select = util.createAppend("select", category, { name: "category" });
  util.createAppend("option", select, { txt: "Holiday", value: "holiday" });
  util.createAppend("option", select, { txt: "Work", value: "work" });
  util.createAppend("option", select, { txt: "Meeting", value: "meeting" });
  util.createAppend("option", select, { txt: "Family", value: "family" });
  util.createAppend("option", select, { txt: "Friends", value: "friends" });
  util.createAppend("option", select, { txt: "Personal", value: "personal" });
  util.createAppend("button", form, { txt: "submit", id: "submit-btn" });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const list = {
      id: id,
      name: e.target.elements.list.value,
      category: e.target.elements.category.value,
    }
    editMe(list, parent)
  });
}

function renderReminderForm(e, parent) {
  let id = e.children[0].innerText;
  let date = e.children[1].innerText;
  let startTime = e.children[2].innerText;
  let endTime = e.children[3].innerText;
  parent.innerHTML = " ";
  const form = util.createAppend("form", parent, { action: "/edit-reminder", method: "post", name: "editReminder", id: "edit-reminder-form" });
  util.createAppend("h2", form, { txt: "Edit reminder with ID: " + id, class: "headings" });

  let reminderDate = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", reminderDate, { txt: "Date", for: "date" });
  util.createAppend("input", reminderDate, { type: "date", name: "date", id: "date", value: date });
  let reminderStart = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", reminderStart, { txt: "Start Time", for: "start-time" });
  util.createAppend("input", reminderStart, { type: "time", name: "startTime", id: "start-time", value: startTime });
  let reminderEnd = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", reminderEnd, { txt: "End Time", for: "end-time" });
  util.createAppend("input", reminderEnd, { type: "time", name: "endTime", id: "end-time", value: endTime });
  util.createAppend("button", form, { txt: "submit", id: "submit-btn" });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const reminder = {
      reminderId: id,
      date: e.target.elements.date.value,
      startTime: e.target.elements.startTime.value,
      endTime: e.target.elements.endTime.value
    }
    editMe(reminder, parent)
  });
}

function renderTodoForm(e, parent) {
  let id = e.children[0].innerText;
  let name = e.children[1].innerText;
  let desptn = e.children[2].innerText;
  parent.innerHTML = " ";
  const form = util.createAppend("form", parent, { action: "/edit-todo", method: "post", name: "editTodo", id: "edit-todo-form" });
  util.createAppend("h2", form, { txt: "Edit ToDo with ID: " + id, class: "headings" });

  let todo = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", todo, { txt: "ToDo", for: "todo" });
  util.createAppend("input", todo, { type: "text", name: "todo", id: "todo", value: name }).required = true;

  let tag = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", tag, { txt: "Tag", for: "tags" });
  let tagSelect = util.createAppend("select", tag, { name: "tag", id: "tags" });
  util.createAppend("option", tagSelect, { txt: "Important", value: "Important" });
  util.createAppend("option", tagSelect, { txt: "Normal", value: "normal" });
  util.createAppend("option", tagSelect, { txt: "Regular", value: "regular" });

  let description = util.createAppend("div", form, { class: "containers" });
  util.createAppend("label", description, { txt: "Description", for: "description" });
  util.createAppend("textarea", description, { name: "description", id: "description", col: "30", rows: "10", txt: desptn }).required = true;

  util.createAppend("p", form, { txt: "Mark as done", class: "radio-titles" });
  util.createAppend("input", form, { type: "radio", name: "markAs", value: "false", id: "not-completed" }).checked = true;
  util.createAppend("label", form, { txt: "Not Completed", for: "not-completed", class: "radio-label" });
  util.createAppend("input", form, { type: "radio", name: "markAs", value: "true", id: "completed" });
  util.createAppend("label", form, { txt: "Completed", for: "completed", class: "radio-label" });
  util.createAppend("button", form, { txt: "submit", id: "submit-btn" });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const todo = {
      listId: id,
      oldName: name,
      name: e.target.elements.todo.value,
      description: e.target.elements.description.value,
      isCompleted: e.target.elements.markAs.value,
      tag: e.target.elements.tag.value
    }
    editMe(todo, parent)
  });
}

