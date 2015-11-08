import AppDispatcher from '../dispatchers/AppDispatcher';
import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';

var searchVal;

let contacts = [
	{
		name : 'Varsha',
		phone : '1234'
	},
	{
		name : 'Ankeet',
		phone : '12345'
	},
	{
		name : 'Ankeeta',
		phone : '123456'
	},
	{
		name : 'Ankita',
		phone : '1234564'
	},
	{
		name : 'Vaishnavi',
		phone : '1234564'
	},
	{
		name : 'Vinayak',
		phone : '1234564'
	}
];


class ContactStore extends EventEmitter {

	getRelatedContacts() {
        return contacts.filter(function(contact){
        	return contact.name.toLowerCase().indexOf(searchVal) > -1;
        });
    }

    getContacts() {
        return contacts;
    }

    emitChange() {
        this.emit('CHANGE');
    }

    addChangeListener(cb) {
        this.on('CHANGE', cb);
    }

    removeChangeListener(cb) {
        this.removeListener('CHANGE', cb);
    }
}

let _ContactStore = new ContactStore();

export default _ContactStore;

AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.type) {
        case AppConstants.CONTACT:
            _ContactStore.emitChange();
            break;
        case AppConstants.SEARCHCONTACT:
            searchVal = action.data;
            _ContactStore.emitChange();
            break;
        default:
            break;
    }
});
