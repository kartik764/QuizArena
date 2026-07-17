import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="px-16 py-24">

      <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl p-16 text-center">

        <h2 className="text-5xl font-bold">
          Ready To Test Your Knowledge?
        </h2>

        <p className="text-lg text-gray-200 mt-6">
          Join thousands of players competing in realtime quiz battles.
        </p>

        <div className="mt-10">

          <Link
            to="/register"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold"
          >
            Start Playing Now
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CTA;