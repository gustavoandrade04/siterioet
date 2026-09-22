# Analytics — Rio Entretenimento

ID: `G-X8KNXM1X4Z`. Integração instalada na home e nas páginas evento, eventos, premium, réveillon e carnaval. Openbar apenas redireciona para premium; contato.html e whatsapp.html estão vazios.

## Publicação e validação

Publique os arquivos atualizados index.html, pages/evento.html, pages/eventos.html, pages/premium.html, pages/reveillon.html, pages/carnaval.html, js/evento.js e o novo js/analytics.js pelo processo habitual do site. A edição local não publica automaticamente.

A coleta está habilitada apenas em rioentretenimento.com.br e www.rioentretenimento.com.br. Abra o site publicado, entre em um evento e clique nos botões disponíveis. No Google Analytics, selecione a propriedade e abra Relatórios > Tempo real. Confira os eventos abaixo e seus parâmetros. A entrega real ao Google precisa ser validada após publicar; os testes locais verificam a lógica sem enviar acessos de teste.

## Ações registradas

| Nome no Analytics | Significado |
|---|---|
| page_view | Visualização de página, enviada automaticamente pela configuração da tag |
| visualizar_evento | Página de um evento carregada com sucesso |
| clique_ingresso | Clique para comprar ingresso |
| clique_lista_vip | Clique para entrar na lista VIP |
| clique_grupo_whatsapp | Clique para abrir um grupo do WhatsApp |
| clique_contato_whatsapp | Clique para contato pelo WhatsApp |
| clique_links_evento | Clique para ver todos os links do evento |

As ações na página do evento incluem evento_id e evento_nome. Links globais fora dessas páginas não recebem um evento fictício. Recarregar a página conta outra visualização; cliques repetidos contam novamente. Use Total de usuários para visitantes estimados distintos, e Contagem de eventos para número de ações. Usuários não equivalem a pessoas identificadas entre diferentes dispositivos ou navegadores.

## Configurar a tabela por evento

1. Em Administrador > Exibição de dados > Definições personalizadas, crie dimensões com escopo Evento:
   - Nome do evento Rioet → parâmetro `evento_nome`.
   - ID do evento Rioet → parâmetro `evento_id`.
2. Aguarde o processamento: as dimensões podem levar 24 a 48 horas para aparecer nos relatórios. Crie-as o quanto antes.
3. Em Explorar, crie uma exploração de Formato livre. Importe as dimensões Nome do evento Rioet, ID do evento Rioet e Nome do evento (a dimensão padrão do GA4, que representa o nome da ação).
4. Importe as métricas Contagem de eventos e Total de usuários. Coloque Nome do evento Rioet e ID do evento Rioet nas linhas, Nome do evento nas colunas e as métricas nos valores.
5. Filtre Nome do evento com a expressão regular `^(visualizar_evento|clique_ingresso|clique_lista_vip|clique_grupo_whatsapp|clique_contato_whatsapp|clique_links_evento)$` e escolha o período.

Para visitantes e visitas gerais, consulte os relatórios de aquisição usando Total de usuários e Sessões. Para as ações de eventos, não some o evento automático click com os cliques personalizados: ambos podem descrever o mesmo clique quando a medição otimizada está ativa.

Cliques não confirmam compras ou inscrições. A instalação não recupera visitas anteriores. Bloqueadores e preferências do navegador podem limitar a coleta.

Referências oficiais:
- https://developers.google.com/analytics/devguides/collection/ga4/events
- https://support.google.com/analytics/answer/14240153?hl=pt-BR
