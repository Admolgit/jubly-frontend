import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Button from "../components/ui/Button";
import LoginImage from "../assets/login-image.jpg";

export default function VendorOnboardingSuccessPage() {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);

  const animatedTexts = [
    "Your vendor profile has been submitted successfully.",
    "Our team is reviewing your information carefully.",
    "You will receive approval confirmation within 24 hours.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div
        className="hidden md:flex relative items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-10 z-10 text-center px-8">
          <h1 className="text-2xl font-bold transition-all duration-700">
            {animatedTexts[textIndex]}
          </h1>

          <div className="flex justify-center gap-2 mt-6">
            {animatedTexts.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === textIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={60} />

          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            Profile Submitted 🎉
          </h1>

          <p className="text-gray-600 mb-4">
            Thank you for completing your vendor onboarding on Jubly.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-700 font-medium">
              Your profile verification will be reviewed within 24 hours.
            </p>
            <p className="text-sm text-blue-600 mt-2">
              Once approved, you’ll be able to start receiving bookings from
              clients.
            </p>
          </div>

          <Button
            className="w-full mb-3"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
