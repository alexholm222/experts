import cn from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAddType } from '../../store/reducer/lk/calendar/slice';
import s from './eventButtons.module.scss';

const EventButtons = () => {
	const [activeTab, setActiveTab] = useState(0);

	const tab = ['Все события', 'Онлайн', 'Оффлайн'];

	const dispatch = useDispatch();

	const handleClick = index => {
		if (index === 0) {
			dispatch(setAddType('all'));
		}

		if (index === 1) {
			dispatch(setAddType('online'));
		}

		if (index === 2) {
			dispatch(setAddType('offline'));
		}

		setActiveTab(index);
	};

	return (
		<div className={s.eventButtons}>
			<div className={s.tabs}>
				{tab.map((item, i) => {
					return (
						<button
							onClick={() => handleClick(i)}
							key={item}
							className={cn(s.tab, {
								[s.active_tab]: i === activeTab,
							})}
						>
							{item}
							<span
								className={cn(s.line_tab, {
									[s.active_line_tab]: i === activeTab,
								})}
							></span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default EventButtons;
