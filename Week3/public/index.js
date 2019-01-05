"use strict";

function checkID(type, ID) {
  const info = JSON.stringify({ table: type, ID: ID });
  return util.postJSON("http://localhost:3000/check-id", info, "json");
}

async function createNewUser(e, root) {
  e.preventDefault();
  try {
    if (e.target.elements[2].value !== e.target.elements[3].value) {
      e.target.elements[3].setCustomValidity("Passwords Don't Match");
    } else if (!await checkID("user", e.target.elements[1].value)) {
      const newUser = JSON.stringify({
        email: e.target.elements[1].value,
        name: e.target.elements[0].value,
        psw: e.target.elements[2].value
      });
      const user = await util.postJSON("http://localhost:3000/register", newUser, "json");
      renderProfilePage(JSON.parse(user), root);
    } else {
      e.target.elements[1].setCustomValidity("This Email is already associated with an account");
    }
  } catch (err) {
    root.innerHTML = "Something wrong happened please try again!";
  }
}

async function checkUser(e, root) {
  e.preventDefault();
  try {
    let userInfo = JSON.stringify({ email: e.target.elements[0].value, psw: e.target.elements[1].value });
    if (await checkID("user", e.target.elements[0].value)) {
      const user = await util.postJSON("http://localhost:3000/users", userInfo, "json");
      renderProfilePage(JSON.parse(user), root);
    } else {
      e.target.children[1].firstElementChild.classList.remove("show-hide");
    }
  } catch (err) {
    e.target.children[3].firstElementChild.classList.remove("show-hide");
  }
}

function createNewList(e, view) {
  e.preventDefault();
  const form = e.target.elements;
  const list = {
    list: {
      name: form.list.value,
      category: form.category.value,
      userId: document.getElementById("user-email").innerText
    },
    todo: {
      name: form.todo.value,
      listId: 0,
      description: form.description.value,
      isCompleted: form.markAs.value,
      tag: form.tag.value
    }
  };
  if (form.reminder.value === "yes") {
    list.reminder = {
      reminderId: 0,
      date: form.date.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
    }
  }
  util.postJSON("http://localhost:3000/create-list", JSON.stringify(list), "json")
    .then(message => {
      view.innerHTML = " ";
      util.createAppend("p", view, { txt: message, class: "new-item" });
    }).catch(err => {
      view.innerHTML = " " + err;
    });
}

async function createNewTodo(e, view) {
  e.preventDefault();
  const form = e.target.elements;
  const todo = JSON.stringify({
    name: form.todo.value,
    listId: form.listId.value,
    description: form.description.value,
    isCompleted: form.markAs.value,
    tag: form.tag.value
  });
  try {
    const result = await util.postJSON("http://localhost:3000/create-todo", todo, "json");
    if (JSON.parse(result)) {
      view.innerHTML = " ";
      util.createAppend("p", view, { txt: "A new ToDo is created successfully!", class: "new-item" });
    } else {
      form.todo.setCustomValidity("ToDo already exists!");
    }
  } catch (err) {
    view.innerHTML = " " + err;
  }
}

function fetchLists(url, cb) {
  util.fetchJSON(url).then(lists => cb(lists)).catch(err => console.error(err));
}

function editMe(data, parent) {
  util.postJSON("/edit-item", JSON.stringify(data), "json")
    .then(result => {
      if (JSON.parse(result)) parent.innerHTML = "Done";
    })
    .catch(err => console.error(err));
}

function removeMe(e, item, parent) {
  let info = { type: item, id: e.children[0].innerText, name: e.children[1].innerText }
  util.postJSON("/remove-item", JSON.stringify(info), "json")
    .then(result => {
      if (JSON.parse(result)) parent.innerHTML = "The item has been removed successfully";
    })
    .catch(err => console.error(err));
}
