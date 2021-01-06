import React from 'react';
import Plot from 'react-plotly.js';
// import PlotParams from 'react-plotly.js';
// import Transform from 'react-plotly.js';
import { DataFrame, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
// import { plot } from 'plotly.js';
// import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

function searchFrameForField(frame: DataFrame, fieldName: String) {
  return frame.fields.find(field => field.name === fieldName);
}

function createDataArray(frame: DataFrame, fieldName: String) {
  const x = searchFrameForField(frame, fieldName);
  return x !== undefined ? x.values.toArray() : [];
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const frame = data.series[0];
  if (!options.traceOptions.traces){
    return <h1>Select X and Y axis first</h1>
  }
  const plotData : any = options.traceOptions.traces.map(trace => {
    let x = createDataArray(frame, trace.x);
    let y = createDataArray(frame, trace.y);
    let groupbyCol = createDataArray(frame, trace.groupby);
    let traceData: any = {
      x: x,
      y: y,
      type: 'scatter',
      mode: 'markers',
      marker: { color: 'red' },
    };
  
    if (groupbyCol.length >= 0) {
      traceData['transforms'] = [{ type: 'groupby', groups: groupbyCol, styles: undefined }];
    }
    return traceData
  });
  return <Plot data={plotData} layout={{ width: width, height: height, title: options.title }} />;
};
