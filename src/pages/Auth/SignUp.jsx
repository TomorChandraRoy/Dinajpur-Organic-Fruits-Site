import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPublic from "../../hooks/axiosPublic";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { BeatLoader } from "react-spinners";

const SignUp = () => {

  const {signUp,updateUserProfile,setUser,signInWithGoogle,loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();


  // Password Visibility Toggle
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // react-hook-form setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // Manual Email/Password Sign Up
  const onSubmit = async (data) => {
    try {
      //await signUp( data.email, data.password);
      const result = await signUp(data.email, data.password);
      if (updateUserProfile) {
            await updateUserProfile({
              displayName: data.name,
              photoURL: ""
            });
        }
      // Save User Data to MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "user",
        method: "email password"
      };
      await axiosPublic.post("/userdata", userInfo);

      if (setUser) {
        setUser({ ...result.user, displayName: data.name });
      }
      reset();
      swal("SUCCESS!", "Your account has been created", "success");
      navigate("/");
    }
    catch (error) {
      const errorMessage = error.code === "auth/email-already-in-use"
        ? "This email is already registered!"
        : error.message;
      swal("Error", errorMessage, "error");
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
              method: "google"
          };

          // ১. আগে চেক করুন ইউজার ডাটাবেজে আছে কি না
          // আমরা try-catch এর ভেতরেই চেক করবো অথবা backend এ 'upsert' মেথড ব্যবহার করবো
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
      }
      catch (err) {
          console.error("Google Sign Up Error:", err);
          swal("Error", "Google sign-up problem", "error");
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">নতুন অ্যাকাউন্ট খুলুন</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ইতিমধ্যেই অ্যাকাউন্ট আছে?{' '}
          <Link to="/signin" className="font-medium text-orange-600 hover:text-orange-500">লগইন করুন</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">পুরো নাম</label>
              <input
                {...register("name", { required: "নাম প্রদান করা বাধ্যতামূলক" })}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="রিপন রায়"
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">ইমেল</label>
              <input
                type="email"
                {...register("email", { required: "ইমেল প্রয়োজন" })}
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="ripon@example.com"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password", {
                    required: "পাসওয়ার্ড প্রয়োজন",
                    minLength: { value: 6, message: "কমপক্ষে ৬ ডিজিট দিন" },
                    maxLength: { value: 20, message: "২০ ডিজিটের বেশি নয়" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
                      message: "বড় ও ছোট হাত, সংখ্যা এবং স্পেশাল চিহ্ন দিন"
                    }
                  })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="••••••••"
                />

                {/* Toggle Icon */}
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input type="checkbox" required className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">আমি সব শর্তাবলী মেনে নিচ্ছি</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
            >
              {loading ? <BeatLoader color="#fff" size={8} /> : "Signup"}
            </button>
          </form>

          {/* Social Sign Up Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
               onClick={signUpWithGoogle}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
                Google দিয়ে সাইন আপ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
