const options = {
  year: 'numeric', month: 'short', day: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
};

export default function dateFilter(value, locale = 'ru-RU') {
  return new Intl.DateTimeFormat(locale, options).format(value)
}