import { useModal } from 'behooks';

export default function useCreateMock() {
    const { toggle, modalProps } = useModal();

    return {
        toggle,
        modalProps,
    };
}
