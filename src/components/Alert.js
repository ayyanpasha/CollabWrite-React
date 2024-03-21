import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertAction } from '../redux/slices/alert';


export default function Alert() {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const handleAlertTimeout = useCallback(() => {
        dispatch(alertAction.alert({ message: "", type: null }));
    }, [dispatch]);

    // Trigger the timeout when the alert message changes
    useEffect(() => {
        const timeoutId = setTimeout(handleAlertTimeout, 1500);
        return () => clearTimeout(timeoutId);
    }, [alert.message, handleAlertTimeout]);
    return (
        (alert.type === null) ?
            <></>
            :
            <div>
                <div className={`fixed-bottom alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            </div>
    )
}
