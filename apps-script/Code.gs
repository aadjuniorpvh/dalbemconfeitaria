
const TABS = ['Início','Produtos','Categorias','Pedidos','Banners','Galeria','Depoimentos','Informações','Entregas'];
const HEADERS = {
 'Início':['Orientação','Detalhes'],
 'Produtos':['id','nome','categoria','subcategoria','descricaoCurta','descricaoCompleta','preco','imagem','imagens','disponivel','destaque','ordem','variacoes'],
 'Categorias':['id','nome','categoriaPrincipal','descricao','ordem','status'],
 'Pedidos':['id','data','nome','telefone','resumo','status'],
 'Banners':['id','titulo','subtitulo','imagem','textoBotao','linkBotao','status'],
 'Galeria':['id','titulo','imagem','descricao','ordem','status'],
 'Depoimentos':['id','nome','depoimento','avaliacao','status'],
 'Informações':['chave','valor'],
 'Entregas':['regra','valor','status']
};
function setupSheets(){
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 TABS.forEach(name=>{
  const sheet=ss.getSheetByName(name)||ss.insertSheet(name);
  if(sheet.getLastRow()===0)sheet.appendRow(HEADERS[name]);
  sheet.setFrozenRows(1);
  sheet.getRange(1,1,1,HEADERS[name].length).setBackground('#380404').setFontColor('#ffffff').setFontWeight('bold');
  sheet.autoResizeColumns(1,HEADERS[name].length);
 });
 const prod=ss.getSheetByName('Produtos');
 const rule=SpreadsheetApp.newDataValidation().requireValueInList(['Doces','Salgados'],true).build();
 prod.getRange('C2:C1000').setDataValidation(rule);
 const yesNo=SpreadsheetApp.newDataValidation().requireValueInList(['Sim','Não'],true).build();
 prod.getRange('J2:K1000').setDataValidation(yesNo);
 const inicio=ss.getSheetByName('Início');
 if(inicio.getLastRow()===1){
  inicio.appendRow(['Como administrar','Edite apenas os dados públicos nas abas apropriadas.']);
  inicio.appendRow(['Produtos','Informe URLs HTTPS diretas para imagens; use Sim/Não para disponibilidade e destaque.']);
  inicio.appendRow(['Pedidos','Reservado para integração futura; WhatsApp não registra pedidos automaticamente.']);
  inicio.appendRow(['Publicação','Implante o Apps Script como aplicativo web de leitura pública.']);
 }
}
function records(tab){
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
 if(!sheet||sheet.getLastRow()<2)return [];
 const rows=sheet.getDataRange().getValues(),heads=rows.shift().map(String);
 return rows.filter(r=>r.some(v=>v!==''&&v!==null)).map(row=>Object.fromEntries(heads.map((h,i)=>[h,row[i] instanceof Date?row[i].toISOString():row[i]])));
}
function doGet(e){
 const p=e&&e.parameter||{},action=String(p.action||'products');
 const names={products:'Produtos',categories:'Categorias',banners:'Banners',gallery:'Galeria',testimonials:'Depoimentos',info:'Informações'};
 if(!Object.prototype.hasOwnProperty.call(names,action))return json({error:'Ação inválida'});
 const page=Math.max(1,Math.min(10000,parseInt(p.page,10)||1));
 const limit=Math.max(1,Math.min(500,parseInt(p.limit,10)||100));
 let data=records(names[action]);
 if(action==='products')data=data.map(x=>({
  ...x,
  preco:Number(x.preco)||0,
  disponivel:String(x.disponivel).toLowerCase()==='sim'||x.disponivel===true,
  destaque:String(x.destaque).toLowerCase()==='sim'||x.destaque===true,
  imagens:parseJson(x.imagens,[]),
  variacoes:parseJson(x.variacoes,[])
 })).filter(x=>x.id&&x.nome);
 if(action==='testimonials')data=data.filter(x=>String(x.status).toLowerCase()==='publicado');
 if(['banners','gallery','categories'].includes(action))data=data.filter(x=>String(x.status).toLowerCase()==='ativo');
 const total=data.length,items=data.slice((page-1)*limit,page*limit);
 return json({items,total,page,limit});
}
function parseJson(s,fallback){if(Array.isArray(s))return s;try{return JSON.parse(String(s||''))}catch{return fallback}}
function json(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)}
