import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#152341',
  },
  imageStyle: {
    width: Dimensions.get('window').width
  },
  contentLeftItem: {
    flex: 1,
    backgroundColor: '#192A4F',
    width: 163,
    height: 96,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 5,
    borderRadius: 5
  },
  contentRightItem: {
    flex: 1,
    backgroundColor: '#192A4F',
    width: 163,
    height: 96,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 5,
    borderRadius: 5

  },
  statisticText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 32,
    marginLeft: 15,
    marginTop: 15,
  },
  arrowView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    marginLeft: 9
  },
  gainText: {
    color: '#5AD24E',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  lostText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  statisticView: {
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 15
  },
  linearGradient: {
    flex: 1,
    opacity: 0.9,
    overflow: 'visible',
  },
  flatlist: {
    position: 'absolute',
    right: 0, left: 0, bottom: 0, top: -20,
    marginTop: 20
  },
  headerButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0, right: 0, left: 0,
    zIndex: 99
  },
  backgroundUserImage: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0, left: 0, right: 0,
    resizeMode: 'center'
  },
  absolute: {
    position: 'absolute', top: 0, right: 0, left: 0, bottom: 0
  },
  bottomView: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: '#152341',
    zIndex: 1,
    height: height * 0.40
  },
  imageBackgound: {
    height: height,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0, left: 0, right: 0,
  }
}

export default styles 