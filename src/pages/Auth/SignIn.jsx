import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignIn = () => {
   // show password function
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 m-5 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          আপনার অ্যাকাউন্টে লগইন করুন
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          অথবা{' '}
          <Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium text-gray-700">ইমেল অ্যাড্রেস</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="example@mail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
              <div className="mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="PassWord"
                />
                {/* password show Hide */}
                <span className="relative w-[30px] text-xl flex justify-end -top-7 left-[90%] ">
                    {showPassword ? (
                        <FaEye
                            className="hover:cursor-pointer text-gray-400"
                            onClick={handleShowPassword}
                        />
                    ) : (
                        <FaEyeSlash
                            className="hover:cursor-pointer text-gray-400"
                            onClick={handleShowPassword}
                        />
                    )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">মনে রাখুন</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">পাসওয়ার্ড ভুলে গেছেন?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              সাইন ইন
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">অথবা এটি দিয়ে চালিয়ে যান</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
                Google দিয়ে সাইন ইন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;