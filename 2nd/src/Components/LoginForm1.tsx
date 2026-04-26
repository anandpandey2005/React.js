import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

const LoginForm1 = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleSendOtp = () => {
    console.log("API Call: Sending OTP...");
    setIsOtpSent(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    const cleanValue = value.replace(/[^0-9]/g, "");
    e.target.value = cleanValue;

    if (cleanValue && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden p-8 border border-gray-100"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-sm text-gray-500 mt-2">
            {isOtpSent
              ? "Enter the code sent to your email"
              : "Enter your email to receive an OTP"}
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              disabled={isOtpSent}
              placeholder="name@company.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:bg-gray-100"
            />
            {!isOtpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors self-end"
              >
                Send OTP
              </button>
            )}
          </div>

          {isOtpSent && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <label className="text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="flex justify-between gap-2">
                {inputRefs.map((ref, index) => (
                  <input
                    key={index}
                    ref={ref}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-14 text-center text-xl font-extrabold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-[0.98]"
              >
                Verify & Login
              </button>
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="text-xs text-gray-400 text-center hover:underline"
              >
                Change Email
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm1;
