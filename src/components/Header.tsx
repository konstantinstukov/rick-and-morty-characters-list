import Link from "next/link";
import { LogoIcon } from "./Icons";
import { memo } from "react";

export const Header = memo(() => {
  return (
    <header className="w-full bg-secondary-green">
      <div className="max-w-7xl h-16 flex items-center mx-auto">
        <h1>
          <Link
            href="/"
            className="flex items-center"
            aria-label="На главную страницу Rick and Morty Characters List"
          >
            <LogoIcon />
            <span className="pl-2 font-black text-xl">
              Rick & Morty Characters List
            </span>
          </Link>
        </h1>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
