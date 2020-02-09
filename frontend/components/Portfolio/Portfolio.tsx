import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Parallax from '../Parallax/Parallax';

import PortfolioTabs from './Sections/PortfolioTabs/PortfolioTabs';
import Avatar from './Sections/Avatar/Avatar';

import styles from './styles';

import * as actions from '../../actions/projects';
import { State } from '../../types';


const useStyles = makeStyles(styles);

const mapStateToProps = ({ projects: { byId, allIds, count }, projectFetchingState }: State) => ({
  projects: allIds.map((id) => byId[id]),
  projectsCount: count,
  projectFetchingState,
});

const actionCreators = {
  addProject: actions.addProject,
  fetchProjects: actions.fetchProjects,
};

const connector = connect(
  mapStateToProps,
  actionCreators,
);

type Props = ConnectedProps<typeof connector>;

const Portfolio: React.FC<Props> = ({ fetchProjects, projects }) => {
  React.useEffect(() => {
    fetchProjects({ offset: 0, limit: 20 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  // TODO: load from profile
  // eslint-disable-next-line global-require
  const avatar = require('../../../assets/img/nastya.png');

  // TODO: load from static
  // eslint-disable-next-line global-require
  const background = require('../../../assets/img/bg2.jpg');

  return (
    <div>
      <Parallax image={background} filter small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={6}
              sm={6}
              xs={12}
              className={cn(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter,
              )}
            >
              <Typography
                variant="h3"
                gutterBottom
                className={classes.title}
              >
                Никитина Анастасия
              </Typography>
              <h4>
                дизайнер интерьера, художник, декоратор
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={cn(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Avatar avatar={avatar} />
          {projects.length !== 0 && <PortfolioTabs projects={projects} />}
        </div>
      </div>
    </div>
  );
};

export default connector(Portfolio);
