import React from 'react';
import axios from '../api';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            planets: [],
            vehicles: []
        }
    }

    async componentDidMount() {
        await axios.get('planets')
            .then(data => this.setState({ planets: [ ...data.data] }))
            .catch(error => console.error(error));
    }

    renderDropdowns = () => {
        return [1,2,3,4].map(id => 
            <div className="menu" key={id}>
                <Autocomplete
                    className="dropdown"
                    id={`planets-${id}`}
                    options={this.state.planets}
                    getOptionLabel={option => option.name}
                    renderInput={params => <TextField {...params} label="planet" variant="outlined" />} />
            </div>
            );
    }

    render() {
        return(
            <div>
                <h1 className="main-heading">Finding Falcon</h1>
                <div className="menu-container">
                    { this.renderDropdowns() }
                </div>
            </div>
        )
    }
}