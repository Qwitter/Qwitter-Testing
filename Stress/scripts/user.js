import http from "k6/http";
import { check, sleep } from "k6";
import { config } from "../config.js";

const baseUrl = config.user.baseUrl;
const username = config.username;
const followUsername = config.user.followUsername;
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
            url: `${baseUrl}/followers/${username}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/follow/${username}`,
        },
        {
            method: 'POST',
            url: `${baseUrl}/follow/${followUsername}`,
        },
        {
            method: 'DELETE',
            url: `${baseUrl}/follow/${followUsername}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/block`,
        },
        {
            method: 'POST',
            url: `${baseUrl}/block/${followUsername}`,
        },
        {
            method: 'DELETE',
            url: `${baseUrl}/block/${followUsername}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/mute`,
        },
        {
            method: 'POST',
            url: `${baseUrl}/mute/${followUsername}`,
        },
        {
            method: 'DELETE',
            url: `${baseUrl}/mute/${followUsername}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/suggestions`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/${username}`,
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
    console.log("Preparing the end-of-test summary...");
    return {
        'summary.json': JSON.stringify(data),
    }
}