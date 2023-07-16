import Champion from '@/models/iChampion';
import Leaderboard from '@/models/iLeaderboard';
import axios from 'axios';

const external_api_base_url = 'https://ddragon.leagueoflegends.com/cdn/';

export const getVersions = async (): Promise<string> => {
  const response = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json").then((response) => {return response.data.data;});
  return response ?? "13.13.1";
};

export const getAllChampions = async (version: string): Promise<Champion[]> => {
  const request_url = `${external_api_base_url}${version}/data/en_US/champion.json`;
  const response = await axios.get(request_url).then((res) => {
    // if response is successful, return the data as iChampion[], else return an empty array
    return res.status === 200 ? res.data.data : [];
  });

  // convert the response object into an array of iChampion objects
  const champions: Champion[] = Object.keys(response).map((key) => {
    const champion: Champion = {
      id: response[key].id,
      name: response[key].name,
      title: response[key].title,
      blurb: response[key].blurb,
      imageUrl: `${external_api_base_url}${version}/img/champion/${response[key].image.full}`,
      tags: response[key].tags,
    };
    return champion;
  });

  return champions;
};

export const getChampion = async (version: string, id: string): Promise<Champion[]> => {
  const request_url = `${external_api_base_url}${version}/data/en_US/champion/${id}.json`;
  const response = await axios.get(request_url).then((res) => {
    // if response is successful, return the data as iChampion[], else return an empty array
    return res.status === 200 ? res.data.data : [];
  });

  return response;
};

export const getAllLeaderboards = async (): Promise<Leaderboard[]> => {
  const response = await axios.get("http://localhost:5000/api/leaderboards").then((res) => {
    // if response is successful, return the data as iLeaderboard[], else return an empty array
    return res.status === 200 ? res.data : [];
  });

  return response;
};