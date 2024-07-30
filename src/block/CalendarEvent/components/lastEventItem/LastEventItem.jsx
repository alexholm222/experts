import s from './lastEventItem.module.scss';
import { setDateFormat } from '../setDateFormat';
import Fancybox from '../../../../utils/Fancybox';

const LastEventItem = ({ date, name, city, photo, photos, descr }) => {
	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};
	const dateEvent = setDateFormat(date);
	
	return (
		<div className={s.lastEventItem}>
			<a className="images-block__photo" data-fancybox={`${name}-${dateEvent}`} href={photo} style={{pointerEvents: photos.length > 0 ? '' :'none'}}>
			<div className={`${s.img} ${s.img_1}`}>
				<div className={s.overlay}></div>
				<img src={photo} alt='' />
			</div>
			
			<div className={`${s.img} ${s.img_2}`}>
			<div className={s.overlay}></div>
				<img src={photo} alt='' />
			</div>

			<div className={`${s.img} ${s.img_3}`}>
			<div className={s.overlay}></div>
				<img src={photo} alt='' />
			</div>

	        <div className={s.content}>
              <div className={s.container}>
				<div>
					<p>{city}</p>
					<p>{dateEvent}</p>
				</div>
				<h4>{name}</h4>
			  </div>
			 {photos.length > 0 && 
			   <Fancybox width={430} height={430} autoSize={false} minWidth={800}> 
			      
			        <button className={s.button}>Смотреть фото</button> 
                 
				  {photos.map((item, index) => (
					<a className="images-block__photo" style={{display: 'none'}} data-fancybox={`${name}-${dateEvent}`} href={item} key={index}></a>
				  ))}
				  
			    </Fancybox>
			  }
			  
			  
			</div>
			</a>
		</div>
	);
};

export default LastEventItem;
