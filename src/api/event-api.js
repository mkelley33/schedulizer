import cronParser from 'cron-parser';
import orderBy from 'lodash.orderby';

export function fetchEvents() {
  return window
    .fetch('https://scheduler-challenge.herokuapp.com/schedule')
    .then(response => {
      return response.json();
    })
    .then(json => {
      json.data.forEach(event => {
        const interval = cronParser.parseExpression(event.attributes.cron, {
          utc: true
        });
        event.formattedDate = interval.next().toString();
        event.unformattedDate = new Date(event.formattedDate);
      });
      return orderBy(json.data, 'unformattedDate');
    });
}
