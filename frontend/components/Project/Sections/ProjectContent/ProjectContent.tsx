import * as React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from '../../../Grid/GridContainer';
import GridItem from '../../../Grid/GridItem';
import Quote from '../../../Typography/Quote';

import { Project } from '../../../../types';

import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  project: Project;
};

const SectionText: React.FC<Props> = ({ project }) => {
  const classes = useStyles();
  const imgClasses = cn(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
  );
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h3 className={classes.title}>
            {project.title}
            The Castle Looks Different at Night...
          </h3>
          {project.description}
          <p>
            This is the paragraph where you can write more details about your
            product. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn&apos;t
            scroll to get here. Add a button if you want the user to see
            more. We are here to make life better.
            <br />
            <br />
            And now I look and look around and there’s so many Kanyes I&apos;ve
            been trying to figure out the bed design for the master bedroom at
            our Hidden Hills compound... and thank you for turning my personal
            jean jacket into a couture piece.
          </p>
          <Quote
            textClassName={classes.quoteText}
            text="“And thank you for turning my personal jean jacket into a couture piece.”"
            author="Kanye West, Producer."
          />
        </GridItem>
        <GridItem xs={12} sm={10} md={10} className={classes.section}>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <img src={blog4} alt="..." className={imgClasses} />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <img src={blog3} alt="..." className={imgClasses} />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <img src={blog1} alt="..." className={imgClasses} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={8} md={8}>
          <h3 className={classes.title}>Rest of the Story:</h3>
          <p>
            We are here to make life better. And now I look and look around and
            there’s so many Kanyes I$apos;ve been trying to figure out the bed
            design for the master bedroom at our Hidden Hills compound... and
            thank you for turning my personal jean jacket into a couture piece.
            <br />
            I speak yell scream directly at the old guard on behalf of the
            future. daytime All respect prayers and love to Phife’s family Thank
            you for so much inspiration.
          </p>
          <p>
            Thank you Anna for the invite thank you to the whole Vogue team And
            I love you like Kanye loves Kanye Pand Pand Panda I$apos;ve been
            trying to figure out the bed design for the master bedroom at our
            Hidden Hills compound...The Pablo pop up was almost a pop up of
            influence. All respect prayers and love to Phife’s family Thank you
            for so much inspiration daytime I love this new Ferg album! The Life
            of Pablo is now available for purchase I have a dream. Thank you to
            everybody who made The Life of Pablo the number 1 album in the
            world! I$apos;m so proud of the nr #1 song in the country. Panda!
            Good music 2016!
          </p>
          <p>
            I love this new Ferg album! The Life of Pablo is now available for
            purchase I have a dream. Thank you to everybody who made The Life of
            Pablo the number 1 album in the world! I$apos;m so proud of the nr #1
            song in the country. Panda! Good music 2016!
          </p>
        </GridItem>
      </GridContainer>
    </div>
  );
};

// <div className={classes.features3}>
//   <GridContainer>
//     <GridItem xs={12} sm={6} md={6}>
//       <div className={classes.phoneContainer}>
//         <img src={iphone} alt="..." />
//       </div>
//     </GridItem>
//     <GridItem xs={12} sm={6} md={6}>
//       <h2 className={classes.title}>Your life will be much easier</h2>
//       <InfoArea
//         className={classes.infoArea}
//         icon={Extension}
//         title="Hundreds of Components"
//         description="The moment you use Material Kit, you know you’ve never felt anything like it. With a single use, this powerfull UI Kit lets you do more than ever before."
//         iconColor="primary"
//       />
//       <InfoArea
//         className={classes.infoArea}
//         icon={ChildFriendly}
//         title="Easy to Use"
//         description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
//         iconColor="primary"
//       />
//       <InfoArea
//         className={classes.infoArea}
//         icon={WatchLater}
//         title="Fast Prototyping"
//         description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
//         iconColor="primary"
//       />
//     </GridItem>
//   </GridContainer>
// </div>
export default SectionText;
