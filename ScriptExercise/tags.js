import http from 'k6/http';

export const options = {
  //   vus: 10,
  //   duration: '5s',
  thresholds: {
    http_req_duration: ['p(95) < 2050'],
    'http_req_duration{status: 200}': ['p(95) < 50'], //custom tag to filter the threshold only on req with status 200
    'http_req_duration{status: 201}': ['p(95) < 2050'],
  },
};

export default function () {
  let res = http.get('http://localhost:8080/books'); //returning 200
  console.log(res.status);

  res = http.get('http://localhost:8080/booksDelay?delayMs=2000'); //return 201 after delayMs ms
  console.log(res.status);
}
