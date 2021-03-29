import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')


const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 10,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flexDirection: 'row',
        width: width * 0.65,
        backgroundColor: '#F8FFFF',
        borderRadius: 45,
        justifyContent: 'space-around'
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    }
});
export default styles