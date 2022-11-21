import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from '../api/api';

class App extends Component {
  state = {
    pictures: [],
    // error: null
  };

  handleSubmit = async (e, query) => {
    e.preventDefault();
    console.log(e);
    try {
      const response = await getImages(query);
      console.log('response ====', response);

      this.setState({
        pictures: response,
      });
    } catch (error) {
      // this.setState({ error });
      console.log(error);
    }
  };

  render() {
    // getImages("Salt")
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery pictures={this.state.pictures}/>
      
      </>
    );
  }
}

export default App;

// export const App = () => {
//   return <div className="App">React homework template</div>;
// };
