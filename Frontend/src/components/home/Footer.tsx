function Footer() {
  return (
    <footer className="border-t border-gray-800 px-16 py-12">

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">

        <div>
          <h2 className="text-3xl font-bold text-purple-400">
            QuizArena
          </h2>

          <p className="text-gray-400 mt-2">
            Realtime multiplayer quiz battles for everyone.
          </p>
        </div>

        <div className="flex gap-8 text-gray-400">

          <a
            href="#features"
            className="hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#about"
            className="hover:text-white transition"
          >
            About
          </a>

          <a
            href="#contact"
            className="hover:text-white transition"
          >
            Contact
          </a>

        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
        © 2026 QuizArena. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;