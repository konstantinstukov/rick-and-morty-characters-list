"use server";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full h-40 flex justify-center bg-secondary-green">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <div className="flex gap-3">
          <a href="#">
            <Image
              src={"/icon/Linkedin.svg"}
              width={36}
              height={36}
              alt="Linkedin"
            ></Image>
          </a>
          <a href="#">
            <Image
              src={"/icon/facebook.svg"}
              width={36}
              height={36}
              alt="Facebook"
            ></Image>
          </a>
          <a href="#">
            <Image
              src={"/icon/Twitter.svg"}
              width={36}
              height={36}
              alt="Twitter"
            ></Image>
          </a>
        </div>
        <div className="flex gap-3">
          <p>Original release</p>
          <a href="https://www.adultswim.com/" className="flex items-center">
            <img
              src={"/Adult_Swim_2003_logo.svg"}
              width="100"
              height="19"
              alt="Adult Swim"
            />
          </a>
        </div>
        <div>
          <p>
            <a className="underline" href="https://rickandmortyapi.com/">
              API
            </a>{" "}
            by{" "}
            <a className="underline" href="https://github.com/afuh">
              Alex Fuhrmann
            </a>
          </p>
          <p>
            App by{" "}
            <a className="underline" href="https://github.com/konstantinstukov">
              K. Stukov
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
