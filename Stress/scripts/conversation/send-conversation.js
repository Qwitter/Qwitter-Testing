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
        { duration: '30s', target: 20 },
        { duration: '50s', target: 20 },
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
            url: `${baseUrl}/${conversationId}/message`,
            body: {
                text: 'Message',
            }
        }
    ];
    requests.forEach((request) => {
        const res = http.request(request.method, request.url, request.body, params);
        sleep(1);
        console.log(res.body);
    });
}
