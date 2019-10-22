import Main from '../scenes/Main';
import NotFound from '../scenes/NotFound';
import FeatureFlagContainer from '../components/FeatureFlagContainer';

const HomePage = FeatureFlagContainer({
  featureName: 'demo',
  enabledComponent: Main,
  disabledComponent: NotFound,
});

const publicRoutes = [
  {
    path: '*',
    component: NotFound,
    exact: true,
  },
];

export { publicRoutes };
