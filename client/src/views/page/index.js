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
  FormGroup,
  Label,
  Button,
  Input,
} from "reactstrap";

import { getPage, addorUpdatePage } from "../../redux/page/action";

class AddCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      privacy: "",
      terms: "",
      is_loading: false,
      errors: {},
    };
  }

  is_loading = (e) => {
    this.setState({ is_loading: !this.state.is_loading });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ terms: "", privacy: "" });
    this.props.getPage(this.is_loading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.page) {
      this.setState({
        privacy: nextProps.page.privacy || "",
        terms: nextProps.page.terms || "",
        id: nextProps.page._id || null,
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
    formData.append("terms", this.state.terms);
    formData.append("privacy", this.state.privacy);

    this.props.addorUpdatePage(formData, this.is_loading);
  };

  render() {
    const { terms, privacy, is_loading, errors } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_loading} spinner text="Please Wait...">
          <Card>
            <CardHeader>Manage Pages</CardHeader>
            <CardBody>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="terms">Terms & Condition</Label>
                    <Input
                      type="textarea"
                      name="terms"
                      onChange={this.onChange}
                      id="terms"
                      value={terms}
                      placeholder="Terms & Condition"
                      style={{ minHeight: "250px" }}
                    />
                    <p className="error">{errors && errors.terms}</p>
                  </FormGroup>
                  <FormGroup>
                    <Label for="privacy">Privacy & Policy</Label>
                    <Input
                      type="textarea"
                      name="privacy"
                      onChange={this.onChange}
                      id="privacy"
                      value={privacy}
                      placeholder="Privacy & Policy"
                      style={{ minHeight: "250px" }}
                    />
                    <p className="error">{errors && errors.privacy}</p>
                  </FormGroup>
                  <Button color="primary" onClick={this.onSubmit}>
                    Update
                  </Button>{" "}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    page: state.page.page,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getPage, addorUpdatePage })(AddCountry)
);
