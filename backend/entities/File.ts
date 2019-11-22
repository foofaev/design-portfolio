import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import Project from './Project'; // eslint-disable-line import/no-cycle
import User from './User'; // eslint-disable-line import/no-cycle

const ITEM_TYPES = ['project', 'user'];

export type ItemType = 'project' | 'user';

@Entity()
export default class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn()
  __id: number;

  @Column({ type: 'enum', enum: ITEM_TYPES })
  itemType: ItemType;

  @OneToOne(() => Project, (project) => project.previewImage)
  @ManyToOne(() => Project, (project) => project.files)
  @OneToOne(() => User, (user) => user.image)
  @Column()
  item: string;

  @Column()
  filePath: string;

  @Column()
  ord: number;

  @Column()
  contentType: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  generateExtendedURL(file: File, record: User | Project): string {
    const { fileId, __id, contentType, sourceURL } = file || {};
    if(!fileId && !__id) return '';
    const {urlKey} = record || {};
    const extension = getExtension(contentType, sourceURL);
    const isImage = _.includes(['gif', 'jpg', 'png', 'jpeg'], extension);
    return isImage && __id
      ? buildExtendedImageUrl(__id, urlKey, extension)
      : buildExtendedFileUrl(fileId, urlKey, extension);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getExtension(contentType, originalFilename) {
    const getExtensionByContentType = () => contentType && extension(contentType);
    const getExtensionByOriginalFilename = () => {
        const originalFilenameParts = _.split(originalFilename, '.');
        return _.size(originalFilenameParts) > 1 && _.last(originalFilenameParts);
    };
    return getExtensionByContentType() || getExtensionByOriginalFilename() || null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function buildExtendedFileUrl(_id, urlKey, extension) {
    return `/files/${_id}${urlKey ? `-${urlKey}` : ''}${extension ? `.${extension}` : ''}`;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function buildExtendedImageUrl(__id, urlKey, extension) {
    return `/images/${urlKey ? `${urlKey}-` : ''}${__id}${extension ? `.${extension}` : ''}`;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

