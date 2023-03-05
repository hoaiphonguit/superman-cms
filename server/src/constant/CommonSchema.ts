export const CommonSchema = {
    createdAt: {
        type: Number,
        required: true,
        default: new Date().getTime(),
    },
    lastModified: {
        type: Number,
        default: new Date().getTime(),
    },
    deleted: {
        type: Boolean,
        default: false,
    },
};
