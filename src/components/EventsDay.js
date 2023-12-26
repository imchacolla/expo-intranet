import {View, Text} from 'react-native';
import React from 'react';
// react @tankquery react-query
import {useQuery, useQueryClient} from '@tanstack/react-query';
//import axios local
import axios from 'axios';
//import moment
import moment from 'moment';

const EventsDay = () => {
  //eventos dia con react query
  const query = useQuery({
    queryKey: ['eventos', selectedDate],
    queryFn: () => axios.get(`/eventos/${selectedDate}`),
  });

  return (
    <View>
      <Text>EventsDay</Text>
    </View>
  );
};

export default EventsDay;
