import path from 'path';
import fs from 'fs';
import bluebird from 'bluebird';
import _ from 'lodash';
import { createConnection } from 'typeorm';

import Project from '../entities/Project';
import File from '../entities/File';

import FileReferenceRepository from '../repositories/FileReferenceRepository';
import FileRepository from '../repositories/FileRepository';
import ProjectRepository from '../repositories/ProjectRepository';

export default async () => {
  const connection = await createConnection();
  try {
    await connection.transaction(async (manager) => {
      const projectRepository = manager.getCustomRepository(ProjectRepository);
      const fileRepository = manager.getCustomRepository(FileRepository);
      const fileReferenceRepository = manager.getCustomRepository(FileReferenceRepository);

      const projectsPath = path.join(__dirname, '/data/projects/');
      const projectDir = fs.readdirSync(projectsPath, 'utf8').filter((name) => name !== '.DS_Store');

      await bluebird.each(
        projectDir,
        async (projectFolder, projectIndex) => {
          const projectPath = path.join(projectsPath, projectFolder);

          const project = await projectRepository
            .save({ title: `проект-${projectIndex}`, description: '', ord: projectIndex })
            .then((projectInst: Project) => projectRepository.generateUrlKey(projectInst, -1, true));

          const filesData = fs
            .readdirSync(projectPath, 'utf8')
            .filter((filepath) => (filepath !== '.DS_Store'))
            .map((filepath) => path.join(projectPath, filepath))
            .map((filepath, index) => ({
              path: filepath, contentType: 'image/jpeg', ext: 'jpeg', name: `${project.title}-${index}`,
            }));

          const files = await bluebird.map(
            filesData,
            (data) => fileRepository.createFromFileIfNotExists(data),
          );

          await bluebird.each(
            files,
            (file: File, index: number) => fileReferenceRepository.createWithFile(
              file,
              {
                item: project, itemType: 'project', purpose: 'image', ord: index + 1,
              },
            ),
          );

          await projectRepository.updateMainImageId({ fileReferenceRepository, fileRepository }, project);
        },
      );
    });
    await connection.close();
  } catch (error) {
    console.error(error);
    await connection.close();
    throw error;
  }
};
