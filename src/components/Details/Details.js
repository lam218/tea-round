import React from 'react';

const Details = ({user}) => {
    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Preference: {user.preference}</p>
        </div>
    )
}

export default Details;