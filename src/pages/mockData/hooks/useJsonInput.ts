import { useModal } from 'behooks';

export default function useJsonInput() {
    const { toggle, modalProps } = useModal();

    return {
        toggle,
        modalProps,
    };
}
