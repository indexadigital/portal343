import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale';

export default function Date({ dateString, formato='dd/MM/yyyy' }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, formato, { locale: ptBR } )}</time>
}