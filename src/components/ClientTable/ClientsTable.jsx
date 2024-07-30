import s from './ClientsTable.module.scss';
import { ReactComponent as IconChewron } from '../../image/clients/iconChewron-12.svg';
import { ReactComponent as IconTop } from '../../image/clients/iconChewron.svg';
//components
import ClientItem from './ClientItem/ClientItem';
import { useEffect, useState, useRef } from 'react';
//utils
import { sortTimeUp, sortTimeDown, sortLastConnectUp, sortLastConnectDown, sortStepUp, sortStepDown } from '../../utils/sorting';

const ClientsTable = ({ clients, activeTab, activeTabList, load }) => {
    const [sortClients, setSortClients] = useState(clients);
    const [sortTask, setSortTask] = useState('down');
    const [sortConnect, setSortConnect] = useState('');
    const [sortStep, setSortStep] = useState('');
    const [endCursor, setEndCursor] = useState(50);
    const listRef = useRef();
    const timerDebounceRef = useRef();

    useEffect(() => {
        const clientSort = [...clients];
        sortTimeUp(clientSort)
        sortImportantItem(clientSort)
        setSortClients(clientSort)
    }, [clients])

    useEffect(() => {
        setSortTask('down');
        setSortConnect('');
        setSortStep('');
    }, [activeTabList])

    const sortImportantItem = (array) => {

        array.sort(function (a, b) {
            if (a.events_call < b.events_call) {
                return 1
            }

            if (a.events_call > b.events_call) {
                return -1
            }

            if (a.events_call == b.events_call) {
                return 0
            }
        })

        array.sort(function (a, b) {
            if (a.is_call_me < b.is_call_me) {
                return 1
            }

            if (a.is_call_me > b.is_call_me) {
                return -1
            }

            if (a.is_call_me == b.is_call_me) {
                return 0
            }
        })

        array.sort(function (a, b) {
            if (a.is_new_msg < b.is_new_msg) {
                return 1
            }

            if (a.is_new_msg > b.is_new_msg) {
                return -1
            }

            if (a.is_new_msg == b.is_new_msg) {
                return 0
            }
        })
    }

    const setDefaultValue = () => {
        const clientsDefault = [...clients];
        sortTimeUp(clientsDefault)
        sortImportantItem(clientsDefault)
        setSortClients(clientsDefault)
        setSortTask('down')
    }



    const handleSortTask = (e) => {
        const clientSort = [...clients];
        setSortConnect('');
        setSortStep('');
        if (sortTask == 'down') {
            sortTimeDown(clientSort)
            setSortTask('up');
            sortImportantItem(clientSort)
            setSortClients(clientSort);
            return
        }

        if (sortTask == 'up' || sortTask == '') {
            setSortTask('down');
            setDefaultValue();
            return
        }
    }

    const handleSortConnect = (e) => {
        const clientSort = [...clients];
        setSortStep('');
        if (sortConnect == '') {
            sortLastConnectUp(clientSort)
            setSortConnect('down');
            setSortTask('')
            sortImportantItem(clientSort)
            setSortClients(clientSort);
            return
        }

        if (sortConnect == 'down') {
            sortLastConnectDown(clientSort)
            setSortConnect('up');
            sortImportantItem(clientSort)
            setSortClients(clientSort);
            return
        }

        if (sortConnect == 'up') {
            setSortConnect('');
            setDefaultValue();
            return
        }
    }

    const handleSortStep = (e) => {
        const clientSort = [...clients];
        setSortConnect('');
        if (sortStep == '') {
            sortStepUp(clientSort)
            setSortStep('down');
            setSortTask('')
            sortImportantItem(clientSort)
            setSortClients(clientSort);
            return
        }

        if (sortStep == 'down') {
            sortStepDown(clientSort)
            setSortStep('up');
            sortImportantItem(clientSort)
            setSortClients(clientSort);
            return
        }

        if (sortStep == 'up') {
            setSortStep('');
            setDefaultValue();
            return
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleDebounceScroll);
        return () => window.removeEventListener('scroll', handleDebounceScroll)
    }, [])

    const scrollLoad = () => {
        const loadBottom = listRef.current.getBoundingClientRect().bottom - window.innerHeight < 800;
        const loadTop = window.innerHeight - listRef.current.getBoundingClientRect().top < 800;
        loadBottom && setEndCursor(prevState => prevState + 50)
        loadTop && setEndCursor(50);

    }

    function handleDebounceScroll() {
        if (timerDebounceRef.current) {
            clearTimeout(timerDebounceRef.current);
        }

        timerDebounceRef.current = setTimeout(() => {
            scrollLoad()
        }, 100);
    }

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            <div className={s.table}>
                <div className={s.header}>
                    <div className={s.empty}></div>
                    <div className={s.client}>
                        <p>Клиент</p>
                    </div>
                    <div id='sort' onClick={handleSortTask} className={`${s.task} ${load && s.disabled}`}>
                        <p>Задача</p>
                        <div className={`${s.chewron} ${sortTask == 'up' && s.chewron_up} ${sortTask == '' && s.chewron_hidden}`}>
                            <IconChewron />
                        </div>
                    </div>
                    <div onClick={handleSortConnect} className={`${s.task} ${load && s.disabled}`}>
                        <p>Коммуникация</p>
                        <div className={`${s.chewron} ${sortConnect == 'up' && s.chewron_up} ${sortConnect == '' && s.chewron_hidden}`}>
                            <IconChewron />
                        </div>
                    </div>
                    <div onClick={handleSortStep} className={`${s.step} ${load && s.disabled}`}>
                        <p>Шаг</p>
                        <div className={`${s.chewron} ${sortStep == 'up' && s.chewron_up} ${sortStep == '' && s.chewron_hidden}`}>
                            <IconChewron />
                        </div>
                    </div>
                    <div className={s.comment}>
                        <p>Комментарий</p>
                    </div>
                    <div className={s.favorite}></div>
                </div>
                <ul ref={listRef} className={s.list}>
                    {sortClients.slice(0, endCursor).map(el => {
                        return <ClientItem key={el.id} id={el.id} client={el} clients={clients} activeTab={activeTab} activeTabList={activeTabList} />
                    })}
                </ul>
            </div>

            <button onClick={handleScrollTop} className={`${s.button_scroll} ${endCursor > 55 && s.button_scroll_vis}`}><IconTop /></button>
        </>

    )
};

export default ClientsTable;