const Footer = () => {
  return (
    <footer className="bg-medium-bg border-t border-light-bg py-10 text-center">
      <div className="text-gray-400 text-sm">
        <div className="flex justify-center gap-8 mb-5">
          <a
            href="https://github.com/Jaseci-Labs/jaseci"
            target="_blank"
            className="text-dark-text no-underline transition-colors duration-300 hover:text-primary-orange"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/6j3QNdtcN6"
            target="_blank"
            className="text-dark-text no-underline transition-colors duration-300 hover:text-primary-orange"
          >
            Community
          </a>
          <a
            href="https://www.jac-lang.org/learn/getting_started/"
            target="_blank"
            className="text-dark-text no-underline transition-colors duration-300 hover:text-primary-orange"
          >
            Documentation
          </a>
        </div>
        <p>© 2025 Jac Hackers Everywhere. All rights reserved.</p>
        <p className="mt-2.5 text-gray-500">
          Built with passion for innovative programming languages
        </p>
      </div>
    </footer>
  );
};

export default Footer;
