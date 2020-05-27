/*!
 * Adapted from: serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ServeJstOptions } from './ServeJstOptions';
/**
 * @param {string} root
 * @param {object} [options]
 * @return {function}
 * @public
 */
declare function serveJst(root?: string, options?: ServeJstOptions): (req: Request, res: Response, next: NextFunction) => void;
/**
 * Module exports.
 * @public
 */
export { serveJst };
