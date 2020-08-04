import React from 'react';
import axios from '../api';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import DestinationForm from './DestinationForm';
// import ConfirmationDialog from './ConfirmationDialog';
export default class Home extends React.Component {
    initalVehicles = [];
    constructor() {
        super();
        this.state = {
            planets: [],
            vehicles: [],
            vehiclesAndPlanetsSelected: [],
            time_taken: 0,
            showConfirmationDialog: false,
            isLoading: false,
        }
    }

    async componentDidMount() {
        await this.getPlanets();
        await this.getVehicles();
        this.initalVehicles = this.state.vehicles.map(vehicle => Object.assign({}, vehicle));

        console.log('Planets', this.state.planets);
        console.log('Vehicles', this.initalVehicles);
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

    updateVehicles = () => {
        const selectedVehicles = this.state.vehicle_names;
        const updatedVehicles = this.initalVehicles.map(vehicle => Object.assign({}, vehicle));
        selectedVehicles.forEach(vehicle => {
            const vehicleToUpdate = updatedVehicles.find(veh => veh.name === vehicle.name);
            !!vehicleToUpdate && vehicleToUpdate.total_no--;
        })
        this.setState({ vehicles: updatedVehicles });
    }

    handleDestinationAndVehicleSelection = (planet, vehicle, id) => {
        const { time_taken, planet_names, vehicle_names } = this.state;
        const timeToAdd = planet.distance / vehicle.speed;
        const index = vehicle_names.findIndex(veh => veh.id === id);
        index > 0 && vehicle_names.splice(index, 1);

        planet_names.push(planet.name);
        vehicle_names.push({
            id,
            name: vehicle.name
        });

        this.setState({
            time_taken: time_taken + timeToAdd,
            planet_names,
            vehicle_names
        }, () => this.updateVehicles());
    }

    updateTimeTaken = () => {
        const time_taken = this.state.vehiclesAndPlanetsSelected.reduce((total, selectedEntry) => selectedEntry.time_taken + total, 0);
        this.setState({ time_taken });
    }

    handlePlanetSelection = (planet, id) => {
        const updatedVehiclesAndPlanetsSelected = [ ...this.state.vehiclesAndPlanetsSelected ];
        const index = updatedVehiclesAndPlanetsSelected.findIndex(selectionEntry => selectionEntry.id === id);
        if (index !== -1) {
            updatedVehiclesAndPlanetsSelected[index].planet = planet;
            const vehicle = updatedVehiclesAndPlanetsSelected[index].vehicle
            if (vehicle) {
                updatedVehiclesAndPlanetsSelected[index].time_taken = planet.distance / vehicle.speed;
            }
        } else {
            const entry = {
                id,
                planet,
                vehicle: null,
                time_taken: 0
            };
            updatedVehiclesAndPlanetsSelected.push(entry);
        }
        this.setState({ vehiclesAndPlanetsSelected: updatedVehiclesAndPlanetsSelected }, () => {
            console.log(this.state.vehiclesAndPlanetsSelected);
            this.updateTimeTaken();
        });
    }

    handleVehicleSelection = (vehicle, id) => {
        const updatedVehiclesAndPlanetsSelected = [ ...this.state.vehiclesAndPlanetsSelected ];
        const index = updatedVehiclesAndPlanetsSelected.findIndex(selectionEntry => selectionEntry.id === id);
        updatedVehiclesAndPlanetsSelected[index].vehicle = vehicle;
        const planet = updatedVehiclesAndPlanetsSelected[index].planet;
        updatedVehiclesAndPlanetsSelected[index].time_taken = planet.distance / vehicle.speed;
        this.setState({ vehiclesAndPlanetsSelected: updatedVehiclesAndPlanetsSelected }, () => {
            console.log(this.state.vehiclesAndPlanetsSelected);
            this.updateTimeTaken();
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
                onPlanetSelection={this.handlePlanetSelection}
                onVehicleSelection={this.handleVehicleSelection}
                // onDestinationAndVehicleSelection={this.handleDestinationAndVehicleSelection}
            />
        );
    }

    findFalcone = async () => {
        this.setState({ isLoading: true });
        const { planet_names } = this.state
        const vehicle_names = this.state.vehicle_names.map(veh => veh.name);
        console.log(planet_names);
        console.log(vehicle_names);
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
        const {vehiclesAndPlanetsSelected, time_taken, isLoading } = this.state;
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
                        disabled={vehiclesAndPlanetsSelected.length < 4}>
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