import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const variants = ['h1', 'h3', 'body1', 'caption'];
const SGrid = styled(Grid)`
  margin: -25px !important;
`;

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};


function SkeletonChildrenDemo() {
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box margin={1}>
          <Skeleton variant="circle">
            <Avatar />
          </Skeleton>
        </Box>
        <Box width="100%">
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>
      <Skeleton variant="rect" width="100%">
        <div style={{ paddingTop: '52%' }} />
      </Skeleton>
    </div>
  );
}

export default function SkeletonTypography() {
  return (
    <>
      <SGrid container spacing={8}>
        <Grid item xs>
          <TypographyDemo loading />
        </Grid>
        <Grid item xs>
          <TypographyDemo />
        </Grid>
      </SGrid>
      <SGrid container spacing={8}>
        <Grid item xs>
          <SkeletonChildrenDemo />
        </Grid>
        <Grid item xs>
          <SkeletonChildrenDemo />
        </Grid>
      </SGrid>
    </>
  );
}
