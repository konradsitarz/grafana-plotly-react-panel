import React from 'react';
import Plot from 'react-plotly.js';
import PlotParams from 'react-plotly.js';
import Transform from 'react-plotly.js';
import { DataFrame, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { plot } from 'plotly.js';
// import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

function searchFrameForField(frame: DataFrame, fieldName: String){
  return frame.fields.find(field => field.name === fieldName);
}

function createDataArray(frame: DataFrame, fieldName: String){
  const x = searchFrameForField(frame, fieldName)
  return x !== undefined ? x.values.toArray(): []
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height}) => {
  const frame = data.series[0];
  debugger
  let x = createDataArray(frame, options.x);
  let y = createDataArray(frame, options.y);
  let groupbyCol = createDataArray(frame, options.groupby);
  let plotData : any = {
    x: x,
    y: y,
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'red'},
  };

  if (groupbyCol.length >= 0){  
    plotData['transforms'] = []
    plotData['transforms'].push({type: "groupby", groups: groupbyCol, styles: undefined})
  }
  
  return (
    <Plot
        data={[plotData]}
        layout={{width: width, height: height, title: options.title}}
      />
  );
};
