import { Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BottomCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative mt-6 overflow-hidden rounded-2xl border border-[#8B5CF6]/20 bg-linear-to-r from-[#11152A] via-[#15132D] to-[#0D1224] p-6 md:p-7">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#8B5CF6]/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#F8FAFC] md:text-2xl">
            Ready to dominate the leaderboard?
          </h2>

          <p className="mt-1.5 text-sm text-[#94A3B8]">
            Create your own room and challenge players worldwide.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/create-room")}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8B5CF6]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7C3AED] md:w-auto"
        >
          <Plus className="size-4" />
          Create Room
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}

export default BottomCTA;