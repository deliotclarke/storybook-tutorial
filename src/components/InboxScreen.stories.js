// src/components/InboxScreen.stories.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import { PureInboxScreen } from './InboxScreen';
import { defaultTasks } from './TaskList.stories';

const store = {
  getState: () => {
    return {
      tasks: defaultTasks
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch")
}

storiesOf("InboxScreen", module)
  .addDecorator(story => <Provider store={store} >{story()}</Provider>) //! need to go further down the redux hole on this one.
  .add("default", () => <PureInboxScreen />)
  .add("error", () => <PureInboxScreen error="Something" />);