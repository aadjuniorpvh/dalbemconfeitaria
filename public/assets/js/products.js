
import {money,safeImage} from './api.js';
import {escapeHTML,addItem} from './cart.js';
let products=[];
export function setProducts(p){products=p}
export function productCard(p){
 const img=safeImage(p.imagem);
 return `<article class="card">${img?`<img src="${escapeHTML(img)}" alt="${escapeHTML(p.nome)}" loading="lazy" onerror="this.remove()">`:'<div class="placeholder" aria-hidden="true">Imagem em breve</div>'}<div class="card-body"><span class="eyebrow">${escapeHTML(p.categoria)}</span><h3>${escapeHTML(p.nome)}</h3><p>${escapeHTML(p.descricaoCurta||'')}</p><div class="card-foot"><span class="price">${money(p.preco)}</span><button class="btn" data-product="${escapeHTML(p.id)}">Ver detalhes</button></div>${!p.disponivel?'<p class="status">Indisponível</p>':''}</div></article>`;
}
export function openProduct(id){
 const p=products.find(x=>String(x.id)===String(id));if(!p)return;
 const dialog=document.querySelector('#product-dialog'),root=document.querySelector('#product-detail');
 const variations=Array.isArray(p.variacoes)?p.variacoes:[];
 const images=[p.imagem,...(Array.isArray(p.imagens)?p.imagens:[])].filter(safeImage);
 root.innerHTML=`<div class="product-detail"><div>${images.length?`<img id="detail-image" src="${escapeHTML(images[0])}" alt="${escapeHTML(p.nome)}"><div class="actions">${images.slice(1).map((u,i)=>`<button type="button" class="btn outline" data-image="${i+1}">Foto ${i+2}</button>`).join('')}</div>`:'<div class="placeholder">Imagem em breve</div>'}</div><div><span class="eyebrow">${escapeHTML(p.categoria)} · ${escapeHTML(p.subcategoria)}</span><h3>${escapeHTML(p.nome)}</h3><p>${escapeHTML(p.descricaoCompleta||p.descricaoCurta)}</p><form id="add-form">${variations.length?`<label class="field">Opção<select name="variation">${variations.map((v,i)=>`<option value="${i}">${escapeHTML(v.nome)} — ${money(v.preco)}</option>`).join('')}</select></label>`:''}<label class="field">Quantidade<input type="number" name="qty" min="1" max="99" value="1" required></label><label class="field">Observações<textarea name="notes" maxlength="300" rows="2" placeholder="Alguma preferência?"></textarea></label><p class="price" id="detail-price"></p><button class="btn" type="submit" ${p.disponivel?'':'disabled'}>${p.disponivel?'Adicionar ao carrinho':'Indisponível'}</button></form></div></div>`;
 const form=root.querySelector('#add-form'),price=root.querySelector('#detail-price');
 const update=()=>{const idx=Number(form.elements.variation?.value||0),unit=variations.length?Number(variations[idx].preco):Number(p.preco);price.textContent=money(unit*Math.max(1,Number(form.elements.qty.value)||1))};
 form.addEventListener('input',update);update();
 root.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{root.querySelector('#detail-image').src=images[Number(b.dataset.image)]}));
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const qty=Number(form.elements.qty.value),v=variations[Number(form.elements.variation?.value||0)];if(!Number.isInteger(qty)||qty<1||qty>99)return;addItem(p,qty,v?.nome||'',form.elements.notes.value,v?.preco??p.preco);dialog.close();document.querySelector('[data-open-cart]').click()});
 dialog.showModal();
}
