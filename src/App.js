import React from 'react';
import { useState, useEffect } from 'react';
import peopleServices from './services/persons';
import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState(null);

	const Notification = ({ message }) => {
		if (message === null) {
			return null;
		}

		return <div className="notification">{message}</div>;
	};

	// fetching data from a server
	useEffect(() => {
		peopleServices.getPeople().then((people) => setPersons(people));
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
			} else if (
				person.name === personObject.name &&
				person.number !== personObject.number
			) {
				if (
					window.confirm(
						`${personObject.name} is already added to phonebook, replace the old number with a new one ?`
					)
				) {
					axios
						.put(
							`http://localhost:3001/persons/${person.id}`,
							personObject
						)
						.then((response) => {
							console.log(response.data);
							setPersons(
								persons.map((p) =>
									p.id === response.data.id
										? response.data
										: p
								)
							);
						})
						.catch((error) => {
							console.log('update error ', error);
							setMessage(
								`Information of ${personObject.name} has already been removed from the server`
							);
							setTimeout(() => {
								setMessage(null);
							}, 3000);
						});
					exists = true;
					setMessage(`Number changed for ${personObject.name}`);
					setTimeout(() => {
						setMessage(null);
					}, 3000);
					return;
				}
			}
		});

		if (!exists) {
			peopleServices.addPeople(personObject).then((response) => {
				setPersons(persons.concat(response));
				setNewName('');
				setNewNumber('');

				setMessage(`${personObject.name} was added to the phonebook`);
				setTimeout(() => {
					setMessage(null);
				}, 3000);
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

	const handleDelete = ({ id, name }) => {
		console.log(id);
		if (window.confirm(`delete ${name} ?`)) {
			axios
				.delete(`http://localhost:3001/persons/${id}`)
				.then((response) => {
					console.log('delete respones', response);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
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
					<button onClick={() => handleDelete(person)}>delete</button>
				</div>
			))}
		</div>
	);
};

export default App;
