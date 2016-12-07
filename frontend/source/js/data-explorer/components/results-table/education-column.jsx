import React from 'react';

import createSortableColumn from './sortable-column';

const column = createSortableColumn({
  key: 'education_level',
  title: 'Min Edu.',
  description: 'Minimum years of education',
});

export const HeaderCell = column.HeaderCell;

export const DataCell = column.connectDataCell(
  ({ className, value }) => (
    <td className={className}>
      {value}
    </td>
  )
);
