import axios from 'axios'

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: `https://api.skilla.ru/`
})

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    return config
})

export const getCities = () => {
    return instanceWithToken.post(`skilla/getCities?`)
}

export const getMaps = (city, type) => {
    return instanceWithToken.post(`skilla/getOrdersMap?city=${city}&type=${type}`)
}

export const getClientsTabs = () => {
    return instanceWithToken.post(`articles/getCats?`)
}

export const getUserInfo = () => {
    return instanceWithToken.post(`skilla/getUserInfo?`)
}

export const getFaqCats = () => {
    return instanceWithToken.post('skilla/getFaqCats?')
}

export const getFaqSubcats = () => {
    return instanceWithToken.post(`skilla/getFaqSubcats?`)
}

export const getFaqList = (subcat_id = 0) => {
    return instanceWithToken.post('skilla/getFaqList?' + (subcat_id ? 'subcats_ids[]=' + subcat_id : ''))
}

export const getFaq = (id) => {
    return instanceWithToken.post(`skilla/getFaq?id=${id}`)
}

export const likeQuestion = (id, type) => {
    return instanceWithToken.post(`skilla/setFaqLike?id=${id}&type=${type}`)
}

export const removeLikeQuestion = (id, type) => {
    return instanceWithToken.post(`skilla/deleteFaqLike?id=${id}&type=${type}`)
}

export const getRevenueGraph = (type) => {
    return instanceWithToken.post(`skilla/getRevenueGraph?type=${type}`)
}

export const getList = (alias, type = '') => {
    return instanceWithToken.post(`articles/getList?&cats_alias[]=${alias}${type?`&type[]=${type}`:''}`)
}

export const getListAll = (type) => {
    return instanceWithToken.post(`articles/getList?type[]=${type}`)
}

export const getArticle = (alias) => {
    return instanceWithToken.post(`https://api.skilla.ru/articles/getArticle?alias=${alias}`)
}

export const getPartnerInfo = () => {
    return instanceWithToken.post(`https://api.skilla.ru/partnership/getProfile`)
}

export const getArticlePartners = (type, alias) => {
    return instanceWithToken.post(`https://api.skilla.ru/articles/getArticle?alias=${type}/${alias}`)
}

export const getArticleService = (alias) => {
    return instanceWithToken.post(`https://api.skilla.ru/articles/getArticle?alias=services/${alias}`)
}

export const getArticleClient = (alias) => {
    return instanceWithToken.post(`https://api.skilla.ru/articles/getArticle?alias=clients/${alias}`)
}

export const sendForm = (phone, type, message, inn, id, utm) => {
    phone = encodeURIComponent(phone);
    const text = message !== '' && message !== undefined && message !== null ? `&text=${message}` : '';
    const valueInn = inn !== undefined && inn !== null ? `&inn=${inn}` : '';
    const manId = id !== ""  && id !== undefined && id !== null ? `&id=${id}` : '';
    const utm_source = utm !== "" && utm !== undefined && utm !== null ? `&utm_source=${JSON.stringify(utm)}` : '';
    return instanceWithToken.post(`https://api.skilla.ru/articles/sendRequest?phone=${phone}&type=${type}${text}${valueInn}${manId}${utm_source}`)
}

export const sendFormUnsubscribe = (eid, answer, comment) => {
    const message = comment !== '' && comment !== undefined && comment !== null ? `&comment=${comment}` : '';
    const paramEid = eid !== '' && eid !== undefined && eid !== null ? `&eid=${eid}` : '';

    return instanceWithToken.post(`https://api.skilla.ru/articles/unsubscribe?${paramEid}&answer=${answer}${message}`)
}

export const sendWorker = (data) => {
    return instanceWithToken.post(`https://api.skilla.ru/skilla/sendWorker?city=${data.valueCity}&age=${data.valueAge}&citizenship=${data.valueCitizenship}&name=${data.valueName}&phoneNumber=${data.valuePhoneNumber}&gender=${data.valueRadio}&message=${data.valueMessage}`)
}

