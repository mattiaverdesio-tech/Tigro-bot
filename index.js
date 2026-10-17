const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const KEY="AQ.Ab8RN6J5vVbtBVijmKmTFfVOZizWJqj3SrfjLuz5EqwTC5vPyA";
const MODEL="gemini-1.5-flash";
const INVITO="GHCFtsVIxpQ3ZwN1KDT569";
const client=new Client({authStrategy:new LocalAuth(),puppeteer:{args:['--no-sandbox','--disable-setuid-sandbox']}});
client.on('qr',qr=>{qrcode.generate(qr,{small:true});console.log(qr)});
client.on('ready',async()=>{console.log("TIGRO ONLINE");try{await client.acceptInvite(INVITO)}catch(e){}});
client.on('message',async msg=>{
 if(!msg.body.toLowerCase().includes("tigro"))return;
 try{
  const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:`Sei Tigro bot divertente. Rispondi breve ita a: ${msg.body}`}]}]})});
  const d=await r.json(); const ans=d.candidates?.[0]?.content?.parts?.[0]?.text||"Grrr 🐯";
  msg.reply(`🐯 ${ans}`);
 }catch(e){console.log(e)}
});
client.initialize();
