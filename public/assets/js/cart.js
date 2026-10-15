
import {money} from './api.js';
const KEY='dalbem-cart-v1';
export function getCart(){try{const c=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(c)?c:[]}catch{return []}}
function save(c){try{localStorage.setItem(KEY,JSON.stringify(c))}catch{alert('Não foi possível salvar o carrinho neste navegador.')}document.dispatchEvent(new Event('cart-change'))}
export function addItem(p,qty,variation='',notes='',price=null){
 if(!p.disponivel)return;
 const c=getCart(), unit=Number(price??p.preco),id=String(p.id),key=JSON.stringify([id,variation,notes]);
 const existing=c.find(x=>x.key===key);
 if(existing)existing.qty+=qty;
 else c.push({key,id,nome:p.nome,qty,price:unit,variation,notes});
 save(c);
}
export function changeQty(key,qty){const c=getCart();const x=c.find(i=>i.key===key);if(x)x.qty=Math.max(1,Math.min(99,qty));save(c)}
export function removeItem(key){save(getCart().filter(x=>x.key!==key))}
export function clearCart(){save([])}
export function subtotal(){return getCart().reduce((s,i)=>s+i.qty*i.price,0)}
export function cartMarkup(){
 const c=getCart();
 if(!c.length)return '<p>Seu carrinho está vazio.</p><a class="btn" href="cardapio.html">Explorar cardápio</a>';
 return `<div>${c.map((x,i)=>`<div class="cart-item"><div><strong>${escapeHTML(x.nome)}</strong><br><small>${escapeHTML(x.variation)} ${escapeHTML(x.notes)}</small><br>${money(x.price)} por unidade</div><label>Qtd.<input type="number" min="1" max="99" value="${x.qty}" data-qty="${i}" aria-label="Quantidade de ${escapeHTML(x.nome)}"></label><button class="btn outline" data-remove="${i}">Remover</button></div>`).join('')}</div><h3>Subtotal: ${money(subtotal())}</h3><button class="btn outline" id="clear-cart">Limpar carrinho</button><div id="checkout-root"></div>`;
}
export function escapeHTML(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
