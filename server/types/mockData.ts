export interface mockObject {
    url: string;
    baseUrl?: string;
    methods: 'GET' | 'POST';
    path: string;
    fileName?: string;
    serverName?: string;
    serverPath?: string;
}
