import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileCloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import cls from 'classnames';

import styles from './Loading.css';

export default class Loading extends Component {
	render() {
		let {loading, 
			style, 
			onClick, 
			className} = this.props;
		return (
			<div className={cls(styles.loading, className)} 
				style={style} 
				onClick={onClick}>
			    {loading ? <CircularProgress size={50} thickness={5} className={styles.progress} /> : null}
				<FloatingActionButton mini={true} >
                    {this.props.children}
                </FloatingActionButton>
			</div>
		)
	}
}

