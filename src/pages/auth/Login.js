import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomButton from '../../components/common/CustomButton';
import { login } from '../../services/auth';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values);
         if (response.token) {
          toast.success('Login successful!', {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
          });
          navigate('/');
        }
      } catch (error) {
        toast.error(error.message || 'Login failed. Please try again.', {
          position: "top-right",
          closeOnClick: true,
        });
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <CustomButton
              type="submit"
              text="Sign in"
              width="w-full"
              bgColor="bg-blue-600"
              textColor="text-white"
              padding="px-4 py-2"
              className="hover:bg-blue-700"
            />
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
