import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authentication/index";
import { Link, useNavigate } from "react-router-dom";
import { alertAction } from "../redux/slices/alert";
import { useEffect } from 'react';

export default function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { currentUser } = useSelector((state) => state.authentication);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Required"),
            password: Yup.string().min(5).required("Required"),
        }),
        onSubmit: (values) => {

            dispatch(login(values))
                .then((action) => {
                    if (action.error) {
                        dispatch(alertAction.alert({ message: action.payload, type: "danger" }));
                    } else {
                        history('/document');
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        },
    });
    useEffect(() => {
        if (currentUser !== undefined && currentUser !== null) {
            history("/document");
        }
    }, [history, currentUser]);

    if (currentUser === undefined) {
        return (<></>);
    } else if (currentUser === null)
        return (
            <div className="container my-5">
                <h2 className="text-center">LOGIN</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p style={{ color: "red" }}>{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p style={{ color: "red" }}>{formik.errors.password}</p>
                        ) : null}
                        <Link to="/signup">Create new account</Link><br />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" style={{ width: '50%' }}>
                            Submit
                        </button>

                    </div>
                </form>
            </div>
        );
}
