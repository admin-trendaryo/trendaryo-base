import { useState } from 'react';
import { Settings, Shield, Eye, Trash2, Info } from 'lucide-react';
import { usePersonalization } from './PersonalizationProvider';

export default function PersonalizationSettings() {
  const { 
    settings, 
    updateSettings, 
    browsingHistory, 
    clearHistory,
    isPersonalizationEnabled 
  } = usePersonalization();
  
  const [showDetails, setShowDetails] = useState(false);

  const handleTogglePersonalization = (enabled: boolean) => {
    updateSettings({ 
      enabled,
      trackBrowsingHistory: enabled ? settings.trackBrowsingHistory : false,
      showRecommendations: enabled ? settings.showRecommendations : false
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Personalization Settings</h3>
      </div>

      {/* Main Toggle */}
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">Enable Personalization</h4>
            <p className="text-sm text-gray-600">
              Get personalized product recommendations based on your interests
            </p>
          </div>
          <button
            onClick={() => handleTogglePersonalization(!settings.enabled)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.enabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label={`${settings.enabled ? 'Disable' : 'Enable'} personalization`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
              settings.enabled ? 'translate-x-7' : 'translate-x-1'
            }`} />
          </button>
        </div>

        {/* Detailed Settings */}
        {settings.enabled && (
          <div className="space-y-4 animate-fade-in">
            {/* Browsing History */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <h5 className="font-medium text-gray-900">Track Browsing History</h5>
                </div>
                <p className="text-sm text-gray-600">
                  Remember products you view to improve recommendations
                </p>
                {settings.trackBrowsingHistory && (
                  <p className="text-xs text-gray-500 mt-1">
                    {browsingHistory.length} items in history
                  </p>
                )}
              </div>
              <button
                onClick={() => updateSettings({ trackBrowsingHistory: !settings.trackBrowsingHistory })}
                className={`w-10 h-6 rounded-full transition-colors ${
                  settings.trackBrowsingHistory ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.trackBrowsingHistory ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Show Recommendations */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-gray-900 mb-1">Show Recommendations</h5>
                <p className="text-sm text-gray-600">
                  Display personalized product suggestions on pages
                </p>
              </div>
              <button
                onClick={() => updateSettings({ showRecommendations: !settings.showRecommendations })}
                className={`w-10 h-6 rounded-full transition-colors ${
                  settings.showRecommendations ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.showRecommendations ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Data Retention */}
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Data Retention</h5>
              <p className="text-sm text-gray-600 mb-3">
                How long to keep your browsing history
              </p>
              <select
                value={settings.dataRetentionDays}
                onChange={(e) => updateSettings({ dataRetentionDays: parseInt(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
              </select>
            </div>

            {/* Clear History */}
            {browsingHistory.length > 0 && (
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-red-900 mb-1">Clear Browsing History</h5>
                    <p className="text-sm text-red-700">
                      Remove all stored browsing data ({browsingHistory.length} items)
                    </p>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Privacy Notice */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900 mb-1">Privacy & Data</h5>
              <p className="text-sm text-gray-600 mb-2">
                Your personalization data is stored locally on your device and is never shared with third parties.
              </p>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                {showDetails ? 'Hide' : 'Show'} details
              </button>
              
              {showDetails && (
                <div className="mt-3 p-3 bg-white rounded border text-xs text-gray-600 animate-fade-in">
                  <ul className="space-y-1">
                    <li>• Browsing history is stored in your browser's local storage</li>
                    <li>• Data is automatically deleted after your chosen retention period</li>
                    <li>• You can clear all data at any time</li>
                    <li>• No personal information is collected or transmitted</li>
                    <li>• Recommendations are generated locally when possible</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}