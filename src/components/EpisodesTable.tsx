import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetEpisodesByIdQuery } from "../services/charactersApi";
import { SerializedError } from "@reduxjs/toolkit";

interface EpisodesTableProps {
  episodesIds: number | number[];
}

export const EpisodesTable = ({ episodesIds }: EpisodesTableProps) => {
  const {
    data: episodes,
    isLoading,
    error,
  } = useGetEpisodesByIdQuery({ ids: episodesIds });

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
    if ("status" in error) {
      return `Error: ${error.status} ${JSON.stringify(error.data)}`;
    } else {
      return error.message || "An unknown error occurred";
    }
  };

  if (isLoading) {
    return (
      <table className="text-lg w-full table-fixed">
        <tbody>
          <tr className="bg-[#e8e8e8] h-9">
            <th colSpan={2}>Episode</th>
          </tr>
          <tr>
            <td colSpan={2}>Loading episodes...</td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (error) {
    return (
      <table className="text-lg w-full table-fixed">
        <tbody>
          <tr className="bg-[#e8e8e8] h-9">
            <th colSpan={2}>Episode</th>
          </tr>
          <tr>
            <td colSpan={2}>{getErrorMessage(error)}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (!episodes) {
    return (
      <table className="text-lg w-full table-fixed">
        <tbody>
          <tr className="bg-[#e8e8e8] h-9">
            <th colSpan={2}>Episode</th>
          </tr>
          <tr>
            <td colSpan={2}>No episodes available</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="text-lg w-full table-fixed">
      <tbody>
        <tr className="bg-[#e8e8e8] h-9">
          <th colSpan={2}>Episode</th>
        </tr>
        {(Array.isArray(episodes) ? episodes : [episodes])
          .slice(0, 6)
          .map((episode) => (
            <tr key={episode.id} className="border-b border-[#f2f2f2] h-11">
              <td>{episode.episode}</td>
              <td>{episode.air_date}</td>
            </tr>
          ))}
        {Array.isArray(episodes) && episodes.length > 6 && (
          <tr>
            <td colSpan={2} className="text-center pt-2 text-primary-green">
              + {episodes.length - 6} more episodes
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
