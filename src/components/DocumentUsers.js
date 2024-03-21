import React, { useState } from 'react'
import { changePermission } from '../apiCall/helper';
import { useDispatch } from 'react-redux';
import { alertAction } from "../redux/slices/alert";

export default function DocumentUsers(props) {
    const [selectedOption, setSelectedOption] = useState(props.write ? "Write" : "Read");
    const dispatch = useDispatch();
    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>{`${props.userId.name}(${props.userId.email})`}</p>
            {
                props.isAdmin
                    ? <p className='btn btn-success'>Admin</p>
                    :
                    <>
                        <p>

                            <select value={selectedOption} onChange={handleSelect}>
                                <option value="Read">
                                    Read
                                </option>
                                <option value="Admin">
                                    Admin
                                </option>
                                <option value="Write">
                                    Write
                                </option>
                            </select>
                        </p>
                        <p>
                            <button className='btn btn-primary' onClick={async () => {
                                const response = await changePermission(selectedOption, props._id);
                                dispatch(alertAction.alert(response));
                                const newUsers = props.users.map((element) => {
                                    if (element._id === props._id) {
                                        if (selectedOption === "Admin") element.isAdmin = true;
                                    }
                                    return element;
                                });
                                props.setUsers(newUsers);
                            }}>Save Permission</button>
                        </p>
                    </>
            }
        </div>
    )
}
