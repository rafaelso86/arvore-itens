import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

import CheckBoxFilho from './CheckBoxFilho';
import { filhosPai } from '../../context/filhosPai';

import Arrow from '../../images/arrow.png';

export default function CheckBoxPai() {

    const [nomes, setNomes] = useState({});
    const { setCheckPai } = useContext(filhosPai);

    useEffect(() => {

        const listarNomes = async () => {

            const baseUrl = window.location.href;

            await axios.get(`${baseUrl}/data.json`)
                .then(response => {
                    setNomes(response.data);

                }).catch(function (error) {
                    console.log(error);
                });
        }
        listarNomes();

    }, [])

    const handlerClickArrow = (i) => {

        let iconArrow = document.querySelector('.icon-arrow-' + i);
        let listaFilho = document.querySelector('.listaFilho-' + i)

        if (iconArrow.classList.contains('open-arrow')) {
            iconArrow.classList.remove('open-arrow');
            iconArrow.classList.add('close-arrow');
        }
        else {
            iconArrow.classList.remove('close-arrow');
            iconArrow.classList.add('open-arrow');
        }

        if (listaFilho.classList.contains('open-list')) {
            listaFilho.classList.remove('open-list');
            listaFilho.classList.add('close-list');

            setCheckPai('');
        }
        else {
            listaFilho.classList.remove('close-list')
            listaFilho.classList.add('open-list');

            setCheckPai(i);
        }
    }

    const handlerClickPai = (i) => {

        let checkboxes = document.querySelectorAll('.listaFilho-' + i + ' li input[type="checkbox"]');
        let checkPai = document.querySelector('#check-pai-' + i);

        if (checkPai.checked === true || checkPai.indeterminate === true) {
            for (let checkbox of checkboxes) {
                checkbox.checked = checkboxes.checked = true;
            }
        }
        else {
            for (let checkbox of checkboxes) {
                checkbox.checked = checkboxes.checked = false;
            }
        }
    }

    const handlerClickFilho = (idPai, idFilho) => {
        let checkFilho = document.querySelector('#checkbox-filho-' + idFilho);
        let checkPai = document.querySelector('#check-pai-' + idPai);

        if (checkFilho.checked === true) {
            checkPai.checked = true;
            checkPai.indeterminate = true;

        }
        else {
            checkPai.checked = false;
            checkPai.indeterminate = false;
        }
    }

    return (
        <div>
            <ul className="listaPai">
                {

                    Object.keys(nomes).map((keyName, i) => (
                        <li className="travelcompany-input" key={i}>
                            <div className="item-checkbox">
                                <div className="checkbox-pai" id={'checkbox-pai-' + i}>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check
                                            type="checkbox"
                                            id={'check-pai-' + i}
                                            name={'check-pai-' + i}
                                            label={nomes[keyName].name}
                                            value="0"
                                            onClick={(e) => { handlerClickPai(i) }}
                                        />
                                    </Form.Group>

                                    <div>
                                        <img src={Arrow} alt="arrow" className={'icon-arrow icon-arrow-' + i + ' close-arro'} onClick={(e) => { handlerClickArrow(i) }} />
                                    </div>
                                </div>
                            </div>

                            <ul className={'listaFilho-' + i + ' listaFilho close-list'}>
                                {
                                    Object.keys(nomes[keyName].children).map((keys, i) => (
                                        <li className="travelcompany-input checkbox-filho" key={i}>
                                            <CheckBoxFilho
                                                label={nomes[keyName].children[keys].name}
                                                name={'checkbox-filho-' + i}
                                                id={'checkbox-filho-' + i}
                                                dataFilho={i}
                                                clickFilho={handlerClickFilho}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}