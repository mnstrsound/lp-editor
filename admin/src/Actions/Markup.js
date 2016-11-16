import {createAction} from 'redux-actions';
import API from '../API'
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
} from './../Constants/Markup';

export const openMarkupEditor = createAction(OPEN_MARKUP_EDITOR);
export const setCurrentNodePath = createAction(SET_CURRENT_NODE_PATH);
export const closeMarkupEditor = createAction(CLOSE_MARKUP_EDITOR);
export const selectImage = createAction(SELECT_IMAGE);
export const saveImageEditor = createAction(SAVE_IMAGE_EDITOR);
export const saveText = createAction(SAVE_TEXT);
export const changeStateModel = createAction(CHANGE_STATE_MODEL);
export const saveMarkupEditorState = createAction(SAVE_MARKUP_EDITOR_STATE);
export const moveNode = createAction(MOVE_NODE);
export const cloneNode = createAction(CLONE_NODE);
export const deleteNode = createAction(DELETE_NODE);

const saveStateStart = createAction(SAVE_STATE_START);
const saveStateSuccess = createAction(SAVE_STATE_SUCCESS);
const saveStateError = createAction(SAVE_STATE_ERROR);

export const saveState = () => {
    return (dispatch, getState) => {
        dispatch(saveStateStart());
        let state = getState().toJS();
        API.saveState(state).then(data => {
        	console.log(data);
			dispatch(saveStateSuccess());
        })
    }
};