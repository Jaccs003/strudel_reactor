import { forwardRef } from 'react';

const Canvas = forwardRef((props, ref) => {
    return (
        <canvas
            id="roll"
            ref={ref}
            width={600}
            height={200}
            style={{ border: '1px solid #ccc', display: 'block', marginTop: '1rem' }}
        ></canvas>
    );
});

export default Canvas;