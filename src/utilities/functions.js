import notifee, { AndroidColor, AndroidImportance, EventType } from '@notifee/react-native';
import { Alert, Linking } from 'react-native';


export const onDisplayNotification = async (data) => {
    let channelConfig = {
        id: 'default',
        name: 'Default',
        sound: 'default',
        importance: AndroidImportance.HIGH,
    }

    const channelId = await notifee.createChannel(channelConfig);

    await notifee.displayNotification({
        title: data.title,
        body: data.body,
        android: {
            channelId: channelId,
            smallIcon: 'ic_notificaion_icon',
            pressAction: {
                id: 'default',
            },
            color: AndroidColor.BLACK,
            importance: AndroidImportance.HIGH,
            largeIcon: require('../assets/food.jpg'),
            showTimestamp: true,
        },
        ios: {
            critical: true,
            attachments: [
                {
                    url: require('../assets/food.jpg'),
                }
            ],
            sound: "default"
        },
    });
}

export const notificationHandler = async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    switch (type) {
        case EventType.DISMISSED: {
            break;
        }
        case EventType.PRESS: {
            await notifee.cancelNotification(notification.id);
            break;
        }
        case EventType.ACTION_PRESS: {
            await notifee.cancelNotification(notification.id);
            break;
        }
    }
}


export const askNotifyPermission = async () => {
    const notifyIsGranted = await notifee.requestPermission({
        criticalAlert: true
    });
    if (notifyIsGranted?.authorizationStatus === 1) {
        console.info('Notify permission granted')
    } else {
        Alert.alert(
            'Permission Required',
            'This app needs notification access to show alerts. Please grant the permission.',
            [
                {
                    text: 'Skip',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Setting',
                    onPress: () => {
                        Linking.openSettings();
                    }
                },
            ]
        );
    }
}
