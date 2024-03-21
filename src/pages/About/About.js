import React from 'react';
import './About.css'; // Import CSS file for styling

const About = () => {
    return (
        <div className='container about-container'>
            <div className='about-content'>
                <h1 className='about-title'>About CollabWrite</h1>
                <p className='about-description'>
                    CollabWrite is a real-time collaboration platform for document creation, designed to streamline teamwork and enhance productivity.
                </p>
                <p className='about-description'>
                    With CollabWrite, users can collaboratively compose documents, edit content simultaneously, and see changes in real-time, fostering seamless communication and efficient teamwork.
                </p>
                <p className='about-description'>
                    The application utilizes a modern tech stack, including React for the frontend user interface, Node.js and Express.js for the backend server, MongoDB for data storage, JWT and bcrypt for authentication and security, WebSocket for real-time communication, and Quill for the rich text editor.
                </p>
                <p className='about-description'>
                    CollabWrite empowers teams to work together seamlessly, whether they're brainstorming ideas, drafting documents, or conducting collaborative projects. Say goodbye to version control issues and embrace a smoother collaborative writing experience with CollabWrite.
                </p>
            </div>
            <div className='about-socials'>
                <h2 className='about-socials-title'>Connect (Ayyan Pasha):</h2>
                <div className='social-links'>
                    <a className='social-link github' target='_blank' rel='noreferrer' href='https://github.com/ayyanpasha/'>
                        <i className="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                    <a className='social-link twitter' target='_blank' rel='noreferrer' href="https://twitter.com/ayyan_pasha02">
                        <i className="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;
