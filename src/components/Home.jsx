import React from 'react';
import axios from '../api';

import Button from '@material-ui/core/Button';

import DestinationForm from './DestinationForm';
export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            planets: [],
            vehicles: [],
            planet_names: [],
            vehicle_names:[],
            time_taken: 0
        }
    }

    async componentDidMount() {
        await this.getPlanets();
        await this.getVehicles();

        console.log('Planets', this.state.planets);
        console.log('Vehicles', this.state.vehicles);
    }

    getPlanets = () => {
        return axios.get('planets')
            .then(data => this.setState({ planets: [ ...data.data] }))
            .catch(error => console.error(error));
    }

    getVehicles = () => {
        return axios.get('vehicles')
            .then(data => this.setState({ vehicles: [ ...data.data ]}))
            .catch(error => console.error(error));
    }

    handleVehiclesUpdate = (event) => {
        const value = event.target.value;
        const updatedVehicles = this.state.vehicles.map(vehicle => {
            if (vehicle.name === value) {
                --vehicle.total_no;
            }
            return vehicle;
        })
        this.setState({ vehicles: updatedVehicles });
    }

    handleDestinationAndVehicleSelection = (planet, vehicle) => {
        const { time_taken, planet_names, vehicle_names } = this.state;
        const timeAddition = planet.distance / vehicle.speed;
        planet_names.push(planet.name);
        vehicle_names.push(vehicle.name);
        this.setState({
            time_taken: time_taken + timeAddition,
            planet_names,
            vehicle_names
        });
    }

    renderDropdowns = () => {
        const {vehicles, planets} = this.state;
        return [1,2,3,4].map(id => 
            <DestinationForm 
                key={id} 
                id={id}
                vehicles={vehicles}
                planets={planets}
                onDestinationAndVehicleSelection={this.handleDestinationAndVehicleSelection}
            />
        );
    }

    render() {
        return(
            <div>
                <h1 className="main-heading">Finding Falcon</h1>
                <div className="menu-container">
                    { this.renderDropdowns() }
                </div>
                <div className="actions">
                    <Button variant="contained" color="primary">Find Falcone</Button>
                </div>
            </div>
        )
    }
}