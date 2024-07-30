import cn from 'classnames';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import {
	setAddId,
	setAddModal,
	setAddPremium,
} from '../../store/reducer/lk/calendar/slice';

import s from './scheduleItem.module.scss';

const ScheduleItem = memo(
	({ is_expired, day, event, name, city, date, component, is_online, cat_id, id }) => {
		const dispatch = useDispatch();

		const options = {
			day: 'numeric',
			month: 'long',
		};

		const eventsDate = new Date(date);
		const dateFormat = eventsDate.toLocaleDateString('ru-RU', options);


		const showModal = () => {
			if (event || cat_id) {
				dispatch(setAddModal(true));
				dispatch(setAddId(event?.id || id));
				dispatch(setAddPremium(event?.cat_id || cat_id));
				document.body.style.overflow = 'hidden';
			}
		};

		return (
			<div
				onClick={showModal}
				className={cn(s.scheduleItem, {
					[s.cat_1]: event?.cat_id == 1 || cat_id == 1,
					[s.cat_2]: (event?.cat_id == 2) | (cat_id == 2),
					[s.cat_3]: (event?.cat_id == 3) | (cat_id == 3),
					[s.cat_4]: (event?.cat_id == 4) | (cat_id == 4),
					[s.cat_5]: (event?.cat_id == 5) | (cat_id == 5),
					[s.cat_6]: is_expired,
				})}
			>
				<div className={s.top}>
					<span
						className={cn(s.date, {
							[s.date_event]: component === 'nextEvents',
						})}
					>
						{component === 'nextEvents' ? dateFormat : day}
					</span>
					{<span className={s.city}>{ (!event?.is_online && !is_online) ? (event?.city || city) : 'Онлайн ' }</span>}
				</div>

				{<p className={s.descr}>{event?.name || name}</p>}
			</div>
		);
	}
);
export default ScheduleItem;
