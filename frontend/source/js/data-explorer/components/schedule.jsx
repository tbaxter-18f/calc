import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { filterActive } from '../util';
import { makeOptions } from './util';
import { setSchedule as setScheduleAction } from '../actions';
import { SCHEDULE_LABELS } from '../constants';

export function Schedule({ idPrefix, schedule, setSchedule }) {
  const id = `${idPrefix}schedule`;
  const handleChange = (e) => { setSchedule(e.target.value); };

  return (
    <div className="filter filter-schedule">
      <label htmlFor={id}>SIN / Schedule:</label>
      <a href="/about#schedules" className="filter-more-info">
        What&apos;s this?
      </a>
      <select
        id={id} name="schedule" value={schedule}
        onChange={handleChange}
        className={filterActive(schedule !== '')}
      >
        {makeOptions(SCHEDULE_LABELS)}
      </select>
    </div>
  );
}

Schedule.propTypes = {
  schedule: PropTypes.string.isRequired,
  setSchedule: PropTypes.func.isRequired,
  idPrefix: PropTypes.string,
};

Schedule.defaultProps = {
  idPrefix: '',
};

export default connect(
  state => ({ schedule: state.schedule }),
  { setSchedule: setScheduleAction },
)(Schedule);
