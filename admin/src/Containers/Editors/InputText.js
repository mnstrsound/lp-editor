import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class InputText extends Component {
    render() {
        let {state, changeStateModel} = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Подсказка (placeholder)"
                    floatingLabelFixed={true}
                    defaultValue={state.getIn(['attrs', 'placeholder'])}
                    onBlur={(e) => changeStateModel({model: 'attrs.placeholder', value: e.target.value})}
                /><br/>
                <TextField
                    floatingLabelText="Значение по умолчанию (value)"
                    floatingLabelFixed={true}
                    defaultValue={state.getIn(['attrs', 'value'])}
                    onBlur={(e) => changeStateModel({model: 'attrs.value', value: e.target.value})}
                /><br/>
                <Checkbox
                    label="Обязательно (required)"
                    checked={state.getIn(['attrs', 'required'])}
                    onChange={(e) => changeStateModel({model: 'attrs.required', value: e.target.checked})}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InputText)