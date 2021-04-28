import React, {ChangeEvent, FunctionComponent} from 'react';
import styles from './InputText.module.scss'

type InputTextProps = {
    id?: string,
    name: string,
    placeholder?: string,
    maxLength?: number,
    value: string,
    setValue: (value: string) => void
}

const InputText: FunctionComponent<InputTextProps> = ({id, name, maxLength, placeholder, value, setValue}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <input type="text" className={styles.InputText} id={id} name={name} maxLength={maxLength} placeholder={placeholder} value={value} onChange={handleChange}/>
    )
}

export default InputText;
