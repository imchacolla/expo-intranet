import {Text, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryStack,
  VictoryLabel,
  VictoryTooltip,
} from 'victory-native';
import axios from 'axios';

const BarPersonal = props => {
  const {F, M} = props.data;
  console.log (F);
  return (
    <View>
      <VictoryStack
        theme={VictoryTheme.material}
        domainPadding={25}
        animate={{duration: 500, easing: 'bounce'}}
        labelComponent={<VictoryLabel 
          labels={({ datum }) => `y: ${datum.count}`}
          dy={20} style={{color:'white'}} />}
        name="BarChart"
        labels={({ datum }) => `y: ${datum.count}`}

      >
        <VictoryBar
          data={F}
          x="sigla"
          y="count"      
          labelComponent={
            <VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end" />
          }
          labels={({ datum }) => `y: ${datum.count}`}
          style={{
            data: { fill: "#2C1D8B" }
          }} 
          
        />
        <VictoryBar data={M} x="sigla" y="count" 
          style={{
            data: { fill: "#8240C0" }
          }} />
      </VictoryStack>
    </View>
  );
};

const styles = StyleSheet.create ({});

export default BarPersonal;
