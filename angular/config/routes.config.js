export function RoutesConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	let getView = (viewName) => {
		return `./views/app/pages/${viewName}/${viewName}.page.html`;
	};

	$urlRouterProvider.otherwise('/main');

    /*
        data: {auth: true} would require JWT auth
        However you can't apply it to the abstract state
        or landing state because you'll enter a redirect loop
    */

	$stateProvider
		.state('app', {
			abstract: true,
            data: {},
			views: {
                sidenav: {
                    templateUrl: getView('side-nav')
                },
				header: {
					templateUrl: getView('header')
				},
				footer: {
					templateUrl: getView('footer')
				},
				main: {}
			}
		})
		.state('app.body', {
            url: '/main',
            views: {
                'main@': {
                    templateUrl: getView('body')
                }
            }
        })
        .state('app.book', {
            url: '/test',
            views: {
                'main@': {
                    templateUrl: getView('book')
                }
            }
        })
        .state('app.landing', {
            url: '/landing',
            views: {
                'main@': {
                    templateUrl: getView('landing')
                }
            }
        })
        .state('app.login', {
			url: '/login',
			views: {
				'main@': {
					templateUrl: getView('login')
				}
			}
		})
        .state('app.register', {
            url: '/register',
            views: {
                'main@': {
                    templateUrl: getView('register')
                }
            }
        })
        .state('app.forgot_password', {
            url: '/forgot-password',
            views: {
                'main@': {
                    templateUrl: getView('forgot-password')
                }
            }
        })
        .state('app.reset_password', {
            url: '/reset-password/:email/:token',
            views: {
                'main@': {
                    templateUrl: getView('reset-password')
                }
            }
        });
}
