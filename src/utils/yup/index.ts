import * as yup from 'yup';
import { IFormData } from '../../types/types';

export const ValidationSchema = yup.object<IFormData>().shape({
  name: yup
    .string()
    .required('Name is required')
    .test(
      'is-capitalized',
      'Name must start with a capital letter',
      (value) => !!value && value.charAt(0) === value.charAt(0).toUpperCase(),
    ),
  age: yup
    .number()
    .required('Age is required')
    .test('non-negative', 'Age must be non-negative', (value) => value >= 0)
    .test('is required', 'Age is required', (value) => value !== 0),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Other'], 'Please select a gender')
    .required('Gender is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  country: yup.string().required('Country is required'),
  picture: yup
    .string()
    .required('A picture is required')
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (!value) return true;
      const mimeType = value.split(';')[0].split(':')[1];
      return ['image/jpeg', 'image/png'].includes(mimeType);
    })
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true;
      const fileSize = (value.length * 3) / 4 - (value.indexOf('=') > -1 ? 1 : 0);
      return fileSize <= 400 * 1024;
    }),
});
