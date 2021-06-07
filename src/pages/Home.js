import React, {Component} from 'react';
import {Grid} from "@material-ui/core";
import axios from "axios";
import Scream from "../components/Scream";

class Home extends Component {
    state = {
        screams: null
    }
    componentDidMount() {
        axios.get('/screams').then(response => {
            this.setState({screams: response.data})
        }).catch(err => console.log(err));
    }

    render() {
        // let recentScreams = this.state.screams ? (this.state.screams.map(scream => <p>{scream.body}</p>)) : <p>Loading...</p>
        let recentScreams = this.state.screams ? (this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)) : (<span>Loading...</span>);
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreams}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <span>Profile...</span>
                </Grid>
            </Grid>
        );
    }
}

export default Home;
