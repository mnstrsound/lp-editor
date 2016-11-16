import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class Link extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        let {state, changeStateModel} = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Текст"
                    floatingLabelFixed={true}
                    defaultValue={state.get('children')}
                    onBlur={(e) => {changeStateModel({model: 'children', value: e.target.value})}}
                /><br/>
                <TextField
                    floatingLabelText="Ссылка"
                    floatingLabelFixed={true}
                    defaultValue={state.getIn(['attrs', 'href'])}
                    onBlur={(e) => {changeStateModel({model: 'attrs.href', value:e.target.value})}}
                />
            </div>
        )
    }
}