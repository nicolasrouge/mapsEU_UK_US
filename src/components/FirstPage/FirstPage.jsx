
import { Component } from 'react';
import MapChart from "../mapChart/MapChart";
import populationEurope from '../Images/populationEurope.jpg';
import metropolitanEconomies from '../Images/metropolitanEco.png';
import europeanLandscape from '../Images/europeanLandscape.jpg';
import europeanCartogram from '../Images/populationEurope.png';
import {CardList} from '../card-list/card-list.component';
import { Col, Row, Container } from 'react-bootstrap';
import {SearchBox} from '../search-box/search-box.component';


class FirstPage extends Component {

  constructor(props) {
    super(props);// super gives us access to "this.state"
    this.state ={
      countries: [],
      searchField: '',
      mode: 'EU'
    };
    this.handler = this.handler.bind(this);
  }

  handler(){
    this.setState({
      content: ""
    })
  }



  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/regionalbloc/eu')
    .then(
      response => response.json()
      ).then(countries => this.setState({countries: countries})
    )
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value});
  }

  render() {
    const { countries, searchField, mode } = this.state;
    const filteredCountries = countries.filter(country => 
      country.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className='App'>
            
            <div style={{
              
              /*position: "absolute",
              top: "25%",
              left: "15%"*/
            }}>



                <h3> {mode} </h3>
                <span class="dot" style={{backgroundColor:"#001b26"}} onClick={e => 
                    this.setState({ mode: 'EU'})
                  }></span><span class="text" style={{verticalAlign: "middle"}}>EU</span>
                  <span class="dot" style={{backgroundColor:"#f0725c"}} onClick={e => 
                    this.setState({ mode: 'Schengen'})
                  }></span><span class="text">Schengen Area</span>
                  <span class="dot" style={{backgroundColor:"#1d1143"}} onClick={e => 
                    this.setState({ mode: 'Eurozone'})
                    }></span><span class="text">Eurozone Area</span>
                  </div>
                <div style={{width:"36%", margin: "auto"}}>



                  
                <MapChart mode={{mode}}/>
                </div>
                
        <Row>
        <Col ></Col>
        <Col >

        <SearchBox 
        placeholder='search countries' 
        handleChange={this.handleChange}
        />

        <CardList countries={filteredCountries}/>


        <h3>Europe Demography</h3>
        <img src={europeanCartogram} width={500} alt="world Economy 2019"></img>
        <br></br>

        <h3> Metropolitan Economies</h3>
        <img src={metropolitanEconomies} width={700} alt="world Economy 2019"></img>
        <br></br>
        <a href="https://www.pbl.nl/sites/default/files/downloads/PBL-2016-Cities-in-Europe-2469.pdf">sources</a>
        <br></br>

        <h3>European Landscape</h3>
        <img src={europeanLandscape} width={700} alt="world Economy 2019"></img>
        <br></br>
        <a href="https://www.pbl.nl/sites/default/files/downloads/PBL-2016-Cities-in-Europe-2469.pdf">sources</a>
        <br></br>

        <h3>Population Europe</h3>
        <img src={populationEurope} width={700} alt="world Economy 2019"></img>
        <br></br>
        <a href="https://www.pbl.nl/sites/default/files/downloads/PBL-2016-Cities-in-Europe-2469.pdf">sources</a>
        <br></br>

        </Col>
        <Col ></Col>
        </Row>

        https://www.reddit.com/r/MapPorn/comments/lo3wbw/cheers_in_several_languages/?utm_source=share&utm_medium=web2x&context=3

        <div style={{margin: "auto", width:"55%"}}>

        <div style={{textAlign:"center"}}>
          
        </div>
        
        </div>
        

      </div>
    );
  }

}

export default FirstPage;