import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useState } from 'react';

const VehicleRadioGroup = ({ vehicles, maxDistance, onVehicleUpdate }) => {

    const [selectedVehicle, setSelectedVehicle] = useState('');

    const shouldRadioBeDisabled = (vehicle) => {
        if (selectedVehicle && selectedVehicle === vehicle.name) {
            return false;
        }
        if (!vehicle.total_no || vehicle.max_distance < maxDistance) {
            return true
        }
        return false;
    }

    const selectVehicle = (vehicleName) => {
        setSelectedVehicle(vehicleName);
        const vehicle = vehicles.filter(veh => veh.name === vehicleName);
        onVehicleUpdate(...vehicle);
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Vehicles</FormLabel>
            <RadioGroup 
                aria-label="vehicles" 
                name="vehicles" 
                onChange={(e) => selectVehicle(e.target.value)}>
                { vehicles.map(vehicle => 
                    <FormControlLabel 
                        key={vehicle.name}
                        value={vehicle.name} 
                        control={<Radio />}
                        label={vehicle.name}
                        disabled={shouldRadioBeDisabled(vehicle)} />
                    )
                }
            </RadioGroup>
        </FormControl>
    )
}

export default VehicleRadioGroup;