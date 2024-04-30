const CountryInfo = (props) => {
    return (
        <div>
            <h2>{props.countryData.name.common}</h2>
            <div>
                {props.countryData.capital}
                <br></br>
                area {props.countryData.area}
                </div>
                <div>
                    <p>
                        <b>languages</b>
                    <br></br>
                    {Object.values(props.countryData.languages).map(language =>  <li>{language}</li>)}
                    </p>
                    <br></br>
                    
                        <div style={{maxSize: "400px"}}>
                        <p>
                            <img src={props.countryData.flags.png} />
                        </p>
                        </div>              
                    
                </div>
        </div>

    )
}

export default CountryInfo