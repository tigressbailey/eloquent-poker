import React from 'react';
import { connect } from 'react-redux';

export default function FeatureFlagContainer({
  featureName,
  enabledComponent,
  disabledComponent,
}) {
  function FeatureFlaggedContainer({ isEnabled, ...props }) {
    const Component = isEnabled ? enabledComponent : disabledComponent;

    if (Component) {
      return <Component {...props} />;
    }

    // `disabledComponent` is optional property
    return null;
  }

  FeatureFlaggedContainer.displayName = `FeatureFlaggedContainer(${featureName})`;

  function isFeatureEnabled(storeFeatures, featureName) {
    return storeFeatures.indexOf(featureName) !== -1;
  }

  const mapStateToProps = ({ features }) => ({
    isEnabled: isFeatureEnabled(features, featureName),
  });

  return connect(
    mapStateToProps,
    null,
  )(FeatureFlaggedContainer);
}
