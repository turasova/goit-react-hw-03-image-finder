import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatUR, tags }) => {
    
    return <li key={id} className={css.imageGalleryItem}>
        <img src={webformatUR} alt={tags} className={css.imageGalleryItemImage} />
            </li>
    
}