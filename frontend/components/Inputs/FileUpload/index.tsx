/* ****************************************************************************************************************** */
import React from 'react';
import cn from 'classnames';
import { WrappedFieldProps } from 'redux-form';

import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

/* eslint-disable react/jsx-props-no-spreading */

/* ****************************************************************************************************************** */
// TODO: take from static

const defaultImage = require('../../../../assets/img/image_placeholder.jpg'); // eslint-disable-line
const defaultAvatar = require('../../../../assets/img/placeholder.jpg'); // eslint-disable-line

/* ****************************************************************************************************************** */
export type ImageUploadProps = {
  avatar?: boolean;
  imageUrl?: string;
  addButtonProps?: ButtonProps;
  changeButtonProps?: ButtonProps;
  removeButtonProps?: ButtonProps;
};

/* ****************************************************************************************************************** */
type Props = WrappedFieldProps & ImageUploadProps;

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const ImageUpload: React.FC<Props> = ({
  input: { value, onChange },
  meta: { touched, error, invalid },
  avatar,
  addButtonProps = {},
  changeButtonProps = {},
  removeButtonProps = {},
  imageUrl = '',
}: Props) => {
  const [file, setFile] = React.useState<File | null>(null);
  const defaultPreviewUrl = imageUrl || (avatar ? defaultAvatar : defaultImage);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(defaultPreviewUrl);

  const classes = useStyles();

  const fileInput = React.createRef<HTMLInputElement>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const reader = new FileReader();
    if (!event.target.files) return;
    const fileFromInput = event.target.files[0];
    reader.onloadend = (): void => {
      setFile(fileFromInput); // sets input
      onChange(fileFromInput);
      setImagePreviewUrl(reader.result); // sets preview image
    };
    reader.readAsDataURL(fileFromInput);
  };

  const handleClick = (): void => {
    if (fileInput.current) fileInput.current.click();
  };

  const handleRemove = (): void => {
    setFile(null);
    setImagePreviewUrl(defaultPreviewUrl);
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
            {avatar ? 'Загрузить фото' : 'Выбрать изображение'}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={handleClick}>
              Изменить
            </Button>
            <Button {...removeButtonProps} onClick={handleRemove}>
              <i className="fas fa-times" />
              {' '}
              Очистить
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
