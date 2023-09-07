import React, { useState, useEffect } from 'react';
import { BarPlot, LinePlot, ChartContainer, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { GET_USER_AND_API_CALLS } from '../../src/graphql/queries.js';

export const Steam = () => {
  const { data: session } = useSession();
  const [Api_calls, setApi_calls] = useState([]);
  const [series, setSeries] = useState([
    {
      type: 'bar',
      yAxisKey: 'eco',
      color: 'grey',
      // create a variable of type array
      data: [[]],
      
    },
  ]);

  const userEmail = session?.user?.email;
  const { loading, error, data } = useQuery(GET_USER_AND_API_CALLS, {
    variables: { email: userEmail },
    skip: !userEmail,
  });

  useEffect(() => {
    if (loading) {
      console.log('Loading...');
      return;
    }

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    if (data) {
      const apiCalls = data.Users_by_pk.Api_calls;
      let countArray = new Array(31).fill(0);

      apiCalls.forEach((call:any) => {
        const day = parseInt(call.createdOn.split('-')[2], 10);
        countArray[day - 1]++; // Subtract 1 because array is zero-based
      });
      // console.log(countArray);
      // Update series state
      setSeries([
        {
          type: 'bar',
          yAxisKey: 'eco',
          color: 'grey',
          // @ts-ignore
          data: countArray,
        },
      ]);
      setApi_calls(apiCalls);
    }
  }, [data, loading, error]);

  return (
    <ChartContainer
      // @ts-ignore
      series={series}
      width={900}
      height={400}
      xAxis={[
        {
          id: 'years',
          data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
          scaleType: 'band',
          valueFormatter: (value) => value.toString(),
        },
      ]}
      yAxis={[
        {
          id: 'eco',
          scaleType: 'linear',
        },
      ]}
    > 
      <BarPlot />
      {/* <LinePlot /> */}
      <ChartsXAxis label="Day" position="bottom" axisId="years" />
      <ChartsYAxis label="Usage" position="left" axisId="eco" />
    </ChartContainer>
  );
};
