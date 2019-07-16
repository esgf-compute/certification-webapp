import React from 'react';

import Server from './Server';

class ServerList extends React.Component {
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

  render() {
    let entries: any[] = [];

    for (let entry of this.state.servers) {
      entries.push(
        <Server key={entry['id']} id={entry['id']} item={entry['server']} />
      );
    }

    return (
      <div>
        {entries} 
      </div> 
    );
  }
}

export default ServerList;
