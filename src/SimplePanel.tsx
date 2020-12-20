import React from 'react';
import Plot from 'react-plotly.js';
import { DataFrame, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
// import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

function createDataArray(frame: DataFrame, fieldName: String){
  const x = frame.fields.find(field => field.name === fieldName);
  return x !== undefined ? x.values.toArray(): []
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height}) => {
  const frame = data.series[0];
  let x = createDataArray(frame, options.x);
  let y = createDataArray(frame, options.y);
  // let groupby = createDataArray(frame, options.groupby);

  // let plotData = {
  //     x: x,
  //     y: y,
  //     type: 'scatter',
  //     mode: 'markers',
  //     marker: {color: 'red'}
  // };

  // if (groupby !== undefined){
  //   plotData.transforms.push(
  //     {
  //       'type': 'groupby',
  //       'groups': groupby
  //     })
  // }
  return (
    <Plot
        data={[{
          x: x,
          y: y,
          type: 'scatter',
          mode: 'markers',
          marker: {color: 'red'}
      }]}
        layout={{width: width, height: height, title: options.title}}
      />
  );
};
