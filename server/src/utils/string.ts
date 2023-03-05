export const validUrl = (url) => {
    return url.startsWith('https://') ? url : `https"//${url}`;
};
