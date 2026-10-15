
import {getCart,subtotal} from './cart.js';
import {money} from './api.js';
export function checkoutMarkup(){return `<form id="checkout-form" class="checkout-form"><h3>Finalizar pelo WhatsApp</h3><label class="field">Nome completo<input name="nome" required maxlength="100" autocomplete="name"></label><label class="field">Telefone<input name="telefone" required inputmode="tel" maxlength="25" autocomplete="tel"></label><label class="field">Modalidade<select name="modalidade" id="delivery-mode"><option value="retirada">Retirada</option><option value="entrega">Entrega</option></select></label><div id="delivery-address"><p class="notice">Retirada: Rua Espírito Santo, 3712, Setor 5, Ariquemes – RO.</p></div><label class="field">Observações gerais<textarea name="observacoes" rows="3" maxlength="600"></textarea></label><p class="notice">Pedido sujeito à confirmação de disponibilidade e valores pela confeitaria. Não há pagamento nesta etapa.</p><button class="btn" type="submit">Abrir pedido no WhatsApp</button></form>`}
export function wireCheckout(root){
 const form=root.querySelector('#checkout-form');if(!form)return;
 const mode=form.querySelector('#delivery-mode'),address=form.querySelector('#delivery-address');
 mode.addEventListener('change',()=>{address.innerHTML=mode.value==='entrega'?'<label class="field">Endereço para entrega<textarea name="endereco" required rows="2" maxlength="300"></textarea></label><p class="notice">A taxa de entrega será confirmada pela confeitaria. O valor exibido é somente o subtotal.</p>':'<p class="notice">Retirada: Rua Espírito Santo, 3712, Setor 5, Ariquemes – RO.</p>'});
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const cart=getCart();if(!cart.length){alert('O carrinho está vazio.');return}
  const d=new FormData(form),delivery=d.get('modalidade')==='entrega';
  const lines=['*SOLICITAÇÃO DE ENCOMENDA — DALBEM CONFEITARIA*','',`Cliente: ${d.get('nome')}`,`Telefone: ${d.get('telefone')}`,'','*Produtos:*',...cart.map((x,i)=>`${i+1}. ${x.nome} — ${x.qty} x ${money(x.price)} = ${money(x.qty*x.price)}${x.variation?' | Opção: '+x.variation:''}${x.notes?' | Obs.: '+x.notes:''}`),'',`*Subtotal: ${money(subtotal())}*`,`Modalidade: ${delivery?'Entrega':'Retirada'}`,delivery?`Endereço: ${d.get('endereco')}`:'Retirada no endereço da confeitaria',delivery?'Taxa de entrega: a confirmar pela confeitaria.':'Sem taxa de entrega.',d.get('observacoes')?`Observações gerais: ${d.get('observacoes')}`:'','Solicito confirmação de disponibilidade e valores.'];
  const url='https://wa.me/5569992036765?text='+encodeURIComponent(lines.join('\n'));
  const opened=window.open(url,'_blank','noopener,noreferrer');
  if(!opened){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Clique aqui para abrir o WhatsApp';root.append(a)}
 });
}
