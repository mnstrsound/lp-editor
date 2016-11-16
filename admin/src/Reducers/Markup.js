import {handleActions} from 'redux-actions';
import Immutable  from 'immutable';
import TreeUtils  from 'immutable-treeutils';
import uuid from 'uuid';

import {
    OPEN_MARKUP_EDITOR,
    CLOSE_MARKUP_EDITOR,
    SELECT_IMAGE,
    SAVE_IMAGE_EDITOR,
    SAVE_TEXT,
    CHANGE_STATE_MODEL,
    SAVE_MARKUP_EDITOR_STATE,
    SAVE_STATE,
    SAVE_STATE_START,
    SAVE_STATE_SUCCESS,
    SAVE_STATE_ERROR,
    MOVE_NODE,
    CLONE_NODE,
    DELETE_NODE,
    SET_CURRENT_NODE_PATH
} from '../Constants/Markup';

const treeUtils = new TreeUtils(Immutable.Seq(), 'id', 'children');

const createNodePath = (path) => {
    let finalPath = path.toJS();
    finalPath.unshift('nodes');
    return finalPath;
}

const updateId = (node) => {
    return node.withMutations(map => {
        map.set('id', uuid.v4());
        if (Immutable.List.isList(map.get('children'))) {
            map.update(
                'children', 
                list => list.map(map =>  updateId(map))
            );
        }
    });
}

export default handleActions({
    [OPEN_MARKUP_EDITOR]: (state, action) => {
        let nodes = state.get('nodes');
        let path = treeUtils.find(nodes, node => node.get('id') === action.payload.id);
        path = path.toJS();
        path.unshift('nodes');
        let newState = state.withMutations(map => {
            map
                .setIn(['editor', 'currentNodePath'], path)
            if (action.payload.editor !== 'text') {
                map.setIn(['editor', 'state'], map.getIn(path));
            }
        });
        return newState;
    },
    [SET_CURRENT_NODE_PATH]: (state, action) => {
        let nodes = state.get('nodes');
        let path = treeUtils.find(nodes, node => node.get('id') === action.payload.id);
        path = path.toJS();
        path.unshift('nodes');
        console.log(12333);
        return state.setIn(['editor', 'currentNodePath'], path);
    },
    [CLOSE_MARKUP_EDITOR]: (state, action) => {
        return state.withMutations(map => {
            map
                .setIn(['editor', 'state'], null)
                .setIn(['editor', 'currentNodePath'], null)
        });
    },
    [SELECT_IMAGE]: (state, action) => {
        return state.withMutations(map => {
            map
                .setIn(['editor', 'state', 'attrs', 'src'], action.payload.src)
        });
    },
    [SAVE_IMAGE_EDITOR]: (state, action) => {
        console.log(state.getIn(['editor', 'currentNodePath']))
        return state.setIn(
            state.getIn(['editor', 'currentNodePath']),
            state.getIn(['editor', 'state'])
        );
    },
    [SAVE_TEXT]: (state, action) => {
        let path = state.getIn(['editor', 'currentNodePath']);
        let childrenPath = path.concat('children');
        return state.setIn(childrenPath, action.payload);
    },
    [CHANGE_STATE_MODEL]: (state, action) => {
        let path = ['editor', 'state'].concat(action.payload.model.split('.'));
        return state.setIn(path, action.payload.value);
    },
    [SAVE_MARKUP_EDITOR_STATE]: (state, action) => {
        let path = state.getIn(['editor', 'currentNodePath']);
        return state.withMutations(map => {
            map
                .setIn(path, map.getIn(['editor', 'state']))
                .setIn(['editor', 'state'], null)
        });
    },
    [SAVE_STATE]: (state, action) => {
        return state;
    },
    [SAVE_STATE_START]: (state, action) => {
        return state.setIn(['editor', 'loading'], true);
    },
    [SAVE_STATE_SUCCESS]: (state, action) => {
        return state.withMutations(map => {
            map
                .setIn(['editor', 'loading'], false)
                .setIn(['editor', 'snackbar', 'show'], true)
                .setIn(['editor', 'snackbar', 'text'], 'Успешно выгружен')
        })
    },
    [SAVE_STATE_ERROR]: (state, action) => {
        return state.setIn(['editor', 'loading'], false);
    },
    [MOVE_NODE]: (state, action) => {
        let nodes = state.get('nodes');
        let prevPath = createNodePath(treeUtils.find(nodes, node => node.get('id') === action.payload.id));
        let nextPath = createNodePath(treeUtils[action.payload.up ? 'left' : 'right'](nodes, action.payload.id));
        let parentPath = createNodePath(treeUtils.parent(nodes, action.payload.id));
        let parent = state.getIn(parentPath);
        let prev = state.getIn(prevPath);
        let next = state.getIn(nextPath);
        if (action.payload.up && prevPath[prevPath.length - 1] === 0) return state;
        if (!action.payload.up && prevPath[prevPath.length - 1] >= parent.get('children').size - 1) return state;
        return state.withMutations(map => {
            map
                .setIn(prevPath, next)
                .setIn(nextPath, prev)
        })
    },
    [CLONE_NODE]: (state, action) => {
        let nodes = state.get('nodes');
        let start = Date.now();
        let nodePath = createNodePath(treeUtils.find(nodes, node => node.get('id') === action.payload.id));
        let parentPath = createNodePath(treeUtils.parent(nodes, action.payload.id));
        let node = state.getIn(nodePath);
        let parent = state.getIn(parentPath);
        /*
            Необходима функция генерации id 
            для склонированного объекта
        */
        let newState = state.updateIn(
            parentPath.concat('children'), 
            children => children.insert(
                nodePath[nodePath.length - 1],
                updateId(node)
            )
        )
        console.log(state.getIn(parentPath.concat(['children', 0])).toJS() == newState.getIn(parentPath.concat(['children', 0])).toJS())
        console.log(state.getIn(parentPath.concat(['children', 0])).toJS(), newState.getIn(parentPath.concat(['children', 0])).toJS())
        return newState;
    },
    [DELETE_NODE]: (state, action) => {
        let nodes = state.get('nodes');
        let nodePath = createNodePath(treeUtils.find(nodes, node => node.get('id') === action.payload.id));
        let parentPath = createNodePath(treeUtils.parent(nodes, action.payload.id));
        let node = state.getIn(nodePath);
        let parent = state.getIn(parentPath);
        /*
            Необходима функция генерации id 
            для склонированного объекта
        */
        return state.updateIn(
            parentPath.concat('children'), 
            children => children.delete(nodePath[nodePath.length - 1])
        )
    }
})