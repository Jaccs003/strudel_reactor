import { ProcAndPlay } from '../utilities/Setup';

//changing radio selections triggers proc and play to execute

export default function RadioOptions(globalEditor, procRef) {
    //handler is called whenever radio selection changes
    const handleChange = () => {
        ProcAndPlay(globalEditor, procRef);
    };
    return (
        <div className="col-md-4">
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault"
                    id="flexRadioDefault1" onChange={handleChange} defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">p1: ON</label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault"
                    id="flexRadioDefault2" onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">p1: HUSH</label>
            </div>
        </div>
    );
}
