import React, { Component } from "react";
import { connect } from "react-redux";
import { startRegister } from "../../actions/auth";
import { showError, showInfo } from "../../actions/feedback";
import "./Register.css";

import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        username: "",
        password: ""
      }
    };
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      userDetails: {
        ...this.state.userDetails,
        [name]: value
      }
    });
  }

  submit() {
    let { username, password } = this.state.userDetails;
    if (!username) {
      return this.props.dispatch(showError("Username field is required"));
    }
    if (!password) {
      return this.props.dispatch(showError("Please provide a valid password"));
    }
    return this.props.dispatch(startRegister({ user: this.state.userDetails }));
  }

  render() {
    const { username, password } = this.state.userDetails;
    return (
      <div className="login-container">
        <Row className="justify-content-center">
          <Col md={11}>
            <Card className="p-4">
              <CardBody>
                <p className="text-muted">Create Account</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={e => this.handleInputChange(e)}
                    value={username}
                  />
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-key" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={e => this.handleInputChange(e)}
                    value={password}
                  />
                </InputGroup>
                <Row>
                  <Col xs="6">
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={() => this.submit()}
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Register);
