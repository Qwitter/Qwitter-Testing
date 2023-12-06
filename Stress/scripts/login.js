import http from 'k6/http';
import {check, sleep } from 'k6';

export const options = {
  stages:[
    {duration : '30s', target: 20},
    {duration : '30s', target: 10},
    {duration : '10s', target: 0},
  ],
};

export default function () {
  const data = JSON.stringify({
    email_or_username: 'marwanemad910@gmail.com',
    password: 'MarwanEmad1'
  })
  const res = http.post('http://qwitterback.cloudns.org:3000/api/v1/auth/login', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  check(res, {
    "is status code equal to 200: " : (r) => r.status === 200
  })
}