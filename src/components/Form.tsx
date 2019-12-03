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
        

        let formIsValid: boolean = false;

        if((nameError && emailError && passwordError) === '') {
            formIsValid = true;
        }

        if(formIsValid) {
            console.log('El formulario es válido');
            this.props.updateFromFormState(newState);

            // Aquí tengo que pasarle una función a los componentes. 
            this.resetState();
        } else {
            console.log('El formulario NO es válido!!!!');
        }
        
        
    }

    resetState() {
        this.setState({
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            passwordTip: ''
        });
    }

    handleInputChange(inputName: any, inputValue: any, inputErrorName: any, inputErrorValue: any) {
        this.setState({
            [inputName]: inputValue,
            [inputErrorName]: inputErrorValue
        });
    }

    render() {
        return(
            <div className="flexito">

                <form onSubmit={e => this.handleSubmit(e)} className="form" action="">
           
                    <InputName clearedState={this.state} handleInputChange={this.handleInputChange.bind(this)} />

                  
                    <InputEmail clearedState={this.state} handleInputChange={this.handleInputChange.bind(this)} />

               
                    <InputPassword clearedState={this.state} handleInputChange={this.handleInputChange.bind(this)} />
                    
                    <input className="cta" type="submit" value="Sign In"/>
                </form>
            </div>
        )
    }
}


interface ITaskFormProps {
    updateFromFormState: (newState: IFormProps) => void;
}