import React, { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

export const FormContext = createContext({});

function Form({children, onSubmit, initValues = {}, validate = () => ({})}) {

    const [values, setValues] = useState(initValues);
    const [errors, setErrors] = useState({});

     useEffect(() => {
         setValues(initValues);
         setErrors({});
       }, [initValues]);		//부모 컴포넌트가 initValue를 바꿔서 랜더링하면 자동으로 새로고침되게


    const handleSubmit = useCallback((e) => {
        e.preventDefault();//새로고침 하지 않겠다
        if (Object.values(errors).length === 0 && onSubmit) {
            onSubmit(values);
          }       
    },[errors, onSubmit, values]);

    const handleChange = useCallback((name, updateValue)=> {
        setValues(prev => ({
            ...prev,
            [name]: updateValue,
        }))
    },[]);

    const reset = useCallback((e)=>{
        setValues({});
    },[]);

    return(
        <FormContext.Provider value={{ values, errors, onChange: handleChange, reset }}>
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;