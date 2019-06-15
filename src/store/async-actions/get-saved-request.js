import { API_BASE } from './../../constants/api-constant';
import router from './../../router';

export function getSavedRequest({dispatch}){
    const {id} = router.currentRoute.query;
    if(!id){
        return;
    }

    fetch(`${API_BASE}/getrequest/${id}`)
    .then(resp => resp.json())
    .then(resp => {
        const {
            method,
            headers = [],
            data: requestBody,
            url: fetchUrl,
        } = resp;
        const requestHeaders = headers.reduce(
            (acc, cur)=>({
                ...acc,[cur.key]:cur.value
            }),{});
        dispatch('setInputData', {
            method,
            requestHeaders,
            requestBody,
            fetchUrl
        });
    }).catch(err => {
        console.log(err);
    })
}