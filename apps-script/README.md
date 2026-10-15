# Integração Google Sheets / Apps Script

1. Crie uma planilha no Google Sheets.
2. Abra Extensões → Apps Script, cole `Code.gs` e salve.
3. Execute `setupSheets` como proprietário e autorize as permissões solicitadas.
4. Cadastre produtos reais na aba Produtos, com os cabeçalhos gerados.
5. Implante → Nova implantação → Aplicativo da Web; executar como proprietário; acesso público de leitura conforme sua avaliação de segurança.
6. Copie a URL terminada em `/exec`.

**Atenção:** O ContentService do Apps Script usa redirecionamentos e não fornece controle geral de cabeçalhos CORS. Portanto, `fetch` do Firebase para `/exec` pode falhar por CORS. Não considere a integração concluída apenas por cadastrar a URL. Antes de colocar em produção, valide a comunicação real no navegador. Uma alternativa controlada é uma função HTTP no Firebase/Cloud Functions que consulta o Apps Script e publica apenas campos permitidos; isso pode requerer plano com faturamento habilitado. Não use proxies públicos desconhecidos.

A função `doGet` expõe exclusivamente abas públicas (Produtos, Categorias, Banners, Galeria, Depoimentos publicados e Informações). A aba Pedidos não é exposta nem recebe gravações. Não coloque dados pessoais em abas públicas.
