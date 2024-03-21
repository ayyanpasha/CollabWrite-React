import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/authentication/index";
import { Link, useNavigate } from "react-router-dom";
import { alertAction } from "../redux/slices/alert";
import { useEffect } from 'react';

export default function Signup() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { currentUser } = useSelector((state) => state.authentication);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3).required("Required"),
            email: Yup.string().email().required("Required"),
            password: Yup.string().min(5).required("Required"),
            confirmPassword: Yup.string().min(5).required("Required"),
        }),
        onSubmit: (values) => {
            dispatch(signup(values))
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
                <h2 className="text-center">REGISTER</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            User Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <p style={{ color: "red" }}>{formik.errors.name}</p>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
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
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p style={{ color: "red" }}>{formik.errors.password}</p>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
                        ) : null}
                        <Link to="/login">Already have account</Link><br />
                    </div>
                    <div className="text-center">
                        <button disabled={formik.values.password !== formik.values.confirmPassword && formik.values.password.length > 4} type="submit" className="btn btn-primary" style={{ width: '50%' }}>
                            {formik.values.password !== formik.values.confirmPassword && formik.values.password.length > 4 ? "Passwords not matching" : "Submit"}
                        </button>

                    </div>
                </form>
            </div>
        );
}
