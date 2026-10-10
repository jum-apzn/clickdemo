export const LIMITS={steps:20,imageBytes:8*1024*1024,totalBytes:40*1024*1024,projectBytes:60*1024*1024,pixels:24_000_000};
export function freshProject(){return {version:1,title:'Untitled demo',steps:[]};}
const str=(v,max,name)=>{if(typeof v!=='string'||v.length>max)throw new Error(`Invalid ${name}.`);return v};
export function validateProject(value){
 if(!value||value.version!==1||!Array.isArray(value.steps)||value.steps.length>LIMITS.steps)throw new Error('This is not a supported ClickDemo project (version 1, up to 20 screens).');
 let total=0;const steps=value.steps.map((s)=>{if(!s||typeof s!=='object')throw new Error('Invalid screen.');
 const image=str(s.image,Math.ceil(LIMITS.imageBytes*4/3)+100,'image');if(!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(image))throw new Error('Only embedded PNG, JPG and WebP images are allowed.');
 total+=Math.floor(image.split(',')[1].length*3/4);if(total>LIMITS.totalBytes)throw new Error('Project images exceed the 40 MB limit.');
 let hotspot=null;if(s.hotspot!==null){const h=s.hotspot;if(!h||!Number.isFinite(h.x)||!Number.isFinite(h.y)||h.x<0||h.x>1||h.y<0||h.y>1||!Number.isFinite(h.size)||h.size<32||h.size>96)throw new Error('Invalid hotspot.');hotspot={x:h.x,y:h.y,size:h.size};}
 return {id:crypto.randomUUID(),title:str(s.title,120,'headline'),caption:str(s.caption,500,'caption'),buttonLabel:str(s.buttonLabel,40,'button label'),image,hotspot};});
 return {version:1,title:str(value.title,120,'demo title'),steps};
}
export function serializeProject(project){return JSON.stringify({version:1,title:project.title,steps:project.steps.map(({id,...s})=>s)},null,2)}
export function escapeHTML(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function safeJSON(value){return JSON.stringify(value).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');}

export function parseImported(text){if(text.trimStart().startsWith('<')){const matches=[...text.matchAll(/<script\b[^>]*\bid=["'](?:clickdemo|tourfold)-data["'][^>]*\btype=["']application\/json["'][^>]*>([\s\S]*?)<\/script\s*>/gi)];if(matches.length!==1)throw new Error('No ClickDemo project data found. Open an HTML file exported by this app, or a JSON project.');return JSON.parse(matches[0][1]);}return JSON.parse(text)}
