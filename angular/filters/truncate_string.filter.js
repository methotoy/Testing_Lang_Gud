export function TruncateStringFilter(){
    'ngInject';

    return function( input, range ){
        if ( isNaN( range ) ) {
			return input;
		}
		if ( range <= 0 ) {
			return '';
		}
		if ( input ) {
			var inputString = input.split("");
			if (inputString.length > range) {
				input = inputString.slice(0, range).join('') + '...';
			}
		}
		return input;
    }
}
