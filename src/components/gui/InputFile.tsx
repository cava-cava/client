import React, {FunctionComponent} from 'react';

type InputFileProps = {
    refs: any
    accept?: string
    setValue: (value:string) => void
}

const InputFile: FunctionComponent <InputFileProps> = ({refs, accept= '.json', setValue}) => {

    const setUrlFile = (files:File|undefined) => {
        if (!files) return
        const fileReader = new FileReader()
        fileReader.readAsDataURL(files)
        fileReader.onloadend = (event) => {
            setValue((event.target && typeof event.target.result === "string") ? event.target.result : "")
        }
    }

    return (<input ref={refs} accept={accept} type="file" style={{visibility: "hidden"}} onChange={event => setUrlFile((event.target.files && event.target.files[0])? event.target.files[0] : undefined)} />);
}

export default InputFile;
