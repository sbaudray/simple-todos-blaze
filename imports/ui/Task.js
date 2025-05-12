import { Template } from "meteor/templating";

import "./Task.html";
import { TasksCollection } from "../api/TasksCollection";

Template.task.events({
  "click .toggle-checked"() {
    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isChecked },
    });
  },
});
