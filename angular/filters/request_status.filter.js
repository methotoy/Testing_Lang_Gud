export function RequestStatusFilter(){
    'ngInject';

    return function( input ){
		switch( input ) {
			case 0:
				input = 'Pending';
				break;
			case 1:
				input = 'Approved';
				break;
			case 2:
				input = 'Disapproved';
				break; 
			case 3:
				input = 'Cancelled';
				break;
		}

		return input;
    }
}
