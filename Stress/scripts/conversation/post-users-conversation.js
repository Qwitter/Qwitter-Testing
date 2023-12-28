import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../../config/config.js';

const otherUsername = config.conversation.otherUsername;
const anotherUsername = config.conversation.anotherUsername;
const engUsername = config.conversation.engUsername;
const testerUsername = config.conversation.testerUsername;
const baseUrl = config.conversation.baseUrl;
const conversationId = config.conversation.conversationId;
const params = config.params;

export let options = {
    insecureSkipTLSVerify: true,
    noconnectionReuse: false,
    stages: [
        { duration: '40s', target: 400 },
        { duration: '1m', target: 400 },
        { duration: '40s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.1'],
    },
};

export default function () {
    const requests = [
        {
            method: 'POST',
            url: `${baseUrl}/${conversationId}/user`,
            body: {
                users: [
                    'mohamedd415e1'
                ]
            },
        }
    ];
    requests.forEach((request) => {
        const res = http.request(request.method, request.url, request.body, params);
        sleep(1);
        console.log(res.body);
        check(res, {
            "is status code 200: ": (r) => r.status === 200 || r.status === 400
        });
    });
}

