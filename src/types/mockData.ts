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
    /**API url */
    url: string;
    /**项目的base URL */
    baseUrl?: string;
    /**请求 Method */
    method: 'GET' | 'POST';
    /**Mock 文件夹/文件路径 */
    path: string;
    /**mock 文件名 */
    fileName?: string;
    /**请求函数名 */
    serverName?: string;
    /**请求函数文件路径 */
    serverPath?: string;
}

export interface mockDataParams extends mockObject {
    mockObject: Object
}

export interface IJsonValue {
    value: string;
    json: Object | string;
}