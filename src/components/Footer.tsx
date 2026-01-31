export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-base text-text-secondary">
          VouchedMarket is being built by a team obsessed with fixing the broken
          trust layer in peer-to-peer commerce.
        </p>
        <p className="mb-5 text-base font-medium text-text-muted">
          Powered by Biz Insider Pro
        </p>
        <div className="mb-5 flex items-center justify-center gap-4 text-sm text-text-muted">
          <a href="#" className="hover:text-primary">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-primary">
            Contact
          </a>
        </div>
        <p className="text-sm text-text-muted">
          &copy; 2026 VouchedMarket. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
