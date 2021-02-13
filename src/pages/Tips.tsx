import React from 'react';
import {useHistory} from "react-router";
import FormTips from "../components/Tips/FormTips";
import ListTips from "../components/Tips/ListTips";

const Tips = () => {
    const history = useHistory();

    return (
        <div className="Tips">
            <h1>Tips</h1>
            <button onClick={() => history.goBack()}>Retour</button>
            <ListTips />
            <FormTips />
        </div>
    );
}

export default Tips;
