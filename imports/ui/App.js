import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";

import "./App.html";

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find();
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
