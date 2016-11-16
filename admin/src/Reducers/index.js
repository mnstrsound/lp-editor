import { combineReducers } from 'redux-immutable';
import Activated from './Activated';
import Backups from './Backups';
import Markup from './Markup';
import PageSettings from './PageSettings';

export default combineReducers({
    Activated,
    Backups,
    Markup,
    PageSettings
});