import React from 'react';

import { AutoSizer, Column, Table } from 'react-virtualized';

interface MetricsProps {
  location?: any;
}

class Metrics extends React.Component<MetricsProps, any> {
  state = {
    items: [],
  };

  componentDidMount() {
    const { id } = this.props.location.state;

    fetch(`http://10.5.5.5:5000/metrics/${id}`)
      .then((data: any) => data.json())
      .then((data: any) => {
        this.setState({items: data});
      });
  }

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={30}
            rowHeight={30}
            rowCount={this.state.items.length}
            rowGetter={({ index }) => this.state.items[index]}
          >
            <Column
              width={300}
              dataKey="id"
              label="Date Added"
              cellDataGetter={(data: any) => data.rowData.metric.date_added } 
              flexShrink={1}
            />
            <Column
              width={100}
              dataKey="id"
              label="Data"
              cellDataGetter={(data: any) => data.rowData.metric.data } 
              flexGrow={1}
            />
            <Column
              width={100}
              dataKey="id"
              label="State"
              cellDataGetter={(data: any) => data.rowData.metric.state } 
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

export default Metrics;
