//event listeners are connected in Setup

export default function Controls({ onPreprocess, onProcPlay, onPlay, onStop, settings, setSettings }) {

    const handleSave = () => {
        try {
            localStorage.setItem('musicSettings', JSON.stringify(settings));
            alert('Settings saved successfully!');
        } catch (error) {
            alert('Error saving settings: ' + error.message);
        }
    };

    const handleLoad = () => {
        try {
            const saved = localStorage.getItem('musicSettings');
            if (!saved) {
                alert('No saved settings found.');
                return;
            }
            const loadedSettings = JSON.parse(saved);
            setSettings(loadedSettings);
            alert('Settings loaded successfully!');
        } catch (error) {
            alert('Error loading settings: ' + error.message);
        }
    };

    return (
        <div className="col-md-4">

            <nav>
                <button className="btn btn-outline-primary" onClick={onPreprocess} >Preprocess</button>
                <button className="btn btn-outline-primary" onClick={onProcPlay} >Proc & Play</button>
                <br />
                <button className="btn btn-outline-primary" onClick={onPlay} >Play</button>
                <button className="btn btn-outline-primary" onClick={onStop} >Stop</button>
                <br />
                <button className="btn btn-outline-primary" onClick={handleSave}>Save Settings</button>
                <button className="btn btn-outline-primary" onClick={handleLoad}>Load Settings</button>
            </nav>

            {/* Volume Slider (actually changes the settings)*/}
            <div className="control-block">
                <label>Volume: {settings.volume.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.volume}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            volume: Number(e.target.value)
                        })
                    }
                />
            </div>

            {/* Mute Checkbox */}
            <div className="control-block">
                <label>
                    <input
                        type="checkbox"
                        checked={settings.mute}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                mute: e.target.checked
                            })
                        }
                    />
                    Mute
                </label>
            </div>
        </div>
    );
}
