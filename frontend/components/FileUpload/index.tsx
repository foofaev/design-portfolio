/* ****************************************************************************************************************** */
import React from 'react';
import cn from 'classnames';

import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

/* ****************************************************************************************************************** */
import defaultImage from '../../../assets/img/image_placeholder.jpg';
import defaultAvatar from '../../../assets/img/placeholder.jpg';

/* ****************************************************************************************************************** */
export type ImageUploadProps = {
  avatar?: boolean;
  addButtonProps?: ButtonProps;
  changeButtonProps?: ButtonProps;
  removeButtonProps?: ButtonProps;
};

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const ImageUpload: React.FC<ImageUploadProps> = ({
  avatar,
  addButtonProps,
  changeButtonProps,
  removeButtonProps,
}: ImageUploadProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(avatar ? defaultAvatar : defaultImage);

  const classes = useStyles();

  const fileInput = React.createRef<HTMLInputElement>();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const reader = new FileReader();
    if (!event.target.files) return;
    const fileFromInput = event.target.files[0];
    reader.onloadend = (): void => {
      setFile(fileFromInput); // sets input
      setImagePreviewUrl(reader.result); // sets preview image
    };
    reader.readAsDataURL(fileFromInput);
  };

  const handleClick = (): void => {
    if (fileInput.current) fileInput.current.click();
  };

  const handleRemove = (): void => {
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
    if (fileInput.current) fileInput.current.value = '';
  };

  return (
    <div className={classes.fileInput}>
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={cn({ [classes.imgCircle]: avatar, [classes.thumbnail]: true })}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button {...addButtonProps} onClick={handleClick}>
            {avatar ? 'Add Photo' : 'Select image'}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={handleClick}>
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={handleRemove}>
              <i className="fas fa-times" />
              {' '}
              Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

/* ****************************************************************************************************************** */
export default ImageUpload;

/* ****************************************************************************************************************** */
