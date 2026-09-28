import http from 'k6/http';
import exec from 'k6/execution';

export const options = {
  vus: 2,
  duration: '5s',
};

//use setup function to pre-check if the server is up and running
//otherwise, abort the test
export function setup() {
  const preCheck = http.get(
    'https://quickpizza.grafana.com/test.k6.local.io/health',
  );

  console.log(preCheck.status);

  if (preCheck.status) {
    exec.test.abort('PreCheck /health failed. Abort the test');
  }
}

export default function () {
  http.get('https://quickpizza.grafana.com/test.k6.local.io/');
}
