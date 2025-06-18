import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableNativeFeedback, View, Platform } from 'react-native';
import colors from '../../constants/colors';

import CustomTabBarButton from '../components/CustomTabBarButton';


// Importamos las pantallas
import HomeScreen from '../screens/HomeScreen';
import DecksScreen from '../screens/DecksScreen';
import EstadisticasScreen from '../screens/EstadisticasScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    animation: 'fade',
                    headerShown: false,
                    tabBarActiveTintColor: colors.active,
                    tabBarInactiveTintColor: colors.inactive,
                    tabBarStyle: {
                        paddingBottom: 12,
                        paddingTop: 8,
                        height: 80,
                    }
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Inicio',
                        tabBarLabel: 'Inicio',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="home"
                                size={focused ? 30 : 25}
                                color={color} />
                        ),
                        tabBarButton: (props) => <CustomTabBarButton {...props} />,
                    }}
                />
                <Tab.Screen
                    name="Mazos"
                    component={DecksScreen}
                    options={{
                        title: 'Mazos',
                        tabBarLabel: 'Mazos',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="book"
                                size={focused ? 30 : 25}
                                color={color} />
                        ),
                        tabBarButton: (props) => <CustomTabBarButton {...props} />,
                    }}
                />
                <Tab.Screen
                    name="Estadisticas"
                    component={EstadisticasScreen}
                    options={{
                        title: 'Estadísticas',
                        tabBarLabel: 'Estadísticas',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="stats-chart"
                                size={focused ? 30 : 25}
                                color={color} />
                        ),
                        tabBarButton: (props) => <CustomTabBarButton {...props} />,
                    }}
                />
                <Tab.Screen
                    name="Perfil"
                    component={PerfilScreen}
                    options={{
                        title: 'Perfil',
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="person"
                                size={focused ? 30 : 25}
                                color={color} />
                        ),
                        tabBarButton: (props) => <CustomTabBarButton {...props} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
