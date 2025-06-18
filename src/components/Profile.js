import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../../constants/colors';
import MainText from './MainText';

const Profile = ({ name, email, profileImage }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
            />
            <MainText title={name}  marginTop={0} marginVertical={4} titleSize={20} subtitle={email}/>
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
});

export default Profile;
