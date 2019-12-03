import * as React from 'react';


export class InputEmail extends React.Component<IInputProps, IInputEmailState> {

    constructor(props: IInputProps) {
        super(props);

        this.state = {
            email: '',
            emailError: ''            
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement >) {
        let {name, value} = e.target;
        let errorName = 'emailError';
        let errorValue = this.state.emailError;

        
        this.setState({
            [name]: value,

        }, () => {
            this.validateEmail();
        });

        this.props.handleInputChange(name, value, errorName, errorValue);       
    }

    validateEmail = () => {
        let emailError = ''; 
        
        if(this.state.email !== undefined && this.state.email.indexOf('@') === -1) {
            emailError = 'The email must have a "@" symbol';
        }
        if(this.state.email !== undefined && this.state.email.indexOf(' ') !== -1) {
            emailError = 'Don\'t use spaces in the email';
        }
        
        if(this.state.email !== undefined && this.state.email == '') {
            emailError = '';
        }
        this.setState({
            emailError: emailError
        });
    }

    render() {
        return(
            <div className={this.state.emailError ? "group group-error" : "group"}>
                <input onChange={e => this.handleChange(e)} type="text" id="email" name="email" className="" value={this.state.email} required/>
                <span className="bar"></span>
                <label className="" htmlFor="email">Email:</label>

                <span className="input-error">{this.state.emailError}</span>
            </div>
        )
    }
}


interface IInputProps {
    handleInputChange: (inputName: any, inputValue: any,inputErrorName: any, inputErrorValue: any) => void;
}

interface IInputEmailState {
    email?: string,
    emailError?: string
}