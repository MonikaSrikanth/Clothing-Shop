import { useState, useEffect } from "react";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(""); // for sign-up
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberedEmail"));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedEmail = localStorage.getItem("userEmail");
    setIsLoggedIn(loggedIn);
    setUserEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("rememberedEmail"); // Clear the remembered email too
    localStorage.removeItem("user"); // Remove the user data as well
    setIsLoggedIn(false);
    setUserEmail("");
    setUser(null); // Clear the user state
    setSuccess("Logged out successfully!");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (isSignup && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    const endpoint = isSignup ? "signup" : "login";
    const payload = isSignup ? { name, email, password } : { email, password };

    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || `${isSignup ? "Signup" : "Login"} failed`);
        return;
      }

      setSuccess(`${isSignup ? "Signup" : "Login"} successful!`);

      if (!isSignup) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store full user details
        localStorage.setItem("token", data.token);

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        setIsLoggedIn(true);
        setUserEmail(email);
        setUser(data.user);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Auth error:", err);
    }
  };

  // Hide success and error messages after a short delay
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <section id="login" className="w-full bg-gray-100 py-20 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="text-gray-700 mb-4">
              You are logged in as <span className="font-semibold">{userEmail}</span>
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {isSignup ? "Create an Account" : "Login to Your Account"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}
              {isSignup && (
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Mira"
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
              </div>
              {!isSignup && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  <label className="text-sm">Remember Me</label>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                {isSignup ? "Sign Up" : "Login"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                  setSuccess("");
                }}
                className="text-blue-500 underline"
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Auth;
