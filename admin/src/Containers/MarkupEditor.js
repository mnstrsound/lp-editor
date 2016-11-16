import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import ContentClear from 'material-ui/svg-icons/content/clear';
import RaisedButton from 'material-ui/RaisedButton';
import {Image, Link, InputText, Form} from './Editors';
import {changeStateModel} from '../Actions/Markup';
import styles from './MarkupEditor.css'

const editorTitle = (editor) => {
    let title;
    switch (editor) {
        case 'image':
            title = 'Редактировать изображение';
            break;
        case 'link':
            title = 'Редактировать ссылку';
            break;
        default:
            title = 'Редактировать элемент';
    }
    return title;
};

export default class MarkupEditor extends Component {
    renderEditor() {
        let {state} = this.props;
        let Editor = null;
        if (state) {
            let editor = state.get('editor');
            switch (editor) {
                case 'image':
                    Editor = Image;
                    break;
                case 'link':
                    Editor = Link;
                    break;
                case 'inputText':
                    Editor = InputText;
                    break;
                case 'form':
                    Editor = Form;
                    break;
                default:
                    Editor = null;
            }
        }
        const mapStateToProps = (state) => {
            return {
                state: state.getIn(['Markup', 'editor', 'state'])
            }
        };

        const mapDispatchToProps = dispatch => {
            return bindActionCreators({
                changeStateModel
            }, dispatch);
        };
        return state ? connect(mapStateToProps, mapDispatchToProps)(Editor) : null;
    }
    render() {
        let {state, closeMarkupEditor, saveMarkupEditorState} = this.props;
        let editor = state ? state.get('editor') : '';
        let Children = this.renderEditor();
        return (
            <Dialog
                title={editorTitle(editor)}
                modal={true}
                open={!!state}
                autoDetectWindowHeight={true}
            >
                <ContentClear className={styles.close}
                              onClick={() => {closeMarkupEditor()}}
                />
                {Children ? <Children /> : null}
                <div className={styles.buttons}>
                    <RaisedButton label="Сохранить"
                                  primary={true}
                                  onClick={() => {saveMarkupEditorState()}} />
                </div>
                
            </Dialog>
        );
    }
}