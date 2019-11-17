// eslint-disable-next-line no-undef
define({ "api": [
  {
    "type": "post",
    "url": "/tag",
    "title": "Create a Tag",
    "name": "CreateTag",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "tag",
            "description": "<p>Tag to be created.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>Name of the tag.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag[color]",
            "description": "<p>Color of the tag.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag[description]",
            "description": "<p>Description of the Tag.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"createTag\",\n  \"message\" : \"Success message...\",\n  \"tagId\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createTag\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createTag\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Tags"
  },
  {
    "type": "get",
    "url": "/tag",
    "title": "Get All Tags",
    "name": "GetTags",
    "group": "Tags",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"getTags\",\n  \"message\" : \"Success message...\",\n  \"data\" : [{},{},{}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getTags\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getTags\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Tags"
  },
  {
    "type": "post",
    "url": "/list/item/:todoItemId/tag/:tagId",
    "title": "Add a Tag to the TodoItem",
    "name": "AttachTagToTodoItem",
    "group": "TodoItems",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "todoItemId",
            "description": "<p>TodoItems Id on which tag will be added.</p>"
          },
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "tagId",
            "description": "<p>Tags unique Id.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"attachTagToTodoItem\",\n  \"message\" : \"Success message...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"attachTagToTodoItem\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"attachTagToTodoItem\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoItems"
  },
  {
    "type": "post",
    "url": "/list/item",
    "title": "Add a Todo Item into a Todo List",
    "name": "CreateTodoItem",
    "group": "TodoItems",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "todoItem",
            "description": "<p>TodoItem to be created.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoItem[description]",
            "description": "<p>Description of the TodoItem.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "todoListId",
            "description": "<p>TodoLists Id on which the TodoItem will be added.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"createTodoItem\",\n  \"message\" : \"Success message...\",\n  \"itemId\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createTodoItem\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createTodoItem\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoItems"
  },
  {
    "type": "delete",
    "url": "/list/item/:id",
    "title": "Delete a TodoItem",
    "name": "DeleteTodoItem",
    "group": "TodoItems",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>TodoItems unique ID.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"deleteTodoItem\",\n  \"message\" : \"Success message...\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"deleteTodoItem\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"deleteTodoItem\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoItems"
  },
  {
    "type": "get",
    "url": "/list/:id",
    "title": "Get a Todo Lists Items",
    "name": "GetTodoItems",
    "group": "TodoItems",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>TodoLists unique ID.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"getTodoItems\",\n  \"message\" : \"Success message...\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getTodoItems\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getTodoItems\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoItems"
  },
  {
    "type": "post",
    "url": "/list/item/:id/complete",
    "title": "Mark the TodoItem as completed",
    "name": "MarkAsCompleted",
    "group": "TodoItems",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "todoItemId",
            "description": "<p>TodoItems Id which will be marked as completed.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"markAsCompleted\",\n  \"message\" : \"Success message...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"markAsCompleted\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"markAsCompleted\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoItems"
  },
  {
    "type": "delete",
    "url": "/list/item/:id/complete",
    "title": "Mark the TodoItem as not completed",
    "name": "MarkAsNotCompleted",
    "group": "TodoItems",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "todoItemId",
            "description": "<p>TodoItems Id which will be marked as not completed.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"markAsNotCompleted\",\n  \"message\" : \"Success message...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"markAsNotCompleted\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"markAsNotCompleted\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoItems"
  },
  {
    "type": "delete",
    "url": "/list/item/:todoItemId/tag/:tagId",
    "title": "Remove a Tag from the TodoItem",
    "name": "RemoveTagFromTodoItem",
    "group": "TodoItems",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "todoItemId",
            "description": "<p>TodoItems Id from which tag will be removed.</p>"
          },
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "tagId",
            "description": "<p>Tags unique Id.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"removeTagFromTodoItem\",\n  \"message\" : \"Success message...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"removeTagFromTodoItem\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"removeTagFromTodoItem\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoItems"
  },
  {
    "type": "post",
    "url": "/list/remind",
    "title": "Create a Reminder to a Todo List",
    "name": "CreateReminder",
    "group": "TodoLists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "reminder",
            "description": "<p>Reminder to be created.</p>"
          },
          {
            "group": "Parameter",
            "type": "DateTime",
            "optional": false,
            "field": "reminder[remindingTime]",
            "description": "<p>Alert/Reminding time of the reminder.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reminder[description]",
            "description": "<p>Description of the Reminder.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "todoListId",
            "description": "<p>TodoLists Id on which the reminder will be added.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"createReminder\",\n  \"message\" : \"Success message...\",\n  \"reminderId\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createReminder\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createReminder\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoLists"
  },
  {
    "type": "post",
    "url": "/list",
    "title": "Create a Todo List",
    "name": "CreateTodoList",
    "group": "TodoLists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "todoList",
            "description": "<p>TodoList to be created.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "todoList[name]",
            "description": "<p>Name of the TodoList.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "todoList[description]",
            "description": "<p>Description of the TodoList.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"createTodoList\",\n  \"message\" : \"Success message...\",\n  \"listId\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createTodoList\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"createTodoList\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoLists"
  },
  {
    "type": "delete",
    "url": "/list/remind/:id",
    "title": "Delete a Reminder",
    "name": "DeleteReminder",
    "group": "TodoLists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Reminders unique ID.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"deleteReminder\",\n  \"message\" : \"Success message...\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"deleteReminder\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"deleteReminder\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoLists"
  },
  {
    "type": "delete",
    "url": "/list/:id",
    "title": "Delete a Todo List of user",
    "name": "DeleteTodoList",
    "group": "TodoLists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>TodoLists unique ID.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Users credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user[id]",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user[username]",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"deleteTodoList\",\n  \"message\" : \"Success message...\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"deleteTodoList\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"deleteTodoList\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoLists"
  },
  {
    "type": "get",
    "url": "/list/remind",
    "title": "Get All the reminders",
    "name": "GetReminders",
    "group": "TodoLists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"getReminders\",\n  \"message\" : \"Success message...\",\n  \"data\" : [{},{},{}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getReminders\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getReminders\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoLists"
  },
  {
    "type": "get",
    "url": "/list",
    "title": "Get All Todo List of user",
    "name": "GetTodoLists",
    "group": "TodoLists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"getTodoLists\",\n  \"message\" : \"Success message...\",\n  \"data\" : [{},{},{}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Credentials are wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getTodoLists\",\n  \"message\" : \"Credentials are wrong.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"getTodoLists\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "TodoLists"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login with user credentials",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"login\",\n  \"message\" : \"Successfully logged in.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>No user found for provided credentials.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username or id not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"state\": \"Failure\",\n  \"operation\": \"login\",\n  \"message\" : \"No user found for provided credentials.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"login\",\n  \"message\" : \"username or id not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Signup with user credentials",
    "name": "SignupUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"state\": \"Success\",\n  \"operation\": \"login\",\n  \"message\" : \"Successfully signed up.\",\n  \"userId\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>username not provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Query Error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Bad Request\n{\n  \"state\": \"Failure\",\n  \"operation\": \"login\",\n  \"message\" : \"username not provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"state\": \"Failure\",\n  \"operation\": \"operationName\",\n  \"message\" : \"Query Error occurred. ...\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "User"
  }
] });
