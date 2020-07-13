import React from 'react';
import { useEffect } from 'react';

const Result = ({ location }) => {

    useEffect(() => {
        console.log(location.data);
    }, [location]);

    return (
        <h1>Results</h1>
    );
}

export default Result;
