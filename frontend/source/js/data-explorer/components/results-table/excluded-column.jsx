import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../tooltip';
import { excludeRow } from '../../actions';
import RestoreExcluded from './restore-excluded';

export function HeaderCell() {
  return (
    <th scope="col" className="exclude">
      <RestoreExcluded />
    </th>
  );
}

function BaseDataCell({ dispatch, result }) {
  const handleExcludeRow = rowId => e => {
    e.preventDefault();
    dispatch(excludeRow(rowId));
  };

  const tooltip = `Exclude ${result.labor_category} from your search`;

  return (
    <td className="cell column-exclude">
      <a className="exclude-row" href="#"
         onClick={handleExcludeRow(result.id)}
         aria-label={tooltip}>
        <Tooltip text={tooltip}>
          &times;
        </Tooltip>
      </a>
    </td>
  );
}

BaseDataCell.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  result: React.PropTypes.object.isRequired,
};

export const DataCell = connect()(BaseDataCell);
