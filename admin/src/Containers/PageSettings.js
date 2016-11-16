import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {
    closePageSettingsEditor
} from "./../Actions/PageSettings";

import PageSettingsEditor from "./PageSettingsEditor";

class PageSettings extends Component {
    render() {
        let {
            editor,
            closePageSettingsEditor
        } = this.props;
        return (
            <div className="page-settings">
                <PageSettingsEditor
                    state={editor.get('state')}
                    closePageSettingsEditor={closePageSettingsEditor}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        settings: state.getIn(['PageSettings', 'settings']),
        editor: state.getIn(['PageSettings', 'editor'])
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        closePageSettingsEditor
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSettings);