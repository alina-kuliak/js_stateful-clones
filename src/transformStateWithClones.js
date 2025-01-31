'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const FINAL_RESULT = [];
  let NEXT_STATE = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = { ...NEXT_STATE, ...action.extraData };

        FINAL_RESULT.push({ ...newState });
        NEXT_STATE = newState;
        break;

      case 'removeProperties':
        newState = { ...NEXT_STATE };

        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        FINAL_RESULT.push({ ...newState });
        NEXT_STATE = newState;
        break;

      case 'clear':
        newState = {};
        FINAL_RESULT.push({ ...newState });
        NEXT_STATE = newState;
        break;

      default:
        break;
    }
  }

  return FINAL_RESULT;
}

module.exports = transformStateWithClones;
