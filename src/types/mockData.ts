export interface mockData {
    label: string;
    labelMin?: number;
    labelMax?: number;
    value: string | number;
    objectValue?: mockData[];
    arrayValue?: mockData[][];
    id: number;
    pid: number;
}

export interface mockObject {
    url: string;
    baseUrl?: string;
    methods: 'GET' | 'POST';
    path: string;
    fileName?: string;
    serverName?: string;
    serverPath?: string;
}
