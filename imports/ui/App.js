import { Template } from "meteor/templating";
import { TasksCollection } from "../db/TasksCollection";

import "./App.html";
import "./Task.js";
import "./Login.js";
import { Meteor } from "meteor/meteor";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

const HIDE_COMPLETED_STRING = "hideCompleted";

const getTasksFilter = () => {
  const user = getUser();

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  return { userFilter, pendingOnlyFilter };
};

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const { pendingOnlyFilter, userFilter } = getTasksFilter();

    if (!isUserLogged()) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  },

  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },
  incompleteCount() {
    if (!isUserLogged()) {
      return "";
    }

    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTaskCount = TasksCollection.find(pendingOnlyFilter).count();
    return incompleteTaskCount ? `${incompleteTaskCount}` : "";
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  },
});

Template.mainContainer.events({
  "click #hide-completed-button"(_event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  },
  "click .user"() {
    Meteor.logout();
  },
});

Template.form.events({
  "submit .task-form"(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call("tasks.insert", text);

    target.text.value = "";
  },
});
