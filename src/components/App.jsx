import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from '../api/api';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    query: '',
    pictures: [],
    page: 1,
    isLoading: false,
    currentResponseLength: 0,
    showModal: false,
    modalImage: null,
  };

  handleChange = e => {
    const query = e.currentTarget.value;
    this.setState({ query });
  };

  handleSubmit = async (e, query) => {
    e.preventDefault();
    this.setState({
      query,
      page: 1,
      pictures: [],
      currentResponseLength: 0,
    });
    e.target.reset();
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  toggleModal = () => {
    this.setState(state => {
      return {
        showModal: !state.showModal,
      };
    });
  };

  getImageProps = e => {
    e.preventDefault();
    this.setState({
      modalImage: {
        link: this.state.pictures[e.currentTarget.id].largeImageURL,
        alt: this.state.pictures[e.currentTarget.id].tags,
      },
    });
    this.toggleModal();
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        const response = await getImages(this.state.query, this.state.page);
        console.log('response ====', response);
        if (prevState.query !== this.state.query) {
          this.setState({
            pictures: response,
            currentResponseLength: response.length,
          });
        } else {
          this.setState({
            pictures: [...prevState.pictures, ...response],
            currentResponseLength: response.length,
          });
        }
      } catch (error) {
        // this.setState({ error });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    console.log(this.state.currentResponseLength);
    return (
      <>
        {this.state.showModal && (
          <Modal image={this.state.modalImage} closeModal={this.toggleModal} />
        )}
        <Searchbar
          onSubmit={this.handleSubmit}
          query={this.state.query}
        />
        <ImageGallery
          pictures={this.state.pictures}
          onClick={this.getImageProps}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
          }}
        >
          {this.state.isLoading ? (
            <Loader />
          ) : (
            this.state.currentResponseLength === 12 && (
              <Button loadMore={this.loadMore} />
            )
          )}
        </div>
      </>
    );
  }
}

export default App;
