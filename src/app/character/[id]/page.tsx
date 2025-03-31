"use client";

import { memo } from "react";
import { useParams } from "next/navigation";
import { useGetCharacterByIdQuery } from "../../../services/charactersApi";
import Image from "next/image";
import { EpisodesTable } from "../../../components/EpisodesTable";
import { NavigateButton } from "../../../components/NavigateButton";
import { CharactersSlider } from "../../../components/CharactersSlider";

const CharacterPage = memo(() => {
  const params = useParams();
  const characterPage = params?.id;

  const {
    data: character,
    isLoading,
    error,
  } = useGetCharacterByIdQuery({ id: Number(characterPage) });

  const episodesIds = character?.episode
    .map((episode) => {
      const id = episode.split("/").pop();
      return id ? Number(id) : null;
    })
    .filter((id) => id !== null);

  if (isLoading)
    return <div className="mt-10 text-center">Loading character...</div>;
  if (error)
    return (
      <div className="mt-10 text-center text-red-500">
        Error loading character data. Please try refreshing the page or check
        your internet connection.
      </div>
    );
  if (!character)
    return <div className="mt-10 text-center">Character not found</div>;

  return (
    <div className="flex flex-col gap-10">
      <div className="mt-10">
        <NavigateButton
          iconDirection={"left"}
          navigateBack
          spanText={"Назад"}
        />
      </div>
      <section className="flex gap-5 w-full">
        <Image
          src={character.image}
          alt={`${character.name} portrait`}
          width={387}
          height={387}
          className="object-cover rounded-lg w-[300px] h-[300px]"
          loading="lazy"
          priority={false}
          aria-label={`${character.name} portrait`}
        />
        <div className="flex flex-col grow">
          <div className="text-5xl font-bold pb-8">
            <h1>{character.name}</h1>
          </div>
          <div className="flex gap-4 items-start">
            <table className="w-full text-lg table-fixed">
              <tbody>
                <tr className="bg-[#e8e8e8] h-9">
                  <th colSpan={2}>Personal data</th>
                </tr>
                <tr className="border-b border-[#f2f2f2] h-11">
                  <td>Status</td>
                  <td>{character.status}</td>
                </tr>
                <tr className="border-b border-[#f2f2f2] h-11">
                  <td>Gender</td>
                  <td>{character.gender}</td>
                </tr>
                <tr className="bg-[#e8e8e8] h-9">
                  <th colSpan={2}>Location</th>
                </tr>
                <tr className="h-11">
                  <td colSpan={2}>
                    <ul className="list-disc list-inside">
                      <li>{character.location?.name ?? "Unknown location"}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <EpisodesTable episodesIds={episodesIds} />
          </div>
        </div>
      </section>
      <section>
        <div className="text-2xl mb-4 font-bold">
          <p>{`More characters from ${character.location.name}`}</p>
        </div>
        <div className="mb-20">
          <CharactersSlider
            id={character.id}
            location={character.location.url}
          />
        </div>
      </section>
    </div>
  );
});

export default CharacterPage;
