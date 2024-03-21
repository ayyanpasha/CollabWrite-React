import React from 'react'
import { giveAccess } from '../apiCall/helper';
import { useDispatch } from 'react-redux';
import { alertAction } from "../redux/slices/alert";

export default function RequestUsers(props) {
    const dispatch = useDispatch();

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>{`${props.userId.name}(${props.userId.email})`}</p>
            <p><button className='btn btn-warning' onClick={async () => {
                const response = await giveAccess(props._id);
                dispatch(alertAction.alert(response));
                const newRequestUsers = props.requestUsers.filter((element) => {
                    return element._id !== props._id
                });
                props.setRequestUsers(newRequestUsers);
            }}>Give Access</button></p>
        </div>
    )
}
