import React, {FunctionComponent} from 'react';

const OhMyGod: FunctionComponent = () => {
    const handleClick = () => {
        console.log('send/emit socket action')
    }
    return (
        <>
            <h1>OMGGGGGGG !!!!!!!!</h1>
            <button role="button" onClick={handleClick}>Click !!!!!</button>
        </>
    )
}

export default OhMyGod;
