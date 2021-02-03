import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

export default function DragScroll(props) {     
    const [mouseDown, setMouseDown] = useState(null);
    const [mouseUp, setMouseUp] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [navIndex, setNavIndex] = useState(null);
    

    const navItems = [
        { to:'/', text: 'Home'}, 
        { to: '/about', text: 'About'},
        { to: '/skills', text: 'Skills'},
        { to: '/projects', text: 'Projects'}
    ];

    function drag(){
        navItems.forEach((el, i) => {
            if(el === window.location.pathname) {
                setNavIndex(i);
            }
        })
        const drag = mouseDown - mouseUp;
        if(drag > 50) {    
            const newIndex = navIndex >= navItems.length - 1 ? navIndex : navIndex + 1;
            setNavIndex(newIndex);
            setRedirect(<Redirect to={navItems[newIndex].to} />);
        }
        if(drag < -50) {            
            const newIndex = navIndex === 0 ? navIndex : navIndex - 1;
            setNavIndex(newIndex);
            setRedirect(<Redirect to={navItems[newIndex].to} />);
        }
    }    

    useEffect(() => {        
        drag()
    // eslint-disable-next-line
    }, [mouseUp]); 

   

    return (
    <header
     onMouseDown={(e) => setMouseDown(e.clientX)}
     onMouseUp={(e) => setMouseUp(e.clientX)}
     className='App-header'
    >
        <ul className='Slider'>           
            {navItems.map((navItem, i) => {
                return (
                    <Link onClick={() => setNavIndex(i)} key={navItem.text} to={navItem.to}>
                        <CSSTransition timeout={1000} classNames='active' in={navIndex === i}>
                            <li className={'Slider-item'}>{navItem.text}</li> 
                        </CSSTransition> 
                    </Link>
                )
            })}            
        </ul> 
        {props.children}
        {redirect}
        {/* <p>{mouseDown + ' ' + mouseUp}</p> */}
    </header>
    )
}