import React, { Component } from 'react';
import UserDataDisplayBlockComponent from '../connected-components/user-data-display-block-component/UserDataDisplayBlockComponent';

export class MainPage extends Component {
  render() {
    return <div>
      <p>There is MainPage</p>
      <UserDataDisplayBlockComponent />
    </div>
  }
}
