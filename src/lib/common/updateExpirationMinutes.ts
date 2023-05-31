export const calculateUpdateExpirationMinutes = (createdAt: Date, updateExpiryMinutes: number) => {
  const createdAtTime: Date = new Date(createdAt);
  const currentTime: Date = new Date();
  const timeDifference = currentTime.getTime() - createdAtTime.getTime();
  const minutesDiff = Math.floor(timeDifference / (1000 * 60));
  return minutesDiff > updateExpiryMinutes;
};
