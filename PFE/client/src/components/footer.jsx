const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 shadow-lg pb-5 py-4 mt-10">
      <div className="border-b border-gray-500 w-full my-4 shadow-lg"></div>
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="font-semibold">
          &copy; {new Date().getFullYear()} TT Recrut System
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
