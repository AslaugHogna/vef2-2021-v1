import { formatDistanceToNowStrict } from 'date-fns';

/**
 * Formattar dagsetningu svo það standi 'Fyrir x dögum/vikum... síðan".
 * Notar innbygðan kóða í date-fns en breytir orðum í íslensku.
 *
 * @param {timestamp ms} date
 */
export function formatDate(date) {
  const formDate = formatDistanceToNowStrict(date);

  if (formDate.endsWith('days')) {
    const dagar = parseInt(formDate, 10);
    if (dagar >= 7 && dagar <= 13) {
      return '1 viku';
    } if (dagar >= 14 && dagar <= 20) {
      return '2 vikum';
    } if (dagar >= 21 && dagar <= 27) {
      return '3 vikum';
    } if (dagar >= 28 && dagar <= 31) {
      return '4 vikum';
    }
    const newDate = formDate.replace('days', 'dögum');
    return newDate;
  } if (formDate.endsWith('day')) {
    const newDate = formDate.replace('day', 'degi');
    return newDate;
  } if (formDate.endsWith('month')) {
    const newDate = formDate.replace('month', 'mánuði');
    return newDate;
  } if (formDate.endsWith('months')) {
    const newDate = formDate.replace('months', 'mánuðum');
    return newDate;
  } if (formDate.endsWith('year')) {
    const newDate = formDate.replace('year', 'ári');
    return newDate;
  } if (formDate.endsWith('years')) {
    const newDate = formDate.replace('years', 'árum');
    return newDate;
  } if (formDate.endsWith('hour')) {
    const newDate = formDate.replace('hour', 'klukkustund');
    return newDate;
  } if (formDate.endsWith('hours')) {
    const newDate = formDate.replace('hours', 'klukkustundum');
    return newDate;
  }
  return formDate;
}

/**
 * Breytir sekúndum í mín:sek
 *
 * @param {timestamp s} time
 */
export function formatTime(time) {
  const min = parseInt(time / 60, 10);
  const sek = time % 60;
  if (sek < 10) {
    return `${min}:0${sek}`;
  }
  return `${min}:${sek}`;
}
