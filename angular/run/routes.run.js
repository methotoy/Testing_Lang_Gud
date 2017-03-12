export function RoutesRun($state, $transitions, $auth) {
    'ngInject';

    let requiresAuthCriteria = {
        to: ($state) => $state.data && $state.data.auth
    };

    let redirectToLogin = () => {
        'ngInject';
        if (!$auth.isAuthenticated()) {
            return $state.target('app2.login', undefined, {location: true});
        }
    };

    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority:10});

}
