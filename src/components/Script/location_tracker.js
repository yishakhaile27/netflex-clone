import { useState, useEffect } from 'react';
import axios from 'axios';

const useLocationTracker = () => {
    const [location, setLocation] = useState({ countryName: '', countryCode: '' });

    useEffect(() => {
        const getUserIp = async () => {
            try {
                const response = await axios.get('https://ipapi.co/json');
                setLocation({
                    countryName: response.data.country_name,
                    countryCode: response.data.country_code.toLowerCase()
                });
            } catch (error) {
                console.error('Error fetching the IP information', error);
            }
        };
        getUserIp();
    }, []);

    return location;
};

export default useLocationTracker;
