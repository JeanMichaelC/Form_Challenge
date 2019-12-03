import * as React from 'react';
import {IFormProps} from '../interfaces/IFormProps';


export class InputPassword extends React.Component<IInputProps, IInputPasswordState> {

    constructor(props: IInputProps) {
        super(props);

        this.state = {
            password: '',
            passwordError: '',
            passwordTip: ''
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement >) {
        let {name, value} = e.target;
        let errorName = 'passwordError';
        let errorValue: string = '';
        let tipName = 'passwordTip';
        let tipValue: string = '';
        const setErrorValue = () => {
            let tipAndError = this.validatePassword(errorValue);
            errorValue = tipAndError.error;
            tipValue = tipAndError.tip;
        }


        this.setState({
            [name]: value    
        }, () => {
            setErrorValue();
        });
        
        
        setTimeout(() => {
            this.props.handleInputChange(name, value, errorName, errorValue, tipName, tipValue);       
        },50);       
    }

    validatePassword = (passwordError: string) => {
        let passwordTip = '';
        let weakRegEx = new RegExp("^(?=.{8,})");
        let mediumRegEx = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
        let strongRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        

        const passwordIsWeak = () => {
            if(!this.state.password!.match(weakRegEx)) {
                return true;
            }
            return false;
        }
        const passwordIsNotWeak = () => {
            if(!this.state.password!.match(strongRegEx)) {
                return true;
            }
            return false;
        }
        const passwordIsAlmostStrong = () => {
            if(!this.state.password!.match(mediumRegEx)) {
                return true;
            }
            return false;
        }
        const fieldIsEmpty = () => {
            if(this.state.password! == '') {
                return true;
            }
            return false;
        }


        if(passwordIsWeak()) {
            passwordError = 'Enter at least 8 chars';
        } else {
            if(passwordIsNotWeak()) {
                passwordTip = 'But with an uppercaseChar the best!';
                passwordError = '';
            } 
            if(passwordIsAlmostStrong()) {
                passwordTip = 'If you add one number or lower letter better!';
                passwordError = '';
            }
        }

        
        if(fieldIsEmpty()) {
            passwordError = '';
        }
        this.setState({
            passwordError: passwordError,
            passwordTip: passwordTip
        });

        let tipAndError: any = {
            error: passwordError,
            tip: passwordTip
        }; 

        return tipAndError;
    }

    componentWillReceiveProps(props: any) {
        this.setState(props.parentCurrentState)
    }

    render() {
        return(
            <div className={this.state.passwordError ? "group group-error" : "group"}>
                <div className={this.state.passwordTip ? "group-tip" : ""}>
                    <input onChange={e => this.handleChange(e)} type="password" id="password" name="password" className="" value={this.state.password} required/>
                    <span className="bar"></span>
                    <label htmlFor="password">Password:</label>

                    <span className="input-error">{this.state.passwordError}</span>
                    <span className="input-tip">{this.state.passwordTip}</span>
                </div>
            </div>
        )
    }
}


interface IInputProps {
    handleInputChange: (inputName: any, inputValue: any,inputErrorName: any, inputErrorValue: any, inputErrorTipName?: any, inputErrorTipValue?: any) => void;
    parentCurrentState: IFormProps;
}

interface IInputPasswordState {
    password?: string,
    passwordError?: string,
    passwordTip?: string
}