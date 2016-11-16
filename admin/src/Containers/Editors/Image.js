import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import {MediaLibrary} from '../../Components';

export default class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectImage: false
        }
    }
    openMediaLibrary() {
        this.setState({selectImage: true})
    }
    render() {
        let {state, changeStateModel} = this.props;
        return <div>
                    <TextField
                        floatingLabelText="Alt"
                        floatingLabelFixed={true}
                        defaultValue={state.getIn(['attrs', 'alt'])}
                        onBlur={(e) => changeStateModel({model: 'attrs.alt', value: e.target.value})}
                    /><br/>
                    <TextField
                        floatingLabelText="Title"
                        floatingLabelFixed={true}
                        defaultValue={state.getIn(['attrs', 'title'])}
                        onBlur={(e) => changeStateModel({model: 'attrs.title', value: e.target.value})}
                    /><br/>
                    <Paper onClick={() => {this.openMediaLibrary()}}>
                        <img src={state.getIn(['attrs', 'src'])} alt=""/>
                    </Paper>
                    <MediaLibrary open={this.state.selectImage}
                                  close={() => this.setState({selectImage: false})}
                                  onFileUpload={(file) => {console.log(file)}}
                                  onSelect={(file) => { changeStateModel({model: 'attrs.src', value: file}), this.setState({selectImage: false})}}
                                  onFileChange={(file) => {console.log(file)}}
                    />
                </div>
    }
}