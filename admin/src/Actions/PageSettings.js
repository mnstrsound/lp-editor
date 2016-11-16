import {createAction} from 'redux-actions';
import {OPEN_PAGE_SETTINGS_EDITOR} from './../Constants/PageSettings';
import {CLOSE_PAGE_SETTINGS_EDITOR} from './../Constants/PageSettings';
import {SAVE_PAGE_SETTINGS} from './../Constants/PageSettings';

export const openPageSettingsEditor = createAction(OPEN_PAGE_SETTINGS_EDITOR);
export const closePageSettingsEditor = createAction(CLOSE_PAGE_SETTINGS_EDITOR);
export const savePageSettings = createAction(SAVE_PAGE_SETTINGS);
