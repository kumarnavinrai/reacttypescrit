import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useStyles } from './CodeTransformations.styles';
import RulesetDetailChart from './RulesetDetailChart';
import RulesetSummaryChart from './RulesetSummaryChart';

const CodeTransformations = (props: any) => {
  const classes = useStyles();
  const [ruleName, setRuleName] = useState('');

  const { rulesetData } = props;

  const AnalysisData = (props: any) => {
    const { data } = props;
    return (
      <>
        <Grid item xs={6} onClick={() => setRuleName(data.rulesSet)} style={{ textAlign: 'left' }}>
          <Typography sx={{ color: '#376FD0', cursor: 'pointer' }}> {data.rulesSet}</Typography>
        </Grid>
        <Grid item xs={3} className={classes.summaryNumbers}>
          <Typography> {data.totalCount.toLocaleString('en-US')}</Typography>
        </Grid>
        <Grid item xs={3} className={classes.summaryNumbers}>
          <Typography> {data.usedCount.toLocaleString('en-US')}</Typography>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Box>
        <Card variant="outlined" className={classes.cardLayout}>
          <Grid container justifyContent="flex-start" direction="row" xs={12} spacing="24">
            <Grid container item direction="row" xs={4}>
              <CardContent>
                <Grid container direction="row" xs={12} spacing="10">
                  <Grid item xs={12} className={classes.cardTitle} style={{ textAlign: 'left' }}>
                    <Box borderBottom={1} borderColor="#C4C4C4" paddingBottom={3} marginBottom={2}>
                      Ruleset Summary
                    </Box>
                  </Grid>
                  <Grid item xs={6} className={classes.summaryHeading} style={{ textAlign: 'left' }}>
                    Rule Set
                  </Grid>
                  <Grid item xs={3} className={classes.summaryHeading}>
                    Full Repository
                  </Grid>
                  <Grid item xs={3} className={classes.summaryHeading}>
                    Used Repository
                  </Grid>
                  {rulesetData?.rulesetSummary?.map((item: any) => {
                    return <AnalysisData data={item} />;
                  })}
                </Grid>
              </CardContent>
            </Grid>

            <Grid container item direction="row" xs={8} borderLeft={1} borderColor="#C4C4C4" style={{ height: '100%' }}>
              <Grid item xs={11}>
                <CardContent>
                  <Typography className={classes.cardTitle}>Ruleset Summary</Typography>
                  <br />
                  <RulesetSummaryChart rulesetSummary={rulesetData?.rulesetSummary} setRuleName={setRuleName} />
                </CardContent>
              </Grid>
              {ruleName ? (
                <Grid item xs={11}>
                  <CardContent>
                    <Typography className={classes.cardTitle}>{ruleName}</Typography>
                    <br />
                    <RulesetDetailChart
                      rulesetDetail={
                        ruleName && rulesetData
                          ? rulesetData?.rulesetDetails.filter((i: any) => ruleName === i.rulesSet)
                          : ''
                      }
                    />
                  </CardContent>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default CodeTransformations;
