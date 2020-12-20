import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { FieldSelectEditor } from 'FieldSelectEditor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'title',
      name: 'Title',
      description: '',
      defaultValue: 'New Plotly plot',
    })
    .addCustomEditor({
      id: 'xCol',
      path: 'x',
      name: 'X column',
      description: 'Column to show on the X axis',
      category: ['Dimensions'],
      editor: FieldSelectEditor
    })
    .addTextInput({
      path: 'y',
      name: 'Y column',
      description: 'Column to show on the Y axis',
      defaultValue: '',
    })
    .addTextInput({
      path: 'groupby',
      name: 'Group by',
      description: 'Column to group data',
      defaultValue: '',
    })
});
