"use client";
import React from "react";
import view1 from "../Assets/view1.jpg";
import view2 from "../Assets/view2.jpg";
import view3 from "../Assets/view3.jpg";
import view4 from "../Assets/view4.jpg";
import view5 from "../Assets/view5.jpg";
import view6 from "../Assets/view6.jpg";
import view7 from "../Assets/view7.jpg";
import view8 from "../Assets/view8.jpg";
import { ImageGallery } from "react-image-grid-gallery";
import "./Album.css";

const imagesArray = [
  {
    src: view1,
    alt: "view1",
  },
  {
    src: view2,
    alt: "view2",
  },
  {
    src: view3,
    alt: "view3",
  },

  {
    src: view4,
    alt: "view4",
  },
  {
    src: view5,
    alt: "view5",
  },
  {
    src: view6,
    alt: "view6",
  },
  {
    src: view7,
    alt: "view7",
  },

  {
    src: view8,
    alt: "view8",
  }
];

function View() {
  return (
    <div className="image-gallery-container">
      <ImageGallery
        imagesInfoArray={imagesArray}
        columnCount={"auto"}
        columnWidth={230}
        gapSize={24}
        className="image-gallery-grid"
      />
    </div>
  );
}
export default View;
