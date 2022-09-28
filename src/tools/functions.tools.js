const percentageCalculator = (initialValue, endValue) => {
  return (((initialValue - endValue) / initialValue) * 100).toFixed(1);
};

export { percentageCalculator };
