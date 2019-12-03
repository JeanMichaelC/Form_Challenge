import * as React from 'react';

import { Form } from './Form';

import {IFormProps} from '../interfaces/IFormProps';

import '../styles/appStyles.css';
import '../styles/inputStyles.css';
import '../styles/formStyles.css';

export class App extends React.Component<AppProps, IFormProps> {

    constructor(props: AppProps) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }

    updateFromFormState(newState: IFormProps) {
        this.setState(newState);
    }

    render() {
        return(
            <div>
                <nav className="nav">
                    <a href="/" className="logo"> {this.props.fileName}</a>
                    
                </nav>

                <div className="cont">
                    <div className="form-card">
                        <h2 className="card-title">Time for a cup? <br/> Time for  <span className="coffee-title">Coffee</span><span>Learn</span>!</h2>

                        <Form updateFromFormState={this.updateFromFormState.bind(this)}/> 
                    </div>
                </div>

            </div>
        )
    };
}


interface AppProps {
    fileName: string;
}
