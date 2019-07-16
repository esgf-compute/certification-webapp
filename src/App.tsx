import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Admin from './Admin';
import ServerList from './ServerList';
import Metrics from './Metrics';
import Runs from './Runs';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    mainContainer: {
      "height": "100%",
      "padding-top": '12px',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            ESGF Compute Certification Service
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.mainContainer}>
        <Router>
          <Route path="/" exact component={ServerList} />
          <Route path="/metrics" component={Metrics} />
          <Route path="/runs" component={Runs} />
          <Route path="/admin" component={Admin} />
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default App;
