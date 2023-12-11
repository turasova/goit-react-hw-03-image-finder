import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({images, onOpenModal}) => {
    return (
        <ul className={css.imageGallery}>
        {images && images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
                key={id}
                tags={tags}
                webformatUR={webformatURL}
                onOpenModal={onOpenModal}
            />  
        ))
            
       }
        </ul>
    )
}
