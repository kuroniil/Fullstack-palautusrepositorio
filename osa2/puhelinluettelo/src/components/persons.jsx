const Name = (props) => {
    return (
      <div>{props.name} {props.number}</div>
    )
  }

const Persons = (props) => {
    return (
            props.namesToShow.map(person => 
            <div>
              <Name key={person.name} name={person.name} number={person.number} />
              <button onClick={() => {props.deletePerson(person.id)}}>delete</button>
            </div>)
            
    )
}

export default Persons