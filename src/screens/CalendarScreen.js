import React from 'react'
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import moment from 'moment'
import Swiper from 'react-native-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function Calendar({navigation}) {
  //const navigation = useNavigation(); // optional using Hook // more flexible 
  const swiper = React.useRef();
  const contentSwiper = React.useRef();
  const [week, setWeek] = React.useState(0);
  const [value, setValue] = React.useState(new Date());

  const weeks = React.useMemo(() => {
    const start = moment(start).add(week, 'weeks').startOf('week');

    // [-1, 0, 1] represents previous, current, and next week respectively
    return [-1, 0, 1].map(adj => {

      // Creates seven entries (days) per week (-1, 0, 1)
      return Array.from({length: 7}).map((_, index) => {

        const date = moment(start               // Starts at beginning of reference week
                            ).add(adj, 'week'   // shifts week by adj weeks (-1, 0 , 1)
                            ).add(index, 'day') // Adds index for that day

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };

      });

    });

  }, [week]);

  const days = React.useMemo(() => {
    return [
      moment(value).subtract(1, 'day').toDate(),
      value,
      moment(value).add(1, 'day').toDate()
    ];
  })

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Your Schedule</Text>
        </View>

        <View style={styles.picker}>

          <Swiper 
            index={1} 
            ref={swiper} 
            showsPagination={false} 
            loop={false} 
            onIndexChanged={ind => {
              if (ind === 1){
                return;
              }
              const index = ind - 1;
              setValue(moment(value).add(index, 'week').toDate());
              
              setTimeout(() => {
                setWeek(week + index);
                swiper.current.scrollTo(1, false);
              }, 10);
          }}>
            {weeks.map((dates, index) => (
            <View style={styles.itemRow} key={index}>
              {dates.map((item, dateIndex) => {
                const isActive = value.toDateString() === item.date.toDateString();

                  return (
                    <TouchableWithoutFeedback 
                    key={dateIndex} 
                    onPress={() => setValue(item.date)}>
                      <View 
                        style={[
                          styles.item, 
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111'
                          }
                        ]}>
                        <Text style={[
                          styles.itemWeekday, 
                          isActive && {color: '#fff'}
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text style={[
                          styles.itemDate, 
                          isActive && {color: '#fff'}
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
              })}
            </View>
          ))}
          </Swiper>

        </View>

        <Swiper
          index={1}
          ref={contentSwiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={ind => {
            if (ind === 1) {
              return;
            }

            setTimeout(() => {
              const nextValue = moment(value).add(ind - 1, 'days');

              if (moment(value).week() !== nextValue.week()) {
                setWeek(
                  moment(value).isBefore(nextValue) ? week + 1: week - 1
                );
              }

              setValue(nextValue.toDate());
              contentSwiper.current.scrollTo(1, false);
            }, 10);
    
          }}>
          {days.map((day, index) => {
            return (
              <View 
                key={index}
                style={{flex: 1, paddingVertical: 24, paddingHorizontal: 16}}>
                <Text style={styles.contentText}>
                  {day.toLocaleDateString('en-US', {dateStyle: 'full'})}
                </Text>
                <View style={styles.placeholder}>
                  <View style={styles.placeholderContent}>
                    {/* Content Here*/}
                  </View>
                </View>

              </View>
            );
          })}

        </Swiper>
        
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate("Test")}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Schedule</Text>
              </View>
              
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: 'center'
  },
  contentText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12
  },
  itemRow: {
    width: Dimensions.get('screen'),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'column'
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111'
  },
  /* Place holder for appoinments*/
  placeholder: {
    flex: 1,
    height: 400
  },
  placeholderContent: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flex: 1
  },
  /* Footer of page, where Button goes*/
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16
  },
  /* Button */
  btn: {
    flexDirection: 'row',
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '600',
    color: '#fff'
  }
})