import firestore from '@react-native-firebase/firestore';

export const saveNotificationToFirestore = async (notification) => {
  try {
    await firestore()
      .collection('notifications')
      .add({
        title: notification.title,
        text: notification.text,
        receivedAt: new Date(),
      });
  } catch (error) {
    console.error('Error saving notification to Firestore:', error);
  }