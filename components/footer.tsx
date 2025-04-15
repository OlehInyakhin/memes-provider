import { Link } from '@heroui/link';

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center text-center py-3 gap-4">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://heroui.com?utm_source=next-app-template"
        title="heroui.com homepage"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">HeroUI</p>
      </Link>
      <p className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};
