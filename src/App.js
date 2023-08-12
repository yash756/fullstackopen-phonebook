import React from 'react';
import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);

    const [newName, setNewName] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        //console.log('button clicked', event.target);

        const personObject = {
            name: newName,
        };

        let exists = false;
        persons.forEach((person) => {
            if (JSON.stringify(person) === JSON.stringify(personObject)) {
                exists = true;
                return alert(
                    `${personObject.name} is already added to the phonebook`
                );
            }
        });

        if (!exists) {
            setPersons(persons.concat(personObject));
            setNewName('');
        }
    };

    const handleNameChange = (event) => {
        //console.log(event.target.value);
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <div key={person.name}>{person.name}</div>
            ))}
        </div>
    );
};

export default App;
