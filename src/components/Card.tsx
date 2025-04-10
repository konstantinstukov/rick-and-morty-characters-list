"use client";

import React from "react";
import Link from "next/link";
import { Character } from "../types/types";
import { memo } from "react";
import Image from "next/image";

interface CardProps {
  character: Character;
}

export const Card = memo(({ character }: CardProps) => {
  console.log("Rendering Card:", character.name);

  return (
    <article className="w-full flex flex-col rounded-sm overflow-hidden cursor-pointer hover:shadow-lg hover:outline-2 hover:outline-primary-green transition-transform duration-200 hover:scale-105">
      <Link
        href={`/character/${character.id}`}
        aria-label={`View details of ${character.name}`}
        className="block"
      >
        <div className="w-full relative" style={{ aspectRatio: "308/284" }}>
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          <Image
            src={character.image}
            alt={`Portrait of ${character.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-opacity duration-300 opacity-0"
            onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
            loading="lazy"
            quality={85}
          />
        </div>
        <h3 className="text-xl p-2 line-clamp-1">{character.name}</h3>
      </Link>
    </article>
  );
});

Card.displayName = "Card";
