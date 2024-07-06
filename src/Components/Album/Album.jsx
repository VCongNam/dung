import React from "react";
import PhotoAlbum from "react-photo-album";
import fb1 from "../Assets/fb1.png";
import fb2 from "../Assets/fb2.png";

const photos = [
  { src: {fb1}, width: 800, height: 600 },
  { src: {fb2}, width: 1600, height: 900 },
];

export default function Gallery() {
  return <PhotoAlbum layout="rows" photos={photos} />;
}
