import React from 'react';
import './Home.css'; // Import CSS file for styling

const Home = () => {
    return (
        <div className='container landing-page'>
            <header className='header'>
                <h1 className='title'>CollabWrite</h1>
                <p className='subtitle'>Real-Time Collaboration Platform for Document Creation</p>
            </header>
            <main className='main'>
                <section className='section section-1'>
                    <div className='section-content'>
                        <h2 className='section-title'>Real-Time Collaboration</h2>
                        <p className='section-description'>Collaborate seamlessly with your team in real-time, allowing multiple users to edit documents simultaneously. Say goodbye to version control issues and experience the power of collaboration.</p>
                    </div>
                </section>
                <section className='section section-2'>
                    <div className='section-content'>
                        <h2 className='section-title'>Rich Text Editing</h2>
                        <p className='section-description'>Utilize a powerful rich text editor equipped with features like formatting, styling, and media embedding. Create visually appealing documents with ease.</p>
                    </div>
                </section>
                <section className='section section-3'>
                    <div className='section-content'>
                        <h2 className='section-title'>Secure and Reliable</h2>
                        <p className='section-description'>Rest assured that your data is safe and secure with our robust security measures. Our platform ensures data encryption, user authentication, and reliable backup systems.</p>
                    </div>
                </section>
            </main>
            <footer className='footer'>
                <p className='footer-text'>Designed and developed by Ayyan Pasha</p>
            </footer>
        </div>
    );
}

export default Home;
