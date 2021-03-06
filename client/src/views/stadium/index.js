import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Table,
  Button,
  Badge,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import moment from "moment";
import AddDistrict from "./addDistrict";

import {
  getStadiums,
  selectStadium,
  markstadium,
} from "../../redux/stadium/action";
import { getCountries } from "../../redux/country/action";
import { getCities } from "../../redux/city/action";
import { getDistricts } from "../../redux/district/action";

class Districts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      districts: [],
      cities: [],
      countries: [],
      stadiums: [],
      selected_filtered_country: "",
      selected_filtered_city: "",
      selected_filtered_district: "",
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

  markstadium = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markstadium(data, this.toggleTableLoading);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "selected_filtered_city")
      this.setState({ selected_filtered_district: "" });
    if (e.target.name === "selected_filtered_country")
      this.setState({ selected_filtered_city: "" });
    if (e.target.name === "selected_filtered_country")
      this.setState({ selected_filtered_district: "" });
  };

  updateRow = (district) => {
    this.toggleModal();
    if (!district) {
      this.props.selectStadium({});
    } else {
      this.props.selectStadium(district);
    }
  };

  componentDidMount() {
    this.props.getCountries(() => {});
    this.props.getCities(() => {});
    this.props.getDistricts(() => {});
    this.props.getStadiums(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.stadiums) {
      this.setState({
        stadiums: nextProps.stadiums.filter(
          (c) =>
            c.is_deleted === false &&
            c.country.is_deleted === false &&
            c.city.is_deleted === false &&
            c.district.is_deleted === false
        ),
      });
    }
    if (nextProps && nextProps.districts) {
      this.setState({
        districts: nextProps.districts.filter((c) => c.is_active === true),
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
  }

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      districts,
      show_modal,
      countries,
      cities,
      stadiums,
      selected_filtered_country,
      selected_filtered_city,
      selected_filtered_district,
    } = this.state;

    let filtered_cities = selected_filtered_country
      ? cities.filter((i) => i.country._id === selected_filtered_country)
      : [];

    let filtered_districts = selected_filtered_city
      ? districts.filter((i) => i.city._id === selected_filtered_city)
      : [];

    let filtered_stadiums = stadiums;

    if (selected_filtered_country) {
      filtered_stadiums = filtered_stadiums.filter(
        (i) => i.country._id === selected_filtered_country
      );

      if (selected_filtered_city) {
        filtered_stadiums = filtered_stadiums.filter(
          (i) => i.city._id === selected_filtered_city
        );

        if (selected_filtered_district) {
          filtered_stadiums = filtered_stadiums.filter(
            (i) => i.district._id === selected_filtered_district
          );
        }
      }
    }

    return (
      <div>
        <Row>
          <AddDistrict
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            toggleModalLoading={this.toggleModalLoading}
            toggleTableLoading={this.toggleTableLoading}
          />
          <Col md={2}>
            <FormGroup>
              <Label for="selected_filtered_country">Select Country</Label>
              <Input
                type="select"
                name="selected_filtered_country"
                onChange={this.onChange}
                id="selected_filtered_country"
                value={selected_filtered_country}
                placeholder="Select Country"
              >
                <option value="">Select Country</option>
                {countries &&
                  countries.map((item, idx) => {
                    return (
                      <option value={item._id} key={idx}>
                        {item.en_name + " " + item.ar_name}
                      </option>
                    );
                  })}
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="selected_filtered_city">Select City</Label>
              <Input
                type="select"
                name="selected_filtered_city"
                onChange={this.onChange}
                id="selected_filtered_city"
                value={selected_filtered_city}
                placeholder="Select Country"
              >
                <option value="">Select City</option>
                {filtered_cities &&
                  filtered_cities.map((item, idx) => {
                    return (
                      <option value={item._id} key={idx}>
                        {item.en_name + " " + item.ar_name}
                      </option>
                    );
                  })}
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="selected_filtered_district">Select District</Label>
              <Input
                type="select"
                name="selected_filtered_district"
                onChange={this.onChange}
                id="selected_filtered_district"
                value={selected_filtered_district}
                placeholder="Select District"
              >
                <option value="">Select District</option>
                {filtered_districts &&
                  filtered_districts.map((item, idx) => {
                    return (
                      <option value={item._id} key={idx}>
                        {item.en_name + " " + item.ar_name}
                      </option>
                    );
                  })}
              </Input>
            </FormGroup>
          </Col>
          <Col md="12">
            <LoadingOverlay
              active={is_table_loading}
              spinner
              text="Please Wait..."
            >
              <Card>
                <CardHeader>
                  Manage Stadium
                  <Button
                    size="xs"
                    color="success"
                    className="mr-2 float-right"
                    onClick={this.updateRow.bind(this, false)}
                  >
                    <i className="fa fa-plus" alt="Update"></i>
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table responsive striped bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Icon</th>
                        <th>EN - Name</th>
                        <th>AR - Name</th>
                        <th>District</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered_stadiums &&
                        filtered_stadiums.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>
                                {item.icon ? (
                                  <img
                                    src={item.icon}
                                    alt={item.en_name}
                                    style={{ maxWidth: "75px" }}
                                  />
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>{item.en_name}</td>
                              <td>{item.ar_name}</td>
                              <td>
                                {item.district.en_name} -{" "}
                                {item.district.ar_name}
                              </td>
                              <td>
                                {item.city.en_name} - {item.city.ar_name}
                              </td>
                              <td>
                                {item.country.en_name} - {item.country.ar_name}
                              </td>
                              <td>
                                {moment(item.createdAt).format("DD/MM/YYYY")} -{" "}
                                {moment(item.createdAt).fromNow()}
                              </td>
                              <td>
                                {item.is_active ? (
                                  <Badge color="primary" outline>
                                    Active
                                  </Badge>
                                ) : (
                                  <Badge color="danger" outline>
                                    Inactive
                                  </Badge>
                                )}
                              </td>
                              <td style={{ minWidth: "200px" }}>
                                <Button
                                  size="xs"
                                  color="warning"
                                  className="mr-2"
                                  onClick={this.updateRow.bind(this, item)}
                                  title="Update"
                                >
                                  <i className="fa fa-pencil"></i>
                                </Button>
                                {!item.is_active && (
                                  <Button
                                    size="xs"
                                    color="success"
                                    className="mr-2"
                                    onClick={this.markstadium.bind(this, {
                                      id: item._id,
                                      is_active: true,
                                      is_deleted: item.is_deleted,
                                    })}
                                    title="Enable Account"
                                  >
                                    <i className="fa fa-check"></i>
                                  </Button>
                                )}
                                {item.is_active && (
                                  <Button
                                    size="xs"
                                    color="primary"
                                    className="mr-2"
                                    onClick={this.markstadium.bind(this, {
                                      id: item._id,
                                      is_active: false,
                                      is_deleted: item.is_deleted,
                                    })}
                                    title="Disable Account"
                                  >
                                    <i className="fa fa-times"></i>
                                  </Button>
                                )}
                                {item.user_type !== "1" && (
                                  <Button
                                    size="xs"
                                    color="danger"
                                    onClick={this.markstadium.bind(this, {
                                      id: item._id,
                                      is_active: item.is_active,
                                      is_deleted: true,
                                    })}
                                    title="Delete"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stadium: state.stadium.stadium,
    stadiums: state.stadium.stadiums,
    districts: state.district.districts,
    countries: state.country.countries,
    cities: state.city.cities,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getStadiums,
    selectStadium,
    markstadium,
    getCities,
    getDistricts,
    getCountries,
  })(Districts)
);
