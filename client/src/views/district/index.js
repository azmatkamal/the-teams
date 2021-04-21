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
} from "reactstrap";
import moment from "moment";
import AddDistrict from "./addDistrict";

import {
  getDistricts,
  selectDistrict,
  markdistrict,
} from "../../redux/district/action";
import { getCountries } from "../../redux/country/action";
import { getCities } from "../../redux/city/action";

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

  markdistrict = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markdistrict(data, this.toggleTableLoading);
    }
  };

  updateRow = (district) => {
    this.toggleModal();
    if (!district) {
      this.props.selectDistrict({});
    } else {
      this.props.selectDistrict(district);
    }
  };

  componentDidMount() {
    this.props.getCountries(() => {});
    this.props.getCities(() => {});
    this.props.getDistricts(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.districts) {
      this.setState({ districts: nextProps.districts });
    }
  }

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      districts,
      show_modal,
    } = this.state;

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
          <Col md="12">
            <LoadingOverlay
              active={is_table_loading}
              spinner
              text="Please Wait..."
            >
              <Card>
                <CardHeader>
                  Manage Districts
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
                        <th>City</th>
                        <th>Country</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {districts &&
                        districts.map((item, idx) => {
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
                                {item.country.en_name} - {item.country.ar_name}
                              </td>
                              <td>
                                {item.city.en_name} - {item.city.ar_name}
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
                              <td>
                                <Button
                                  size="xs"
                                  color="warning"
                                  className="mr-2"
                                  onClick={this.updateRow.bind(this, item)}
                                >
                                  <i className="fa fa-pencil" alt="Update"></i>
                                </Button>
                                {!item.is_active && (
                                  <Button
                                    size="xs"
                                    color="success"
                                    className="mr-2"
                                    onClick={this.markdistrict.bind(this, {
                                      id: item._id,
                                      is_active: true,
                                      is_deleted: item.is_deleted,
                                    })}
                                  >
                                    <i
                                      className="fa fa-check"
                                      alt="Enable Account"
                                    ></i>
                                  </Button>
                                )}
                                {item.is_active && (
                                  <Button
                                    size="xs"
                                    color="primary"
                                    className="mr-2"
                                    onClick={this.markdistrict.bind(this, {
                                      id: item._id,
                                      is_active: false,
                                      is_deleted: item.is_deleted,
                                    })}
                                  >
                                    <i
                                      className="fa fa-times"
                                      alt="Disable Account"
                                    ></i>
                                  </Button>
                                )}
                                {item.user_type !== "1" && (
                                  <Button
                                    size="xs"
                                    color="danger"
                                    onClick={this.markdistrict.bind(this, {
                                      id: item._id,
                                      is_active: item.is_active,
                                      is_deleted: true,
                                    })}
                                  >
                                    <i className="fa fa-trash" alt="Delete"></i>
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
    district: state.district.district,
    districts: state.district.districts,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getDistricts,
    selectDistrict,
    markdistrict,
    getCities,
    getCountries,
  })(Districts)
);
