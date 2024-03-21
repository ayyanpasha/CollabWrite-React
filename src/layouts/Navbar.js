import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authentication';

export default function Navbar() {
    const location = useLocation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.authentication);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link${(location.pathname === '/') ? " active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link${(location.pathname === '/document') ? " active" : ""}`} aria-current="page" to="/document">Documents</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link${(location.pathname === '/about') ? " active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {
                        (currentUser === undefined) ?
                            <></>
                            : (currentUser === null) ?
                                (
                                    <>
                                        <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                                        <Link className="btn btn-primary" to="/signup">Signup</Link>
                                    </>
                                )
                                :
                                <>
                                    <div className="nav-item" style={{ color: 'white' }}>
                                        {currentUser.name}
                                    </div>

                                    <button className="btn btn-danger mx-2" onClick={async () => {
                                        await dispatch(logout());
                                        history('/signup')
                                    }}>Logout</button>
                                </>
                    }

                </div>
            </div>
        </nav>
    )
}
