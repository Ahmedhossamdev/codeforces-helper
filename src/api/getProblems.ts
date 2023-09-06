

import Axios from 'axios';

export async function getProblems(p1, p2) {
    const url = 'https://codeforces.com/api/problemset.problems';
    return new Promise((resolve) => {
        Axios.get(url)
            .then((res) => {
                if (res.data.status === 'OK') {
                    const { result } = res.data;
                    const { problems } = result;
                    const filteredProblems = problems.filter((p) => p.rating >= p1 && p.rating <= p2);
                    filteredProblems.sort((p1, p2) => p1.rating - p2.rating);
                    resolve(filteredProblems);
                }
                resolve([]);
            })
            .catch(() => {
                resolve([]);
            });
    });
}
