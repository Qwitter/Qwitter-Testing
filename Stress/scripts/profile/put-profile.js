import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../../config.js';

const baseUrl = config.profile.baseUrl;
const params = config.params;
const name = config.profile.name;

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
            method: 'PUT',
            url: `${baseUrl}/profile`,
            body: {
                name: name,
                description: '',
                Location: '',
                url: '',
                birth_date: '2000-03-09T22:18:26.625Z',
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

