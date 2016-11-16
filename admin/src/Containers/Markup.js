import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {Node} from './../Components';
import {
    openMarkupEditor,
    closeMarkupEditor,
    moveNode,
    saveMarkupEditorState,
    saveText,
    cloneNode,
    deleteNode,
    setCurrentNodePath
} from './../Actions/Markup';
import MarkupEditor from './MarkupEditor';

class Markup extends Component {
    renderNodes() {
        let {nodes, openMarkupEditor, moveNode, cloneNode, saveText, deleteNode, setCurrentNodePath} = this.props;
        return <Node state={nodes}
                     openMarkupEditor={openMarkupEditor}
                     saveText={saveText}
                     moveNode={moveNode}
                     cloneNode={cloneNode}
                     deleteNode={deleteNode}
                     setCurrentNodePath={setCurrentNodePath}
                />
    }
    render() {
        let {editor, closeMarkupEditor, saveMarkupEditorState} = this.props;
        return (
            <div className="elements">
                <MarkupEditor state={editor.get('state')}
                              currentNodePath={editor.get('currentNodePath')}
                              closeMarkupEditor={closeMarkupEditor}
                              saveMarkupEditorState={saveMarkupEditorState}
                />
                {this.renderNodes()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.getIn(['Markup','nodes']),
        editor: state.getIn(['Markup','editor'])
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        openMarkupEditor,
        closeMarkupEditor,
        moveNode,
        saveText,
        cloneNode,
        deleteNode,
        setCurrentNodePath,
        saveMarkupEditorState
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Markup);