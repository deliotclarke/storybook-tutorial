// src/lib/redux.js

// A simple redux store/acitons/reducer implementation
// A true app would be more complex and separated into different files

import { createStore } from 'redux';

// the actions are the "names" of the changes that can happen to the sotre

export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK'
};

// the action creators bundle actions with the data require to execute them

export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

// all our reducers simply change the state of a single task

function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(
        task => (task.id === action.id ? { ...task, state: taskState } : task)
      ),
    }
  }
}

// The reducer describes how the contenets of the store change for each action

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case actions.PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
}

// the initial state of our store when the app loads.
// usually you would fetch this from a server

const defaultTasks = [
  { id: '1', title: 'something', state: 'TASK_INBOX' },
  { id: '2', title: 'something more', state: 'TASK_INBOX' },
  { id: '3', title: 'something else', state: 'TASK_INBOX' },
  { id: '4', title: 'something again', state: 'TASK_INBOX' },
];

// we export the constructed redux store

export default createStore(reducer, { tasks: defaultTasks });