export interface serverInfo {
    port: number;
}
declare function server(options: {
    port?: number;
    loglevel?: string;
    folder?: string;
}): Promise<serverInfo>;
export { server };
