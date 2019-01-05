"use strict";

let allLists = "All lists and its ToDo items";
let withReminder = "Lists have reminder and its ToDo items";
let withoutReminder = "Lists have no reminder and its ToDo items";
let notCompleted = "Not completed ToDos and their list";
let completed = "Completed ToDos and their list";
let editing = "Find list you want to edit";

function renderProfilePage(user, root) {
  root.innerHTML = " ";
  const profile = util.createAppend("div", root, { id: "profile" });
  const nav = util.createAppend("nav", profile, { id: "nav" });
  const view = util.createAppend("div", profile, { id: "view" });
  util.createAppend("h3", nav, { txt: user.name, id: "user-name" });
  util.createAppend("h3", nav, { txt: user.email, id: "user-email" });
  const ul = util.createAppend("ul", nav);
  const createListBtn = util.createAppend("li", ul, { txt: "Create ToDos List" });
  const createTodoBtn = util.createAppend("li", ul, { txt: "Create ToDo" });
  const listsBtn = util.createAppend("li", ul, { txt: "Todo Lists" });
  const withReminderBtn = util.createAppend("li", ul, { txt: "Lists with reminder" });
  const withoutReminderBtn = util.createAppend("li", ul, { txt: "Lists without reminder" });
  const notCompletedBtn = util.createAppend("li", ul, { txt: "Not completed ToDos" });
  const completedBtn = util.createAppend("li", ul, { txt: "Completed ToDos" });
  const editListBtn = util.createAppend("li", ul, { txt: "Edit And remove List" });

  createListBtn.addEventListener("click", () => renderCreateListForm(view));
  createTodoBtn.addEventListener("click", () => renderCreateTodoForm(view));
  listsBtn.addEventListener("click", () => renderLists("/all-lists/", view, allLists));
  withReminderBtn.addEventListener("click", () => renderLists("/lists-with-reminder/", view, withReminder));
  withoutReminderBtn.addEventListener("click", () => renderLists("/lists-without-reminder/", view, withoutReminder));
  notCompletedBtn.addEventListener("click", () => renderLists("/not-completed-todos/", view, notCompleted));
  completedBtn.addEventListener("click", () => renderLists("/completed-todos/", view, completed));
  editListBtn.addEventListener("click", () => renderEditingForm(view, editing));
}

function renderLists(path, view, heading) {
  const url = path + document.getElementById("user-email").innerText;
  fetchLists(url, lists => {
    view.innerHTML = " ";
    util.createAppend("h2", view, { txt: heading, class: "list-headings" });
    let header = util.createAppend("header", view, { id: "lists-header" });
    util.createAppend("p", header, { txt: "ID" });
    util.createAppend("p", header, { txt: "List" });
    util.createAppend("p", header, { txt: "Category" });

    if (!lists[0]) {
      util.createAppend("h2", view, { txt: "No Items", for: "no-items" });
    } else {
      lists.forEach(list => {
        let listCont = util.createAppend("div", view, { class: "list-cont" });
        let listTitle = util.createAppend("div", listCont, { class: "list-titles" });
        util.createAppend("p", listTitle, { txt: list.id });
        util.createAppend("p", listTitle, { txt: list.name });
        util.createAppend("p", listTitle, { txt: list.category });
        listTitle.addEventListener("click", e => displayAndHideTodos(e));

        if (list.reminder) {
          let reminderTitles = util.createAppend("div", listCont, { class: "reminder-titles show-hide" });
          let date = new Date(list.reminder[0].date).toDateString();
          util.createAppend("p", reminderTitles, { txt: "date" });
          util.createAppend("p", reminderTitles, { txt: date });
          util.createAppend("p", reminderTitles, { txt: "startTime" });
          util.createAppend("p", reminderTitles, { txt: list.reminder[0].startTime });
          util.createAppend("p", reminderTitles, { txt: "endTime" });
          util.createAppend("p", reminderTitles, { txt: list.reminder[0].endTime });
        }

        renderTodos(list.todos, listCont);
      });
    }
  });
}

function renderTodos(todos, listCont) {
  let table = util.createAppend("table", listCont, { class: "tables show-hide" });
  let tr = util.createAppend("tr", table);
  util.createAppend("th", tr, { txt: "List ID" });
  util.createAppend("th", tr, { txt: "ToDo" });
  util.createAppend("th", tr, { txt: "Description" });
  util.createAppend("th", tr, { txt: "Is Completed" });
  util.createAppend("th", tr, { txt: "Tag" });

  todos.forEach(todo => {
    let tr = util.createAppend("tr", table);
    util.createAppend("td", tr, { txt: todo.listId });
    util.createAppend("td", tr, { txt: todo.name });
    util.createAppend("td", tr, { txt: todo.description });
    util.createAppend("td", tr, { txt: todo.isCompleted });
    util.createAppend("td", tr, { txt: todo.tag });
  });
}

function displayAndHideTodos(e) {
  const table = e.target.parentNode.parentNode.lastChild;
  const reminder = e.target.parentNode.nextElementSibling;
  e.target.parentNode.classList.toggle("active");
  if (table.classList.contains("show-hide")) {
    reminder.classList = "reminder-titles";
    table.classList = "tables";
  } else {
    reminder.classList = "show-hide";
    table.classList = "show-hide";
  }
}