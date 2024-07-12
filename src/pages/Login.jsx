import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Login() {
  const [user, setUser] = useState({
    username: "sandy",
    otp: "1234",
  });

  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://assignment.stage.crafto.app/login",
        user
      );
      if (response) {
        localStorage.setItem("token", response?.data?.token);
        navigate("/quote-creation");
        toast.success("Login Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={changeHandler}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={user.otp}
              name="otp"
              onChange={changeHandler}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-black rounded-md outline-none "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
