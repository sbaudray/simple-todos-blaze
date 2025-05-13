import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/db/TasksCollection";
import { Accounts } from "meteor/accounts-base";
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";

const insertTask = async (taskText, user) =>
  TasksCollection.insertAsync({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUserAsync({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);

  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Hire this guy!",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});
