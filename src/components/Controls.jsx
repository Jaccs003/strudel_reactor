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
            {/* cpm controls */}
            <div className="control-block">
                <label>BPM:
                    <input type="number"
                        value={settings.cps.bpm}
                        min="20" max="300"
                        onChange={e => {
                            const newSettings = { ...settings, cps: { ...settings.cps, bpm: Number(e.target.value) } };
                            setSettings(newSettings);
                            onPreprocess(newSettings);
                        }}
                    />
                </label>
                <label>DIV:
                    <input type="number"
                        value={settings.cps.div}
                        min="1"
                        onChange={e => {
                            const newSettings = { ...settings, cps: { ...settings.cps, div: Number(e.target.value) } };
                            setSettings(newSettings);
                            onPreprocess(newSettings);
                        }}
                    />
                </label>
                <label>TICKS:
                    <input type="number"
                        value={settings.cps.ticks}
                        min="1"
                        onChange={e => {
                            const newSettings = { ...settings, cps: { ...settings.cps, ticks: Number(e.target.value) } };
                            setSettings(newSettings);
                            onPreprocess(newSettings);
                        }}
                    />
                </label>
            </div>
            {/* Volume Slider (actually changes the settings)*/}
            <div className="control-block">
                <label>Volume: {settings.volume.main.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.volume.main}
                    onChange={(e) => {
                        setSettings({
                            ...settings,
                            volume: { main: Number(e.target.value) }
                        });
                    }}
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
            {/* Reverb slider (follow same logic as volume)*/}
            <div className="control-block">
                <label>Reverb: {settings.effects.reverb.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.effects.reverb}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            effects: { ...settings.effects, reverb: Number(e.target.value) }
                        })
                    }
                />
            </div>

            {/* Delay slider (follow same logic as volume)*/}
            <div className="control-block">
                <label>Delay: {settings.effects.delay.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.effects.delay}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            effects: { ...settings.effects, delay: Number(e.target.value) }
                        })
                    }
                />
            </div>
        </div>

    );
}
