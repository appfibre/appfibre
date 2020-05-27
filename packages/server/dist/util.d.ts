interface ParsedUri {
    querystring: string;
    extension: string;
    relativePath: string;
}
interface ResolvedUri extends ParsedUri {
    physicalPath?: string;
    jst?: string;
}
declare function getContentType(extension: string): string;
declare function parseURI(url: string): ParsedUri;
declare function resolveURI(uri: ParsedUri, root?: string): ResolvedUri;
export { parseURI, resolveURI, getContentType };
