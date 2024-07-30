import { useSelector } from 'react-redux';
import { selectLkCalendar } from '../../store/reducer/lk/calendar/selector';

const Title = () => {
	const { currentMonth } = useSelector(selectLkCalendar);

	const currentYear = new Date().getUTCFullYear()

	return (
		<h2>
			Расписание событий – {currentMonth} {currentYear}
		</h2>
	);
};

export default Title;
