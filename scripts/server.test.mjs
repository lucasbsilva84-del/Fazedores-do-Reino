import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
test('local server serves both experiences and rejects missing files',async()=>{
 const child=spawn(process.execPath,['scripts/server.mjs','--port','0'],{stdio:['ignore','pipe','pipe']});
 try{const [output]=await once(child.stdout,'data');const url=output.toString().trim().replace('Local: ','');
 for(const path of ['/','/vr/','/style.css','/app.js','/assets/community.jpg','/vr/vr.css','/vr/vr.js','/community.js','/data/community.json','/assets/official-service.jpg','/assets/official-worship.jpg','/assets/official-family.jpg','/assets/official-kids.jpg'])assert.equal((await fetch(url+path)).status,200,path);
 assert.match(await (await fetch(url+'/')).text(),/Fazedores do Reino/);
 assert.match(await (await fetch(url+'/vr/')).text(),/Ambiente ilustrativo/);
 const configResponse=await fetch(url+'/data/community.json');
 assert.match(configResponse.headers.get('content-type'),/application\/json/);
 const config=await configResponse.json();
 assert.deepEqual(config.cells,[]);
 assert.ok(config.pastors.length > 0);
 assert.match(config.location.address,/João Adami/);
 assert.equal((await fetch(url+'/missing')).status,404);
 assert.equal((await fetch(url+'/%2e%2e%2fpackage.json')).status,403);
 }finally{child.kill();await once(child,'exit');}
});
