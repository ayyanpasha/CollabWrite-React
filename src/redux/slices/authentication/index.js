import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("authentication/login", async (credentials, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Invalid Credentials');
        }

        if (data.authToken) {
            localStorage.setItem('Authorization', data.authToken);
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const signup = createAsyncThunk("authentication/signup", async (credentials, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(data.errors));
        }

        if (data.authToken) {
            localStorage.setItem('Authorization', data.authToken);
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const getUser = createAsyncThunk("authentication/getUser", async (credentials, thunkAPI) => {
    try {
        if (!localStorage.getItem('Authorization')) {
            throw new Error("Login Required");
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
        };

        const response = await fetch(`${process.env.REACT_APP_API}/api/auth`, {
            method: 'POST',
            headers: headers
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors);
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
    }
});

export const logout = createAsyncThunk("authentication/logout", async () => {
    localStorage.removeItem('Authorization');
})


export const authenticationSlice = createSlice({
    initialState: {
        currentUser: undefined,
        isLoading: false
    },
    name: 'authentication',
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(signup.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.isLoading = false;
                state.currentUser = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = null;
            })
    }
});

export default authenticationSlice.reducer;