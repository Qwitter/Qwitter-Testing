import http from 'k6/http';
import {check, sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noconnectionReuse: false,
  stages: [
      { duration: '10s', target: 30 },
      { duration: '1m', target: 30 },
      { duration: '10s', target: 65 },
      { duration: '1m', target: 65 },
      { duration: '10s', target: 100 },
      { duration: '1m', target: 100 },
      { duration: '2m', target: 0 },
  ],
};

export default function () {
  const data = JSON.stringify({
    email_or_username: 'marwanemad910@gmail.com',
    password: 'MarwanEmad1'
  })
  const res = http.post('http://host.docker.internal:3030/api/v1/auth/login', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  sleep(1);
  console.log(res.body);
  check(res, {
    "is status code equal to 200: " : (r) => r.status === 200
  })
}