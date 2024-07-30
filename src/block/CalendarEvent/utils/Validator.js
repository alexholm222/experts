import { useState, useCallback } from "react";

function Validator() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isErrorStyle, setIsErrorStyle] = useState({});
     
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
  
      setValues({...values, [name]: value});
      
      setErrors({...errors, [name]: `${target.value === '' ? 'Заполните поле' : target.checkValidity() ? '' :  target.closest('.bookevent__input') ? 'Не' : ''}`});
      
    
     setIsValid(target.closest("form").checkValidity());
       
        
      
      setIsErrorStyle({...isErrorStyle, [name]: target.checkValidity()})
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );

  
    return { values, handleChange, errors, isValid, resetForm, setValues, isErrorStyle};
  }

  export default Validator