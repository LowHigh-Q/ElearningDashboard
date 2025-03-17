import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const RegisterForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={RegisterFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="register-form">
          <h2>Create a new account</h2>
          
          <div className="form-group">
            <label htmlFor="fullName">
              <FaUser /> Full Name
            </label>
            <Field type="text" id="fullName" name="fullName" className="form-control" />
            <ErrorMessage name="fullName" component="div" className="form-error" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <Field type="email" id="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="form-error" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Password
            </label>
            <Field type="password" id="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="form-error" />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock /> Confirm Password
            </label>
            <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" className="form-error" />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;