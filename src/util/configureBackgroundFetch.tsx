import BackgroundFetch from 'react-native-background-fetch';

const configureBackgroundFetch = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // Fetch interval in minutes
    },
    async taskId => {
      console.log('[BackgroundFetch] taskId:', taskId);
      // Perform your background task here
      BackgroundFetch.finish(taskId);
    },
    error => {
      console.log('[BackgroundFetch] failed to start:', error);
    },
  );
};

configureBackgroundFetch();
