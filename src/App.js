import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	// fetching data from a server
	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			console.log('response', response.data);
			setPersons(response.data);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons[persons.length - 1].id + 1,
		};

		let exists = false;
		persons.forEach((person) => {
			if (
				person.name === personObject.name &&
				person.number === personObject.number
			) {
				exists = true;
				console.log(exists);
				return alert(
					`${personObject.name} is already added to the phonebook`
				);
			}
		});

		if (!exists) {
			axios
				.post('http://localhost:3001/persons', personObject)
				.then((response) => {
					console.log(response);
					setPersons(persons.concat(personObject));
					setNewName('');
					setNewNumber('');
				});
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
