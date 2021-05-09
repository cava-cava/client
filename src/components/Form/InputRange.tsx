import React, {ChangeEvent, FunctionComponent} from 'react';
import styles from './InputRange.module.scss'
import yellow from '../../assets/svg/inputRangeYellow.svg'

type InputRangeProps = {
    id?: string
    name: string
    value?: number
    setValue?: (value: number) => void
    min?: number
    max?: number
    step?: number
    convert?: number
}

const InputRange: FunctionComponent<InputRangeProps> = ({id, name, value, setValue, min, max, step, convert=1}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(setValue) setValue(Number(event.target.value));
    }

    return (
        <div className={styles.InputRange}>
            <input type="range" id={id} name={name} value={value} min={min} max={max} step={step} onChange={handleChange} />
            <div style={{width: `${value ? value*convert : 0}%`}}>
                <img src={yellow} />
            </div>
        </div>
    )
}

export default InputRange;
