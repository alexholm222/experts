import { memo } from 'react';
import s from './assistant.module.scss';

const Assistant = memo(({ lead, lead_position, lead_photo }) => {

	return (
		<div className={s.assistant}>
			{lead_photo && <img className={s.img} src={lead_photo} alt='' />}

			<div className={s.info}>
				<div className={s.name}>{lead}</div>
				<div className={s.prof}>{lead_position}</div>
			</div>
		</div>
	);
});

export default Assistant;
