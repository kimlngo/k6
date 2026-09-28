import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    {
      duration: '2m', //ramp-up stage
      target: 10000,
    },
    {
      duration: '1m', //ramp-down stage
      target: 0,
    },
  ],
};
export default function () {
  http.get('https://quickpizza.grafana.com/test.k6.io/');
  sleep(1);
}
