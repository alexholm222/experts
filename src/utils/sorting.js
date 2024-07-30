export const sortTimeUp = (array) => {
    array.sort(function (a, b) {
        const dateA = a?.next_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(a?.next_connect).getTime();
        const dateB = b?.next_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(b?.next_connect).getTime();

        if (dateA < dateB) {
            return 1
        }

        if (dateA > dateB) {
            return -1
        }

        if (dateA == dateB) {
            return 0
        }
    })
}

export const sortTimeDown = (array) => {
    array.sort(function (a, b) {
        const dateA = a?.next_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(a?.next_connect).getTime();
        const dateB = b?.next_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(b?.next_connect).getTime();
        console.log(dateA, dateB)

        if (dateA > dateB) {
            return 1
        }

        if (dateA < dateB) {
            return -1
        }

        if (dateA == dateB) {
            return 0
        }
    })
}

export const sortLastConnectUp = (array) => {
    array.sort(function (a, b) {
        const dateA = a?.last_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(a?.last_connect);
        const dateB = b?.last_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(b?.last_connect);

        if (dateA < dateB) {
            return 1
        }

        if (dateA > dateB) {
            return -1
        }
    })
}

export const sortLastConnectDown = (array) => {
    array.sort(function (a, b) {
        const dateA = a?.last_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(a?.last_connect);
        const dateB = b?.last_connect == '0000-00-00 00:00:00' ? new Date('2020-01-01') : new Date(b?.last_connect);

        if (dateA > dateB) {
            return 1
        }

        if (dateA < dateB) {
            return -1
        }
    })
}


export const sortStepUp = (array) => {

    array.sort(function (a, b) {
        const cleanRoadA = a?.lk_road_logs?.filter(el => el.type == 'ClientOpenPlan' ||
            el.type == 'ReqZoom' || el.type == 'ClientZoomSet' ||
            el.type == 'ClientZoomFinish' || el.type == 'SendForm' ||
            el.type == 'ClientAnketaAccept' || el.type == 'ContractСancelled' ||
            el.type == 'ClientContractSign' || el.type == 'ClientPrepaid');

        const cleanRoadB = b?.lk_road_logs?.filter(el => el.type == 'ClientOpenPlan' ||
            el.type == 'ReqZoom' || el.type == 'ClientZoomSet' ||
            el.type == 'ClientZoomFinish' || el.type == 'SendForm' ||
            el.type == 'ClientAnketaAccept' || el.type == 'ContractСancelled' ||
            el.type == 'ClientContractSign' || el.type == 'ClientPrepaid');

        const lastRoadA = cleanRoadA?.at(-1).date;
        const lastRoadB = cleanRoadB?.at(-1).date;


        const dateA = new Date(lastRoadA);
        const dateB = new Date(lastRoadB);

        if (dateA < dateB) {
            return 1
        }

        if (dateA > dateB) {
            return -1
        }
    })
}

export const sortStepDown = (array) => {
    array.sort(function (a, b) {
        const cleanRoadA = a?.lk_road_logs?.filter(el => el.type == 'ClientOpenPlan' ||
            el.type == 'ReqZoom' || el.type == 'ClientZoomSet' ||
            el.type == 'ClientZoomFinish' || el.type == 'SendForm' ||
            el.type == 'ClientAnketaAccept' || el.type == 'ContractСancelled' ||
            el.type == 'ClientContractSign' || el.type == 'ClientPrepaid');

        const cleanRoadB = b?.lk_road_logs?.filter(el => el.type == 'ClientOpenPlan' ||
            el.type == 'ReqZoom' || el.type == 'ClientZoomSet' ||
            el.type == 'ClientZoomFinish' || el.type == 'SendForm' ||
            el.type == 'ClientAnketaAccept' || el.type == 'ContractСancelled' ||
            el.type == 'ClientContractSign' || el.type == 'ClientPrepaid');

        const lastRoadA = cleanRoadA?.at(-1).date;
        const lastRoadB = cleanRoadB?.at(-1).date;


        const dateA = new Date(lastRoadA);
        const dateB = new Date(lastRoadB);

        if (dateA > dateB) {
            return 1
        }

        if (dateA < dateB) {
            return -1
        }
    })
}