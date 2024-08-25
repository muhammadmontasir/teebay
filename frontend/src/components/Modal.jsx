import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const Modal = ({ title, productId, onDelete }) => {
    const [visible, setVisible] = useState(false);

    const handleDelete = () => {
        setVisible(false);
        onDelete(productId);
    };

    return (
        <div className="card flex justify-center py-4">
            <Button label="Delete" className="delete" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                closable={false}
                style={{ width: '18vw' }}
                breakpoints={{ '1199px': '75vw', '575px': '90vw' }}
                onHide={() => setVisible(false)}
            >
                <h3 className="text-lg text-slate-800 pb-8">{title}</h3>
                <div className="flex justify-end gap-3">
                    <div>
                        <Button
                            type="button"
                            label="No"
                            onClick={() => setVisible(false)}
                            className="delete"
                        />
                    </div>
                    <div>
                        <Button
                            type="button"
                            label="Yes"
                            onClick={handleDelete}
                            className="button"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Modal;
