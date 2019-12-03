import * as React from 'react';
import {IFormProps} from '../interfaces/IFormProps';

export class InputName extends React.Component<IInputProps, IInputNameState> {

    constructor(props: IInputProps) {
        super(props);

        this.state = {
            name: '',
            nameError: ''
        }
    }

    // handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement >) {
    //     let {name, value} = e.target;
    //     let errorName = 'nameError';
    //     let errorValue = this.state.nameError;


    //     this.setState({
    //         [name]: value,
    //     };

    //     this.props.handleInputChange(name, value, errorName, errorValue);       
    // }
    handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement >) {
        let {name, value} = e.target;
        let errorName = 'nameError';
        let errorValue: string = '';   
        const setErrorValue = () => {
            errorValue = this.validateName(errorValue);
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

    validateName = (nameError: string) => {
        
        const isTooShort = () => {
            if(this.state.name!.length < 8) {
                return true;
            }
            return false;
        }
        const thereIsASpace = () => {
            if(this.state.name!.indexOf(' ') !== -1) {
                return true;
            }
            return false;
        }
        const fieldIsEmpty = () => {
            if(this.state.name! == '') {
                return true;
            }
            return false;
        }

        
        if(isTooShort()) {
            nameError = 'Enter at least 8 characters';
        }
        if(thereIsASpace()) {
            nameError = 'The user name cannot have spaces';
        }
        

        if(fieldIsEmpty()) {
            nameError = '';
        }
        this.setState({
            nameError: nameError
        });
        return nameError;
    }

    componentWillReceiveProps(props: any) {
        this.setState(props.parentCurrentState)
    }

    render() {
        return(
            <div className={this.state.nameError ? "group group-error" : "group"}>
                <input onChange={e => this.handleChange(e)} type="text" id="name" name="name" className="" value={this.state.name} required/>
                <span className="bar"></span>
                <label htmlFor="name">Name:</label>

                <span className="input-error">{this.state.nameError}</span>
                
            </div>
        )
    }
}


interface IInputProps {
    handleInputChange: (inputName: any, inputValue: any,inputErrorName: any, inputErrorValue: any, inputErrorTipName?: any, inputErrorTipValue?: any) => void;
    parentCurrentState: IFormProps;
}

interface IInputNameState {
    name?: string,
    nameError?: string
}
