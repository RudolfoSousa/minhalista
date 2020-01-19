import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getList} from '../actions/listaActions';
import { Card, ListGroup, ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';

const user = localStorage.getItem('user');

class Lista extends Component {

    
    componentWillMount() {
        this.props.dispatch(getList(user));
    }
    

  render() {
    const {loading, list, error} = this.props.list;
    const {lista} = list;
    return (
      <div>
          <h1>Listas</h1>
          {
            loading ? <p>Loading...</p> :
            error ? <p>Error no servidor</p> :
            lista ? 
            lista.message ? <p>Error Token</p> : 
            lista.map((item, i) => {
              return(
                // <p key={i}>{item.products}</p>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                  <Card.Body>
                    <Card.Title>{item.listName}</Card.Title>
                    <Card.Text>
                      <p>{item.description ? item.description : "Descricao"}</p>
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                  <ButtonToolbar>
                    <Button variant="warning">Editar</Button>
                    <Button variant="danger">Excluir</Button>
                  </ButtonToolbar>
                  </Card.Body>
                </Card>
              )
            })
            : ""
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { list: state.list, auth: state.auth };
}

export default connect(mapStateToProps)(Lista);

