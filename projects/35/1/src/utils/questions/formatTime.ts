export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = '';
  if (hours > 0) {
    result += `${hours}год. `;
  }
  if (minutes > 0) {
    result += `${minutes} хв. `;
  }
  result += `${remainingSeconds} с.`;

  return result;
};
