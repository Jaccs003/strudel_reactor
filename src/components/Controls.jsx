//event listeners are connected in Setup

export default function Controls({defaultSettings, onPreprocess, onProcPlay, onPlay, onStop, settings, setSettings }) {

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

            {/* Top Navigation Buttons */}
            <nav>
                <button className="btn btn-outline-primary" onClick={onPreprocess}>Preprocess</button>
                <button className="btn btn-outline-primary" onClick={onProcPlay}>Proc & Play</button>
                <br />
                <button className="btn btn-outline-primary" onClick={onPlay}>Play</button>
                <button className="btn btn-outline-primary" onClick={onStop}>Stop</button>
                <br />
                <button className="btn btn-outline-primary" onClick={handleSave}>Save Settings</button>
                <button className="btn btn-outline-primary" onClick={handleLoad}>Load Settings</button>
                <button className="btn btn-outline-danger" onClick={() => {
                    setSettings(defaultSettings);
                    onPreprocess(defaultSettings);
                }}> Reset to Default
                </button>
            </nav>

            {/* CPS Controls */}
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

            {/* Global Mute */}
            <div className="control-block">
                <label>
                    <input
                        type="checkbox"
                        checked={settings.mute.main}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                mute: { ...settings.mute, main: e.target.checked }
                            })
                        }
                    />
                    &nbsp;Mute Everything
                </label>
            </div>

            {/* Instrument Controls Accordion */}
            <div className="accordion mt-4" id="instrumentAccordion">

                {/* BASS SECTION */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingBass">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBass">
                            Bass Controls
                        </button>
                    </h2>
                    <div id="collapseBass" className="accordion-collapse collapse show" data-bs-parent="#instrumentAccordion">
                        <div className="accordion-body">

                            <label>Bass Volume: {settings.volume.bass.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.volume.bass}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        volume: { ...settings.volume, bass: Number(e.target.value) }
                                    })
                                }
                            />

                            <label>Bass Reverb: {settings.effects.reverb.bass.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.reverb.bass}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            reverb: { ...settings.effects.reverb, bass: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label>Bass Delay: {settings.effects.delay.bass.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.delay.bass}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            delay: { ...settings.effects.delay, bass: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label className="mt-2">
                                <input type="checkbox"
                                    checked={settings.mute.bass}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            mute: { ...settings.mute, bass: e.target.checked }
                                        })
                                    }
                                />
                                &nbsp;Mute Bass
                            </label>

                        </div>
                    </div>
                </div>

                {/* DRUMS SECTION */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingDrums">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDrums">
                            Drums Controls
                        </button>
                    </h2>
                    <div id="collapseDrums" className="accordion-collapse collapse" data-bs-parent="#instrumentAccordion">
                        <div className="accordion-body">

                            <label>Drums Volume: {settings.volume.drums.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.volume.drums}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        volume: { ...settings.volume, drums: Number(e.target.value) }
                                    })
                                }
                            />

                            <label>Drums Reverb: {settings.effects.reverb.drums.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.reverb.drums}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            reverb: { ...settings.effects.reverb, drums: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label>Drums Delay: {settings.effects.delay.drums.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.delay.drums}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            delay: { ...settings.effects.delay, drums: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label className="mt-2">
                                <input type="checkbox"
                                    checked={settings.mute.drums}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            mute: { ...settings.mute, drums: e.target.checked }
                                        })
                                    }
                                />
                                &nbsp;Mute Drums
                            </label>

                        </div>
                    </div>
                </div>
                
                {/* DRUMS2 SECTION */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingDrums">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDrums2">
                            Drums2 Controls
                        </button>
                    </h2>
                    <div id="collapseDrums2" className="accordion-collapse collapse" data-bs-parent="#instrumentAccordion">
                        <div className="accordion-body">

                            <label>Drums2 Volume: {settings.volume.drums2.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.volume.drums2}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        volume: { ...settings.volume, drums2: Number(e.target.value) }
                                    })
                                }
                            />

                            <label>Drums2 Reverb: {settings.effects.reverb.drums2.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.reverb.drums2}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            reverb: { ...settings.effects.reverb, drums2: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label>Drums2 Delay: {settings.effects.delay.drums2.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.delay.drums2}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            delay: { ...settings.effects.delay, drums2: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label className="mt-2">
                                <input type="checkbox"
                                    checked={settings.mute.drums2}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            mute: { ...settings.mute, drums2: e.target.checked }
                                        })
                                    }
                                />
                                &nbsp;Mute Drums2
                            </label>

                        </div>
                    </div>
                </div>

                {/* ARP SECTION */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingArp">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseArp">
                            Arp Controls
                        </button>
                    </h2>
                    <div id="collapseArp" className="accordion-collapse collapse" data-bs-parent="#instrumentAccordion">
                        <div className="accordion-body">

                            <label>Arp Volume: {settings.volume.arp.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.volume.arp}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        volume: { ...settings.volume, arp: Number(e.target.value) }
                                    })
                                }
                            />

                            <label>Arp Reverb: {settings.effects.reverb.arp.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.reverb.arp}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            reverb: { ...settings.effects.reverb, arp: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label>Arp Delay: {settings.effects.delay.arp.toFixed(2)}</label>
                            <input type="range" min="0" max="1" step="0.01"
                                value={settings.effects.delay.arp}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        effects: {
                                            ...settings.effects,
                                            delay: { ...settings.effects.delay, arp: Number(e.target.value) }
                                        }
                                    })
                                }
                            />

                            <label className="mt-2">
                                <input type="checkbox"
                                    checked={settings.mute.arp}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            mute: { ...settings.mute, arp: e.target.checked }
                                        })
                                    }
                                />
                                &nbsp;Mute Arp
                            </label>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
