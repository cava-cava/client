import React, {ChangeEvent, FunctionComponent} from 'react';
import styles from './InputText.module.scss'

type InputTextProps = {
    id?: string,
    name: string,
    placeholder?: string,
    autoComplete?: string,
    maxLength?: number,
    value?: string,
    setValue?: (value: string) => void,
    hasError?: boolean
}

const InputText: FunctionComponent<InputTextProps> = ({
                                                          id,
                                                          name,
                                                          maxLength,
                                                          placeholder,
                                                          autoComplete = "off",
                                                          value,
                                                          setValue,
                                                          hasError
                                                      }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (setValue) setValue(event.target.value);
    }

    return (
        <input type="text" className={`${styles.InputText} ${hasError && styles.InputTextError}`} id={id} name={name}
               maxLength={maxLength} placeholder={placeholder} autoComplete={autoComplete} value={value}
               onChange={handleChange}/>)
}

export default InputText;
