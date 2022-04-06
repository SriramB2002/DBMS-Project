import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Reducers/UserReducer";
import { useSelector } from "react-redux";
import { loadState } from "../LocalStorage/GetLocal";
import { saveState } from "../LocalStorage/SaveLocal";
const useForm = (callback, validate) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>(state.userReducer.value));
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    saveState('user',user);
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  const handleChange = event => {
    event.persist();
    // dispatch(login())
    // console.log(user);
    const data = {...user};
    const newdata = {
      ...data,
      [event.target.name]: event.target.value
    };
    dispatch(login(newdata));
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};
export default useForm;
