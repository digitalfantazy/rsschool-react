import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../Forms.module.css';
import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import CountryInput from '../Inputs/CountryInput';
import PictureInput from '../Inputs/PictureInput';
import CheckBox from '../Inputs/CheckBox';
import { IFormData } from '../../../types/types';
import { useActions } from '../../../hooks/useActions';
import { ValidationSchema } from '../../../utils/yup';

const ControlledForm: React.FC = () => {
  const [base64Picture, setBase64Picture] = useState<string>('');
  const navigate = useNavigate();
  const { addData } = useActions();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(ValidationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: IFormData) => {
    addData({ ...data, picture: base64Picture });
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div>
        <Link to={'/'} className={styles.back}>
          Back
        </Link>
      </div>
      <div className={styles.header}>
        <h1>Controlled Form</h1>
        <hr />
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="formGroup"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="age"
            type="number"
            placeholder="Your age"
            className="formGroup"
            error={errors.age?.message}
            {...register('age')}
          />
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            className="formGroup"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="formGroup"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="formGroup"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <SelectInput
            id="gender"
            className="formGroup"
            values={['Male', 'Female', 'Other']}
            error={errors.gender?.message}
            {...register('gender')}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountryInput
                id="country"
                type="text"
                className="formGroup"
                placeholder="Enter your country"
                error={errors.country?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <PictureInput
                id="picture"
                type="file"
                onFileChange={(base64) => {
                  setBase64Picture(base64);
                  field.onChange(base64);
                }}
                error={errors.picture?.message}
              />
            )}
          />
          <CheckBox
            id="terms"
            type="checkbox"
            title="Accept Terms and Conditions"
            error={errors.terms?.message}
            {...register('terms')}
          />
          <button
            type="submit"
            className={`${styles.submitButton} ${isValid ? styles.disabledButton : ''}`}
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ControlledForm;
