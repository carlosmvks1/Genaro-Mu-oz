document.addEventListener('DOMContentLoaded',()=>{
 const b=document.querySelector('[data-menu]');const n=document.querySelector('[data-nav]');
 if(b&&n){b.addEventListener('click',()=>{const opened=n.classList.toggle('open');b.setAttribute('aria-expanded',String(opened));b.textContent=opened?'Cerrar ✕':'Menú ☰'});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false');b.textContent='Menú ☰'}));}
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const quiz=document.querySelector('#knowledge-check');const feedback=document.querySelector('#quiz-feedback');
 if(quiz&&feedback){quiz.addEventListener('submit',e=>{e.preventDefault();const a=new FormData(quiz).get('respuesta');feedback.classList.add('shown');feedback.textContent=!a?'Seleccioná una respuesta para continuar.':a==='heces'?'Correcto. El parásito puede entrar al organismo cuando las heces de una chinche infectada llegan a una herida, al ojo o a la boca.':'No exactamente. Habitualmente el parásito se transmite cuando las heces de una chinche infectada entran en una herida o una mucosa; la picadura por sí sola no significa infección.';});}
 document.querySelectorAll('[data-print]').forEach(b=>b.addEventListener('click',()=>window.print()));
});