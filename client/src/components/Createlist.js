import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { sendList } from '../actions/listaActions';
import { connect } from 'react-redux';

import $ from "jquery";

import { Button, Container, Form, Col, FormGroup, Accordion, Card } from 'react-bootstrap';

const user = localStorage.getItem('user');

class Createlist extends Component {
  submit = (values) => {
    values["produtos"] = [];
    var produtosSelecionados = $("input[type=checkbox]:checked");
    for(var i = 0; i < produtosSelecionados.length; i++){
      let produto = produtosSelecionados[i];
      values["produtos"].push($(produto).attr("id"));
    }
    this.props.sendList(values, user);
  }

  render() {
    const { handleSubmit, list } = this.props;
    const {loadingSend} = list;
    return (
      <div className="form">
        <Container>
            <Col>
                <h2>Create List</h2>
                <Form onSubmit={ handleSubmit(this.submit) }>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>List name</Form.Label>
                    <Field name="listname"
                    component="input"
                    type="text"
                    placeholder="List about month" 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Produtos</Form.Label>  
                </Form.Group>

                <FormGroup>
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        Laticínios
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Form.Group controlId="1">
                              <Form.Check type="checkbox" label="Queijo Branco" id="1"/>
                            </Form.Group>
                            <Form.Group controlId="2">
                              <Form.Check type="checkbox" label="Queijo Prato" id="2" />
                            </Form.Group>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        Farinácios
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <Form.Group controlId="3">
                            <Form.Check type="checkbox" label="Farinha de Trigo" id="3" />
                          </Form.Group>
                          <Form.Group controlId="4">
                            <Form.Check type="checkbox" label="Farinha de Rosca" id="4"/>
                          </Form.Group>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </FormGroup>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    { loadingSend ? <p>Loading...</p> : ""}
                </Form>
            </Col>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { auth: state.auth, list: state.list };
  }
  const reduxFormSignin = reduxForm({
    form: 'createlist'
  })(Createlist);
  export default connect(mapStateToProps, {sendList})(reduxFormSignin);
