import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#ff8c00' },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#fff',
          textAlign: 'center',
        },
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
    </Stack>
  );
};

export default RootLayout;
