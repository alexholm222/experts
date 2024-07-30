import { getLkCalendarLastEvents } from '../../Api/index';
import LastEventItem from '../lastEventItem/LastEventItem';
import s from './lastEvents.module.scss';
import { useState, useEffect } from 'react';
import { regMobile } from '../regMobile';

const LastEvents = () => {

	const [isCards, setIsCards] = useState(0);
	const [isLoadCards, setIsLoadCards] = useState(0);
	const [isLoadButton, setIsLoadButton] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		getLkCalendarLastEvents()
			.then(res => {
				console.log(res);
				setData(res.data.events)
			})
			.catch(err => console.log(err))
	}, [])



	useEffect(() => {
		handleWidthWindow();
		if (!regMobile) {
			window.addEventListener('resize', () => {
				setTimeout(() => {
					handleWidthWindow()
				}, 200)
			});
		}
	}, []);


	useEffect(() => {
		if (data?.filter(item => item.photo !== '').length > isCards) {
			setIsLoadButton(true)
		} else {
			setIsLoadButton(false)
		}
	}, [data, isCards]);

	function handleWidthWindow() {
		const width = window.innerWidth;
		if (width > 1850) {
			setIsCards(12);
			setIsLoadCards(4);
			return
		}
		if (width > 1460) {
			setIsCards(9);
			setIsLoadCards(3);
			return
		}
		if (width > 1060) {
			setIsCards(6);
			setIsLoadCards(2);
			return
		}
		if (width < 1060) {
			setIsCards(3);
			setIsLoadCards(2);
			return
		}
	}

	function handleLoadCards() {
		setIsCards(isCards + isLoadCards)
	}



	return (
		<div className={s.lastEvents}>
			<div className={s.table}>
				{data?.filter(item => item.photo !== '')
					.map((item, index) => {
						if (index < isCards) {
							return <LastEventItem key={item.id} {...item} />
						}
					}
					)}
				{isLoadButton && <button onClick={handleLoadCards} className={s.button}>Загрузить другие события<span>
					<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.843146 0.343133V2.33717L8.74153 2.34425L0.136039 10.9497L1.55025 12.3639L10.1557 3.75846L10.1628 11.6568H12.1569V0.343133H0.843146Z" fill="#002CFB" />
					</svg>
				</span></button>}
			</div>
		</div>
	);
};

export default LastEvents;
