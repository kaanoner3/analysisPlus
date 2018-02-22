import OneSignal from 'react-native-onesignal';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import registerScreens from './screens';
import { Provider } from 'react-redux';
import store from 'store';
import { setNotificationData } from 'utils/notificationHandler';
import { images  } from 'resources';

console.disableYellowBox = true;

/* ONE SIGNAL */


const onRegistered = notifData => {
  //console.log('Device had been registered for push notifications!', notifData);
  AsyncStorage.setItem('oneSignalId', JSON.stringify(notifData));
  //alert(notifData);
};

const onOpened = (openResult) => {
  setNotificationData(openResult);

  /*console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);*/
}

const onIds = (device) => {
  AsyncStorage.setItem('oneSignalId', device.userId);
}

const onReceived = notification => {
  console.log('Notification received: ', notification);
  AsyncStorage.getItem('oneSignalId')
  .then((data) => {
    console.log(data);
  });
};

OneSignal.addEventListener('registered', onRegistered);
OneSignal.addEventListener('received', onReceived);
OneSignal.addEventListener('opened', onOpened);
OneSignal.addEventListener('ids', onIds);

registerScreens(store, Provider);

