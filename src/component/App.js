import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import Student from './Student';
import Author from './Author';

class App extends React.Component {
  renderMainPanel = () => {
    return (
      <Switch location={this.props.location}>
        <Route path="/author" component={Author} />
        <Route path="/student" component={Student} />
      </Switch>
    );
  };

  render() {
    return (
      <div className="exam ">
        <Header location={this.props.location} />
        {(() => {
          if (this.props.location.pathname === '/') {
            return (
              <Login />
            );
          }
        })()}

        { this.renderMainPanel() }
      </div>
    );
  }
}

export default withRouter(App);
