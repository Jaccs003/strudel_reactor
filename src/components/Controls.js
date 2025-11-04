//event listeners are connected in Setup

export default function Controls({ onPreprocess, onProcPlay, onPlay, onStop }) {
    return (
        <div className="col-md-4">
            <nav>
                <button className="btn btn-outline-primary" onClick={onPreprocess} >Preprocess</button>
                <button className="btn btn-outline-primary" onClick={onProcPlay} >Proc & Play</button>
                <br />
                <button className="btn btn-outline-primary" onClick={onPlay} >Play</button>
                <button className="btn btn-outline-primary" onClick={onStop} >Stop</button>
            </nav>
        </div>
    );
}
