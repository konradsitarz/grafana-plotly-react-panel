import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { Select, Label, Input } from '@grafana/ui';
import { Trace, TraceOptions } from 'types';
import { isEqual } from 'lodash';


function updateTrace(newParam: any, paramName: any, trace: Trace, options: TraceOptions, onChange: CallableFunction){
  let idx:number = options.traces.findIndex(e => {return isEqual(e, trace)})
  debugger
  if (idx == -1){
    idx = 0
  }
  options.traces[idx].get = newParam.value
  onChange(options)
}

function updateCurrentTrace(newTrace: any, options: TraceOptions, onChange: CallableFunction){
  options.currentTrace = newTrace.value
  onChange(options)
}

interface Props extends StandardEditorProps<TraceOptions> {}
export const TraceEditor: React.FC<Props> = ({ item, value, onChange, context }) => {
  if (context.data && context.data.length > 0) {
    let traceOptions = context.options.traceOptions;
    const axisOptions = context.data
      .flatMap(frame => frame.fields)
      .filter(field => (item.settings?.filterByType ? field.type === item.settings?.filterByType : true))
      .map(field => ({
        label: field.name,
        value: field.name,
      }));

    let defaultTrace =  {name: 'New trace', x: null, y: null, groupby: null}
    let currentTrace: Trace = traceOptions.currentTrace ? traceOptions.currentTrace : defaultTrace;
    let traces: Trace[] = traceOptions.traces ? traceOptions.traces : [currentTrace];
  
    const traceSelectorOptions: any = traces.map(t => ({label: t.name, value: t}))
    return (
      <div>
        <Select<Trace> isLoading={false} value={currentTrace} onChange={e => updateCurrentTrace(e, traceOptions, onChange)} options={traceSelectorOptions}/>
        <Label>Trace name</Label>
        <Input css={''} value={currentTrace.name} onChange={e=> updateTrace(e, 'name', currentTrace, traceOptions, onChange)}></Input>
        <Label>X axis</Label>
        <Select<string> placeholder='X axis' isLoading={false} value={currentTrace.x} onChange={e => updateTrace(e, 'x', currentTrace, traceOptions, onChange)} options={axisOptions} />
        <Label>Y axis</Label>
        <Select<string> placeholder='Y axis' isLoading={false} value={currentTrace.y} onChange={e => updateTrace(e, 'y', currentTrace, traceOptions, onChange)} options={axisOptions} />
        <Label>Groupby</Label>
        <Select<string> placeholder='Groupby' isLoading={false} value={currentTrace.groupby} onChange={e => updateTrace(e, 'groupby', currentTrace, traceOptions, onChange)} options={axisOptions} />
      </div>
      )
  }

  return <Select onChange={() => {}} disabled={true} />;
};
