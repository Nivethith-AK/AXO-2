import React from 'react';

/**
 * SignalRails
 * The signature 4-column guide rails from Signal Fest that span the entire page height.
 */
export default function SignalRails() {
  return (
    <div className="sf-column-rails" aria-hidden="true">
      <div className="sf-rails-inner">
        <div className="sf-rail sf-rail-1" />
        <div className="sf-rail sf-rail-2" />
        <div className="sf-rail sf-rail-3" />
        <div className="sf-rail sf-rail-4" />
      </div>
    </div>
  );
}
