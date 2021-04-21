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

import { getUsers, addorUpdateUser } from "../../redux/users/action";

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
      is_modal_loading: false,
      show_modal: false,
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ password2: "", password: "" });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });
    if (nextProps && nextProps.user) {
      this.setState({
        first_name: nextProps.user.first_name,
        last_name: nextProps.user.last_name,
        email: nextProps.user.email,
        id: nextProps.user._id,
      });
    }

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        password: "",
        password2: "",
      });
    }
    if (nextProps && nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onSubmit = () => {
    const data = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.addorUpdateUser(
      data,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      password2,
      id,
      is_modal_loading,
      errors,
      show_modal,
    } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} User
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="first_name">First Name</Label>
                    <Input
                      type="text"
                      name="first_name"
                      onChange={this.onChange}
                      id="first_name"
                      value={first_name}
                      placeholder="First Name"
                    />
                    <p className="error">{errors && errors.first_name}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input
                      type="text"
                      name="last_name"
                      onChange={this.onChange}
                      id="last_name"
                      value={last_name}
                      placeholder="Last Name"
                    />
                    <p className="error">{errors && errors.last_name}</p>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={this.onChange}
                  id="email"
                  value={email}
                  placeholder="Email"
                />
                <p className="error">{errors && errors.email}</p>
              </FormGroup>
              <FormGroup>
                <Label for="password">
                  Password{" "}
                  {id ? `(only compulsory while creating the user)` : ""}
                </Label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  id="password"
                  value={password}
                  placeholder="Password"
                />
                <p className="error">{errors && errors.password}</p>
              </FormGroup>
              {password && (
                <FormGroup>
                  <Label for="password2">Confirm Password</Label>
                  <Input
                    type="password"
                    name="password2"
                    onChange={this.onChange}
                    id="password2"
                    value={password2}
                    placeholder="Confirm Password"
                  />
                  <p className="error">{errors && errors.password2}</p>
                </FormGroup>
              )}
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
    users: state.users.users,
    user: state.users.user,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getUsers, addorUpdateUser })(AddUser)
);
