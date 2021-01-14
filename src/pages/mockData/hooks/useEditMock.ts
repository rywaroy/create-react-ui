import { mockData } from '@/types/mockData';

export default function useEditMock(
    dataList: mockData[],
    setDataList: React.Dispatch<React.SetStateAction<mockData[]>>,
) {
    /**
     * 添加属性
     */
    const addItem = (data: mockData[]) => {
        let pid = 1;
        if (data.length > 0) {
            pid = data[0].pid;
        }
        const list = [...dataList];
        list.push({ label: '', value: '', id: Math.random(), pid });
        setDataList(list);
    };

    /**
     * 删除属性
     */
    const deleteItem = (id: number) => {
        const deleteId = [id];
        let list = [...dataList];
        function findItem(pid: number) {
            list.forEach((item) => {
                if (item.pid === pid) {
                    deleteId.push(item.id);
                    findItem(item.id);
                }
            });
        }
        findItem(id);
        list = list.filter((item) => deleteId.indexOf(item.id) === -1);
        setDataList(list);
    };

    return {
        addItem,
        deleteItem,
    };
}
