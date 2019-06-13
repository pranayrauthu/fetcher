import { API_BASE } from './../../constants/api-constant';
import router from './../../router';

export function saveRequest({getters, dispatch}){
    const {
        method,
        fetchUrl: url,
        requestHeaders: headers,
        requestBody: body
    } = getters.inputData;
    fetch(`${API_BASE}/saverequest`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            method,
            url,
            data,
            headers
        })
    }).then( resp => resp.json() )
    .then( resp => {
        const { _id: id } = resp;
        router.push({
            query: {
                id
            }
        });
    })
    .catch(err => {
        console.log(err);
    });
}

