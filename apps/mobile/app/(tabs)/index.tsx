import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function PracticeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Practice</Text>
      <Text style={styles.subtitle}>Today's Session</Text>

      <View style={styles.sections}>
        <Pressable
          style={styles.card}
          onPress={() => router.push('/session/drill')}
        >
          <Text style={styles.cardNumber}>1</Text>
          <Text style={styles.cardTitle}>Quick Tune</Text>
          <Text style={styles.cardDesc}>Tune today's 2-3 strings</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push('/session/drill')}
        >
          <Text style={styles.cardNumber}>2</Text>
          <Text style={styles.cardTitle}>Finger Drill</Text>
          <Text style={styles.cardDesc}>Pattern drill with tempo ramp</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push('/session/drill')}
        >
          <Text style={styles.cardNumber}>3</Text>
          <Text style={styles.cardTitle}>Ear Check</Text>
          <Text style={styles.cardDesc}>Identify string by sound</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    marginBottom: 30,
  },
  sections: {
    gap: 16,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  cardNumber: {
    fontSize: 14,
    color: '#c9a84c',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#888',
  },
});
