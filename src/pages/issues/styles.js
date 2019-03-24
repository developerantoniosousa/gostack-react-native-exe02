import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  loading: {
    marginTop: 10,
  },
  filterArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#DDD',
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
  },
  filterText: {
    fontSize: 14,
    color: '#999',
  },
});

export default styles;
