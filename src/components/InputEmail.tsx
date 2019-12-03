import * as React from 'react';
import {IFormProps} from '../interfaces/IFormProps';


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
        let errorValue: string = '';   
        const setErrorValue = () => {
            errorValue = this.validateEmail(errorValue);
        }


        this.setState({
            [name]: value    
        }, () => {
            setErrorValue();
        });
        
        
        setTimeout(() => {
            this.props.handleInputChange(name, value, errorName, errorValue);       
        },50);      
    }

    validateEmail = (emailError: string) => {
        let charAtIndex: number = 
        this.state.email!.indexOf('@');
        let charDotIndex: number = this.state.email!.indexOf('.');

        const contextOfAtCharIsNotValid = () => {
            if(this.state.email!.charAt(charAtIndex + 1) === '.' || this.state.email!.charAt(charAtIndex + 1) === ' ' || this.state.email!.charAt(charAtIndex + 1) === '' || this.state.email!.charAt(charAtIndex - 1) === '.' || this.state.email!.charAt(charAtIndex - 1) === ' ' || this.state.email!.charAt(charAtIndex - 1) === '') {
                return true;
            }
            return false;
        } 
        const dotHasNoDomainExtension = () => {
            if(this.state.email!.charAt(charDotIndex + 1) === '') {
                return true;
            }
            return false;
        }
        const thereIsNoDot = () => {
            if(this.state.email!.indexOf('.') === -1) {
                return true;
            }
            return false;
        }
        const thereIsNoAtChar = () => {
            if(this.state.email!.indexOf('@') === -1) {
                return true;
            }
            return false;
        }
        const thereIsASpace = () => {
            if(this.state.email!.indexOf(' ') !== -1) {
                return true;
            }
            return false;
        }
        const fieldIsEmpty = () => {
            if(this.state.email! == '') {
                return true;
            }
            return false;
        }
        
        
        if(thereIsNoDot()) {
            emailError = 'The email must have a valid format';
        }
        if(contextOfAtCharIsNotValid()) {
            emailError = 'The email must have a valid format';
        }
        if(dotHasNoDomainExtension()) {
            emailError = 'Enter a domain extension';
        }
        if(thereIsNoAtChar()) {
            emailError = 'The email must have an " @"';
        }
        if(thereIsASpace()) {
            emailError = 'The email cannot have spaces';
        }


        if(fieldIsEmpty()) {
            emailError = '';
        }
        this.setState({
            emailError: emailError
        });
        return emailError;
    }

    componentWillReceiveProps(props: any) {
        this.setState(props.parentCurrentState)
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
    handleInputChange: (inputName: any, inputValue: any,inputErrorName: any, inputErrorValue: any, inputErrorTipName?: any, inputErrorTipValue?: any) => void;
    parentCurrentState: IFormProps;
}

interface IInputEmailState {
    email?: string,
    emailError?: string
}