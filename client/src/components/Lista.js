import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getList} from '../actions/listaActions';

const user = localStorage.getItem('user');

class Lista extends Component {

    
    componentDidMount() {
        this.props.dispatch(getList(user));
    }
    

  render() {
      console.log(this.props.list);
      const {loading, list, error} = this.props.list;
      const {lista} = list;
    return (
      <div>
          <p>Lista</p>
          {
            loading ? <p>Loading...</p> :
            error ? <p>Error no servidor</p> :
            lista.message ? <p>Error Token</p> : 
            lista.map((item, i) => {
              return(
                <p key={i}>{item.products}</p>
              )
            })
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { list: state.list };
}

export default connect(mapStateToProps)(Lista);

