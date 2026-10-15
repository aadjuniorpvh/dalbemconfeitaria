
import {loadProducts,safeImage} from './api.js';
import {setProducts,productCard,openProduct} from './products.js';
import {getCart,cartMarkup,changeQty,removeItem,clearCart} from './cart.js';
import {checkoutMarkup,wireCheckout} from './checkout.js';
let all=[],page=1,category='Todos',subcategory='',term='';
const $=s=>document.querySelector(s);
function showCart(){
 const root=$('#cart-content');root.innerHTML=cartMarkup();
 if(getCart().length){root.querySelector('#checkout-root').innerHTML=checkoutMarkup();wireCheckout(root)}
 root.querySelectorAll('[data-qty]').forEach(el=>el.addEventListener('change',()=>{changeQty(getCart()[Number(el.dataset.qty)].key,Number(el.value));showCart()}));
 root.querySelectorAll('[data-remove]').forEach(el=>el.addEventListener('click',()=>{removeItem(getCart()[Number(el.dataset.remove)].key);showCart()}));
 root.querySelector('#clear-cart')?.addEventListener('click',()=>{if(confirm('Limpar todo o carrinho?')){clearCart();showCart()}});
 $('#cart-dialog').showModal();
}
function updateCount(){document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=getCart().reduce((s,x)=>s+x.qty,0))}
function renderCatalog(){
 const root=$('#catalog-products');if(!root)return;
 const matches=all.filter(p=>(category==='Todos'||p.categoria===category)&&(!subcategory||p.subcategoria===subcategory)&&p.nome.toLocaleLowerCase('pt-BR').includes(term));
 const pages=Math.max(1,Math.ceil(matches.length/12));page=Math.min(page,pages);
 root.innerHTML=matches.slice((page-1)*12,page*12).map(productCard).join('')||'<p>Nenhum produto encontrado.</p>';
 $('#result-count').textContent=`${matches.length} produto(s) encontrado(s)`;
 $('#pagination').innerHTML=Array.from({length:pages},(_,i)=>`<button data-page="${i+1}" ${i+1===page?'aria-current="page"':''} aria-label="Página ${i+1}">${i+1}</button>`).join('');
}
function initCatalog(){
 const root=$('#catalog-products');if(!root)return;
 $('#search').addEventListener('input',e=>{term=e.target.value.trim().toLocaleLowerCase('pt-BR');page=1;renderCatalog()});
 document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{
 category=b.dataset.category;subcategory='';page=1;
 document.querySelectorAll('[data-category]').forEach(x=>x.className='btn '+(x===b?'':'outline'));
 const opts=[...new Set(all.filter(p=>category==='Todos'||p.categoria===category).map(p=>p.subcategoria).filter(Boolean))].sort();
 $('#subcategory').innerHTML='<option value="">Todas</option>'+opts.map(s=>`<option value="${s.replaceAll('"','&quot;')}">${s.replaceAll('<','&lt;')}</option>`).join('');
 renderCatalog();
 }));
 $('#subcategory').addEventListener('change',e=>{subcategory=e.target.value;page=1;renderCatalog()});
 $('#pagination').addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b){page=Number(b.dataset.page);renderCatalog();root.scrollIntoView({block:'start',behavior:'smooth'})}});
 document.querySelector('[data-category="Todos"]').click();
}
function initDialogs(){
 $('[data-open-menu]').addEventListener('click',()=>$('#menu-dialog').showModal());
 document.querySelectorAll('[data-open-cart]').forEach(b=>b.addEventListener('click',showCart));
 document.querySelectorAll('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
 document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d)d.close()})});
 $('#menu-dialog').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>$('#menu-dialog').close()));
 document.addEventListener('click',e=>{const b=e.target.closest('[data-product]');if(b)openProduct(b.dataset.product)});
 document.addEventListener('cart-change',updateCount);updateCount();
}
async function start(){
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());initDialogs();
 try{
  const data=await loadProducts();all=data.items.map(p=>({...p,preco:Number(p.preco),disponivel:p.disponivel===true||String(p.disponivel).toLowerCase()==='sim'})).sort((a,b)=>(Number(a.ordem)||0)-(Number(b.ordem)||0));
  setProducts(all);
  if(!data.demo)$('#demo-notice').hidden=true;
  const featured=$('#featured-products');if(featured)featured.innerHTML=all.filter(p=>p.destaque===true||String(p.destaque).toLowerCase()==='sim').slice(0,8).map(productCard).join('')||'<p>Produtos em breve.</p>';
  initCatalog();
 }catch(e){console.error(e);const target=$('#featured-products')||$('#catalog-products');if(target)target.innerHTML='<p>Não foi possível carregar o catálogo. Tente novamente mais tarde.</p>'}
}
start();
