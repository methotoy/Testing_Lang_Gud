export function DateFormatFilter( moment ){
    'ngInject';

    return function( input ){
		if( input ) {
			return moment(input).calendar();
		}
	}
}
