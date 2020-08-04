import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import VehicleRadioGroup from './VehicleRadioGroup';

const DestinationForm = ({id, planets, vehicles, onPlanetSelection, onVehicleSelection}) => {

    const [destination, setDestination] = useState('');

    // const setDestinationAndVehicle = (vehicle) => {
    //     // onDestinationAndVehicleSelection(destination, vehicle, id);
    // }

    const handleDestinationChange = (destination) => {
        setDestination(destination);
        onPlanetSelection(destination, id);
    }

    return (
        <div className="menu">
            <h4>Destination #{id}</h4>
            <Autocomplete
                className="dropdown"
                id={`planets-${id}`}
                value={destination}
                onChange={(event, newValue) => handleDestinationChange(newValue)}
                options={planets}
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} label="planet" variant="outlined" />} 
            />
            {
                destination && 
                <VehicleRadioGroup 
                    vehicles={vehicles}
                    maxDistance={destination.distance}
                    onVehicleChange={(vehicle) => onVehicleSelection(vehicle, id)}
                />
            }
        </div>
        );
};

export default DestinationForm;