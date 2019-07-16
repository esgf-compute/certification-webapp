import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import queryString from 'query-string';

class Admin extends React.Component<any, any> {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    if ('openid_complete' in values && values.openid_complete) {
      this.setState({loggedIn: true});
    }
  }

  handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetch('http://10.5.5.5:5000/auth/login', {
      method: 'POST',
      redirect: 'follow',
    })
      .then((data: any) => {
        return data.json();
      })
      .then((data: any) => {
        window.location.href = data.redirect;
      });
  }

  handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetch('http://10.5.5.5:5000/auth/logout', {
      method: 'POST',
      redirect: 'follow',
    })
      .then((data: any) => {
        return data.json();
      })
      .then((data: any) => {
        window.location.href = data.redirect;
      });
  }

  render() {
    let entry = null;
    let form = null;

    if (this.state.loggedIn) {
      entry = (
        <Button
          variant="contained" 
          onClick={this.handleLogoutClick}
          style={{justifyContent: "center"}}
        >Logout</Button>
      );
    } else {
      entry = (
        <Button
          variant="contained" 
          onClick={this.handleLoginClick}
          style={{justifyContent: "center"}}
        >Login</Button>
      );
    }

    if (this.state.loggedIn) {
      form = (
        <div>
          <TextField
            label="URL"
          />
          <TextField
            label="Module"
          />
          <TextField
            label="Token"
          />
          <Button
            variant="contained"
            color="primary"
          >Add</Button>
        </div>
      );
    }

    return (
      <div style={{display: "flex", justifyContent: "center", flexDirection: 'column'}}>
        {entry}
        {form}
      </div>
    );
  }
}

export default Admin;
