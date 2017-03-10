class AppHeaderController{
    constructor( $auth, ToastService, $state ){
        'ngInject';

        this.$auth = $auth;

        this.ToastService = ToastService;

        this.$state = $state;
    }

    $onInit(){
        

    }

    logout() {
	if ( this.$auth.isAuthenticated() ) {
			this.$auth.logout();
			this.$state.go('app2.login');
			this.ToastService.show('You are now logged out.');
		}
    }

}

export const AppHeaderComponent = {
    templateUrl: './views/app/components/app-header/app-header.component.html',
    controller: AppHeaderController,
    controllerAs: 'headerCtrl',
    bindings: {}
}
