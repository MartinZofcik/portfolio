export const setWaterIconColor = (lastWatered: Date | null) => {
  if (!lastWatered) {
    return '';
  }
  const today = new Date();
  const daysDiff = parseInt(
    String((today.getTime() - lastWatered.getTime()) / (24 * 3600 * 1000)),
  );
  if (daysDiff > 6) {
    return 'transparent';
  } else return 'blue';
};

export const setFertilizeIconColor = (lastFertilized: Date | null) => {
  if (!lastFertilized) {
    return '';
  }
  const today = new Date();
  const daysDiff = parseInt(
    String((today.getTime() - lastFertilized.getTime()) / (24 * 3600 * 1000)),
  );
  if (daysDiff > 30) {
    return 'transparent';
  } else return 'cyan';
};
