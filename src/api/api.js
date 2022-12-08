import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const getImages = async (query, page) => {
  const response = await axios.get('api', {
    params: {
      key: '29576888-5bcf4584c20a5ab12bd038a49',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page,
    },
  });
  return response.data.hits;
};
