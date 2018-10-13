'use strict';

//variable 'todoDb' is the fetched data from database

const todoItems = todoDb.todoItems;
const todoItemTag = todoDb.todoItemTag;
const tags = todoDb.tags;


function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach((key) => {
        const value = options[key];
        if (key === 'html') {
            elem.innerHTML = value;
        } else {
            elem.setAttribute(key, value);
        }
    });
    return elem;
}

function main() {
    const todoListDiv = document.getElementById('todo-list');
    todoItems.forEach(todo => {
        const todoDiv = createAndAppend('div', todoListDiv, {
            class: "todo-div"
        });
        createAndAppend('p', todoListDiv, {
            html: (todoItems.indexOf(todo) + 1) + '. ' + todo.text
        });
        const tagDiv = createAndAppend('div', todoDiv, {
            class: "tag-div"
        });
        todoItemTag.forEach(tt => {
            if (tt.todo_item_id === todo.id) {
                tags.forEach(tag => {
                    if (tt.tag_id === tag.id) {
                        createAndAppend('h4', tagDiv, {
                            html: '#' + tag.description,
                            class: "tag-h4"
                        })
                    }
                })
            }
        })
        const todoProcessDiv = createAndAppend('div', todoDiv, {
            class: 'todo-process-div'
        });
        createAndAppend('a', todoProcessDiv, {
            class: 'delete-todo',
            href: `http://localhost:3000/todos/${todo.id}`,
            'data-method': "DELETE",
            html: 'X'
        })
        // createAndAppend('p', deleteTodo, {html: 'X'})
    })

    const tagListDiv = document.getElementById('tag-list');
    tags.forEach(tag => {
        const tagDiv = createAndAppend('div', tagListDiv, {
            class: 'tag-div'
        })
        createAndAppend('h3', tagDiv, {
            html: '#' + tag.description,
            class: 'tag-h3'
        })
    })
}

window.onload = () => main();