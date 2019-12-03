import * as React from 'react';

import { InputName } from './InputName';
import { InputEmail } from './InputEmail';
import { InputPassword } from './InputPassword';

import {IFormProps} from '../interfaces/IFormProps';


export class Form extends React.Component<ITaskFormProps, IFormProps> {

    constructor(props: ITaskFormProps) {
        super(props);

        this.state = {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            passwordTip: ''
        }
    }

     

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let newState: IFormProps = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }; 
        let nameError = this.state.nameError;
        let emailError = this.state.emailError;
        let passwordError = this.state.passwordError;
        
        // let formIsValid: boolean = false;
        const thereIsNoError = () => {
            if (this.state.nameError === '' && this.state.emailError === '' && this.state.passwordError === '') {
                return true;
            }
            return false;
        }
        // if((nameError && emailError && passwordError) === '') {
        //     formIsValid = true;
        // } else {
        //     formIsValid = false;
        // }

        if(thereIsNoError()) {
            console.log('El formulario es válido');

            // Aquí tengo que pasarle una función a los componentes. 
            this.setState({
                name: '',
                nameError: '',
                email: '',
                emailError: '',
                password: '',
                passwordError: '',
                passwordTip: ''
            }, () => {
                this.props.updateFromFormState(newState);
            });

            alert('The form was sent successfully!');
        } else {
            alert('The form is not valid!');
        }
        
        
    }

    handleInputChange(inputName: any, inputValue: any, inputErrorName: any, inputErrorValue: any, inputErrorTipName: any, inputErrorTipValue: any) {
        this.setState({
            [inputName]: inputValue,
            [inputErrorName]: inputErrorValue,
            [inputErrorTipName]: inputErrorTipValue
        });
    }

    render() {
        return(
            <div className="flexito">

                <form onSubmit={e => this.handleSubmit(e)} className="form" action="">
           
                    <InputName parentCurrentState={this.state} handleInputChange={this.handleInputChange.bind(this)} />

                  
                    <InputEmail parentCurrentState={this.state} handleInputChange={this.handleInputChange.bind(this)} />

               
                    <InputPassword parentCurrentState={this.state} handleInputChange={this.handleInputChange.bind(this)} />
                    
                    <input className="cta" type="submit" value="Sign In"/>
                </form>
            </div>
        )
    }
}


interface ITaskFormProps {
    updateFromFormState: (newState: IFormProps) => void;
}