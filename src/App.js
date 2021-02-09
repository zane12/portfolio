
import './App.css';

import React, {useEffect, useState} from 'react';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import {CSSTransition} from 'react-transition-group';

import DragScroll from './DragScroll'

import {About, Skills, Projects} from './Views'

const routes = [
  { path: '/', content: <div className='text-container'><p>My name is <font color='limegreen'>Zane Armstrong</font>.</p></div> },
  { path: '/about', content: <About /> },
  { path: '/skills', content: <Skills /> },
  { path: '/projects', content: <Projects /> }
]


function App() {
  const [navDelta, setNavDelta] = useState(0);
  const [className, setClassName] = useState('');

  useEffect(() => {
    let transName = '';
    if(navDelta > 0) transName = 'slideright';
    if(navDelta < 0) transName = 'slideleft';

    setClassName(transName);
  }, [navDelta])

  return (
    <div className='container'>
      <Router> 
        <DragScroll setNavDelta={setNavDelta}>
          {routes.map((route) => {
          return (        
            <Route key={route.path} exact path={route.path}>               
                {({ match }) => {
                  return (
                    <CSSTransition timeout={1000} key={route.path} in={match != null} classNames={className} unmountOnExit>            
                          {route.content}
                    </CSSTransition> 
                  )              
                }}                  
            </Route> 
          )})} 
        </DragScroll>
      </Router> 
      </div>

    
  );
}

export default App;
