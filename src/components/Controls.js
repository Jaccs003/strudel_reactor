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
        </div>
    );
}
