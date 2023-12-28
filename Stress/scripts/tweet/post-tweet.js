import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../../config/config.js';

const username = config.username;
const baseUrl = config.tweets.baseUrl;
const params = config.params;
const tweetId = config.tweets.tweetId;

export let options = {
    insecureSkipTLSVerify: true,
    noconnectionReuse: false,
    stages: [
        { duration: '30s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.1'],
    },
};

export default function () {
    const requests = [
        {
            method: 'POST',
            url: `${baseUrl}`,
            body: {
                text: 'STRESS TEST TWEET',
                source:  '',
                sensitive: '',
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