export const useSocket = () => {
  return {
    connect: () => {
      console.log('connect');
    },
    disconnect: () => {
      console.log('disconnect');
    },
    emit: (eventName: string, payload: any) => {
      console.log('eventName => ', eventName);
      console.log('payload => ', payload);
    }
  };
};
