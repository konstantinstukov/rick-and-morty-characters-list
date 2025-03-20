"use client";

import Link from "next/link";
import { Character } from "../types/types";
import { useCallback, useState } from "react";
import Image from "next/image";

interface CardProps {
  character: Character;
}

export const Card = ({ character }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <article className="w-full flex flex-col rounded-sm overflow-hidden cursor-pointer hover:shadow-lg hover:outline-2 hover:outline-primary-green transition-transform duration-200 hover:scale-105">
      <Link
        href={`/character/${character.id}`}
        aria-label={`View details of ${character.name}`}
      >
        <div
          className="w-full relative"
          style={{ aspectRatio: "308/284" }}
          aria-hidden={!imageLoaded}
        >
          {!imageLoaded && (
            <div
              className="absolute inset-0 bg-gray-200 animate-pulse"
              role="presentation"
            />
          )}
          <Image
            src={character.image}
            alt={`Portrait of ${character.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            loading="lazy"
            quality={85}
          />
        </div>
        <h3 className="text-xl p-2 line-clamp-1">{character.name}</h3>
      </Link>
    </article>
  );
};
