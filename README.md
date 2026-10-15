# Dalbem Confeitaria — versão de desenvolvimento

## Rodar localmente
Na pasta `public`, execute `python -m http.server 8000` e abra `http://localhost:8000`.
Não abra os HTML diretamente com `file://`, pois o catálogo usa fetch.

## Estrutura
- `public/index.html`: Home com 9 seções.
- `public/cardapio.html`: catálogo com filtros, busca e paginação.
- `public/assets/js/`: componentes e lógica de catálogo, carrinho, checkout e API.
- `public/data/products-demo.json`: produtos de teste, preços fictícios.
- `apps-script/Code.gs`: backend de leitura pública para Sheets.
- `firebase.json`: Firebase Hosting.

## Antes de publicar
1. Substitua fotos e produtos demonstrativos por dados reais autorizados.
2. Crie uma planilha Google Sheets e configure o Apps Script conforme instruções do arquivo `apps-script/README.md`.
3. Defina a URL /exec em `public/assets/js/api.js`; verifique o comportamento de CORS no navegador (veja nota do Apps Script).
4. Substitua `robots.txt` e `sitemap.xml` pelos arquivos definitivos após definir domínio; acrescente canonical e OG URL definitivos.
5. Revise a política de privacidade com as operações reais.
6. Configure um projeto Firebase, execute `firebase login`, `firebase use --add` e `firebase deploy --only hosting`.
7. Guarde o código no GitHub. Nunca publique credenciais ou uma planilha editável.

## Limitações desta versão
- O pedido é montado localmente e só é enviado se o cliente confirmar no WhatsApp; não há registro automático.
- Preços e disponibilidade devem ser confirmados antes do envio. O carrinho local não garante estoque.
- Não existe integração de pagamento nem cálculo de frete.
- Imagens reais, domínio, Google Sheets e Firebase dependem de configuração externa.
- Integração Apps Script via fetch cross-origin pode exigir outra estratégia de publicação; não use proxy público desconhecido.
