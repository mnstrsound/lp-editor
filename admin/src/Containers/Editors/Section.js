import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class Section extends Component {
    render() {
        return (
            <div>
                <TextField
                    hintText="Ссылка"
                    defaultValue={state.getIn(['attrs', 'children'])}
                />
                <br/>
                <TextField
                    hintText="Ссылка"
                    defaultValue={state.getIn(['attrs', 'children'])}
                />
            </div>
        )
    }
}