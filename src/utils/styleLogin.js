import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
//CONSTANTS
import {PRIMARY_COLOR} from '../utils/constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding:0,
    width: width,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    //opacity: 0.8,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'white',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: 'center',
    height: height / 1.5,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  formButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 20, //70
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    top: -20,
  },
  navButtonText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '500',
    color: PRIMARY_COLOR,
  },
});

export default styles;
