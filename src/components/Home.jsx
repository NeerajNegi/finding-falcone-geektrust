import React from 'react';
import axios from '../api';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import DestinationForm from './DestinationForm';
// import ConfirmationDialog from './ConfirmationDialog';
export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            planets: [],
            vehicles: [],
            initalVehicles: [],
            planet_names: [],
            vehicle_names:[],
            time_taken: 0,
            showConfirmationDialog: false,
            isLoading: false,
        }
    }

    async componentDidMount() {
        await this.getPlanets();
        await this.getVehicles();

        console.log('Planets', this.state.planets);
        console.log('Vehicles', this.state.initalVehicles);
    }

    getPlanets = () => {
        return axios.get('planets')
            .then(data => this.setState({ planets: [ ...data.data] }))
            .catch(error => console.error(error));
    }

    getVehicles = () => {
        return axios.get('vehicles')
            .then(data => this.setState({ vehicles: [ ...data.data ], initalVehicles: [ ...data.data]}))
            .catch(error => console.error(error));
    }

    updateVehicles = () => {
        const selectedVehicles = this.state.vehicle_names;
        const updatedVehicles = [...this.state.initalVehicles].map(vehicle => {
            if (selectedVehicles.indexOf(vehicle.name) >= 0) {
                vehicle.total_no -= 1;
            }
            return vehicle;
        })
        console.log('Updated Vehicles', updatedVehicles);
        console.log('Vehicles', this.state.vehicle_names);
        this.setState({ vehicles: updatedVehicles });
    }

    handleDestinationAndVehicleSelection = (planet, vehicle) => {
        const { time_taken, planet_names, vehicle_names } = this.state;
        const timeToAdd = planet.distance / vehicle.speed;
        /* Handle case when there is already a vehicle assigned for the planet */
        // if (planet_names.find(planetName => planetName === planet.name )) {
            // const duplicatePlanetConfirmation = confirm(');
            // if (duplicatePlanetConfirmation) {
            //     planet_names.push(planet.name);
            // }
        // }
        planet_names.push(planet.name);
        vehicle_names.push(vehicle.name);
        this.setState({
            time_taken: time_taken + timeToAdd,
            planet_names,
            vehicle_names
        }, () => this.updateVehicles());
    }

    // handleConfirmationDialogOnClose = (confirmation) => {
    //     if ()
    // }

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

    findFalcone = async () => {
        this.setState({ isLoading: true });
        const { planet_names, vehicle_names } = this.state
        const tokenResponse = await axios.post('token');
        const token = tokenResponse.data.token;

        const findFalconeResponse = await axios.post('find', {
            token,
            planet_names,
            vehicle_names
        });

        this.setState({ isLoading: false });
        console.log(findFalconeResponse.data);

        this.props.history.push({
            pathname: '/result',
            data: { 
                response: findFalconeResponse.data,
                timeTaken: this.state.time_taken,
            }
        });
    }

    render() {
        const {planet_names, time_taken, isLoading } = this.state;
        return(
            <div>
                <div className="menu-container">
                    { this.renderDropdowns() }
                </div>
                <div className="actions">
                    { !isLoading ? 
                        <Button
                        onClick={() => this.findFalcone()}
                        variant="contained" 
                        color="primary"
                        disabled={planet_names.length < 4}>
                            Find Falcone
                        </Button> :
                        <CircularProgress />
                    }
                </div>
                {
                    !!time_taken && 
                    <div className="time-container">
                        <h1>Time Taken</h1>
                        <h2>{time_taken}</h2>
                    </div>
                }
            </div>
        )
    }
}