import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {Icon} from '@rneui/base';
import { Layout } from '@ui-kitten/components';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/constants';
const EventsScreen = () => {
  const [selectedDate, setSelectedDate] = useState (
    moment ().format ('YYYY-MM-DD')
  );
  const onDateChange = date => {
    console.log ('Selected date: ', date);
    setSelectedDate (date);
  };
  const nextCustomButton = () => {
    return (
      <Text>
        ss

      </Text>
    );
  };
  useEffect (
    () => {
      console.log ('selectedDate', selectedDate);
    },
    [selectedDate]
  );

  const customDayHeaderStylesCallback = (dayOfWeek, month, year) => {
    switch (dayOfWeek) { // can also evaluate month, year
      case 4: // Thursday
        return {
          style: {
            borderRadius: 12,
            backgroundColor: 'cyan',
          },
          textStyle: {
            color: 'blue',
            fontSize: 28,
            fontWeight: 'bold',
          },
        };
    }
  };
  const startDate = selectedDate ? selectedDate.toString () : '';
  return (
    <Layout style={StyleSheet.absoluteFill} level="3">
      <CalendarPicker
        onDateChange={onDateChange}
        todayBackgroundColor={PRIMARY_COLOR}
        weekdays={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
        months={[
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Dicembre',
        ]}
        selectedDayColor="#32c7bf"
        selectedDayTextColor="#ffffff"
        scaleFactor={375}
        textStyle={{
          color: '#000000',
        }}
        //customDayHeaderStyles={customDayHeaderStylesCallback}

        //scrollable={true}
        //nextComponent={nextCustomButton}
      />
      <View>
        <Text>
          SELECTED DATE:{}
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create ({
  container: {
   // flex: 1,
   // backgroundColor: '#FFFFFF',
    marginTop: 0,
  },
  customButton: {
    backgroundColor: '#00a8ff',
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: 5,
    margin: 5,
  },
});

export default EventsScreen;
