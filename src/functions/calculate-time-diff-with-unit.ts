import getTimeDifference from './get-time-diff'

export const calculateTimeDiffWithUnit = (timestamp: string | number | Date) =>
  getTimeDifference(new Date(), new Date(timestamp), 'year') > 0
    ? `${getTimeDifference(new Date(), new Date(timestamp), 'year')}y`
    : getTimeDifference(new Date(), new Date(timestamp), 'month') > 0
    ? `${getTimeDifference(new Date(), new Date(timestamp), 'month')}m`
    : getTimeDifference(new Date(), new Date(timestamp), 'week') > 0
    ? `${getTimeDifference(new Date(), new Date(timestamp), 'week')}w`
    : getTimeDifference(new Date(), new Date(timestamp), 'day') > 0
    ? `${getTimeDifference(new Date(), new Date(timestamp), 'day')}d`
    : getTimeDifference(new Date(), new Date(timestamp), 'hour') > 0
    ? `${getTimeDifference(new Date(), new Date(timestamp), 'hour')}h`
    : getTimeDifference(new Date(), new Date(timestamp), 'minute') > 0
    ? `${getTimeDifference(new Date(), new Date(timestamp), 'minute')}min`
    : `${getTimeDifference(new Date(), new Date(timestamp), 'second')}s`
