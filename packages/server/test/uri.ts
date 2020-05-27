import { should } from 'chai'
import * as util from '../lib/util'


describe('parsing uri', () => {

    it('extension', () => {
        function testExtension(input:string, expected: string|undefined) {
            var uri = util.parseURI(input);
            should().equal(uri.extension, expected, `Extension of '${input}' should be ${expected} but is ${uri.extension}`);
        }
        
        testExtension('', '');
        testExtension('index', '');
        testExtension('index', '');
        testExtension('index.html', 'html');
        testExtension('index/test', '');
        
        testExtension('index.zip', 'zip');
        testExtension('index.zip/', '');
        testExtension('index.zip/test.html', 'html');

        //testExtension('index.html/test', 'html');
        //testExtension('path/index.html.config/test', 'config');
    });

    
});