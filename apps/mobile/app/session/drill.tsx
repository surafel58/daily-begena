import { View, Text, StyleSheet } from 'react-native';

export default function DrillScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finger Drill</Text>
      <Text style={styles.placeholder}>
        Metronome, recording, and tempo ramp controls will be here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginBottom: 12,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
