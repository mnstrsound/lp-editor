import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FileCloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import Snackbar from 'material-ui/Snackbar';

import {Node, Loading} from './Components';
import {Markup, PageSettings} from './Containers';
import {openPageSettingsEditor} from "./Actions/PageSettings";
import {saveState} from "./Actions/Markup";

class App extends React.Component {

    render() {
        let style = {
            position: 'fixed',
            right: 20,
            zIndex: 10
        };
        let settingsStyle = {
            ...style,
            top: 20
        };
        let saveStyle = {
            ...style,
            top: 70
        };
        let loadingStyle = {
            ...style,
            top: 70
        };
        let {
            saveState,
            openPageSettingsEditor,
            loading,
            snackbar
        } = this.props;
        return (
            <div className="app">
                    <Loading loading={loading} style={loadingStyle} onClick={() => saveState()} >
                        <FileCloudUpload />
                    </Loading>
                    <FloatingActionButton mini={true} style={settingsStyle} onClick={() => openPageSettingsEditor()}>
                        <ActionSettings />
                    </FloatingActionButton>
                    <Snackbar
                      open={snackbar.get('show')}
                      message={snackbar.get('text')}
                      autoHideDuration={4000}
                      onRequestClose={this.handleRequestClose}
                    />
                    <PageSettings />
                    <Markup />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.getIn(['Markup', 'editor', 'loading']),
        snackbar: state.getIn(['Markup', 'editor', 'snackbar'])
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        openPageSettingsEditor,
        saveState
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
