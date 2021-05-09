import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';

import { filhosPai } from '../../context/filhosPai';

export default function CheckBoxFilho(props) {

    const { checkPai } = useContext(filhosPai);

    return (
        <div>
            <div className="item-checkbox">
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label={props.label}
                        id={props.id}
                        name={props.name}
                        onClick={function (e) { props.clickFilho(checkPai, props.dataFilho) }}
                    />
                </Form.Group>
            </div>
        </div>
    )
}