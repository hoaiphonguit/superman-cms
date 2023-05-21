import { DOMAIN_URL } from '../constant/common';

export const getImagePath = (imagePath: string) => {
    const _path = imagePath.replace('public/data/uploads/images/', '');
    return `/statics/images/${_path}`;
};

export const getImageUrl = (url: string) => {
    return `${DOMAIN_URL}${url}`;
};
