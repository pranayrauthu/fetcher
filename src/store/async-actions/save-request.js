import { API_BASE } from './../../constants/api-constant';
import router from './../../router';

export function saveRequest({getters, dispatch}){
    const {
        method,
        fetchUrl: url,
        requestHeaders,
        requestBody: data
    } = getters.inputData;
    const headers = Object.keys(requestHeaders).map(
        h => ({key: h, value: requestHeaders[h]})
    );
    dispatch('showSnackBar', 'Saving...');
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
        dispatch('showSnackBar', 'permalink created. It expires in 30 min.');
    })
    .catch(err => {
        dispatch('showSnackBar', 'unable to save request. please try again')
        console.log(err);
    });
}

