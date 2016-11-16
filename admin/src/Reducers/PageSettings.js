import {handleActions} from 'redux-actions';
import Immutable  from 'immutable';
import TreeUtils  from 'immutable-treeutils';

import {OPEN_PAGE_SETTINGS_EDITOR,
        CLOSE_PAGE_SETTINGS_EDITOR,
        SAVE_PAGE_SETTINGS} from '../Constants/PageSettings';

const treeUtils = new TreeUtils(Immutable.Seq(), 'id', 'children');

export default handleActions({
    [OPEN_PAGE_SETTINGS_EDITOR]: (state) => {
        console.log(state.get('settings').toJS())
        return state.setIn(['editor', 'state'], state.get('settings'));
    },
    [CLOSE_PAGE_SETTINGS_EDITOR]: (state) => {
        return state.setIn(['editor', 'state'], null);
    },
    [SAVE_PAGE_SETTINGS]: (state, action) => {
        return state;
    }
})