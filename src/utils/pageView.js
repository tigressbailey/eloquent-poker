import ReactGA from 'react-ga';

export function initiateTracker() {
  ReactGA.initialize('UA-128279645-2');
}
export function trackPageView(search) {
  ReactGA.pageview(search);
}
