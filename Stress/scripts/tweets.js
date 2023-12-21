import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../config.js';

const username = config.username;
const baseUrl = config.tweets.baseUrl;
const params = config.params;
const tweetId = config.tweets.tweetId;

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
            url: `${baseUrl}/user/${username}/replies`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/hashtags`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}`,
        },
        {
            method: 'POST',
            url: `${baseUrl}/${tweetId}/like`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/${tweetId}/like`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/like`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/media`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/${tweetId}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/${tweetId}/replies`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/${tweetId}/retweets`,
        },
        {
            method: 'GET',
            url: `${baseUrl}`,
        },
        {
            method: 'POST',
            url: `${baseUrl}`,
            body: {
                text: 'STRESS TEST TWEET',
                source:  '',
                sensitive: '',
            },
        },
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
    console.log('Preparing the end-of-test summary...');
    return {
        'summary.json': JSON.stringify(data),
    }
}