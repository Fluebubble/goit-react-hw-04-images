import React, { Component } from 'react';

class Modal extends Component {
  closeModal = e => {
    if (e.key === 'Escape') {
      console.log(e.key, '- Pressed');
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  render() {
    const { link, alt } = this.props.image;
    return (
      <div
        className="Overlay"
        onClick={e => {
          if (e.target.className === 'Overlay') {
            this.props.closeModal();
          }
        }}
      >
        <div className="Modal">
          <img src={link} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;