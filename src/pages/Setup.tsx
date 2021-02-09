import React, {ChangeEvent, FormEvent, useState} from 'react';

const Setup = () => {
    const [name, setName] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = (event: FormEvent) => {
        alert('Le nom a été soumis : ' + name);
        event.preventDefault();
    }
    return (
        <div className="setup">
            <h1>Setup</h1>
            <form onSubmit={handleSubmit}>
                <label>Entrer un nom</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                <input type="submit" value="Envoyer"/>
            </form>
        </div>
    );
}

export default Setup;
