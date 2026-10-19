import { OPCOES_STATUS } from '../../utils/processo.js';

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{OPCOES_STATUS[status]}</span>;
}

export default StatusBadge;
