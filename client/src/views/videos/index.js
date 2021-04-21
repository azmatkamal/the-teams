import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";

class Videos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ar_name: "",
      en_name: "",
      ar_sologan: "",
      en_sologan: "",

      // OTHERS
      show_modal: false,
      is_modal_loading: false,
      is_table_loading: false,
    };
  }

  toggleModal = () => {
    this.setState({ show_modal: !this.state.show_modal });
  };

  toggleModalLoading = () => {
    this.setState({ is_modal_loading: !this.state.is_modal_loading });
  };

  toggleTableLoading = () => {
    this.setState({ is_table_loading: !this.state.is_table_loading });
  };

  render() {
    return (
      <div>
        <LoadingOverlay
          active={false}
          spinner
          text="Please Wait..."
        ></LoadingOverlay>
      </div>
    );
  }
}

export default Videos;
