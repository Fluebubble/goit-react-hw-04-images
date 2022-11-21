import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
// axios.defaults.headers.common['Authorization'] = '29576888-5bcf4584c20a5ab12bd038a49';

export const getImages = async query => {
  // query = 'Forest';
  // const response = await axios.get(
  //   'api/?key=29576888-5bcf4584c20a5ab12bd038a49&q=yellow+flowers&image_type=photo'
  // );
  const response = await axios.get('api', {
    params: {
      key: '29576888-5bcf4584c20a5ab12bd038a49',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  console.log(response.data.hits);
  return response.data.hits;
};
