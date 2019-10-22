import * as features from '../features';

const initialState = Object.keys(features)
  .map(key =>
    features[key] === 'true'
      ? key.replace(/([A-Z])/g, letter => `-${letter.toLowerCase()}`)
      : '',
  )
  .filter(e => e);

export default function(state = initialState) {
  return state;
}
