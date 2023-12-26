import {
    View,
    Text,
    Pressable,
    TouchableOpacity,

} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import 'moment';
import 'moment/locale/es';
import moment from 'moment-timezone';
import axios from 'axios';
import IonIcons from 'react-native-vector-icons/Ionicons';
///CONSTANTS COLORS
import {
    PRIMARY_COLOR,
    BACKGROUND_PRIMARY_DARK,
    BACKGROUND_PRIMARY_LIGHT,
    PRIMARY_TEXT_DARK,
    PRIMARY_TEXT_LIGHT,
    PRIMARY_TEXT_DARK_LIGHT,
} from '../utils/constants';
import _ from 'lodash';

const SelectDate = ({ minDate, handlePress }) => {
    const { isDarkMode } = useSelector(state => state.auth);
    const [selectedDate, setSelectedDate] = useState(
        moment().format('YYYY-MM-DD'),
    );

    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [month, setMonth] = useState({
        dateString: moment().format('YYYY-MM-DD'),
        day: moment().format('DD'),
        month: moment().format('MM'),
        year: moment().format('YYYY'),
    });

    const theme = {
        backgroundColor: '#475480',
        calendarBackground: 'transparent',
        textSectionTitleColor: '#999',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: PRIMARY_COLOR,
        todayTextColor: PRIMARY_COLOR,
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#21ac7e',
        selectedDotColor: '#ffffff',
        arrowColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        disabledArrowColor: '#d9e1e8',
        monthTextColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        indicatorColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        textDayFontWeight: '400',
        textMonthFontWeight: '400',
        textDayHeaderFontWeight: '600',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
    };
    LocaleConfig.locales['es'] = {
        monthNames: [
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
            'Diciembre',
        ],
        monthNamesShort: [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
            'Oct',
            'Nov',
            'Dic',
        ],
        dayNames: [
            'Domingo',
            'Lun',
            'Mar',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
        ],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        today: 'Hoy',
    };
    LocaleConfig.defaultLocale = 'es';

    const renderHeader = date => {
        return (
            <View>
                <Text
                    style={{
                        color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                        fontWeight: '500',
                        fontSize: 16,
                    }}>
                    {moment(month.dateString).format('MMMM yyyy')}
                </Text>
            </View>
        );
    };
    const dayComponent = ({ date, state }) => {
        return (
            <Pressable onPress={() => setSelectedDate(date.dateString)}>
                <View
                    style={{
                        alignItems: 'center',
                        // width: Dimensions.get('screen').width / 7 - 2,
                        height: 25,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            alignContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            backgroundColor:
                                selectedDate === date.dateString
                                    ? PRIMARY_COLOR
                                    : isDarkMode
                                        ? BACKGROUND_PRIMARY_DARK
                                        : BACKGROUND_PRIMARY_LIGHT,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                // backgroundColor:
                                //   selectedDate === date.dateString
                                //     ? PRIMARY_COLOR
                                //     : isDarkMode
                                //     ? BACKGROUND_PRIMARY_DARK
                                //     : BACKGROUND_PRIMARY_LIGHT,
                                height: 24,
                                borderRadius: 13,
                                width: 25,
                                borderColor:
                                    currentDate == date.dateString
                                        ? PRIMARY_COLOR
                                        : 'transparent',
                                borderWidth: currentDate == date.dateString ? 1 : 0,

                                color:
                                    state === 'disabled'
                                        ? isDarkMode
                                            ? PRIMARY_TEXT_DARK_LIGHT
                                            : '#CCC'
                                        : selectedDate === date.dateString
                                            ? 'white'
                                            : isDarkMode
                                                ? PRIMARY_TEXT_DARK
                                                : PRIMARY_TEXT_LIGHT,
                            }}>
                            {date.day}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    const Arrow = direction => {
        if (direction == 'left') {
            return (
                <IonIcons
                    name={'chevron-back'}
                    size={24}
                    color={isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT}
                />
            );
        } else {
            return (
                <IonIcons
                    name={'chevron-forward'}
                    size={24}
                    color={isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT}
                />
            );
        }
    };
    return (

        <View
            style={{
                backgroundColor: isDarkMode
                    ? BACKGROUND_PRIMARY_DARK
                    : BACKGROUND_PRIMARY_LIGHT,
                padding: 20,
                height: 350
            }}>
            <Calendar
                key={'calendar'}
                dayComponent={dayComponent}
                renderDay={(day, item) => {
                    return <View />;
                }}
                initialDate={selectedDate}
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                monthFormat={'MMMM yyyy'}
                onMonthChange={month => {
                    setMonth(month);
                }}
                onDayPress={handlePress}
                renderHeader={date => renderHeader(date)}
                renderArrow={Arrow}
                firstDay={1}
                showWeekNumbers={false}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                enableSwipeMonths={true}
                theme={theme}
            />
            <TouchableOpacity onPress={handlePress} >
                <Text style={{
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}>Seleccionar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SelectDate;
