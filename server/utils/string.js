const validUrl = (url) => {
  return url.startsWith('https://') ? url : `https"//${url}`;
};

module.exports = { validUrl };
