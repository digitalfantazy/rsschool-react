import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import CountryInput from '../Inputs/CountryInput';
import PictureInput from '../Inputs/PictureInput';

import { useActions } from '../../../hooks/useActions';
import { IError } from '../../../types/types';
import { ValidationSchema } from '../../../utils/yup';

import styles from '../Forms.module.css';
import CheckBox from '../Inputs/CheckBox';

const UnControlledForm: React.FC = () => {
  const [base64Picture, setBase64Picture] = useState<string>('');
  const [errors, setErrors] = useState<IError>();
  const navigate = useNavigate();
  console.log(errors);

  const { addData } = useActions();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value ? parseInt(ageRef.current.value) : 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '!',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value as 'Male' | 'Female' | 'Other',
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value || '',
      picture: base64Picture || '',
    };

    try {
      await ValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      addData(formData);
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <Link to={'/'} className={styles.back}>
            Back
          </Link>
        </div>
        <div className={styles.header}>
          <h1>UnControlled Form</h1>
          <hr />
        </div>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              type="text"
              ref={nameRef}
              placeholder="Enter your name"
              className="formGroup"
              error={errors?.name}
            />
            <Input
              id="age"
              type="number"
              ref={ageRef}
              placeholder="Your age"
              className="formGroup"
              error={errors?.age}
            />
            <Input
              id="email"
              type="email"
              ref={emailRef}
              placeholder="Your email"
              className="formGroup"
              error={errors?.email}
            />
            <Input
              id="password"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="formGroup"
              error={errors?.password}
            />
            <Input
              id="confirm your password"
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm your password"
              className="formGroup"
              error={errors?.confirmPassword}
            />
            <SelectInput
              id="gender"
              ref={genderRef}
              className="formGroup"
              values={['Male', 'Female', 'Other']}
              error={errors?.gender}
            />
            <CountryInput
              id="country"
              ref={countryRef}
              className="formGroup"
              type="text"
              placeholder="Enter your country"
              error={errors?.country}
            />
            <PictureInput
              id="picture"
              type="file"
              ref={pictureRef}
              onFileChange={setBase64Picture}
              error={errors?.picture}
            />
            <CheckBox
              id="terms"
              ref={termsRef}
              error={errors?.terms}
              type="checkbox"
              title="Accept Terms and Conditions"
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UnControlledForm;
