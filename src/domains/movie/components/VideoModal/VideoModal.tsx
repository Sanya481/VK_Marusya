import { createPortal } from 'react-dom';

import { Close } from '@/assets/icons';
import { Overlay } from '@/shared/components';

import videoPlaceholder from '../../../../assets/images/videoPlaceholder.jpg';
import styles from './styles.module.scss';

type VideoModalProps = {
  videoId: string;
  title: string;
  onClose: () => void;
};

const VideoModal = (props: VideoModalProps) => {
  const { videoId, title, onClose } = props;

  return createPortal(
    <Overlay className={styles.videoOverlay} onClick={onClose}>
      <div className={styles.videoModal}>
        <div className={styles.videoModalContent}>
          <div className={styles.videoTitleWrapper}>
            <h3 className={styles.videoTitle}>{title}</h3>
          </div>

          {videoId ? (
            <iframe
              key={videoId}
              className={styles.videoIframe}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            />
          ) : (
            <div className={styles.noVideo}>
              <p
                className={styles.placeholderTitle}
              >{`Трейлер ${title} недоступен`}</p>
              <div>
                <img
                  className={styles.placeholderImg}
                  src={videoPlaceholder}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>

        <button
          className={styles.videoCloseBtn}
          type="button"
          aria-label="Закрыть модальное окно"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Close aria-hidden="true" />
        </button>
      </div>
    </Overlay>,
    document.body
  );
};

export default VideoModal;
