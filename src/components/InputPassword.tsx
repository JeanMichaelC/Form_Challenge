import * as React from 'react';


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
        let errorValue = this.state.passwordError;


        this.setState({
            [name]: value,

        }, () => {
            this.validatePassword();
        });

        this.props.handleInputChange(name, value, errorName, errorValue);       
    }

    validatePassword = () => {
        let passwordError = '';
        let passwordTip = '';
        let weakRegEx = new RegExp("^(?=.{8,})");
        let mediumRegEx = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
        let strongRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        

        if(this.state.password !== undefined && !this.state.password.match(weakRegEx)) {
            passwordError = 'Enter at least 8 chars'
        } else {
            if(this.state.password !== undefined && !this.state.password.match(strongRegEx)) {
                passwordTip = 'But with an uppercaseChar the best!'
            } 
            if(this.state.password !== undefined && !this.state.password.match(mediumRegEx)) {
                passwordTip = 'If you add one number or lower letter better!'
            }
        }

        
        if(this.state.password !== undefined && this.state.password == '') {
            passwordError = '';
        }
        this.setState({
            passwordError: passwordError,
            passwordTip: passwordTip
        });
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
    handleInputChange: (inputName: any, inputValue: any,inputErrorName: any, inputErrorValue: any) => void;
}

interface IInputPasswordState {
    password?: string,
    passwordError?: string,
    passwordTip?: string
}