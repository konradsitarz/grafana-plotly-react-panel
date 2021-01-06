import { PanelPlugin, FieldConfigProperty } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
// import { FieldSelectEditor } from 'FieldSelectEditor';
import { TraceEditor} from 'PlotlyEditor';


export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel)
  .useFieldConfig({
    standardOptions: [
      FieldConfigProperty.Decimals,
      FieldConfigProperty.Unit,
      FieldConfigProperty.Mappings,
      FieldConfigProperty.Color,
      FieldConfigProperty.Thresholds,
    ],
  })
  .setPanelOptions(builder => {
    return builder
      .addTextInput({
        path: 'title',
        name: 'Title',
        description: '',
        defaultValue: 'New Plotly plot',
      })
      .addCustomEditor({
        id: 'traceOptions',
        path: 'traceOptions',
        name: 'Traces',
        category: ['Traces'],
        editor: TraceEditor,
      });
  });
