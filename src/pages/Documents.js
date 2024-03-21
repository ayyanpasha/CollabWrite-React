import React, { useEffect, useState } from 'react'
import { alertAction } from '../redux/slices/alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DocumentCard from '../components/DocumentCard';

export default function Documents() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [document, setDocument] = useState([]);
    const { currentUser } = useSelector((state) => state.authentication);

    const createNewDocs = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            };

            const response = await fetch(`${process.env.REACT_APP_API}/api/document/new`, {
                method: 'POST',
                headers: headers
            })
            if (!response.ok) {
                throw new Error(response.errors);
            }
            const data = await response.json();
            history(`/document/${data._id}`);
        } catch (error) {
            dispatch(alertAction.alert({ message: error, type: "danger" }));
        }
    }
    const deleteDocument = async (documentId, documentArrayId) => {
        try {
            if (window.confirm(`Confirm Deleting document ${documentId}`)) {
                const headers = {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                };

                const response = await fetch(`${process.env.REACT_APP_API}/api/document/id/${documentId}`, {
                    method: 'DELETE',
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error(response.errors);
                }
                const newDocument = document.filter((element) => {
                    return element._id !== documentArrayId;
                })
                setDocument(newDocument);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                };

                const response = await fetch(`${process.env.REACT_APP_API}/api/document/list`, {
                    method: 'GET',
                    headers: headers
                })
                if (!response.ok) {
                    throw new Error(response.errors);
                }
                const data = await response.json();
                setDocument(data);
            } catch (error) {
                dispatch(alertAction.alert({ message: error, type: "danger" }));
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        if (currentUser !== undefined && currentUser === null) {
            history("/login");
        }
    }, [history, currentUser]);

    if (currentUser === undefined) {
        return (<></>);
    } else if (currentUser !== null)
        return (
            <div className='container'>
                <div className="container py-5" style={{ backgroundColor: 'white' }}>
                    <button type="button" className="btn btn-primary position-relative" onClick={createNewDocs}>
                        New Document
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            +
                        </span>
                    </button>
                </div>
                <div className='row my-3'>
                    <h2>Documents</h2>
                    {
                        (document.length === 0)
                            ? <p>Create New Document</p>
                            : document.map((element) => {
                                return (<DocumentCard key={element._id} {...element} deleteDocument={deleteDocument} />)
                            })
                    }
                </div>
            </div >
        )
}
