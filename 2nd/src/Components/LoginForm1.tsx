import { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

const LoginForm1 = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = () => {
    console.log("API Call: Sending OTP...");
    setIsOtpSent(true);
  };

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; 

    const newOtp = [...otp];
    console.warn("new otp")
    console.log(newOtp)
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(data)) return; 

    const newOtp = [...otp];
    data.split("").forEach((char, index) => {
      newOtp[index] = char;
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = char;
      }
    });
    setOtp(newOtp);
    const nextIndex = Math.min(data.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("Verifying OTP:", finalOtp);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 border border-gray-100"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-sm text-gray-500 mt-2">
            {isOtpSent ? "Enter the 4-digit code" : "Enter your email"}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              disabled={isOtpSent}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none disabled:bg-gray-100"
              placeholder="name@company.com"
            />
            {!isOtpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-sm font-semibold text-indigo-600 self-end"
              >
                Send OTP
              </button>
            )}
          </div>

          {isOtpSent && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700"
              >
                Verify & Login
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm1;