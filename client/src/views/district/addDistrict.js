import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { getDistricts, addorUpdateDistrict } from "../../redux/district/action";

class AddDistrict extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      en_name: "",
      ar_name: "",
      country: "",
      city: "",
      icon: null,
      is_modal_loading: false,
      show_modal: false,
      countries: [],
      cities: [],
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ ar_name: "", en_name: "" });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        country: "",
        city: "",
        icon: null,
        id: null,
      });
    }
    if (nextProps && nextProps.district && nextProps.district.en_name) {
      this.setState({
        en_name: nextProps.district.en_name,
        ar_name: nextProps.district.ar_name,
        country: nextProps.district.country._id,
        city: nextProps.district.city._id,
        id: nextProps.district._id,
      });
    }

    if (nextProps && nextProps.cities) {
      this.setState({
        cities: nextProps.cities.filter((c) => c.is_active === true),
      });
    }
    if (nextProps && nextProps.countries) {
      this.setState({
        countries: nextProps.countries.filter((c) => c.is_active === true),
      });
    }

    if (nextProps && nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onFileSelect = (e) => {
    this.setState({ icon: e.target.files[0] });
  };

  onSubmit = () => {
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("ar_name", this.state.ar_name);
    formData.append("en_name", this.state.en_name);
    formData.append("country", this.state.country);
    formData.append("city", this.state.city);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateDistrict(
      formData,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const {
      ar_name,
      en_name,
      id,
      is_modal_loading,
      errors,
      show_modal,
      countries,
      cities,
      country,
      city,
    } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} City
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_name">Arabic Name</Label>
                    <Input
                      type="text"
                      name="ar_name"
                      onChange={this.onChange}
                      id="ar_name"
                      value={ar_name}
                      placeholder="Arabic Name"
                    />
                    <p className="error">{errors && errors.ar_name}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="en_name">English Name</Label>
                    <Input
                      type="text"
                      name="en_name"
                      onChange={this.onChange}
                      id="en_name"
                      value={en_name}
                      placeholder="English Name"
                    />
                    <p className="error">{errors && errors.en_name}</p>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input
                  type="select"
                  name="country"
                  onChange={this.onChange}
                  id="country"
                  value={country}
                  placeholder="Country"
                >
                  <option value="">Select Country</option>
                  {countries &&
                    countries.map((item, idx) => {
                      return (
                        <option value={item._id}>
                          {item.en_name} - {item.ar_name}
                        </option>
                      );
                    })}
                </Input>
                <p className="error">{errors && errors.country}</p>
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="select"
                  name="city"
                  onChange={this.onChange}
                  id="city"
                  value={city}
                  placeholder="city"
                >
                  <option value="">Select City</option>
                  {country &&
                    cities &&
                    cities
                      .filter((i) => i.country._id === country)
                      .map((item, idx) => {
                        return (
                          <option value={item._id}>
                            {item.en_name} - {item.ar_name}
                          </option>
                        );
                      })}
                </Input>
                <p className="error">{errors && errors.city}</p>
              </FormGroup>
              <FormGroup>
                <Label for="icon">Icon</Label>
                <Input
                  type="file"
                  name="icon"
                  onChange={this.onFileSelect}
                  id="icon"
                  placeholder="Icon"
                  required
                />
                <p className="error">{errors && errors.icon}</p>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSubmit}>
                {id ? "Update" : "Create"}
              </Button>{" "}
              <Button color="secondary" onClick={this.props.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    district: state.district.district,
    errors: state.errors.errors,
    countries: state.country.countries,
    cities: state.city.cities,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getDistricts, addorUpdateDistrict })(
    AddDistrict
  )
);
