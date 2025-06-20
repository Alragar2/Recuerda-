import { useState, useEffect } from 'react';
import AsyncStorageService from '../services/asyncStorageServiceAlt';

export const useAsyncStorage = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Hook para manejar preferencias del usuario
  const useUserPreferences = () => {
    const [preferences, setPreferences] = useState({});
    const [preferencesLoading, setPreferencesLoading] = useState(true);

    useEffect(() => {
      loadPreferences();
    }, []);

    const loadPreferences = async () => {
      setPreferencesLoading(true);
      try {
        const savedPreferences = await AsyncStorageService.getUserPreferences();
        setPreferences(savedPreferences);
      } catch (error) {
        console.error('Error cargando preferencias:', error);
      } finally {
        setPreferencesLoading(false);
      }
    };

    const updatePreferences = async (newPreferences) => {
      setIsLoading(true);
      try {
        const updatedPreferences = { ...preferences, ...newPreferences };
        const success = await AsyncStorageService.saveUserPreferences(updatedPreferences);
        if (success) {
          setPreferences(updatedPreferences);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error actualizando preferencias:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };

    return {
      preferences,
      preferencesLoading,
      updatePreferences,
      loadPreferences
    };
  };

  // Función para guardar datos generales
  const saveData = async (key, data) => {
    setIsLoading(true);
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorageService.saveUserData({ [key]: jsonValue });
      return true;
    } catch (error) {
      console.error(`Error guardando ${key}:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener datos generales
  const getData = async (key) => {
    setIsLoading(true);
    try {
      const userData = await AsyncStorageService.getUserData();
      if (userData && userData[key]) {
        return JSON.parse(userData[key]);
      }
      return null;
    } catch (error) {
      console.error(`Error obteniendo ${key}:`, error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para limpiar datos específicos
  const clearData = async () => {
    setIsLoading(true);
    try {
      await AsyncStorageService.clearAllData();
      return true;
    } catch (error) {
      console.error('Error limpiando datos:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener todas las claves
  const getAllKeys = async () => {
    try {
      return await AsyncStorageService.getAllKeys();
    } catch (error) {
      console.error('Error obteniendo claves:', error);
      return [];
    }
  };

  return {
    isLoading,
    saveData,
    getData,
    clearData,
    getAllKeys,
    useUserPreferences
  };
};
