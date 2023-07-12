import axios from 'axios';

const external_api_base_url = 'https://ddragon.leagueoflegends.com/cdn/';

export const getAllChampions = async (version: string) => {
  const request_url = `${external_api_base_url}${version}/data/en_US/champion.json`;
  const response = await axios.get(request_url).then((res) => {
    // if response is successful, return the data as iChampion[], else return an empty array
    return res.status === 200 ? res.data.data : [];
  });
};

export const getChampion = async (version: string, id: string) => {
  const request_url = `${external_api_base_url}${version}/data/en_US/champion/${id}.json`;
  const response = await axios.get(request_url).then((res) => {
    // if response is successful, return the data as iChampion[], else return an empty array
    return res.status === 200 ? res.data.data : [];
  });
};