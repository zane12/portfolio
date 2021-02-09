import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import {useSwipeable} from 'react-swipeable';

const navItems = [
    { to:'/', text: 'Home'}, 
    { to: '/about', text: 'About'},
    { to: '/skills', text: 'Skills'},
    { to: '/projects', text: 'Projects'}
];

export default function DragScroll(props) { 
    let navI = null;

    navItems.forEach((el, i) => {
        if(el.to === window.location.pathname) {
            navI = i;
        }
    })
    
    const [mouseDown, setMouseDown] = useState(null);
    const [mouseUp, setMouseUp] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [navIndex, setNavIndex] = useState(navI);   
    const [scrollTimeout, setScrollTimeout] = useState(false); 

    const setNavDelta = props.setNavDelta;   
    const handlers = useSwipeable({
        onSwipedLeft: (e) => {
            moveRight()
        },
        onSwipedRight: (e) => {
            moveLeft()
        }
    })

    function moveLeft() {
        const newIndex = navIndex === 0 ? navIndex : navIndex - 1;
        setNavDelta(navIndex - newIndex);
        setNavIndex(newIndex);
        setRedirect(<Redirect push to={navItems[newIndex].to} />);
    }

    function moveRight() {
        const newIndex = navIndex >= navItems.length - 1 ? navIndex : navIndex + 1;
        setNavDelta(navIndex - newIndex);
        setNavIndex(newIndex);
        setRedirect(<Redirect push to={navItems[newIndex].to} />);
    }

    function drag(){
        const drag = mouseDown - mouseUp;
        if(drag > 50) {    
            moveRight();
        }
        if(drag < -50) {            
            moveLeft();
        }

        setMouseUp(0);
        setMouseDown(0);
    }

    function wheelDrag(e) {
        
        if(!scrollTimeout) {
            if(e.deltaX > 1) moveRight();
            if(e.deltaX < -1) moveLeft();

            setScrollTimeout(true);
            console.log('set timeout');
            
        }
    }

    
    
    

    useEffect(() => {  
        
        drag()
        let timer = null;

        if(scrollTimeout) {
            timer = setTimeout(() => {
                setScrollTimeout(false);
                console.log('finished')
            }, 2000);
        }

        

        return () => {
            clearTimeout(timer);
        }
    // eslint-disable-next-line
    }, [mouseUp, scrollTimeout]); 
    

   

    return (
    <header
     {...handlers}
     onMouseDown={(e) => setMouseDown(e.clientX)}
     onMouseUp={(e) => setMouseUp(e.clientX)}
     onWheel={(e) => wheelDrag(e)}
     className='App-header'
    >
        <ul className='Slider'>           
            {navItems.map((navItem, i) => {
                return (
                    <div className='link' onClick={() => {
                            setNavDelta(navIndex - i);
                            setNavIndex(i);
                            setRedirect(<Redirect push to={navItem.to} />)
                        }} key={navItem.text} to={navItem.to}>                    
                        <CSSTransition timeout={1000} classNames='active' appear in={navIndex === i}>
                            <li className={'Slider-item'}>{navItem.text}</li> 
                        </CSSTransition> 
                    </div>
                )
            })}         
        </ul> 
        {props.children}
        {redirect}
        {/* <p>{mouseDown + ' ' + mouseUp}</p> */}
    </header>
    )
}