import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Main extends Component {
    render() {
        let {templates, createTemplatePage} = this.props;
        return (
            <div>
                <h2>Выберите свой первый шаблон</h2>
                <div className="container">
                    <div className="row">
                    {templates.map(function (item, index) {
                        return (
                            <div key={index} className="col-xs-3">
                                <img style={{maxWidth: '100%'}} src="src/templates/template/img/lp.jpg" alt=""/>
                                <RaisedButton label="Выбрать"
                                              primary={true}
                                              fullWidth={true}
                                              onClick={() => {createTemplatePage(item)}} />
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        )
    }
}