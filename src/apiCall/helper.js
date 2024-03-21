// Define async functions
export const showUsers = async (documentId, setUsers) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        };

        const response = await fetch(
            `${process.env.REACT_APP_API}/api/document/permission/id/${documentId}`,
            {
                method: "GET",
                headers: headers,
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors);
        }
        setUsers(data);
        return { message: null, type: null };
    } catch (error) {
        console.error(error);
        return { message: error, type: "danger" };
    }
}

export const showRequestUsers = async (documentId, setRequestUsers) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        };

        const response = await fetch(
            `${process.env.REACT_APP_API}/api/document/request/access/id/${documentId}`,
            {
                method: "GET",
                headers: headers,
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors);
        }
        setRequestUsers(data);
        return { message: null, type: null };
    } catch (error) {
        console.error(error);
        return { message: error, type: "danger" };
    }
}

export const changeAccess = async (documentId, selectedOption) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        };
        const response = await fetch(
            `${process.env.REACT_APP_API}/api/document/access/id/${documentId}`,
            {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ private: (selectedOption === "Private") ? true : false })
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors);
        }
        return { message: "Success", type: "success" };
    } catch (error) {
        return { message: error.message, type: "danger" };
    }
}

export const requestWriteAccess = async (documentId) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        };

        const response = await fetch(
            `${process.env.REACT_APP_API}/api/document/request/read/id/${documentId}`,
            {
                method: "POST",
                headers: headers
            }
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error(await data.errors);
        }
        return { message: "Request Send", type: "success" };
    } catch (error) {
        return { message: error.message, type: "danger" };
    }
}

export const giveAccess = async (requestId) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        };

        const response = await fetch(
            `${process.env.REACT_APP_API}/api/document/request/access/id/${requestId}`,
            {
                method: "PUT",
                headers: headers
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors);
        }
        return { message: "Success", type: "success" };
    } catch (error) {
        return { message: error, type: "danger" };
    }
}

export const changePermission = async (selectedOption, permissionId) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        };

        const response = await fetch(
            (selectedOption === "Admin") ? `${process.env.REACT_APP_API}/api/document/admin/id/${permissionId}` : `${process.env.REACT_APP_API}/api/document/permission/id/${permissionId}`,
            {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ write: (selectedOption === "Write") ? "write" : "read" })
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors);
        }
        return { message: "Success", type: "success" };
    } catch (error) {
        return { message: error, type: "danger" };
    }
}