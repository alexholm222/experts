import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLkCalendarEvent } from '../../Api';
import { selectLkCalendar } from '../../store/reducer/lk/calendar/selector.js';
import { setAddModal } from '../../store/reducer/lk/calendar/slice.js';
import Assistant from '../assistant/Assistant.jsx';
import s from './modal.module.scss';
import BookEvents from '../BookEvents/BookEvents';

const Modal = () => {
	const [width, setWidth] = useState(window?.innerWidth);
	const [IsBookEvent, setIsBookEvent] = useState(false);
	const [scheduleID, setScheduleID] = useState(0);

	const { isModal, id, premium } = useSelector(selectLkCalendar);
	const modalRef = useRef(null);
	const overlayRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		
		getLkCalendarEvent(id)
		.then(res => {
			console.log(res);
			setScheduleID(res)
		})
		.catch(err => console.log(err));
	}, [id])




	useEffect(() => {
		const cb = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener('resize', cb);
		window.scroll(0, 0);

		return () => window.removeEventListener('resize', cb);
	}, []);

	useEffect(() => {
		const handleClickBody = e => {
			const path = e.path || (e.composedPath && e.composedPath());

			if (
				path.includes(overlayRef.current) &&
				!path.includes(modalRef.current)
			) {
				hideModal();
			}
		};

		document.body.addEventListener('click', handleClickBody);

		return () => document.body.removeEventListener('click', handleClickBody);
	}, []);

	const hideModal = () => {
		dispatch(setAddModal(false));
		document.body.style.overflow = '';
		document.body.removeAttribute('style');
		setIsBookEvent(false)
	};

	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};

	const date = new Date(scheduleID?.data?.event?.date);
	const dateFormat = date.toLocaleDateString('ru-RU', options);

	function linkify(text) {
		var urlRegex =
			/(\b(https?|http?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

		return text?.replace(urlRegex, '');
	}

	const urlRegex =
		/(\b(https?|http?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
	const urlText = scheduleID?.data?.event?.description?.match(urlRegex);

	return (
		<div
			ref={overlayRef}
			className={cn(s.overlay, {
				[s.overlay_active]: isModal,
			})}
		>
			<div ref={modalRef} className={s.modal}>
				<button onClick={hideModal} className={s.close}>
					{width > /* 575 */970 ? (
						<img src='/static_calendar/lk/iconCloseWhite.svg' alt='закрыть' />
					) : (
						<img src='/static_calendar/lk/iconClose.svg' alt='закрыть' />
					)}
				</button>
                {IsBookEvent ? <BookEvents premium={premium} dataEvent={scheduleID?.data?.event} hideModal={hideModal} cookies={''}/> : 
				<div
					className={cn(s.content, {
						[s.cat_1]: premium == 1,
						[s.cat_2]: premium == 2,
						[s.cat_3]: premium == 3,
						[s.cat_4]: premium == 4,
						[s.cat_5]: premium == 5,
						[s.cat_6]: scheduleID?.data?.event?.is_expired,
					})}
				>
				  <div className={s.container}>	
					<div className={s.top}>
						<span className={s.date}>
							{scheduleID?.data?.event.is_expired
								? 'Событие завершено'
								: dateFormat && dateFormat}
						</span>
						<span className={s.city}>
							{!scheduleID?.data?.event?.is_online
								? scheduleID?.data?.event?.city
								: 'Онлайн'}
						</span>
					</div>

					<h2 className={s.title}>{scheduleID?.data?.event?.name}</h2>

					<h5
						style={{
							color: scheduleID?.data?.event?.is_expired
								? '#ADBFDF'
								: scheduleID?.data?.event?.cat_color,
						}}
						className={s.subtitle}
					>
						{scheduleID?.data?.event?.cat_name}
					</h5>

					<p className={s.descr}>
						{linkify(scheduleID?.data?.event?.description)}
					</p>

					<a href={urlText} target='_blank' className={s.url}>
						{urlText}
					</a>

					<Assistant
						lead={scheduleID?.data?.event?.lead}
						lead_position={scheduleID?.data?.event?.lead_position}
						lead_photo={scheduleID?.data?.event?.lead_photo}
					/>
                  </div>
				

					
				</div>}
				
				<img className={s.img} src={scheduleID?.data?.event?.photo} alt='' />

				{premium == '4' && (
					<div className={s.vip}>
						<span>Только для VIP</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
