import React, {useState} from "react";
import { Navbar, Nav, NavDropdown   } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import FirstPage from "../FirstPage/FirstPage";
  import Europe from "../Europe/Europe";
  import Europe2 from "../Europe/Europe2";

  import USPage from "../us/US-Page";
  import Map from '../mapsComponent/maps.component';
  import Graph from '../graph/graph.component';
import BarGraph from '../graph/bar-chart.component';
import Languages from '../Images/languages';
import ReactTooltip from "react-tooltip";
import europeRegions from "../Europe/europeRegions";


export default function NavBar () {
  const [content, setContent] = useState("");
  
      return (
        <div>
            <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

                <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="/components/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Carnet de bord
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="europe">Europe</Nav.Link>
                    <Nav.Link href="us">US</Nav.Link>
                    <Nav.Link href="europeNuts">World</Nav.Link>
                    <Nav.Link href="uk">UK</Nav.Link>
                    <Nav.Link href="languages">Economy</Nav.Link>
                    <Nav.Link href="languages">Pacific</Nav.Link>
                    <Nav.Link href="languages">China</Nav.Link>
                    <Nav.Link href="languages">US+CANZUK</Nav.Link>
                    <Nav.Link href="languages">Anglosphere</Nav.Link>
                    <Nav.Link href="languages">America</Nav.Link>
                    <Nav.Link href="europeNuts2">India</Nav.Link>

                    <NavDropdown title="World" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/europe">
          <Europe2 />
          
          </Route>
          <Route path="/europeNuts">
          <div style={{width: "87%", margin: "auto", marginTop: "-7.1%"}}>
          <Europe /></div>
          
          <FirstPage />
          </Route>
          <Route path="/europeNuts2">
            <div>
                        <ReactTooltip>
                test
            </ReactTooltip>

          <europeRegions />
            </div>

          </Route>
          <Route path="/uk">
            <UK />
          </Route>
          <Route path="/languages">
            <Languages />
          </Route>
          <Route path="/us">
            
            <USPage setTooltipContent={setContent}  />
            <ReactTooltip>{content}</ReactTooltip>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </Router>
        </div>
      )
      function Home() {
        return <div>
          
          <div style={{width: "87%", margin: "auto", marginTop: "-7.1%"}}>
          <Europe /></div>
          
          <div style={{ float:"center"}}>
        <Map />
        </div>

        <USPage setTooltipContent={setContent}  />
            <ReactTooltip>{content}</ReactTooltip>


          <FirstPage />



                  
        </div>;
      }

      function UK() {
        return <div>

        <div style={{ float:"center"}}>
        <Map />
        </div>

        </div>;
      }
      
      function Users() {
        return <div>
                    <BarGraph />
        <Graph />
        </div>;
      }
    
  };



  