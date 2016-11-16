import {handleActions} from 'redux-actions';
import {FIND_NODE_BY_ID,
        SET_EDITOR,
        SET_LINK_TEXT,
        SET_NODE_TEXT,
        SET_PAGE_EDITOR,
        CLOSE_EDITOR,
        SET_PAGE_SETTINGS,
        SET_PAGE_SETTINGS_VALUE,
        GET_ALL_BACKUPS_START,
        GET_ALL_BACKUPS_SUCCESS,
        GET_ALL_BACKUPS_ERROR,
        GET_STATUS_START,
        GET_STATUS_SUCCESS,
        GET_STATUS_ERROR,
        CREATE_TEMPLATE_PAGE_START,
        CREATE_TEMPLATE_PAGE_SUCCESS,
        CREATE_TEMPLATE_PAGE_ERROR} from '../Constants/actions';
import Immutable  from 'immutable';
import TreeUtils  from 'immutable-treeutils';

const treeUtils = new TreeUtils(Immutable.Seq(), 'id', 'children');

export default handleActions({
    [CREATE_TEMPLATE_PAGE_START]: (state) => {
        return state;
    },
    [CREATE_TEMPLATE_PAGE_SUCCESS]: (state, action) => {
        let {PageSettings, Nodes} = JSON.parse(action.payload.data);
        let newState = state.withMutations(map => {
           map
               .set('PageSettings', Immutable.fromJS(PageSettings))
               .set('Nodes', Immutable.fromJS(Nodes))
               .set('Loaded', true)
               .set('Activated', true)
        });
        console.log(newState.toJS());
        return newState;
    },
    [CREATE_TEMPLATE_PAGE_ERROR]: (state) => {
        return state;
    },
    [GET_ALL_BACKUPS_START]: (state) => {
        return state;
    },
    [GET_ALL_BACKUPS_SUCCESS]: (state, action) => {
        return state.set('Backups', action.payload.data);
    },
    [GET_ALL_BACKUPS_ERROR]: (state) => {
        return state;
    },
    [GET_STATUS_START]: (state) => {
        return state;
    },
    [GET_STATUS_SUCCESS]: (state, action) => {
        let {activated, items} = action.payload.data;
        return state.withMutations(map => {
            map
                .set('Activated', activated)
                .set('Loaded', true)
                .set(activated ? 'Backups' : 'Templates', items);
        });
    },
    [GET_STATUS_ERROR]: (state) => {
        return state;
    },
    [SET_PAGE_SETTINGS]: (state) => {
        let newState = state.set('PageSettings', state.get('Editor'));
        return newState.set('Editor', null);
    },
    [SET_PAGE_SETTINGS_VALUE]: (state, action) => {
        return state.setIn(['Editor'].concat(action.payload.path), action.payload.value)
    },
    [CLOSE_EDITOR]: (state) => {
        return state.set('Editor', null);
    },
    [SET_PAGE_EDITOR]: (state) => {
        console.log(123);
        return state.set('Editor', state.get('PageSettings'));
    },
    [SET_NODE_TEXT]: (state, action) => {
        let path = state.get('currentNodePath');
        let childrenPath = path.concat('children');
        return state.setIn(childrenPath, action.payload);
    },
    [SET_LINK_TEXT]: (state, action) => {
        let path = state.get('currentNodePath');
        let childrenPath = path.concat('children');
        return state.setIn(childrenPath, action.payload);
    },
    [SET_EDITOR]: (state, action) => {
        let nodes = state.get('nodes');
        let path = treeUtils.find(nodes, node => node.get('id') === action.payload.id);
        path = path.toJS();
        path.unshift('nodes');
        let newState = state.set('currentNodePath', path);
        if (action.payload.nodeType === 3) return newState;
        return newState.set('editor', newState.getIn(path));
    },
    [FIND_NODE_BY_ID]: (state, action) => {
        let nodes = state.get('nodes');
        let path = treeUtils.find(nodes, node => node.get('id') === action.payload);
        path = path.toJS();
        path.unshift('nodes');
        path.push('children');
        return state.setIn(path, '555');
    }
})