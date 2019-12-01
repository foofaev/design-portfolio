import * as path from 'path';
import * as fs from 'fs';
import * as bluebird from 'bluebird';
import * as _ from 'lodash';
import { createConnection } from 'typeorm';

import Project from '../entities/Project';
import File from '../entities/File';

import FileReferenceRepository from '../repositories/FileReferenceRepository';
import FileRepository from '../repositories/FileRepository';
import createCustomRepository from '../repositories/CustomRepository';

export default async () => {
  const connection = await createConnection();
  try {
    await connection.transaction(async (manager) => {
      const projectRepository = manager.getCustomRepository(createCustomRepository(Project));
      const fileRepository = manager.getCustomRepository(FileRepository);
      const fileReferenceRepository = manager.getCustomRepository(FileReferenceRepository);

      const projectsPath = path.join(__dirname, '/data/projects/');
      const projectDir = fs.readdirSync(projectsPath, 'utf8').filter((name) => name !== '.DS_Store');

      await bluebird.each(
        projectDir,
        async (projectFolder, projectIndex) => {
          const projectPath = path.join(projectsPath, projectFolder);

          const project = await projectRepository
            .save({ title: `проект-${projectIndex}`, description: '' })
            .then((projectInst: Project) => projectRepository.generateUrlKey(projectInst, -1, true));

          const rawFilesData = fs
            .readdirSync(projectPath, 'utf8')
            .filter((filepath) => (filepath !== '.DS_Store'))
            .map((filepath) => path.join(projectPath, filepath))
            .map((filepath, index) => ({
              path: filepath, contentType: 'image/jpeg', ext: 'jpeg', name: `${project.title}-${index}`,
            }));

          const [imageData, ...filesData] = rawFilesData;

          const previewImage = await fileRepository.createPreviewFromFile(imageData);
          const previewImageRef = await fileReferenceRepository.createWithFile(
            previewImage,
            {
              item: project, itemType: 'project', purpose: 'previewImage', ord: 0,
            },
          );

          const image = await fileRepository.createFromFileIfNotExists(imageData);
          const imageRef = await fileReferenceRepository.createWithFile(
            image,
            {
              item: project, itemType: 'project', purpose: 'image', ord: 0,
            },
          );
          project.image = imageRef;
          project.previewImage = previewImageRef;
          await projectRepository.save(project);

          const filePromises = filesData.map((data) => fileRepository.createFromFileIfNotExists(data));
          const files = await Promise.all(filePromises);

          const fileReferencePromises = _.map(
            files,
            (file: File, index: number) => fileReferenceRepository.createWithFile(
              file,
              {
                item: project, itemType: 'project', purpose: 'file', ord: index + 1,
              },
            ),
          );
          await Promise.all(fileReferencePromises);
        },
      );
    });
    await connection.close();
  } catch (error) {
    await connection.close();
    throw error;
  }
};
