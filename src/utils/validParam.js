export default function validParam(param, expression) {
  return typeof param !== 'undefined' && expression.test(param);
}
