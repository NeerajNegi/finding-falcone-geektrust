import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import VehicleRadioGroup from './VehicleRadioGroup';

const DestinationForm = ({id, planets, vehicles, onDestinationAndVehicleSelection}) => {

    const [destination, setDestination] = useState('');

    const setDestinationAndVehicle = (vehicle) => {
        onDestinationAndVehicleSelection(destination, vehicle)
    }

    return (
        <div className="menu">
            <h4>Destination #{id}</h4>
            <Autocomplete
                className="dropdown"
                id={`planets-${id}`}
                value={destination}
                onChange={(event, newValue) => setDestination(newValue)}
                options={planets}
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} label="planet" variant="outlined" />} 
            />
            {
                destination && 
                <VehicleRadioGroup 
                    vehicles={vehicles}
                    onVehicleUpdate={setDestinationAndVehicle}
                />
            }
        </div>
        );
};

export default DestinationForm;