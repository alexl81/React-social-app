import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import './App.css';
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//Redux
import { Provider } from 'react-redux';
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import {logoutUser, getUserData } from "./redux/actions/userActions";


// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";



const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()) {
        //redirect to login page
        store.dispatch(logoutUser())
        window.location.href = "/login";
    } else {
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}


class App extends Component{
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                        <Router>
                            <Navbar/>
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <AuthRoute exact path="/login" component={Login}/>
                                    <AuthRoute exact path="/signup" component={Signup}/>
                                </Switch>
                            </div>
                        </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
