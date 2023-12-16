import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../config.js';

const username = config.username;
const otherUsername = config.conversation.otherUsername;
const anotherUsername = config.conversation.anotherUsername;
const engUsername = config.conversation.engUsername;
const testerUsername = config.conversation.testerUsername;
const baseUrl = config.profile.baseUrl;
const conversationId = config.conversation.conversationId;
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
            url: `${baseUrl}/user/${username}/retweet`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/tweet`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/media`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/reply`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/conversation`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/follow`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/block`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/mute`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/notification`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/search`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/trend`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/setting`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/profile`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/profile-edit`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/bookmark`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/${username}/list`,
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