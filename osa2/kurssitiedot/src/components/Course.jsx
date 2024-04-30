const Course = (props) => {
    return (
      <div>
        <Header course={props.course}/>  
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <h2>{props.course.name}</h2>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.part.name} {props.part.exercises}</p>
        </div>
    )
  }
  
  
  const Total = (props) => {
    const exercises = (props.parts.map(part => part.exercises))
    const sum = exercises.reduce((a, b) => a + b, 0)
    return (
      <div>
       <p><b>Number of exercises {sum}</b></p>
      </div>
    )
  }
  export default Course