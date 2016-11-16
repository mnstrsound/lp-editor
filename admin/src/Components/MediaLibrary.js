import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Loading from './Loading' 
import API from '../API'

import styles from './MediaLibrary.css';
// import ReactCrop from 'react-image-crop';

const style = {
    height: 100,
    width: 100,
    marginRight: 20,
    textAlign: 'center',
    display: 'inline-block',
};


let i = 0;

class MediaLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            files: [],
            loadFile: false
        };
    }

    componentDidMount() {
        this.getMedia();
    }

    getMedia() {
        API.getMedia()
            .then(data => {
                this.setState({files: data.data});
            })
    }

    uploadMedia(file) {
        this.setState({loadFile: true});
        API.uploadMedia(file)
            .then(data => {
                if (data.status === 'success')
                    this.setState({files: data.data, loadFile: false});
            })
    }

    openFileInput() {
        let inputFile = this._inputFile;
        inputFile.click();
    }

    selectFile(file) {
        this.setState({selected: file});
    }

    render() {
        let {open,
            close,
            onSelect} = this.props;
        return (
            <Dialog title="Библиотека медиафайлов"
                    modal={false}
                    open={open}>
                <ContentClear 
                          className={styles.close}
                          onClick={() => {close()}}
                />
                {this.state.files.length ?
                <div className={styles.wrapper}>
                    <div className={styles.files}>
                        {this.state.files.map((item, index) => {
                            return <Paper key={index}
                                          style={style}
                                          zDepth={item === this.state.selected ? 2 : 1}
                                          className={styles.file}
                                          onClick={() => this.selectFile(item)}>
                                <img src={item} alt="" />
                            </Paper>
                        })}
                    </div>
                    <Divider />
                    <div>
                        <RaisedButton label="Выбрать"
                                      primary={true}
                                      className={styles['select-button']}
                                      onClick={() => onSelect(this.state.selected)}
                                      disabled={!this.state.selected}/>
                        <Loading className={styles['add-file']}
                                 loading={this.state.loadFile}
                                 onClick={() => this.openFileInput()} >
                            <ContentAdd />
                        </Loading>
                        <input type="file"
                               className={styles['input-file']}
                               onChange={(e) => this.uploadMedia(e.target.files[0])}
                               ref={(c) => this._inputFile = c}/>
                    </div>
                </div> :
                <LinearProgress mode="indeterminate" />
                }
            </Dialog>
        );
    }
}

export default MediaLibrary