import { useModal } from 'behooks';
import { message } from 'antd';
import { createMock } from '@/services/mockData';
import { mockObject } from '@/types/mockData';

export default function useCreateMock(object: Object) {
    const { toggle, modalProps } = useModal();

    const onCreate = (values: mockObject) => {
        createMock({
            mockObject: object,
            ...values,
        }).then(() => {
            message.success('创建成功');
            toggle();
        });
    };

    return {
        toggle,
        modalProps,
        onCreate,
    };
}
