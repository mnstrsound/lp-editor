import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';

class Form extends Component {
    render() {
        let {state} = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Тема"
                    floatingLabelFixed={true}
                /><br/>
                <TextField
                    floatingLabelText="Идентификатор цели"
                    floatingLabelFixed={true}
                />
            </div>
        )
    }
}