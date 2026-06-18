import { Search, Calendar, Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
      <h3 className="text-white text-xl mb-8">How It Works</h3>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <Search className="mx-auto text-pink-400" size={40} />
          <h4 className="text-white mt-3">Search</h4>
        </div>

        <div className="text-center">
          <Calendar className="mx-auto text-pink-400" size={40} />
          <h4 className="text-white mt-3">Book</h4>
        </div>

        <div className="text-center">
          <Sparkles className="mx-auto text-pink-400" size={40} />
          <h4 className="text-white mt-3">Relax</h4>
        </div>
      </div>
    </div>
  );
}
