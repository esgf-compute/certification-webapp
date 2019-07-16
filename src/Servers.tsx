import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Servers extends React.Component {
  state = {
    servers: [],
  };

  componentDidMount() {
    fetch('http://10.5.5.5:5000/servers/')
      .then((data: any) => {  
        return data.json(); 
      })
      .then((data: any) => {
        this.setState({servers: data});
      });
  }

  formatTitle(value: string) {
    let regex = /^https?:\/\/([^/]*)\/?.*$/i;

    let match = value.match(regex);

    if (match === null) {
      return 'Could not parse hostname';
    } else {
      return match[1];
    }
  }

  render() {
    let entries: any[] = [];

    for (let entry of this.state.servers) {
      entries.push(
        <ExpansionPanel key={entry['id']}>
          <ExpansionPanelSummary><h3>{this.formatTitle(entry['server']['url'])}</h3></ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>URL</TableCell>
                  <TableCell><a href={entry['server']['url']} target="_blank" rel="noopener noreferrer">{entry['server']['url']}</a></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Module</TableCell>
                  <TableCell>{entry['server']['module']}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date Added</TableCell>
                  <TableCell>{entry['server']['date_added']}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date Updated</TableCell>
                  <TableCell>{entry['server']['date_updated']}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }

    return (
      <div>
        {entries} 
      </div> 
    );
  }
}

export default Servers;
