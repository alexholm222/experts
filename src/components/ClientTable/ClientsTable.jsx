import s from './ClientsTable.module.scss';
//components
import ClientItem from './ClientItem/ClientItem';
import { useEffect, useState } from 'react';

const ClientsTable = ({ clients, activeTab, activeTabList }) => {
    const [sortClients, setSortClients] = useState(clients)

    useEffect(() => {
        const clientSort = [...clients];
        clientSort.sort(function (a, b) {
            const dateA = new Date(a?.next_connect);
            const dateB = new Date(b?.next_connect);
            if (dateA > dateB) {
                return 1
            }

            if (dateA < dateB) {
                return -1
            }
        })

        clientSort.sort(function(a, b) {
            if (a.events_call < b.events_call) {
                return 1
            }

            if (a.events_call > b.events_call) {
                return -1
            }
        })

        setSortClients(clientSort)
    }, [clients])

    return (
        <div className={s.table}>
            <div className={s.header}>
                <div className={s.empty}></div>
                <div className={s.client}>
                    <p>Клиент</p>
                </div>
                <div className={s.task}>
                    <p>Задача</p>
                </div>
                <div className={s.task}>
                    <p>Коммуникация</p>
                </div>
                <div className={s.step}>
                    <p>Шаг</p>
                </div>
                <div className={s.comment}>
                    <p>Комментарий</p>
                </div>
                <div className={s.favorite}></div>
            </div>
            <ul className={s.list}>
                {sortClients.map(el => {
                    return <ClientItem key={el.id} id={el.id} client={el} clients={clients} activeTab={activeTab} activeTabList={activeTabList}/>
                })}
            </ul>
        </div>
    )
};

export default ClientsTable;