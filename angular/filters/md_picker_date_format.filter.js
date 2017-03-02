export function MdPickerDateFormatFilter(){
    'ngInject';

    return function( date ){
        if(!date) {
			return '';
        }

        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

		return [year, month, day].join('/');
    }
}
