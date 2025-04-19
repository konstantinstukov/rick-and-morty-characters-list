"use client";

import {Suspense} from "react";
import {CharactersList} from "./CharactersList";

export const CharactersListWrapper = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <CharactersList/>
        </Suspense>
    );
};