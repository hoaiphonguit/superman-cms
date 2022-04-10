import { memo } from 'react';
import './style.css';

const Spinner = () => {
    return (
        <div className="spinner">
            <div className="lds-heart">
                <div></div>
            </div>
        </div>
    );
};
export default memo(Spinner);
