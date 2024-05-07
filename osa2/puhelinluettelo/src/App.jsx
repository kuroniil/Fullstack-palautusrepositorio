import { useState, useEffect } from 'react'
import PersonForm from "./components/personform.jsx"  
import Filter from "./components/filter.jsx"
import Persons from "./components/persons.jsx"
import personsService from "./services/persons"
import Notification from "./components/notification.jsx"
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const object = persons.find(person => person.name === newName)
        object.number = newNumber
        personsService
        .update(object.id, object)
        .then(response => {
          setPersons(persons)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(
            `infromation of ${object.name} has already been removed from server`
          )
        }
      )
        setMessage(`${object.name}'s number updated`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)

      }
    } else {
    const personsObject = {
        name: newName, number: newNumber
    }
    personsService
    .create(personsObject)  
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setMessage(`${personsObject.name} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })  
    .catch(error => {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)        
    })
    }
  }

  const deletePerson = (id) => {
  if (window.confirm(`Delete ${(persons.find(person => person.id === id)).name} ?`)) {
    personsService
    .deletePerson(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== response.data.id))
      const name = response.data.name
      setNewName('')
      setNewNumber('')
      setMessage(`${name} deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
  }
}

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const namesToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      

  if (message !== '') {
    return (
      <div>
      <h2>Phonebook</h2>
        <Notification message={message} />
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons namesToShow={namesToShow} deletePerson={deletePerson} />
    </div>
    )
  } else {
    return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons namesToShow={namesToShow} deletePerson={deletePerson} />
    </div>
  )
}
}
export default App