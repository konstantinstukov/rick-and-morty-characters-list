import Image from "next/image";
import { FC, memo } from "react";

type SocialIcon = {
  name: string;
  src: string;
  url: string;
};

const SocialIcons: SocialIcon[] = [
  {
    name: "Linkedin",
    src: "/icon/Linkedin.svg",
    url: "https://www.linkedin.com/",
  },
  {
    name: "Facebook",
    src: "/icon/facebook.svg",
    url: "https://www.facebook.com/",
  },
  {
    name: "Twitter",
    src: "/icon/Twitter.svg",
    url: "https://www.twitter.com/",
  },
];

export const Footer: FC = memo(() => {
  return (
    <footer className="w-full h-40 flex justify-center bg-secondary-green">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <div className="flex gap-3">
          {SocialIcons.map((icon) => (
            <a
              key={icon.name}
              href={icon.url}
              aria-label={`Follow us on ${icon.name}`}
            >
              <Image src={icon.src} width={36} height={36} alt={icon.name} />
            </a>
          ))}
        </div>
        <div className="flex gap-3">
          <p>Original release</p>
          <a
            href="https://www.adultswim.com/"
            className="flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/Adult_Swim_2003_logo.svg"
              width={100}
              height={19}
              alt="Adult Swim"
            />
          </a>
        </div>
        <div>
          <p>
            <a
              className="underline"
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API
            </a>{" "}
            by{" "}
            <a
              className="underline"
              href="https://github.com/afuh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alex Fuhrmann
            </a>
          </p>
          <p>
            App by{" "}
            <a
              className="underline"
              href="https://github.com/konstantinstukov"
              target="_blank"
              rel="noopener noreferrer"
            >
              K. Stukov
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
