import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Descomenta si quieres persistencia

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    console.log('useDarkMode hook initialized', darkMode ? 'Dark mode is ON' : 'Dark mode is OFF');
    // Si quieres persistencia, descomenta este useEffect
    /*
    useEffect(() => {
        AsyncStorage.getItem('darkMode').then(value => {
            if (value !== null) setDarkMode(value === 'true');
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);
    */

    return [darkMode, setDarkMode];
}
