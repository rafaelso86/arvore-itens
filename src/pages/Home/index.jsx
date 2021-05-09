import React, { useState } from 'react';

import CheckBoxPai from '../../components/CheckBox/CheckBoxPai';

import { filhosPai } from '../../context/filhosPai';

export default function Home() {

    const [checkPai, setCheckPai] = useState();

    return (
        <div className="container-fluid">
            <h1 className="title">Árvore de Itens</h1>

            <filhosPai.Provider value={
                {
                    checkPai, setCheckPai,
                }
            }>
                <CheckBoxPai />
            </filhosPai.Provider>

        </div>
    )
}