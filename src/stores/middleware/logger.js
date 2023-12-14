const logger = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  return next(action);
};

export default logger;