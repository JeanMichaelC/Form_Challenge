import * as React from 'react';


export class InputName extends React.Component<IInputProps, IInputNameState> {

    constructor(props: IInputProps) {
        super(props);

        this.state = {
            name: '',
            nameError: ''
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement >) {
        let {name, value} = e.target;
        let errorName = 'nameError';
        let errorValue = this.state.nameError;


        this.setState({
            [name]: value,

        }, () => {
            this.validateName();
        });

        this.props.handleInputChange(name, value, errorName, errorValue);       
    }

    validateName = () => {
        let nameError = '';
        
        if(this.state.name !== undefined && this.state.name.length < 8) {
            nameError = 'Enter at least 8 characters';
        }
        
        if(this.state.name !== undefined && this.state.name == '') {
            nameError = '';
        }
        this.setState({
            nameError: nameError
        });
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
    handleInputChange: (inputName: any, inputValue: any,inputErrorName: any, inputErrorValue: any) => void;
}

interface IInputNameState {
    name?: string,
    nameError?: string
}
