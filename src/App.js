
import './App.css';

import React from 'react';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import {CSSTransition} from 'react-transition-group';

import DragScroll from './DragScroll'

const routes = [
  { path: '/', content: <p>My name is <font color='limegreen'>Zane Armstrong</font>.</p> },
  { path: '/about', content: <p>About page</p> },
  { path: '/skills', content: <p>Skills list</p> },
  { path: '/projects', content: <p>Projects/demo</p>}
]


function App() {
  return (
    <Router> 
      <DragScroll>
        {routes.map((route) => {
        return (        
          <Route key={route.path} exact path={route.path}>               
              {({ match }) => {
                return (
                  <CSSTransition timeout={1000} key={route.path} in={match != null} classNames='slide' unmountOnExit>            
                        {route.content}
                  </CSSTransition> 
                )              
              }}                  
          </Route> 
        )})} 
      </DragScroll>
    </Router> 
    
  );
}

export default App;
