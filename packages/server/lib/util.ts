import * as fs from 'fs';


interface ParsedUri {
    querystring: string
    extension: string
    relativePath: string
}

interface ResolvedUri extends ParsedUri {
    physicalPath?: string
    jst?: string
}

function getContentType(extension: string) {
    switch (extension.toLowerCase()) {
        case "jpg":
        case "png":
        case "gif":
            return "image/" + extension;
        break;

        default:
            return "text/" + extension;
        break;
    }
}

function parseURI(url:string) : ParsedUri {
    const querystring = url.indexOf('?') > -1 ? url.substr(url.indexOf('?')) : '';
    const relativePath = url.substr(1, url.length - querystring.length - 1);

    let extension:string = '';
    if (relativePath.indexOf('.') > -1 && relativePath.lastIndexOf('.') > relativePath.lastIndexOf('/')) {
        extension = relativePath.substr(relativePath.lastIndexOf('.')+1);
    }

    return {querystring, extension, relativePath };
}

function resolveURI(uri:ParsedUri, root?: string) : ResolvedUri {
    let physicalPath:string|undefined = (root === undefined ? './' : root) + uri.relativePath;
    let jst:string|undefined = physicalPath.substring(0, physicalPath.length - uri.extension.length);
    if (jst.endsWith('.')) jst = jst.substr(0,jst.length-1);
    try 
    {
        if (!fs.statSync(jst).isFile())
            jst = undefined;
    } 
    catch {
        jst = undefined;
    }

    return {...uri, jst, physicalPath}
}


export {parseURI, resolveURI, getContentType}