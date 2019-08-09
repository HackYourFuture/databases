'use strict';

const express = require('express');
const app = express();

const { execOneArgQuery, execMultiArgQuery, queries, renderReadme } = require('./src');

const PORT = 3000;
const USERS_SLUG = 'users';
const LISTS_SLUG = 'lists';
const ITEMS_SLUG = 'items';
const REMINDERS_SLUG = 'reminders';

app.use(express.json());

app.get(`/`, renderReadme.bind());

app.get(`/${USERS_SLUG}`, execOneArgQuery.bind(null, queries.SELECT_USERS));

app.get(`/${USERS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.SELECT_USER));

app.get(`/${LISTS_SLUG}`, execOneArgQuery.bind(null, queries.SELECT_LISTS));

app.get(`/${LISTS_SLUG}/done`, execOneArgQuery.bind(null, queries.SELECT_DONE_LISTS));

app.get(`/${LISTS_SLUG}/${USERS_SLUG}`, execOneArgQuery.bind(null, queries.SELECT_USER_LISTS));

app.get(`/${LISTS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.SELECT_LIST));

app.get(`/${ITEMS_SLUG}`, execOneArgQuery.bind(null, queries.SELECT_ITEMS));

app.get(`/${ITEMS_SLUG}/done`, execOneArgQuery.bind(null, queries.SELECT_DONE_ITEMS));

app.get(`/${ITEMS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.SELECT_ITEM));

app.get(`/${REMINDERS_SLUG}`, execOneArgQuery.bind(null, queries.SELECT_REMINDERS));

app.get(`/${REMINDERS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.SELECT_REMINDER));

app.get(`/${ITEMS_SLUG}in${LISTS_SLUG}`, execOneArgQuery.bind(null, queries.SELECT_ITEMS_IN_LISTS));

app.get(`/${LISTS_SLUG}/${ITEMS_SLUG}/done`, execOneArgQuery.bind(null, queries.SELECT_DONE_ITEMS));

app.post(`/${USERS_SLUG}`, execMultiArgQuery.bind(null, queries.CREATE_USER));

app.post(`/${LISTS_SLUG}`, execMultiArgQuery.bind(null, queries.CREATE_LIST));

app.post(`/${ITEMS_SLUG}`, execMultiArgQuery.bind(null, queries.CREATE_ITEM));

app.post(`/${REMINDERS_SLUG}`, execMultiArgQuery.bind(null, queries.CREATE_REMINDER));

app.post(
  `/${LISTS_SLUG}/:listId/${REMINDERS_SLUG}/:reminderId`,
  execMultiArgQuery.bind(null, queries.SET_REMINDER),
);

app.post(
  `/${LISTS_SLUG}/:listId/${ITEMS_SLUG}/:itemId`,
  execMultiArgQuery.bind(null, queries.ADD_ITEM_TO_LIST),
);

app.post(`/${LISTS_SLUG}/:arg/done`, execOneArgQuery.bind(null, queries.MARK_LIST_AS_DONE));

app.post(
  `/${LISTS_SLUG}/:listId/${ITEMS_SLUG}/:itemId/done`,
  execMultiArgQuery.bind(null, queries.MARK_ITEM_AS_DONE),
);

app.post(
  `/${LISTS_SLUG}/:listId/${USERS_SLUG}/:userId`,
  execMultiArgQuery.bind(null, queries.ASSOCIATE_LIST_WITH_USER),
);

app.delete(`/${LISTS_SLUG}/:arg/done`, execOneArgQuery.bind(null, queries.MARK_LIST_AS_NOT_DONE));

app.delete(`/${USERS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.DELETE_USER));

app.delete(`/${LISTS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.DELETE_LIST));

app.delete(`/${ITEMS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.DELETE_ITEM));

app.delete(`/${REMINDERS_SLUG}/:arg`, execOneArgQuery.bind(null, queries.DELETE_REMINDER));

app.delete(
  `/${LISTS_SLUG}/:listId/${ITEMS_SLUG}/:itemId/done`,
  execMultiArgQuery.bind(null, queries.MARK_ITEM_AS_NOT_DONE),
);

app.delete(
  `/${LISTS_SLUG}/:listId/${ITEMS_SLUG}/:itemId`,
  execMultiArgQuery.bind(null, queries.DELETE_ITEM_FROM_LIST),
);

app.delete(
  `/${LISTS_SLUG}/:listId/${USERS_SLUG}/:userId`,
  execMultiArgQuery.bind(null, queries.DELETE_LIST_FROM_USER),
);

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
