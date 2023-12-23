import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../config.js';

const baseUrl = config.authentication.baseUrl;
const email = config.email;
const password = config.password;
const username = config.username;
const params = config.params;

export let options = {
    insecureSkipTLSVerify: true,
    noconnectionReuse: false,
    stages: [
        { duration: '1m', target: 10 },
        { duration: '2m', target: 10 },
        { duration: '1m', target: 20 },
        { duration: '2m', target: 20 },
        { duration: '1m', target: 30 },
        { duration: '2m', target: 30 },
        { duration: '1m', target: 40 },
        { duration: '2m', target: 40 },
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<5500'],
        http_req_failed: ['rate<0.31'],
    },
};

export default function () {
    const requests = [
        {
            method: 'GET',
            url: `${baseUrl}/google`,
        },
        {
            method: 'POST',
            url: `${baseUrl}/check-existence`,
            body: {
                userNameOrEmail: email,
            }
        },
        {
            method: 'POST',
            url: `${baseUrl}/check-password`,
            body: {
                password: password,
            },
            
        },
        {
            method: 'POST',
            url: `${baseUrl}/login`,
            body: {
                email_or_username: email,
                password: password,
            }
        },
        {
            method: 'POST',
            url: `${baseUrl}/change-password`,
            body: {
                password: password,
                passwordConfirmation: password,
            },
            
        },
        {
            method: 'POST',
            url: `${baseUrl}/update-password`,
            body: {
                oldPassword: password,
                newPassword: password,
            },
            
        },
        {
            method: 'POST',
            url: `${baseUrl}/change-email`,
            body: {
                email: email,
            },
            
        },
        {
            method: 'POST',
            url: `${baseUrl}/username-suggestions`,
            body: {
                username: username,
            },
            
        }
    ];
    requests.forEach((request) => {
        const res = http.request(request.method, request.url, request.body, params);
        sleep(1);
        console.log(res.body);
        check(res, {
            "is status code 200: ": (r) => r.status === 200
        });
    });
}

export function handleSummary(data) {
    console.log('Preparing the end-of-test summary...')
    return {
        'summary.json': JSON.stringify(data),
    }
}