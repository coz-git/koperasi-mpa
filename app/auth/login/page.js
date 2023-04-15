'use client';
import React from 'react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Loading from '../../../components/Loading';
import { Toast } from 'primereact/toast';

const Login = () => {
  const email = useRef('');
  const password = useRef('');
  const toast = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const result = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/',
    });

    console.log(result);

    if (result.status == 401) {
      toast.current.show({
        severity: 'error',
        summary: 'Something Wrong',
        detail: result.error,
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Toast ref={toast} />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Koperasi MPA
            </p>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      onChange={(e) => (email.current = e.target.value)}
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <label
                    className="font-medium block mt-6 text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      <label
                        className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                        htmlFor="toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'hide' : 'show'}
                      </label>
                    </div>
                    <input
                      onChange={(e) => (password.current = e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href="/auth/forgotPassword"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
