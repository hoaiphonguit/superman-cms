import { TFieldProp } from 'src/interfaces';
import { IPost } from 'src/interfaces/post';

export const fields = (post: IPost): Array<TFieldProp> => [
    {
        component: 'text-field' as 'text-field',
        attribute: 'title',
        label: 'Tiêu đề bài viết',
        props: {
            placeholder: 'Nhập tiêu đề bài viết',
        },
        validationType: 'string',
        validations: [['required', true]],
    },
    {
        component: 'text-field' as 'text-field',
        attribute: 'description',
        label: 'Mô tả ngắn',
        props: {
            placeholder: 'Nhập mô tả ngắn gọn về bài viết',
            multiline: true,
            rows: 4,
        },
        validationType: 'string',
        validations: [['required', true]],
    },
];
