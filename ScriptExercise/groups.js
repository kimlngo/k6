/*
 k6 run groups.js --summary-mode=full
 */

import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '3s',
  thresholds: {
    http_req_duration: ['p(95) < 50'],
  },
};

export default function () {
  group('Main Page', () => {
    http.get('https://quickpizza.grafana.com/test.k6.io/');

    group('Sub Main Page', () => {
      http.get('https://quickpizza.grafana.com/test.k6.io/static/favicon.ico');
      http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css');
    });
  });

  group('News Page', () => {
    http.get('https://quickpizza.grafana.com/news.php');
  });

  sleep(1);
}
