export function isInputBlankOrNull(state, name) {
  if (state[name] || state[name].length == 0) {
    return true;
  }
  return false;
}
