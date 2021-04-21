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

import { getStadiums, addorUpdateStadium } from "../../redux/stadium/action";

class AddDistrict extends Component {
  constructor(props) {
    super(props);

    this.state = {
      en_name: "",
      ar_name: "",
      lat: "",
      lng: "",
      country: "",
      city: "",
      district: "",
      icon: null,
      id: null,
      is_modal_loading: false,
      show_modal: false,
      countries: [],
      cities: [],
      districts: [],
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({
      en_name: "",
      ar_name: "",
      lat: "",
      lng: "",
      country: "",
      city: "",
      district: "",
      icon: null,
      id: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        lat: "",
        lng: "",
        country: "",
        city: "",
        district: "",
        icon: null,
        id: null,
      });
    }
    if (nextProps && nextProps.stadium && nextProps.stadium.en_name) {
      this.setState({
        en_name: nextProps.stadium.en_name,
        ar_name: nextProps.stadium.ar_name,
        lat: nextProps.stadium.lat,
        lng: nextProps.stadium.lng,
        country: nextProps.stadium.country._id,
        city: nextProps.stadium.city._id,
        district: nextProps.stadium.district._id,
        id: nextProps.stadium._id,
      });
    }
    if (nextProps && nextProps.countries) {
      this.setState({
        countries: nextProps.countries,
      });
    }
    if (nextProps && nextProps.cities) {
      this.setState({
        cities: nextProps.cities,
      });
    }
    if (nextProps && nextProps.districts) {
      this.setState({
        districts: nextProps.districts,
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
    formData.append("district", this.state.district);
    formData.append("lat", this.state.lat);
    formData.append("lng", this.state.lng);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateStadium(
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
      lng,
      lat,
      id,
      is_modal_loading,
      errors,
      show_modal,
      countries,
      cities,
      districts,
      country,
      city,
      district,
    } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
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
                <Label for="district">District</Label>
                <Input
                  type="select"
                  name="district"
                  onChange={this.onChange}
                  id="district"
                  value={district}
                  placeholder="district"
                >
                  <option value="">Select District</option>
                  {country &&
                    city &&
                    districts &&
                    districts
                      .filter((i) => i.city._id === city)
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
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lat">Latitude</Label>
                    <Input
                      type="text"
                      name="lat"
                      onChange={this.onChange}
                      id="lat"
                      value={lat}
                      placeholder="Latitude"
                    />
                    <p className="error">{errors && errors.lat}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lng">Longitude</Label>
                    <Input
                      type="text"
                      name="lng"
                      onChange={this.onChange}
                      id="lng"
                      value={lng}
                      placeholder="Longitude"
                    />
                    <p className="error">{errors && errors.lng}</p>
                  </FormGroup>
                </Col>
              </Row>
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
    stadium: state.stadium.stadium,
    errors: state.errors.errors,
    countries: state.country.countries,
    cities: state.city.cities,
    districts: state.district.districts,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getStadiums, addorUpdateStadium })(AddDistrict)
);
