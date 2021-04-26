import React, {FunctionComponent, useEffect, useState} from 'react';
import axios from "axios";

const AppDescription: FunctionComponent = () => {
    const [description, setDescription] = useState('')
    const fetchAppDescription = async () => {
        await axios.get('https://happiness-strapi.herokuapp.com/app').then(({data}) => {
            setDescription(data.description)
        }).catch(function (error) {
            console.error(error)
        })
    }

    useEffect(() => {
        fetchAppDescription()
    }, [])
    return (
        <div dangerouslySetInnerHTML={{
            __html: description
        }}/>
    )
}

export default AppDescription;
