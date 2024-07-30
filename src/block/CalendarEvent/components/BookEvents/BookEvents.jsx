import { useState, useRef, useEffect, useLayoutEffect, ReactDOM} from 'react';
import './BookEvents.scss';
import { sendBookCalendarEvent, getCalendarPaymentForm } from '../../Api/index';
import { getLkCalendarEvent } from '../../Api/index';
import Validator from '../../utils/Validator';
import { dateTextFormat } from '../../utils/setDateFormat';


function BookEvents({ premium, dataEvent, hideModal, cookies }) {
    const [inputCount, setInputCount] = useState(1);
    const [status, setStatus] = useState('');
    const [payForm, setPayForm] = useState('');
    const [buttonActive, setButtonActive] = useState(false);
    const [price, setPrice] = useState(dataEvent.preprice)
   
    const validator = Validator();
    const formRef = useRef(null);
    

    useEffect(() => {
      if(inputCount == 1) {
       delete validator.values['second'];
       delete validator.errors['second'];
      } else if (inputCount == 2) {
        delete validator.values['third'];
       delete validator.errors['third'];
      }
    },[inputCount]);

    useEffect(() => {
      const arrValues = Object.values(validator?.values)
      if(arrValues.length > 0 && arrValues.every(el => el.length > 8)) {
        setButtonActive(true)
      } else {
        setButtonActive(false)
      }
    },[validator.values, inputCount]);

    useEffect(() => {
      if(inputCount === 2 && validator.values.second === undefined) {
        return setButtonActive(false);
      }

      if(inputCount === 3 && validator.values.third === undefined) {
        return setButtonActive(false);
      }
    },[inputCount])
   
    function addInput() {
      inputCount < 3 &&
      setInputCount(inputCount+1);
      setPrice(Number(price) + Number(dataEvent.preprice));

      if(inputCount === 1) {
        getCalendarPaymentForm(cookies.partnership_token, dataEvent.id, 2).then(res => setPayForm(res.data.payment.form))

      } else if(inputCount === 2) {
        getCalendarPaymentForm(cookies.partnership_token, dataEvent.id, 3).then(res => setPayForm(res.data.payment.form))
      }
    }

    function removeInput() {
      inputCount > 0 &&
      setInputCount(inputCount-1);
      setPrice(Number(price) - Number(dataEvent.preprice));

      if(inputCount == 2) {
        getCalendarPaymentForm(cookies.partnership_token, dataEvent.id, 1).then(res => setPayForm(res.data.payment.form))
      
      } else if(inputCount == 3) { 

        getCalendarPaymentForm(cookies.partnership_token, dataEvent.id, 2).then(res => setPayForm(res.data.payment.form))
      }
    }
    
    useLayoutEffect(() => {
      getCalendarPaymentForm(cookies.partnership_token, dataEvent.id, 1).then(res => {setPayForm(res.data.payment.form)
    })
    },[]);

    
    function sendBookData() {

      const bookList = Object.values(validator.values);
      const personList = [];

        bookList.map((el, i) => {
          personList.push(`persons[]=${el}`) 
        })
        
        sendBookCalendarEvent(cookies.partnership_token, dataEvent.id, personList.join('&'))
          .then()
          .catch(err => console.log(err))
    }

    const fetchEventInfo = async timeId => {
      try {
        const { data } = await getLkCalendarEvent(dataEvent.id, cookies.partnership_token);
        console.log(data)
        if (data?.event?.book?.status == 'reserved') {
          setStatus('reserved');
          clearInterval(timeId);
        }
      } catch (e) {
        console.log(e);
      }
    };

    function handleStatus() {
      sendBookData();
      updateDate();

      setTimeout(() => {
          setStatus('waiting')
      }, '10');
    }
  
    const updateDate = () => {
      let timeId = setInterval(() => {
        fetchEventInfo(timeId);
      }, 5000);
    };
 
    return (
        <div 
             className={`bookevent ${premium == 1 ? 'cat_1' :
                                     premium == 2 ? 'cat_2' :
                                     premium == 3 ? 'cat_3' :
                                     premium == 4 ? 'cat_4' :
                                     premium == 5 ? 'cat_5' : ''}`}
        >
        {status == '' &&

          <div className='bookevent__main'>
            <div className='bookevent__container_1'>
              <h2 className='bookevent__title'>Бронирование мест</h2>
              <p className='bookevent__description'>{`С ${dateTextFormat(dataEvent.date_end_preprice)} стоимость — ${dataEvent.price} ₽`}</p>

              <div ref={formRef} style={{display: 'none'}} dangerouslySetInnerHTML={{__html: payForm}}/>

              <form name='bookForm' id='book' className='bookevent__form'>
                
                
                  <div className='bookevent__container_input'>

                    <input id="input-name"  type='text' form='book' className='bookevent__input' placeholder='ФИО, номер телефона' pattern="^([a-zA-Z0-9_\-\.]{8,})$" value={validator.values.first || ''} onChange={validator.handleChange} name='first' required ></input>
                     <div   onClick={ inputCount > 1 && inputCount !== 3 ? removeInput : !buttonActive  ? null : addInput} 
                     className={`bookevent__button_add ${inputCount > 2 || !buttonActive ? 'bookevent__button_disabled' : ''}`} 
                     >

                     {inputCount <= 1 ?
                       <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M31 24.998H25V30.998H23V24.998H17V22.998H23V16.998H25V22.998H31V24.998Z" fill="#8E9AA8" fill-opacity="0.4"/>
                         <rect x="0.5" y="0.5" width="49" height="47" rx="3.5" stroke="#8E9AA8" stroke-opacity="0.4"/>
                       </svg> 
                                     :
                       <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M31 24.998H17V22.998H31V24.998Z" fill="#8E9AA8" fill-opacity="0.4"/>
                          <rect x="0.5" y="0.5" width="49" height="47" rx="3.5" stroke="#8E9AA8" stroke-opacity="0.4"/>
                       </svg>
                     }   
                    </div>
                 </div>

                {inputCount >= 2 &&
                  <div className='bookevent__container_input'>

                    <input  id="input-second"  type='text' form='book' className='bookevent__input' placeholder='ФИО, номер телефона' pattern="^([a-zA-Z0-9_\-\.]{8,})$" value={(inputCount < 2 ? validator.values.second = '' : validator.values.second) || ''} onChange={validator.handleChange} name='second' required ></input>
                     <div onClick={ inputCount > 2 ? removeInput : !buttonActive ? null : addInput}
                       className='bookevent__button_add' 
                     >

                     {inputCount <= 2 ?
                       <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M31 24.998H25V30.998H23V24.998H17V22.998H23V16.998H25V22.998H31V24.998Z" fill="#8E9AA8" fill-opacity="0.4"/>
                         <rect x="0.5" y="0.5" width="49" height="47" rx="3.5" stroke="#8E9AA8" stroke-opacity="0.4"/>
                       </svg> 
                                     :
                       <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M31 24.998H17V22.998H31V24.998Z" fill="#8E9AA8" fill-opacity="0.4"/>
                          <rect x="0.5" y="0.5" width="49" height="47" rx="3.5" stroke="#8E9AA8" stroke-opacity="0.4"/>
                       </svg>
                     }   
                    </div>
                  </div>}

                  {inputCount >= 3 &&
                  <div className='bookevent__container_input'>

                    <input  id="input-second"  type='text' form='book' className='bookevent__input' placeholder='ФИО, номер телефона' pattern="^([a-zA-Z0-9_\-\.]{8,})$" value={(inputCount < 3 ? validator.values.third = '' : validator.values.third) || ''} onChange={validator.handleChange} name='third' required ></input>
                     <div onClick={ inputCount > 3 ? removeInput : addInput}
                       className='bookevent__button_add' 
                       style={{display: inputCount === 3 ? 'none' : ''}}
                     >

                     {inputCount <= 3 ?
                       <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M31 24.998H25V30.998H23V24.998H17V22.998H23V16.998H25V22.998H31V24.998Z" fill="#8E9AA8" fill-opacity="0.4"/>
                         <rect x="0.5" y="0.5" width="49" height="47" rx="3.5" stroke="#8E9AA8" stroke-opacity="0.4"/>
                       </svg> 
                                     :
                       <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M31 24.998H17V22.998H31V24.998Z" fill="#8E9AA8" fill-opacity="0.4"/>
                          <rect x="0.5" y="0.5" width="49" height="47" rx="3.5" stroke="#8E9AA8" stroke-opacity="0.4"/>
                       </svg>
                     }   
                    </div>
                 </div>} 
               
              </form>
            </div>
            <div className='bookevent__container_2'>
              <p className='bookevent__price'>{`${price} ₽`}</p>

              {buttonActive && 
                <button type="submit" onClick={() => {handleStatus()}} form='bookPaymentForm' className='bookevent__button'>Оплатить
                 
                  <span className='bookevent__arrow'>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1490_83183)">
                        <path d="M8.5 0L7.09 1.41L12.67 7H0.5V9H12.67L7.09 14.59L8.5 16L16.5 8L8.5 0Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1490_83183">
                        <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                  </span>
                </button>
              }

              {!buttonActive && 
                <button type="submit" disabled form='bookPaymentForm' className='bookevent__button'>Оплатить
                 
                  <span className='bookevent__arrow'>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1490_83183)">
                        <path d="M8.5 0L7.09 1.41L12.67 7H0.5V9H12.67L7.09 14.59L8.5 16L16.5 8L8.5 0Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1490_83183">
                        <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                  </span>
                </button>
              }
              
              <p className='bookevent__places'>{`Свободно ${dataEvent.av_members} из ${dataEvent.total_members} мест`}</p>
            </div>
          </div>
        }

        {status == 'waiting' &&
          <div className='bookevent__waiting'>
            <h2 className='bookevent__title bookevent__title_waiting'><span className='bookevent__icon_time'></span>Идет процесс оплаты</h2>
            <p className='bookevent__description'>Подождите, пожалуйста</p>
          </div>
        }

        {status == 'reserved' && 
          <div className='bookevent__container_success'>
            <div className='bookevent__success'>
              <h2 className='bookevent__title bookevent__title_success'><span className='bookevent__icon_success'></span>Оплата прошла успешно!</h2>
              <p className='bookevent__description'>Будем ждать вас на мероприятии. За день до мероприятия вам поступит уведомление</p>
            </div>
            <button onClick={hideModal} className='bookevent__button'>Другие события</button>
          </div>  
        }

        {status == 'error' && 
          <div className='bookevent__container_success'>
            <div className='bookevent__error'>
              <h2 className='bookevent__title bookevent__title_error'><span className='bookevent__icon_error'></span>Ошибка!</h2>
              <p className='bookevent__description'>Не удалось получить информацию об оплате</p>
            </div>
            <button className='bookevent__button'>Попробовать снова</button>
          </div>  
        }

        
        </div>
    )
}

export default BookEvents;