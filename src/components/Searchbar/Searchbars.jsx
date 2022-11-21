import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Formik, Field, Form } from 'formik';
import { getImages } from '../../api/api';

class Searchbar extends Component {
  state = {
    query: 'Cocker',
    // pictures: null,
    // error: null,
  };

  // handleSubmit = async () => {
  //   try {
  //     const response = await getImages(this.query);
  //     this.setState({
  //       pictures: response,
  //     });
  //   } catch (error) {
  //     this.setState({ error });
  //     console.log(error);
  //   }
  // };

  handleSubmit = async query => {
    try {
      const response = await getImages('Salt');
      console.log('response ====', response);
      // if (this.state.pictures !== response) {
      //   this.setState({
      //     pictures: response,
      //   });
      // }
    } catch (error) {
      // this.setState({ error });
      console.log(error);
    }
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };
  render() {
    // this.props.onSubmit(this.state.query)
    // getImages('Flower');
    // console.log(this.props.handleSubmit)
    return (
      <div className="Searchbar">
        <Formik
          // initialValues={{ searchQuery: 'Found', zalupka: 'gogo' }}
          // onSubmit={() => console.log('Submitted')}
          onSubmit={() => this.props.onSubmit(this.state.query)}
          // onSubmit={() => this.state.onSubmit}
        >
          <Form className="SearchForm">
            <button className="SearchForm-button" type="submit">
              <AiOutlineSearch size={20} />
            </button>
            <Field
              className="SearchForm-input"
              id="searchQuery"
              name="searchQuery"
              onChange={e => this.handleChange(e)}
              value={this.state.query}
            />
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Searchbar;
