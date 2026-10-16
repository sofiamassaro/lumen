// Modelo do processo e opções fixas dos campos de seleção.

export const PROCESSO_VAZIO = {
  numero: '',
  cliente: '',
  assunto: '',
  movimentacao: '',
  traducao: '',
  proximoPasso: '',
  vez: 'advogado',
  status: 'rascunho',
};

// "De quem é a vez", escrito do ponto de vista do cliente
export const OPCOES_VEZ = {
  advogado: 'Seu advogado',
  cliente: 'Você',
  judiciario: 'O Judiciário',
  outraParte: 'A outra parte',
};

export const OPCOES_STATUS = {
  rascunho: 'Rascunho',
  publicado: 'Publicado',
};

export function formatarData(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
