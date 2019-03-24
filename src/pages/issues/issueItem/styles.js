import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginTop: 10,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoLogin: {
    fontSize: 14,
    color: '#999',
  },
});

export default styles;
