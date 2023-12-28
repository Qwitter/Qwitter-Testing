import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../config.js';

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
            method: 'POST',
            url: `${baseUrl}`,
            body: {
                conversation_name: 'test conversation',
                users: [
                    anotherUsername,
                    otherUsername,
                ]
            },
        },
        {
            method: 'GET',
            url: `${baseUrl}`,
        },
        {
            method: 'POST',
            url: `${baseUrl}/${conversationId}/user`,
            body: {
                users: [
                    engUsername,
                    testerUsername,
                ]
            },
        },
        {
            method: 'GET',
            url: `${baseUrl}/${conversationId}/user/?q=${testerUsername}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/user/?q=${testerUsername}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/${conversationId}`,
        },
        {
            method: 'GET',
            url: `${baseUrl}/search?q=test`,
        },
        {
            method: 'PUT',
            url: `${baseUrl}/${conversationId}`,
            body: {
                name: 'put test conversation',
            }
        },
        {
            method: 'POST',
            url: `${baseUrl}/${conversationId}/message`,
            body: {
                text: 'test message',
            }
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

