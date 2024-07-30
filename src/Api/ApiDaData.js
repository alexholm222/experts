import axios from 'axios'

export const baseUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/okved2";
export const baseUrl2 = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: baseUrl
})

const token = "036431f74bdd1f7b7dd0e5f6dd1b1cd819296ed8";

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = "Token " + token
    return config
});

export const handleOkved = (code) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        url: `${baseUrl}`,
        data: JSON.stringify({query: code}),
    })
} 

export const handleInnInfo = (inn) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        url: `${baseUrl2}`,
        data: JSON.stringify({query: inn}),
    })
} 