import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {
	getContacts () {
		AppDispatcher.handleAction({
			type: AppConstants.CONTACT,
			data : ""
		});	
	},

	getRelatedContacts (searchValue) {
		AppDispatcher.handleAction({
			type: AppConstants.SEARCHCONTACT,
			data : searchValue
		});	
	}
}