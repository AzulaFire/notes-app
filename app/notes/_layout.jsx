import { Stack } from 'expo-router';

const NoteLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
    </Stack>
  );
};

export default NoteLayout;
