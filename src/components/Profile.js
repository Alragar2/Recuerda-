import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../../constants/colors';
import MainText from './MainText';
import AsyncStorageService from '../services/asyncStorageServiceAlt';
import { useAuth } from '../hooks/useAuth';

const Profile = ({ name, email, profileImage }) => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, [user]);

    const loadUserData = async () => {
        try {
            const savedUserData = await AsyncStorageService.getUserData();
            if (savedUserData) {
                setUserData(savedUserData);
            }
        } catch (error) {
            console.error('Error cargando datos del usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    // Usar datos de props si están disponibles, sino usar datos de AsyncStorage o Firebase
    const displayName = name || userData?.displayName || user?.displayName || 'Usuario';
    const displayEmail = email || userData?.email || user?.email || 'email@ejemplo.com';
    const displayImage = profileImage || userData?.photoURL || user?.photoURL || 'https://via.placeholder.com/100';

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={[styles.profileImage, styles.placeholderImage]} />
                <MainText title="Cargando..." marginTop={0} marginVertical={4} titleSize={20} subtitle=""/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: displayImage }}
                style={styles.profileImage}
                onError={() => console.log('Error cargando imagen de perfil')}
            />
            <MainText 
                title={displayName} 
                marginTop={0} 
                marginVertical={4} 
                titleSize={20} 
                subtitle={displayEmail}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholderImage: {
        backgroundColor: colors.textSecondary,
        opacity: 0.3,
    },
});

export default Profile;
