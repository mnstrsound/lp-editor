import React, {Component} from "react";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './PageSettingsEditor.css';

export default class PageSettingsEditor extends Component {
    render() {
        let {
            state,
            closePageSettingsEditor
        } = this.props;

        return (
            <Dialog
                title="Настройки страницы"
                modal={true}
                open={!!state}
                autoDetectWindowHeight={true}
            >
                <ContentClear className={styles['close-btn']}
                              onClick={() => {closePageSettingsEditor()}} />
                {state ? <div>
                    <div className="row">
                        <div className="col-xs-6">
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Заголовок (title)"
                                floatingLabelFixed={true}
                                value={state.get('title')}
                            /><br/>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Ключевые слова (keywords)"
                                floatingLabelFixed={true}
                                value={state.getIn(['keywords', 'content'])}
                                multiLine={true}
                                rows={2}
                                rowsMax={5}
                            /><br/>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Описание (description)"
                                floatingLabelFixed={true}
                                value={state.getIn(['description', 'content'])}
                                multiLine={true}
                                rows={2}
                                rowsMax={5}
                            /><br/>
                        </div>
                        <div className="col-xs-6">
                            <h3>Скрипты</h3>
                            {state.get('customScripts').map((item, index) => {
                                let type = item.get('type');
                                let content = item.get('content');
                                let isCode = type === 'code';

                                return <TextField
                                    key={index}
                                    fullWidth={true}
                                    floatingLabelText={isCode ? 'Вставьте код' : 'Ссылка на файл' }
                                    floatingLabelFixed={true}
                                    multiLine={isCode}
                                    rows={isCode ? 5 : 1}
                                    rowsMax={isCode ? 5 : 1}
                                    defaultValue={content}
                                />
                            })}
                        </div>
                    </div>
                    <RaisedButton label="Сохранить"
                                  primary={true}
                                  className={styles['save-btn']} />
                </div> : null }
            </Dialog>
        );
    }
}