export const sendExamResult = (code, data, answers) => {
    return axios({
        method: 'post',
        url: `https://api.skilla.ru/skilla/lkExamSetResult?code=${code}&status=${data.status}&scores=${data.scores}`,
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`, "Content-Type": "multipart/form-data" },
        data: answers
    })
}

export const saveRequest = (col, val, code) => {
    val = encodeURIComponent(val);
    return instanceWithToken.post(`https://api.skilla.ru/articles/saveRequest?col=${col}&val=${val}&code=${code}`)
}

export const saveAnketa = (isExpPeoples, isExpBusiness,messageWhy, code) => {
    return instanceWithToken.post(`https://api.skilla.ru/articles/saveAnketa?isExpPeoples=${isExpPeoples}&isExpBusiness=${isExpBusiness}&messageWhy=${messageWhy}&code=${code}`)
}

export const getNumWorkers = () => {
    return instanceWithToken.post(`skilla/getNumWorkers?`)
}

export const getPartners = () => {
    return instanceWithToken.post(`skilla/getPartners?`)
}

export const getAuthLk = (phone) => {
    return instanceWithToken.post(`skilla/lkAuth?phone=${phone}`)
}

export const getAuthCheck = (phone, code) => {
    return instanceWithToken.post(`skilla/lkAuthCheck?phone=${phone}&sms_code=${code}`)
}

export const getDataConfirm = (code, name, city) => {
    return instanceWithToken.post(`skilla/lkDataAccept?code=${code}&name=${name}&city=${city}`)
}

export const getViewMenu = (code, menuId) => {
    return instanceWithToken.post(`skilla/lkViewMenu?code=${code}&menu_id=${menuId}`)
}

export const getCheckApp = (code) => {
    return instanceWithToken.post(`skilla/lkCheckApp?code=${code}`)
}

export const getUser = (code) => {
    return instanceWithToken.post(`skilla/lkGetUserInfo?code=${code}`)
}


export const getReqZoom = (code) => {
    return instanceWithToken.post(`skilla/lkReqZoom?code=${code}`)
}

export const getLkGetZoom = (code) => {
    return instanceWithToken.post(`skilla/lkGetZoom?code=${code}`)
}

export const getLkForm = (code) => {
    return instanceWithToken.post(`skilla/lkGetForm?code=${code}`)
}

export const getLkExam = (code) => {
    return instanceWithToken.post(`skilla/lkExamInformation?code=${code}`)
}

export const getLkContract = (code) => {
    return instanceWithToken.post(`skilla/lkGetContract?code=${code}`)
}


export const getLkContractSign = (code, phone) => {
    return instanceWithToken.post(`skilla/lkContractSign?code=${code}&phone=${phone}`)
}

export const getLkContractSignCheck = (code, phone, sms_code) => {
    return instanceWithToken.post(`skilla/lkContractSignCheck?code=${code}&phone=${phone}&sms_code=${sms_code}`)
}

export const getLkPaymentInformation = (code) => {
    return instanceWithToken.post(`skilla/lkPaymentInformation?code=${code}`)
}

export const getLkCommissionGraph = () => {
    return instanceWithToken.post(`skilla/lkCommissionGraph`)
}

export const getLkWorkersGraph = () => {
    return instanceWithToken.post(`skilla/lkWorkersGraph`)
}

export const getLkTrainingInfo = (code) => {
    return instanceWithToken.post(`skilla/lkGetTraining?code=${code}`)
}

export const getLkReqTraining = (code, phone, num, date) => {
    return instanceWithToken.post(`skilla/lkReqTraining?code=${code}&phone=${phone}&num=${num}&date=${date}`)
}

export const getLkReqTrainingCheck = (code, phone, sms_code) => {
    return instanceWithToken.post(`skilla/lkReqTrainingCheck?code=${code}&phone=${phone}&sms_code=${sms_code}`)
}

export const getLkCancelTraining = (code) => {
    return instanceWithToken.post(`skilla/lkCancelTraining?code=${code}`)
}

export const getLkАccessInformation = (code) => {
    return instanceWithToken.post(`skilla/lkАccessInformation?code=${code}`)
}

export const getLkReqAccess = (code) => {
    return instanceWithToken.post(`skilla/lkReqAccess?code=${code}`)
}

export const getLkReqAccessCheck = (code, sms_code) => {
    return instanceWithToken.post(`skilla/lkReqAccessCheck?code=${code}&sms_code=${sms_code}`)
}

export const getLkCalendarCats = () => {
    return instanceWithToken.post(`skilla/lkGetCalendarCats`)
}

export const getLkCalendarSchedule = (month, type) => {
    return instanceWithToken.post(`skilla/lkGetCalendarSchedule?month=${month}&type=${type}`)
}

export const getLkCalendarEvent = (id, token) => {
    return instanceWithToken.post(`skilla/lkGetCalendarEvent?id=${id}&partnership_token=${token}`)
}

export const getLkCalendarLastEvents = () => {
    return instanceWithToken.post(`skilla/lkGetCalendarLastEvents`)
}

export const getCalendarNextEvents = () => {
    return instanceWithToken.post(`skilla/lkGetCalendarNextEvents`)
}

export const getCalendarPaymentForm = (token, id, members) => {
    return instanceWithToken.post(`skilla/lkCalendarEventPaymentForm?partnership_token=${token}&id=${id}&members=${members}`);
}

export const sendBookCalendarEvent = (token, id, persons) => {
    return instanceWithToken.post(`skilla/lkBookCalendarEvent?partnership_token=${token}&id=${id}&${persons}`);
}

export const getlkBookPaymentForm = (code) => {
    return instanceWithToken.post(`skilla/lkBookPaymentForm?code=${code}`)
}

export const getlkGetBook = (code) => {
    return instanceWithToken.post(`skilla/lkGetBook?code=${code}`)
}

export const getLkViewContent = (code, content_id, content_name) => {
    return instanceWithToken.post(`skilla/lkViewContent?code=${code}&content_id=${content_id}&content_name=${content_name}`)
}


export const saveBookInfo = (type, order_id, name, phone, email, comment) => {
    if (type === 'book') {
        return instanceWithToken.post(`skilla/SaveBookInfo?order_id=${order_id}&name=${name}&phone=${phone}&comment=${comment}`)
    }

    if (type === 'ebook') {
        return instanceWithToken.post(`skilla/SaveBookInfo?order_id=${order_id}&email=${email}&phone=${phone}`)
    }

}

export const getBookPaymentForm = (type) => {
    return instanceWithToken.post(`skilla/GetBookPaymentForm?type=${type}`)
}

export const getBookPaymentStatus = (order_id) => {
    return instanceWithToken.post(`skilla/GetBookPaymentStatus?order_id=${order_id}`)
}





