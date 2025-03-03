import { useParams } from 'react-router-dom';
import {
  useGetCharacterByIdQuery,
  useGetEpisodeByIdsQuery,
} from '../../services/charactersApi';
import style from './CharacterDetail.module.css';
import { BackButton } from '../../components/BackButton/BackButton';
import { CharacterSlider } from '../../components/CharacterSlider/CharacterSlider';

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
      <div className="wrapper">
        <p>Loading character...</p>
      </div>
    );

  if (!character) {
    return (
      <div className="wrapper">
        <p>Character not found</p>
        <BackButton />
      </div>
    );
  }

  return (
    <main className={`wrapper ${style.characterContainer}`}>
      <div className={style.backButtonContainer}>
        <BackButton />
      </div>
      <section className={style.characterInfo}>
        <img
          src={character.image}
          alt={character.name}
          className={style.characterInfoImg}
        />
        <div className={style.characterInfoContainer}>
          <div className={style.characterName}>
            <p>{character.name}</p>
          </div>
          <div className={style.characterInfoTable}>
            <div className="personal-data">
              <table>
                <tbody>
                  <tr>
                    <th colSpan={2}>Personal data</th>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{character.status}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{character.gender}</td>
                  </tr>
                  <tr>
                    <th colSpan={2}>Location</th>
                  </tr>
                  <tr>
                    <td>
                      <ul>
                        <li>{character.location.name}</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="episode">
              <table>
                <tbody>
                  <tr>
                    <th colSpan={2}>Episode</th>
                  </tr>
                  {episodesLoading ? (
                    <tr>
                      <td colSpan={2}>Loading episodes...</td>
                    </tr>
                  ) : episodes ? (
                    (Array.isArray(episodes) ? episodes : [episodes]).map(
                      (episode) => (
                        <tr key={episode.id}>
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
        </div>
      </section>
      <section className={style.moreCharacters}>
        <div className={style.moreCharactersTitle}>
          <p>{`More characters from ${character.location.name}`}</p>
        </div>
        <div className={style.moreCharacterSlider}>
          <CharacterSlider locationId={locationId} excludeId={id} />
        </div>
      </section>
    </main>
  );
};
