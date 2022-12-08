import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { getImages } from '../../api/api';

class Searchbar extends Component {
  state = {
    query: 'Cocker',
  };

  handleSubmit = async query => {
    try {
      const response = await getImages(query);
      console.log('response ====', response);
    } catch (error) {
      // this.setState({ error });
      console.log(error);
    }
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };
  render() {
    return (
      <div className="Searchbar">
        <form className="SearchForm" onSubmit={(e) => this.props.onSubmit(e, this.state.query)}>
          <button className="SearchForm-button" type="submit">
            <AiOutlineSearch size={20} />
          </button>
          <input
            className="SearchForm-input"
            type="text"
            placeholder="Search images and photos"
            name="searchQuery"
            onChange={e => this.handleChange(e)}
            // value={this.state.query}
          />
        </form>
      </div>
    );
  }
}

export default Searchbar;
