import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignIn = () => {
  const { signIn, resetPassword, loading, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const loact = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = loact?.state?.from?.pathname || "/";

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password, data.rememberMe);
      const userName = result?.user?.displayName || "User";
      swal(`Welcome, ${userName}!`, "Successfully SignIn", "success");
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage =
        error.code === "auth/invalid-credential"
          ? "ইমেল অথবা পাসওয়ার্ড সঠিক নয়!"
          : "লগইন করতে সমস্যা হচ্ছে, আবার চেষ্টা করুন।";
      swal("Error", errorMessage, "error");
    }
  };
  // show password function
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
 //Password Reset
  const handleResetPassword = async () => {
    const email = getValues("email"); // react-hook-form এর watch ব্যবহার করে ইমেইল নিন
    if (!email) {
      return swal("Error", "অনুগ্রহ করে আগে ইমেল প্রদান করুন", "error");
    }

    try {
      await resetPassword(email);
      swal(
        "ইমেল চেক করুন",
        "পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেলে পাঠানো হয়েছে।",
        "success",
      );
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  // GOOGLE SIGNUP
  const signUpWithGoogle = async () => {
    try {
      const res = await signInWithGoogle();
      const user = res.user;
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        role: "user",
        method: "google",
      };

      // ১. আগে চেক করুন ইউজার ডাটাবেজে আছে কি না
      try {
        const response = await axiosPublic.get(`/users/${user?.email}`);

        // যদি ইউজার আগে থেকেই থাকে (Data found)
        if (response.data) {
          swal("SUCCESS!", "You have successfully logged in.", "success");
          navigate("/");
          return;
        }
      } catch (err) {
        // যদি ইউজার না পাওয়া যায় (404 error), তারমানে নতুন ইউজার।
        // তখন আমরা পোস্ট করবো।
        if (err.response && err.response.status === 404) {
          await axiosPublic.post(`/google/user`, userInfo);
          swal("SUCCESS!", "Your account has been created", "success");
        }
      }

      navigate("/");
    } catch (err) {
      console.error("Google Sign Up Error:", err);
      swal("Error", "Google sign-up problem", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 m-5 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          আপনার অ্যাকাউন্টে লগইন করুন
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          অথবা{" "}
          <Link
            to="/signup"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেল অ্যাড্রেস
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "ইমেল প্রয়োজন" })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="example@mail.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "পাসওয়ার্ড প্রয়োজন" })}
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="PassWord"
                />
                {/* password show Hide */}
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me" // id যোগ করা হয়েছে
                  type="checkbox"
                  {...register("rememberMe")} // register করা হলো
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 cursor-pointer select-none"
                >
                  মনে রাখুন
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="font-medium cursor-pointer text-orange-600 hover:text-orange-500"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
            >
              {loading ? <BeatLoader color="#fff" size={8} /> : "SignIn"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  অথবা এটি দিয়ে চালিয়ে যান
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={signUpWithGoogle}
                className="w-full inline-flex cursor-pointer justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                />
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
