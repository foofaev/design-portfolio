import * as path from 'path';
import * as fs from 'fs';
import * as bluebird from 'bluebird';
import * as _ from 'lodash';
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
          await projectRepository.updateMainImageId({ fileReferenceRepository, fileRepository }, project);
        },
      );
    });
    await connection.close();
  } catch (error) {
    await connection.close();
    throw error;
  }
};