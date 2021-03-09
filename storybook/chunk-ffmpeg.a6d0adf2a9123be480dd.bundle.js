(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1929:function(module,exports,__webpack_require__){__webpack_require__(352);const createFFmpeg=__webpack_require__(1956),{fetchFile:fetchFile}=__webpack_require__(1954);module.exports={createFFmpeg:createFFmpeg,fetchFile:fetchFile}},1952:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;void 0===(__WEBPACK_AMD_DEFINE_RESULT__="function"==typeof(__WEBPACK_AMD_DEFINE_FACTORY__=function(){return function resolveUrl(){var numUrls=arguments.length;if(0===numUrls)throw new Error("resolveUrl requires at least one argument; got none.");var base=document.createElement("base");if(base.href=arguments[0],1===numUrls)return base.href;var head=document.getElementsByTagName("head")[0];head.insertBefore(base,head.firstChild);for(var resolved,a=document.createElement("a"),index=1;index<numUrls;index++)a.href=arguments[index],resolved=a.href,base.href=resolved;return head.removeChild(base),resolved}})?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__)||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)},1953:function(module,exports){let logging=!1,customLogger=()=>{};module.exports={logging:logging,setLogging:_logging=>{logging=_logging},setCustomLogger:logger=>{customLogger=logger},log:(type,message)=>{customLogger({type:type,message:message}),logging&&console.log(`[${type}] ${message}`)}}},1954:function(module,exports,__webpack_require__){const defaultOptions=__webpack_require__(1960),getCreateFFmpegCore=__webpack_require__(1961),fetchFile=__webpack_require__(1962);module.exports={defaultOptions:defaultOptions,getCreateFFmpegCore:getCreateFFmpegCore,fetchFile:fetchFile}},1955:function(module){module.exports=JSON.parse('{"name":"@ffmpeg/ffmpeg","version":"0.9.7","description":"FFmpeg WebAssembly version","main":"src/index.js","types":"src/index.d.ts","directories":{"example":"examples"},"scripts":{"start":"node scripts/server.js","build":"rimraf dist && webpack --config scripts/webpack.config.prod.js","prepublishOnly":"npm run build","lint":"eslint src","wait":"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js","test":"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node --experimental-wasm-threads --experimental-wasm-bulk-memory node_modules/.bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},"browser":{"./src/node/index.js":"./src/browser/index.js"},"repository":{"type":"git","url":"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},"keywords":["ffmpeg","WebAssembly","video"],"author":"Jerome Wu <jeromewus@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},"engines":{"node":">=12.16.1"},"homepage":"https://github.com/ffmpegwasm/ffmpeg.wasm#readme","dependencies":{"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},"devDependencies":{"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.8.5","@types/emscripten":"^1.39.4","babel-loader":"^8.1.0","chai":"^4.2.0","cors":"^2.8.5","eslint":"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1","express":"^4.17.1","mocha":"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.2.0","webpack":"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"}}')},1956:function(module,exports,__webpack_require__){const{defaultArgs:defaultArgs,baseOptions:baseOptions}=__webpack_require__(1957),{setLogging:setLogging,setCustomLogger:setCustomLogger,log:log}=__webpack_require__(1953),parseProgress=__webpack_require__(1958),parseArgs=__webpack_require__(1959),{defaultOptions:defaultOptions,getCreateFFmpegCore:getCreateFFmpegCore}=__webpack_require__(1954),{version:version}=__webpack_require__(1955),NO_LOAD=Error("ffmpeg.wasm is not ready, make sure you have completed load().");module.exports=(_options={})=>{const{log:logging,logger:logger,progress:optProgress,...options}={...baseOptions,...defaultOptions,..._options};let Core=null,ffmpeg=null,runResolve=null,running=!1,progress=optProgress;const parseMessage=({type:type,message:message})=>{log(type,message),parseProgress(message,progress),(message=>{"FFMPEG_END"===message&&null!==runResolve&&(runResolve(),runResolve=null,running=!1)})(message)};return setLogging(logging),setCustomLogger(logger),log("info","use ffmpeg.wasm v"+version),{setProgress:_progress=>{progress=_progress},setLogger:_logger=>{setCustomLogger(_logger)},setLogging:setLogging,load:async()=>{if(log("info","load ffmpeg-core"),null!==Core)throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.");{log("info","loading ffmpeg-core");const{createFFmpegCore:createFFmpegCore,corePath:corePath,workerPath:workerPath,wasmPath:wasmPath}=await getCreateFFmpegCore(options);Core=await createFFmpegCore({mainScriptUrlOrBlob:corePath,printErr:message=>parseMessage({type:"fferr",message:message}),print:message=>parseMessage({type:"ffout",message:message}),locateFile:(path,prefix)=>{if("undefined"!=typeof window){if(void 0!==wasmPath&&path.endsWith("ffmpeg-core.wasm"))return wasmPath;if(void 0!==workerPath&&path.endsWith("ffmpeg-core.worker.js"))return workerPath}return prefix+path}}),ffmpeg=Core.cwrap("proxy_main","number",["number","number"]),log("info","ffmpeg-core loaded")}},isLoaded:()=>null!==Core,run:(..._args)=>{if(log("info","run ffmpeg command: "+_args.join(" ")),null===Core)throw NO_LOAD;if(running)throw Error("ffmpeg.wasm can only run one command at a time");return running=!0,new Promise(resolve=>{const args=[...defaultArgs,..._args].filter(s=>0!==s.length);runResolve=resolve,ffmpeg(...parseArgs(Core,args))})},FS:(method,...args)=>{if(log("info",`run FS.${method} ${args.map(arg=>"string"==typeof arg?arg:`<${arg.length} bytes binary file>`).join(" ")}`),null===Core)throw NO_LOAD;{let ret=null;try{ret=Core.FS[method](...args)}catch(e){throw"readdir"===method?Error(`ffmpeg.FS('readdir', '${args[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`):"readFile"===method?Error(`ffmpeg.FS('readFile', '${args[0]}') error. Check if the path exists`):Error("Oops, something went wrong in FS operation.")}return ret}}}}},1957:function(module,exports){module.exports={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}}},1958:function(module,exports){let duration=0;const ts2sec=ts=>{const[h,m,s]=ts.split(":");return 60*parseFloat(h)*60+60*parseFloat(m)+parseFloat(s)};module.exports=(message,progress)=>{if("string"==typeof message)if(message.startsWith("  Duration")){const ts=message.split(", ")[0].split(": ")[1],d=ts2sec(ts);(0===duration||duration>d)&&(duration=d)}else if(message.startsWith("frame")||message.startsWith("size")){const ts=message.split("time=")[1].split(" ")[0];progress({ratio:ts2sec(ts)/duration})}else message.startsWith("video:")&&(progress({ratio:1}),duration=0)}},1959:function(module,exports){module.exports=(Core,args)=>{const argsPtr=Core._malloc(args.length*Uint32Array.BYTES_PER_ELEMENT);return args.forEach((s,idx)=>{const buf=Core._malloc(s.length+1);Core.writeAsciiToMemory(s,buf),Core.setValue(argsPtr+Uint32Array.BYTES_PER_ELEMENT*idx,buf,"i32")}),[args.length,argsPtr]}},1960:function(module,exports,__webpack_require__){(function(process){const resolveURL=__webpack_require__(1952),{devDependencies:devDependencies}=__webpack_require__(1955);module.exports={corePath:void 0!==process&&"development"===Object({NODE_ENV:"production",NODE_PATH:"",STORYBOOK:"true",PUBLIC_URL:"."}).FFMPEG_ENV?resolveURL("/node_modules/@ffmpeg/core/dist/ffmpeg-core.js"):`https://unpkg.com/@ffmpeg/core@${devDependencies["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`}}).call(this,__webpack_require__(425))},1961:function(module,exports,__webpack_require__){const resolveURL=__webpack_require__(1952),{log:log}=__webpack_require__(1953),toBlobURL=async(url,mimeType)=>{log("info","fetch "+url);const buf=await(await fetch(url)).arrayBuffer();log("info",`${url} file size = ${buf.byteLength} bytes`);const blob=new Blob([buf],{type:mimeType}),blobURL=URL.createObjectURL(blob);return log("info",`${url} blob URL = ${blobURL}`),blobURL};module.exports=async({corePath:_corePath})=>{if("string"!=typeof _corePath)throw Error("corePath should be a string!");const coreRemotePath=resolveURL(_corePath),corePath=await toBlobURL(coreRemotePath,"application/javascript"),wasmPath=await toBlobURL(coreRemotePath.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),workerPath=await toBlobURL(coreRemotePath.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return"undefined"==typeof createFFmpegCore?new Promise(resolve=>{const script=document.createElement("script"),eventHandler=()=>{script.removeEventListener("load",eventHandler),log("info","ffmpeg-core.js script loaded"),resolve({createFFmpegCore:createFFmpegCore,corePath:corePath,wasmPath:wasmPath,workerPath:workerPath})};script.src=corePath,script.type="text/javascript",script.addEventListener("load",eventHandler),document.getElementsByTagName("head")[0].appendChild(script)}):(log("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore:createFFmpegCore,corePath:corePath,wasmPath:wasmPath,workerPath:workerPath}))}},1962:function(module,exports,__webpack_require__){const resolveURL=__webpack_require__(1952);module.exports=async _data=>{let data=_data;if(void 0===_data)return new Uint8Array;if("string"==typeof _data)if(/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(_data))data=atob(_data.split(",")[1]).split("").map(c=>c.charCodeAt(0));else{const res=await fetch(resolveURL(_data));data=await res.arrayBuffer()}else(_data instanceof File||_data instanceof Blob)&&(data=await(blob=_data,new Promise((resolve,reject)=>{const fileReader=new FileReader;fileReader.onload=()=>{resolve(fileReader.result)},fileReader.onerror=({target:{error:{code:code}}})=>{reject(Error("File could not be read! Code="+code))},fileReader.readAsArrayBuffer(blob)})));var blob;return new Uint8Array(data)}}}]);
//# sourceMappingURL=chunk-ffmpeg.a6d0adf2a9123be480dd.bundle.js.map