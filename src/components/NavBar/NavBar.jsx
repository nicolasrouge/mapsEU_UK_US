import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FirstPage from "../FirstPage/FirstPage";
import Europe from "../WorldLanguages/World";
import Europe2 from "../Europe/Europe2";

import USPage from "../us/US-Page";
import Map from '../mapsComponent/maps.component';
import Graph from '../graph/graph.component';
import BarGraph from '../graph/bar-chart.component';
import Languages from '../Images/languages';
import Worldmap from "../worldMap.component";
import europeRegions from "../Europe/europeRegions";


export default function NavBar() {
  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");

  /*return (
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
        <Switch>
          <Route path="/europe">
            <Europe2 />

          </Route>
          <Route path="/europeNuts">
            <div style={{ margin: "auto"}}>
              <Europe />

            </div>

            <FirstPage />
          </Route>
          <Route path="/europeNuts2">
            <div>


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

          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )*/

  return(
    <div>
    <Home/>
    </div>
  )

  function Home() {
    return <div>
      <div style={{ width: "100%", margin: "auto", marginTop: "-8.3%" }}>
      <Worldmap />
      </div>
    </div>;
  }
  /*      <div style={{ float: "center" }}>
        <Map />
      </div>
      <USPage />
      <USPage />
      <FirstPage /> */

  function UK() {
    return <div>

      <div style={{ float: "center" }}>
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



