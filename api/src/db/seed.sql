-- Dados de demonstração do LUMEN
INSERT INTO processos (numero, cliente, assunto, movimentacao, traducao, proximo_passo, vez, status) VALUES
('5003421-12.2026.8.24.0023', 'João da Silva', 'Revisão de contrato de financiamento de veículo',
 'Conclusos para decisão.',
 'O processo foi entregue ao juiz para que ele analise o seu pedido e tome uma decisão. Nesta fase não é preciso fazer nada.',
 'Aguardar a decisão do juiz', 'judiciario', 'publicado'),
('5003987-44.2026.8.24.0023', 'Maria Oliveira', 'Cobrança indevida de tarifas bancárias',
 'Intime-se a parte autora para juntar extratos bancários no prazo de 15 dias.',
 'O juiz pediu que você apresente os extratos da sua conta. Precisamos deles em até 15 dias para o processo continuar.',
 'Enviar os extratos ao escritório', 'cliente', 'publicado'),
('5004102-88.2026.8.24.0023', 'Pedro Alves', 'Indenização por negativação indevida',
 'Juntada de contestação.',
 'O banco apresentou a defesa dele. Agora vamos ler os argumentos e preparar a nossa resposta.',
 'Preparar a réplica', 'advogado', 'rascunho');