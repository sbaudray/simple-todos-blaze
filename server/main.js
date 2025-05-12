import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";

const insertTask = async (taskText) =>
  TasksCollection.insertAsync({ text: taskText });

Meteor.startup(async () => {
  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Hire this guy!",
    ].forEach(insertTask);
  }
});
