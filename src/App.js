import { StatusBar } from 'expo-status-bar';
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <>
      <TabNavigator />
      <StatusBar style="auto" />
    </>
  );
}
