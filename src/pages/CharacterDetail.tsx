import { useParams } from 'react-router-dom';
import {
  useGetCharacterByIdQuery,
  useGetEpisodeByIdsQuery,
} from '../services/charactersApi.ts';
import { Button } from '../components/Button.tsx';
import { CharacterSlider } from '../components/CharacterSlider.tsx';

const getEpisodeIds = (
  episodes: string[] | undefined,
  maxCount: number
): string => {
  if (!episodes) return '';

  return episodes
    .slice(0, maxCount)
    .map((episode) => episode.slice(episode.lastIndexOf('/') + 1))
    .join(',');
};

export const CharacterDetail = () => {
  const { id } = useParams();
  const { data: characterData, isLoading } = useGetCharacterByIdQuery(id ?? '');
  const character = Array.isArray(characterData)
    ? characterData[0]
    : characterData;

  const maxEpisodesCount: number = 6;
  const episodeIds = getEpisodeIds(character?.episode, maxEpisodesCount);
  const { data: episodes, isLoading: episodesLoading } =
    useGetEpisodeByIdsQuery(episodeIds);

  const locationId = character?.location?.url
    ? (character.location.url.split('/').pop() ?? '1')
    : '1';

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto">
        <p>Loading character...</p>
      </div>
    );

  if (!character) {
    return (
      <div className="max-w-7xl mx-auto">
        <p>Character not found</p>
        <Button />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="mt-10">
        <Button iconDirection={'left'} navigateBack spanText={'Назад'} />
      </div>
      <section className="flex gap-5 w-full">
        <img
          src={character.image}
          alt={character.name}
          className="size-[387px] object-cover"
        />
        <div className="flex flex-col grow">
          <div className="text-5xl font-bold">
            <h5>{character.name}</h5>
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
                  <td>
                    <ul className="list-disc list-inside">
                      <li>{character.location.name}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="text-lg w-full table-fixed">
              <tbody>
                <tr className="bg-[#e8e8e8] h-9">
                  <th colSpan={2}>Episode</th>
                </tr>
                {episodesLoading ? (
                  <tr>
                    <td colSpan={2}>Loading episodes...</td>
                  </tr>
                ) : episodes ? (
                  (Array.isArray(episodes) ? episodes : [episodes]).map(
                    (episode) => (
                      <tr
                        key={episode.id}
                        className="border-b border-[#f2f2f2] h-11"
                      >
                        <td>{episode.episode}</td>
                        <td>{episode.air_date}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={2}>No episodes available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section>
        <div className="text-2xl mb-4 font-bold">
          <p>{`More characters from ${character.location.name}`}</p>
        </div>
        <div className="mb-20">
          <CharacterSlider locationId={locationId} excludeId={id} />
        </div>
      </section>
    </div>
  );
};
