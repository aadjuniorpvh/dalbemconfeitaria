
export const API_URL = ''; // Preencha com a URL /exec do Apps Script após implantar.
export async function loadProducts(){
 if(API_URL){
  try{const r=await fetch(`${API_URL}?action=products&limit=500`,{redirect:'follow'});if(!r.ok)throw Error('HTTP '+r.status);const j=await r.json();if(!Array.isArray(j.items))throw Error('Resposta inválida');return {items:j.items,demo:false};}
  catch(e){console.warn('Falha na API; exibindo catálogo de demonstração.',e);}
 }
 const r=await fetch('data/products-demo.json');if(!r.ok)throw Error('Catálogo não disponível');return {items:await r.json(),demo:true};
}
export const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(n)||0);
export const safeImage=url=>typeof url==='string'&&/^https:\/\//i.test(url)?url:'';
