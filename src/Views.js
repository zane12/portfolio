import React from 'react'

import htmlcssjslogo from './Images/HTML-CSS-JS.png'
import nodelogo from './Images/nodejs.png'
import reactlogo from './Images/React.png'
import mongodblogo from './Images/MongoDB.png'

function About() {
    return <div className='text-container'><p  style={{textIndent:'2vw', margin: '8vw'}}>
        I am a professional musician/teacher trying to change my career. I have spent 
        the last year learning as much as I can about coding, pulling on social resources, 
        taking online classes, and coding as much as possible. Now, I'm looking for a 
        chance to prove myself and to continue learning more in a professional environment. 
        I learn quickly, have no problem adapting, and enjoy the process.</p>
        </div>
}

function Skills() {
    return <div className='img-container'>
        <div className='spacer' />
        <div className='img-row'>
            <img alt='HTML/CSS/JS' src={htmlcssjslogo}></img>
        </div>
        <div className='img-row'>
            <img alt='NODE.JS' src={nodelogo}></img>
            <img alt='REACT/REACT NATIVE' src={reactlogo}></img>
            <img alt='MONGODB' src={mongodblogo}></img>
        </div>
    </div>
    
}

function Projects() {
    return <div className='text-container'>
        <p>
            <a href='https://digitalmusician.herokuapp.com/'>Teachmusic</a>: a scheduling webapp for lesson teachers. 
            Backend built in node.js and served via express. Frontend built in react.
            Login with digitalmusiciantest@gmail.com, Password1212! if you want to avoid authorizing your gmail. 
        </p>
        <p>
            <a href='https://www.trashwav3.com'>trashwav3.com</a>: a website for one of my musical projects. Includes a custom built video carousel. Built in react.
        </p>
        <p>
            <a href='https://github.com/zane12/groupscheduler'>GroupScheduler</a>: a simple mobile app built with React Native that utilizes websocket. A group of any size can try to schedule a meeting by each putting in times available with matches showing up instantly, as the connection is live.
            (Currently unable to get this to production, but the link points to the git repo on github)
        </p>
        <p>And last but not least <a href='https://github.com/zane12'>My Github</a></p>
        <p>My commit history doesn't reflect my actual work put in, I have largely been doing version control directly on my device as a solo developer. I also keep some of my repos private for security reasons, but I'm happy to share code directly.</p>
    </div>

}

export {About, Skills, Projects}