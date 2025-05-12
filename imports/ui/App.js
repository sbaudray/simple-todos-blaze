import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";

import "./App.html";
import "./Task.js";

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({}, { sort: { createdAt: -1 } });
  },
});

Template.form.events({
  "submit .task-form"(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });

    target.text.value = "";
  },
});
