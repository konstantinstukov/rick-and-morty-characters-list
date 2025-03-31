import Image from "next/image";
import { CharactersList } from "../components/CharactersList";

export default function Page() {
  return (
    <>
      <Image
        className="mb-10"
        src="/main-banner.png"
        alt="Rick and Morty"
        width={1440}
        height={480}
        priority
      />
      <CharactersList />
    </>
  );
}
