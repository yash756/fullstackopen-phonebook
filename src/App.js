import React from 'react';
import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ]);

    let currentId = persons[persons.length - 1].id;

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        //console.log('button clicked', event.target);

        const personObject = {
            name: newName,
            number: newNumber,
            id: currentId + 1,
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
            setNewNumber('');
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const peopleToShow = persons.filter(
        (person) =>
            person.name.includes(filter) ||
            person.name.includes(filter.toUpperCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter: <input value={filter} onChange={handleFilter} />
            </div>
            <h2>Add a number</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{' '}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {peopleToShow.map((person) => (
                <div key={person.id}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    );
};

export default App;
