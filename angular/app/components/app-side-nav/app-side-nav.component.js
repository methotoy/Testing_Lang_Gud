class AppSideNavController{
    constructor($mdSidenav){
        'ngInject';

        this.$mdSidenav = $mdSidenav
        
        //
    }

    $onInit(){
    }
}

export const AppSideNavComponent = {
    templateUrl: './views/app/components/app-side-nav/app-side-nav.component.html',
    controller: AppSideNavController,
    controllerAs: 'vm',
    bindings: {}
}
