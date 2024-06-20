import axios from 'axios'

export const baseUrl = process.env.REACT_APP_API_URL;

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: baseUrl
})

const token = document.getElementById('root_expert').getAttribute('token');

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = token
    return config
});

export const getManagerInfo = () => {
    return instanceWithToken.get(`${baseUrl}api/profile`);
}

export const getMyClients = (type, category) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients?type=${type}&category=${category}`);
}

export const getMyClientsPagination = (path, type, category) => {
    return instanceWithToken.get(`${path}&type=${type}&category=${category}`);
}

export const getCities = () => {
    return instanceWithToken.get(`${baseUrl}api/requests/cities`);
}

export const addFavorite = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/favorite`,
        data: data,
    })
}

export const getPlaner = () => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/planner`);
}

export const getClientInformation = (id) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/detail/${id}`);
    
}

export const editClient = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/edit`,
        data: data,
    })
} 

//звонок клиенту и последующая работа
export const callClient = (phone) => {
    return instanceWithToken.post(`${baseUrl}api/frmanager/clients/call_mango?phone=${phone}`);
}

export const sendComment = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/send_comment`,
        data: data,
    })
} 

export const sendPlanTime = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/plan_call`,
        data: data,
    })
} 


export const finishZoom = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/finish_zoom`,
        data: data,
    })
} 

export const rejectZoom = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/reject_zoom`,
        data: data,
    })
} 

export const rejectClient = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/reject`,
        data: data,
    })
} 

export const transferClient = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/transfer`,
        data: data,
    })
} 

//анкета
export const getAnketa = (id) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/anketa/${id}`);
}

export const acceptAnketa = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/anketa/accept`,
        data: {id},
    })
}

export const rejectAnketa = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/anketa/reject`,
        data: {id},
    })
}

export const retryAnketa = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/anketa/retry`,
        data: {id},
    })
}

//отмена обучения
export const cancelTraning = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/reject_train`,
        data: {id},
    })
}

export const getPartners = (client_id) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/info_companies/${client_id}`);
}

export const getScenario = () => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/scripts`);
}
 





