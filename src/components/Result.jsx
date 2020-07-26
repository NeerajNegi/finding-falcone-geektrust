import React from 'react';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';

import successSvg from '../assets/success.svg';
import failureSvg from '../assets/failure.svg';
import { Link } from 'react-router-dom';

const Result = ({ location }) => {

    useEffect(() => {
        console.log(location.data);
    }, [location]);

    return (
        <div>
            <div className="image-container">
                <img src={location.data.response.status === 'success' ? successSvg : failureSvg} alt=""/>
            </div>
            <div className="message-container">
                { location.data.response.status === 'success' ? 
                    <h2>Congratulations! You found Falcone.</h2> :
                    <h2>Sorry! You could not find Falcone.</h2>
                }
                { location.data.response.status === 'success' && 
                    <div className="travel-ifo">
                        <p>Time taken: {location.data.timeTaken}</p>
                        <p>Planet found: {location.data.response.planet_name}</p>
                    </div>
                }
                <Button 
                    variant="contained" 
                    color="#0BB631"
                    className="green">
                    <Link to="/" className="btn">
                        Try Again
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default Result;
