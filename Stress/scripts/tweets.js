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

