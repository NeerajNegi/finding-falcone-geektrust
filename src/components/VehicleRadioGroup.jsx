import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const VehicleRadioGroup = ({ vehicles, onVehicleUpdate }) => {

    const shouldRadioBeDisabled = (vehicle) => {
        if (!vehicle.total_no) {
            return true
        }
        return false;
    }

    const setVehicle = (vehicleName) => {
        const vehicle = vehicles.filter(veh => veh.name === vehicleName);
        onVehicleUpdate(...vehicle);
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Vehicles</FormLabel>
            <RadioGroup 
                aria-label="vehicles" 
                name="vehicles" 
                onChange={(e) => setVehicle(e.target.value)}>
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