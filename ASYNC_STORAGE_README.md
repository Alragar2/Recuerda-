# AsyncStorage en RecuerdaMás

Este documento explica cómo se ha implementado AsyncStorage en el proyecto RecuerdaMás para persistir datos de autenticación y preferencias del usuario.

## Archivos Creados/Modificados

### 1. `/src/services/asyncStorageService.js`
Servicio principal que encapsula todas las operaciones de AsyncStorage:
- Guardar/obtener datos del usuario
- Guardar/obtener token de autenticación
- Guardar/obtener estado de login
- Guardar/obtener preferencias del usuario
- Limpiar datos

### 2. `/src/hooks/useAuth.js` (Modificado)
Hook de autenticación actualizado para:
- Cargar datos del usuario desde AsyncStorage al inicializar
- Guardar datos del usuario al hacer login/registro
- Limpiar datos al hacer logout
- Persistir el estado de autenticación

### 3. `/src/hooks/useAsyncStorage.js`
Hook personalizado para manejar operaciones generales de AsyncStorage:
- Manejar preferencias del usuario
- Guardar/obtener datos genéricos
- Limpiar datos
- Obtener todas las claves almacenadas

### 4. `/src/components/Login/LoginForm.js` (Modificado)
- Ahora usa el hook `useAuth` en lugar de Firebase directamente
- Los datos se guardan automáticamente en AsyncStorage al iniciar sesión

### 5. `/src/components/Login/RegisterForm.js` (Modificado)
- Ahora usa el hook `useAuth` en lugar de Firebase directamente
- Los datos se guardan automáticamente en AsyncStorage al registrarse

### 6. `/src/components/Profile.js` (Modificado)
- Carga datos del usuario desde AsyncStorage
- Muestra información persistida del usuario

## Cómo Usar AsyncStorage en Tu Proyecto

### 1. Usando el Hook useAuth
```javascript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { user, signIn, signUp, signOut, loading } = useAuth();
  
  // Los datos del usuario se cargan automáticamente desde AsyncStorage
  // y se sincronizan con Firebase
};
```

### 2. Usando el Servicio AsyncStorage Directamente
```javascript
import AsyncStorageService from '../services/asyncStorageService';

// Guardar datos del usuario
await AsyncStorageService.saveUserData(userData);

// Obtener datos del usuario
const userData = await AsyncStorageService.getUserData();

// Guardar preferencias
await AsyncStorageService.saveUserPreferences({ darkMode: true });

// Limpiar todos los datos de autenticación
await AsyncStorageService.clearAuthData();
```

### 3. Usando el Hook useAsyncStorage
```javascript
import { useAsyncStorage } from '../hooks/useAsyncStorage';

const MyComponent = () => {
  const { saveData, getData, useUserPreferences } = useAsyncStorage();
  const { preferences, updatePreferences } = useUserPreferences();
  
  // Guardar datos personalizados
  await saveData('myKey', myData);
  
  // Obtener datos personalizados
  const myData = await getData('myKey');
  
  // Manejar preferencias
  await updatePreferences({ theme: 'dark', language: 'es' });
};
```

## Datos que se Persisten Automáticamente

### Datos del Usuario (al login/registro)
- UID del usuario
- Email
- Nombre de usuario (displayName)
- URL de foto de perfil
- Estado de verificación de email

### Estado de Autenticación
- Si el usuario está logueado o no
- Token de autenticación (si está disponible)

### Preferencias del Usuario
- Configuraciones personalizadas que definas
- Tema, idioma, etc.

## Claves de Almacenamiento

Las siguientes claves se usan en AsyncStorage:
- `@user_data`: Datos del usuario autenticado
- `@auth_token`: Token de autenticación
- `@is_logged_in`: Estado de login (boolean)
- `@user_preferences`: Preferencias del usuario

## Funciones de Limpieza

### Limpiar solo datos de autenticación
```javascript
await AsyncStorageService.clearAuthData();
```

### Limpiar todos los datos
```javascript
await AsyncStorageService.clearAllData();
```

## Consideraciones Importantes

1. **Sincronización con Firebase**: Los datos se sincronizan automáticamente entre AsyncStorage y Firebase Auth
2. **Persistencia**: Los datos persisten entre cierres de la aplicación
3. **Seguridad**: Los tokens se almacenan de forma segura en AsyncStorage
4. **Error Handling**: Todos los métodos incluyen manejo de errores

## Ejemplo de Flujo Completo

1. Usuario abre la app → Se cargan datos de AsyncStorage si existen
2. Usuario hace login → Datos se guardan en AsyncStorage + Firebase
3. Usuario cierra/abre la app → Datos se cargan automáticamente
4. Usuario hace logout → Datos se limpian de AsyncStorage

Con esta implementación, tu aplicación RecuerdaMás ahora tiene persistencia completa de datos de autenticación usando AsyncStorage.
