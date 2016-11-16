import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import TinyMCE from 'react-tinymce';
import cls from 'classnames';

import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';
import ContentClear from 'material-ui/svg-icons/content/clear';

import {isGridClass, isPairTag} from './../helpers/type-helper';
import styles from './Node.css';

export default class Node extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    setMarkupEditor(e) {
        e.stopPropagation();
    }

    renderChildren() {
        let {state, 
            openMarkupEditor, 
            saveText, 
            moveNode, 
            cloneNode, 
            deleteNode,
            setCurrentNodePath} = this.props;
        let children = state.get('children');
        if (!children) return null;
        if (typeof children == 'string') return children;
        return children.map((state, key) => {
            return <Node key={key}
                         state={state}
                         openMarkupEditor={openMarkupEditor}
                         saveText={saveText}
                         moveNode={moveNode}
                         cloneNode={cloneNode}
                         deleteNode={deleteNode}
                         setCurrentNodePath={setCurrentNodePath}
                   />
        });
    }

    renderElement() {
        let {state, saveText, setCurrentNodePath} = this.props;
        let tag = {name: state.get('tag')};
        let attrs = state.get('attrs');
        if (state.get('editor') === 'text') {
            return <TinyMCE content={state.get('children')}
                            config={{
                                plugins: 'link image code',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                                inline: true,
                                menubar: false,
                                init_instance_callback: function (editor) {
                                    editor.on('blur', function (e) {
                                        saveText(e.target.getContent())
                                    });
                                    editor.on('focus', function (e) {
                                        setCurrentNodePath({id: state.get('id')})
                                    });
                                }
                            }}
                    />
        }
        if (isPairTag(state.get('tag'))) {
            let children = this.renderChildren();
            return (
                <tag.name {...attrs.toJS()}>
                    {children}
                </tag.name>
            )
        }
        return (
            <tag.name {...state.get('attrs').toJS()} />
        );
    }

    render() {
        let {state, 
            openMarkupEditor, 
            moveNode, 
            cloneNode, 
            deleteNode} = this.props;
        let inlineStyle = {
            display: 'inline-block',
            verticalAlign: 'middle',
            cursor: 'pointer'
        };
        console.log(`render: ${state.get('id')}`)
        return (
            <div className={cls(styles.node, state.get('id'), state.get('cls').toJS())} >
                {state.get('editor') ?
                <div className={styles.controls}>
                    <HardwareKeyboardArrowLeft style={inlineStyle} 
                                               color="#fff" 
                                               onClick={() => moveNode({up: true, id: state.get('id')})}/>
                    <HardwareKeyboardArrowRight style={inlineStyle} 
                                                color="#fff"
                                                onClick={() => moveNode({up: false, id: state.get('id')})} />
                    <ContentCreate style={inlineStyle} 
                                   color="#fff" 
                                   onClick={() => openMarkupEditor({editor: state.get('editor'), id: state.get('id')})} />
                    <ContentContentCopy style={inlineStyle} 
                                        color="#fff"
                                        onClick={() => cloneNode({id: state.get('id')})} />
                    <ContentClear style={inlineStyle} 
                                        color="#fff"
                                        onClick={() => deleteNode({id: state.get('id')})} />
                </div> : null
                }
                {this.renderElement()}
            </div>
        )
    }
}