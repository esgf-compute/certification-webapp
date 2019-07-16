import React from 'react';

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


interface ServerProps {
  id: string;
  item: {
    url: string;
    module: string;
    date_added: string;
    date_updated: string;
  };
};

function formatTitle(value: string) {
  let regex = /^https?:\/\/([^/]*)\/?.*$/i;

  let match = value.match(regex);

  if (match === null) {
    return 'Could not parse hostname';
  } else {
    return match[1];
  }
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    column1: {
      flexBasis: '75%',
    },
    column2: {
      flexBasis: '25%',
    }
  }),
);

function Server(props: ServerProps) {
  const classes = useStyles();

  let item = props.item;

  return (
    <ExpansionPanel key={props.id}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h5">
          {formatTitle(item.url)}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.column1}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Module</TableCell>
                <TableCell>{item.module}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date Added</TableCell>
                <TableCell>{item.date_added}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date Updated</TableCell>
                <TableCell>{item.date_updated}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className={classes.column2}>
          <List>
            <ListItem>
              <Button component={Link} to={{
                pathname: "/metrics",
                state: {
                  id: props.id
                }
              }} variant="contained">Metrics</Button>
            </ListItem>
            <ListItem>
              <Button component={Link} to={{
                pathname: "/runs",
                state: {
                  id: props.id
                }
              }} variant="contained">Certification Runs</Button>
            </ListItem>
          </List>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default Server;
