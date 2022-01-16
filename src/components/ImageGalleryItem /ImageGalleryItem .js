import React from 'react';
import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  onClick,
}) {
  return (
    <li className={s.image_gallery_item} onClick={() => onClick(largeImageURL)}>
      <img className={s.gallery_item_image} src={webformatURL} alt="#" />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};
