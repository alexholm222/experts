import { useState, useEffect } from 'react';
import '../BookEvents/BookEvents.scss';
import Validator from '../../../../../utils/Validator';

function BookInput({addInput, removeInput, id, numberInput }) {
    const [buttonState, setButtonState] = useState(true);
    const [value, setValue] = useState('');
    const validator = Validator();
    const nameID= `${id}`;
  

    function handleAddInput() {
        addInput();
        setButtonState(false);
    }


    function handleRemoveInput() {
      removeInput(id);
      setButtonState(true);
      setValue('');
  }

    function handleChangeValue(e) {
      setValue(e.target.value);
    }

    return (
    <div className='bookevent__container_input' id={id}>

        <input id="input-name"  type='text' form='book' className='bookevent__input' placeholder='ФИО, номер телефона' pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" value={validator.values.nameID || ''} onChange={validator.handleChange} name={nameID} required ></input>
        <div id={id} onClick={() => buttonState ? handleAddInput() : handleRemoveInput()} 
             className='bookevent__button_add' 
             style={{display: numberInput[numberInput.length - 1].id === id  && numberInput.length > 2 ? 'none' : ''}}>

        {buttonState ?
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
    )
};

export default BookInput;