import React, { useCallback, useEffect } from "react";
import Quill from "quill";
import "./TextEditor.css";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DocumentUsers from "../../components/DocumentUsers";
import RequestUsers from "../../components/RequestUsers";
import { alertAction } from "../../redux/slices/alert";
import { showUsers, showRequestUsers, changeAccess, requestWriteAccess } from '../../apiCall/helper';
import { useDispatch } from "react-redux";

const SAVE_INTERVAL_MS = 2000;

const TOOLBAR_OPTIONS = [
    { header: [1, 2, 3, 4, 5, 6, false] },
    { font: [] },
    { list: "ordered" }, { list: "bullet" },
    "bold", "italic", "underline", "strike",
    { color: [] }, { background: [] },
    { script: "sub" }, { script: "super" },
    { align: [] },
    "image", "video", "link",
    "blockquote", "code-block", "formula",
    { indent: "-1" }, { indent: "+1" },
    { direction: "rtl" },
    { size: ["small", false, "large", "huge"] },
    { header: 1 }, { header: 2 },
    { font: [] },
    "clean",
];


export default function TextEditor() {
    const { id: documentId } = useParams();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const [title, setTitle] = useState("");
    const [admin, setAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [requestUsers, setRequestUsers] = useState([]);
    const [writeAccess, setWriteAccess] = useState(true);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [selectedOption, setSelectedOption] = useState("Public");
    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

    const onChange = (e) => {
        setTitle(e.target.value);
    }

    const changeTitle = async (newTitle) => {
        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("Authorization"),
            };
            const body = {
                title: newTitle
            }

            const response = await fetch(
                `${process.env.REACT_APP_API}/api/document/title/id/${documentId}`,
                {
                    method: "PATCH",
                    headers: headers,
                    body: JSON.stringify(body)
                }
            );
            if (!response.ok) {
                throw new Error(response.errors);
            }

        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        if (socket == null || quill == null) return;

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents());
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        socket.once("load-document", (document) => {
            quill.setContents(document);
        });
        socket.emit("get-document", { userId: localStorage.getItem('Authorization'), documentId });
    }, [socket, quill, documentId]);

    useEffect(() => {
        const s = io(process.env.REACT_APP_WEBSOCKET);
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);


    useEffect(() => {
        if (socket == null || quill == null) return;
        const handler = (delta) => {
            quill.updateContents(delta);
        };
        socket.on("receive-changes", handler);
        return () => {
            quill.off("receive-changes");
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;
        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return;
            socket.emit("send-changes", delta);
        };
        quill.on("text-change", handler);
        return () => {
            quill.off("text-change");
        };
    }, [socket, quill]);

    const wrapperRef = useCallback(async (wrapper) => {
        if (wrapper == null) return;
        const option = {
            readOnly: true,
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        };
        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("Authorization"),
            };

            const response = await fetch(
                `${process.env.REACT_APP_API}/api/document/id/${documentId}`,
                {
                    method: "GET",
                    headers: headers,
                }
            );
            if (!response.ok) {
                throw new Error(response.errors);
            }
            const data = await response.json();
            option.readOnly = !(data[0].write || data[0].isAdmin);
            setWriteAccess(data[0].userId !== undefined);
            setTitle(data[0].documentId.title);
            setAdmin(data[0].isAdmin);
            setSelectedOption(data[0].documentId.private ? "Private" : "Public")
        } catch (error) {
            console.error(error);
            history(`/document`);
        }
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, option);
        q.setText("Loading...");
        setQuill(q);
    }, [documentId, history]);


    return (<>
        <div className="removePrint" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mx-2">
                Title:
                <input disabled={!admin} className="mx-2" type="text" name="title" id="title" value={title} onChange={onChange} onKeyDown={(e) => { if (e.key === 'Enter') changeTitle(title) }} />

                {admin &&
                    <>
                        <select value={selectedOption} onChange={handleSelect}>
                            <option value="Public">
                                Public
                            </option>
                            <option value="Private">
                                Private
                            </option>
                        </select>
                        <button className="btn btn-sm btn-primary mx-1 sm" onClick={async () => {
                            const response = await changeAccess(documentId, selectedOption);
                            dispatch(alertAction.alert(response));
                        }}>Change Access</button>
                    </>
                }
            </span>

            {
                admin ? (
                    <div>
                        <button
                            type="button"
                            style={{ border: 'none' }}
                            data-bs-toggle="modal"
                            data-bs-target="#currentUsers"
                        >
                            <i className="fa-solid fa-users fa-xl mx-2" style={{ cursor: 'pointer' }} onClick={() => showUsers(documentId, setUsers)}></i>
                        </button>
                        <button
                            type="button"
                            style={{ border: 'none' }}
                            data-bs-toggle="modal"
                            data-bs-target="#requestUsers"
                        >
                            <i className="fa-solid fa-person-circle-question fa-xl mx-2" style={{ cursor: 'pointer' }} onClick={async () => {
                                const response = await showRequestUsers(documentId, setRequestUsers);
                                dispatch(alertAction.alert(response));
                            }}></i>
                        </button>
                    </div>
                ) : <></>

            }
            {
                writeAccess === false ? (
                    <button className="btn btn-warning" onClick={async () => {
                        const response = await requestWriteAccess(documentId);
                        dispatch(alertAction.alert(response));
                    }}>Request Access</button>
                ) : (
                    <></>
                )
            }


        </div >


        <div className="modal fade modal-lg" id="currentUsers" tabIndex="-1" aria-labelledby="currentUsersLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="currentUsersLabel">Users</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {users.map((element) => {
                            return <DocumentUsers key={element._id} {...element} setUsers={setUsers} users={users} />
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade modal-lg" id="requestUsers" tabIndex="-1" aria-labelledby="requesttUsersLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="requestUsersLabel">Request Users</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {requestUsers.length === 0
                            ? <p>No Request</p>
                            : requestUsers.map((element) => {
                                return <RequestUsers key={element._id} {...element} setRequestUsers={setRequestUsers} requestUsers={requestUsers} />
                            })}
                    </div>
                </div>
            </div>
        </div>
        <div className="textEditor" ref={wrapperRef}></div>
    </>)

}
