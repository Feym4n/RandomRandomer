// Копия buildless-скрипта для GitHub Pages
(() => {
  const tg = window.Telegram?.WebApp; tg?.ready?.(); tg?.expand?.();
  const els = {
    currentValue: document.getElementById('currentValue'),
    minValue: document.getElementById('minValue'),
    maxValue: document.getElementById('maxValue'),
    randomBtn: document.getElementById('randomBtn'),
    errorMsg: document.getElementById('errorMsg')
  };
  function setDefaults(){ els.minValue.textContent='1'; els.maxValue.textContent='100'; els.currentValue.textContent=''; }
  function parseIntSafe(v){ const n=Number.parseInt(String(v).trim(),10); return Number.isFinite(n)?n:null; }
  function validate(minStr,maxStr){ const min=parseIntSafe(minStr), max=parseIntSafe(maxStr); if(min===null||max===null)return{ok:false,message:'Введите целые числа.'}; if(Math.abs(min)>2147483647||Math.abs(max)>2147483647)return{ok:false,message:'Числа слишком большие.'}; if(min>max)return{ok:false,message:'Минимум не может быть больше максимума.'}; return{ok:true,min,max}; }
  function randInt(min,max){ const range=max-min+1; let r; if(window.crypto&&window.crypto.getRandomValues){ const b=new Uint32Array(1); window.crypto.getRandomValues(b); r=b[0]; } else { r=Math.floor(Math.random()*0xffffffff); } return min+(r%range); }
  function setError(msg){ if(tg){ if(msg) tg.MainButton.hide(); else tg.MainButton.show(); } els.randomBtn.disabled=!!msg; els.randomBtn.title=msg||''; if(els.errorMsg){ if(msg){ els.errorMsg.textContent=msg; els.errorMsg.style.display='block'; } else { els.errorMsg.textContent=''; els.errorMsg.style.display='none'; } } }
  function updateValidity(){ const min=(els.minValue.textContent||'').trim(); const max=(els.maxValue.textContent||'').trim(); const v=validate(min,max); setError(v.ok?'':v.message); return v; }
  function animateResult(){ els.currentValue.style.transform='scale(1.1)'; els.currentValue.style.opacity='0.6'; setTimeout(()=>{ els.currentValue.style.transform='scale(1)'; els.currentValue.style.opacity='1'; },180); }
  function onGenerate(e){ e?.preventDefault?.(); const v=updateValidity(); if(!v.ok) return; const n=randInt(v.min,v.max); els.currentValue.textContent=String(n); animateResult(); }
  function applyTheme(){ if(!tg||!tg.themeParams) return; const p=tg.themeParams; if(p.bg_color) document.body.style.backgroundColor=p.bg_color; if(p.text_color) document.body.style.color=p.text_color; }
  setDefaults(); updateValidity();
  els.randomBtn.addEventListener('click', onGenerate);
  els.minValue.addEventListener('click', ()=>{ const val=prompt('Минимум', els.minValue.textContent||'1'); if(val!==null){ els.minValue.textContent=val; updateValidity(); }});
  els.maxValue.addEventListener('click', ()=>{ const val=prompt('Максимум', els.maxValue.textContent||'100'); if(val!==null){ els.maxValue.textContent=val; updateValidity(); }});
  document.addEventListener('keydown', e=>{ if(e.key==='Enter') onGenerate(e); });
  if(tg){ tg.MainButton.setText('Рандом'); tg.MainButton.onClick(onGenerate); applyTheme(); tg.onEvent('themeChanged', applyTheme); }
})();


