import { PanelPlugin, FieldConfigProperty } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { FieldSelectEditor } from 'FieldSelectEditor';


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
      id: 'x',
      path: 'x',
      name: 'X column',
      description: 'Column to show on the X axis',
      category: ['Dimensions'],
      editor: FieldSelectEditor
    })
    .addCustomEditor({
      id: 'y',
      path: 'y',
      name: 'Y column',
      description: 'Column to show on the Y axis',
      category: ['Dimensions'],
      editor: FieldSelectEditor
    })
    .addCustomEditor({
      id: 'groupby',
      path: 'groupby',
      name: 'Group by',
      description: 'Column to group by',
      category: ['Dimensions'],
      editor: FieldSelectEditor
    })
});
